import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import BRAND_TEMPLATE from '../assets/brandTemplate';
import { ASSET_GROUPS, LIABILITY_FIELDS } from '../mock/mockData';

// A4 dimensions (portrait) in mm
const PAGE_W = 210;
const PAGE_H = 297;

// Content safe area (below brand logo header + above footer contact strip)
const CONTENT_X = 18;
const CONTENT_Y_START = 68;
const CONTENT_Y_END = 260; // above footer ribbons + contact line

// Brand colors
const EMERALD_950 = [3, 39, 30];
const EMERALD_800 = [6, 78, 59];
const AMBER_700 = [180, 83, 9];
const MUTED = [80, 100, 92];
const ROSE_700 = [190, 18, 60];
const LIGHT_GREY = [230, 235, 232];

// jsPDF's built-in fonts don't include the Rupee, Dirham, Riyal, Taka etc. glyphs.
// Fall back to plain-text currency codes inside the PDF so numbers render cleanly.
const PDF_SYM = {
  USD: '$', GBP: '£', EUR: '€',
  INR: 'Rs. ', PKR: 'Rs. ', BDT: 'Tk. ', LKR: 'Rs. ',
  AED: 'AED ', SAR: 'SAR ', QAR: 'QAR ', KWD: 'KWD ',
  BHD: 'BHD ', OMR: 'OMR ', MYR: 'RM ', IDR: 'Rp ',
  TRY: 'TL ', RUB: 'RUB ',
};

function fmt(amount, currency) {
  const sym = PDF_SYM[currency] || `${currency} `;
  const n = Number(amount || 0);
  return `${sym}${n.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
}

function drawBackground(doc) {
  // The brand template PNG contains: top ribbons + logo + faded Z watermark + bottom ribbons + contact strip
  doc.addImage(BRAND_TEMPLATE, 'PNG', 0, 0, PAGE_W, PAGE_H, undefined, 'FAST');
}

function drawSectionTitle(doc, y, kicker, title) {
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(...AMBER_700);
  doc.text(kicker.toUpperCase(), CONTENT_X, y);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(...EMERALD_950);
  doc.text(title, CONTENT_X, y + 5.5);
  return y + 10;
}

function ensureSpace(doc, cursor, needed) {
  if (cursor + needed > CONTENT_Y_END) {
    doc.addPage();
    drawBackground(doc);
    return CONTENT_Y_START;
  }
  return cursor;
}

/**
 * Generate a branded Zakat calculation report PDF and trigger download.
 */
export function generateZakatPdf({ values, totals, currency, standard }) {
  const doc = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait' });

  drawBackground(doc);

  // ---------- Header ----------
  const now = new Date();
  const dateStr = now.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.setTextColor(...EMERALD_950);
  doc.text('Zakat Calculation Report', CONTENT_X, 55);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(...MUTED);
  doc.text(
    `Generated on ${dateStr}   |   Currency: ${currency}   |   Nisab standard: ${standard === 'gold' ? 'Gold (85g)' : 'Silver (595g)'}`,
    CONTENT_X,
    62
  );

  let cursor = CONTENT_Y_START;

  // ---------- Result summary card ----------
  const summaryHeight = 28;
  doc.setFillColor(...EMERALD_950);
  doc.roundedRect(CONTENT_X, cursor, PAGE_W - CONTENT_X * 2, summaryHeight, 3, 3, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(255, 214, 102);
  doc.text('YOUR ZAKAT DUE', CONTENT_X + 5, cursor + 7);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.setTextColor(255, 255, 255);
  doc.text(fmt(totals.zakatDue, currency), CONTENT_X + 5, cursor + 18);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(230, 240, 235);
  doc.text('2.5% of net zakatable wealth above the chosen Nisab', CONTENT_X + 5, cursor + 24);

  const isAbove = totals.meetsNisab;
  const badgeX = PAGE_W - CONTENT_X - 55;
  doc.setFillColor(255, 214, 102);
  doc.roundedRect(badgeX, cursor + 6, 50, 7, 2, 2, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(...EMERALD_950);
  doc.text(isAbove ? 'ABOVE NISAB - DUE' : 'BELOW NISAB - NOT DUE', badgeX + 25, cursor + 10.5, { align: 'center' });

  cursor += summaryHeight + 6;

  // ---------- Wealth summary table ----------
  cursor = ensureSpace(doc, cursor, 40);
  cursor = drawSectionTitle(doc, cursor, 'Summary', 'Wealth Snapshot');

  autoTable(doc, {
    startY: cursor,
    theme: 'plain',
    margin: { left: CONTENT_X, right: CONTENT_X },
    styles: { font: 'helvetica', fontSize: 9.5, cellPadding: 1.8, textColor: EMERALD_950 },
    body: [
      ['Total assets', fmt(totals.totalAssets, currency)],
      ['Liabilities', `- ${fmt(totals.totalLiabilities, currency)}`],
      ['Net zakatable wealth', fmt(totals.netWealth, currency)],
      [`Nisab reference (${standard})`, fmt(totals.nisabRef, currency)],
    ],
    columnStyles: {
      0: { textColor: MUTED, cellWidth: 90 },
      1: { fontStyle: 'bold', halign: 'right' },
    },
    didParseCell: (data) => {
      if (data.row.index === 1) data.cell.styles.textColor = ROSE_700;
      if (data.row.index === 2) data.cell.styles.fontStyle = 'bold';
    },
  });
  cursor = doc.lastAutoTable.finalY + 6;

  // ---------- Asset Breakdown ----------
  cursor = ensureSpace(doc, cursor, 40);
  cursor = drawSectionTitle(doc, cursor, 'Assets entered', 'Zakatable Assets');

  const assetRows = [];
  ASSET_GROUPS.forEach((g) => {
    const total = totals.breakdown[g.key] || 0;
    if (total <= 0) return;
    assetRows.push([{ content: g.title, styles: { fontStyle: 'bold', textColor: EMERALD_800 } }, fmt(total, currency)]);
    g.fields.forEach((f) => {
      const raw = parseFloat(values[f.id] || 0);
      if (!raw) return;
      let label = f.label;
      let display;
      if (g.isMetal) {
        display = `${raw} g`;
      } else {
        display = fmt(raw, currency);
      }
      assetRows.push([{ content: `   ${label}`, styles: { textColor: MUTED, fontSize: 9 } }, { content: display, styles: { textColor: MUTED, fontSize: 9, halign: 'right' } }]);
    });
  });

  if (assetRows.length === 0) {
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(10);
    doc.setTextColor(...MUTED);
    doc.text('No assets entered.', CONTENT_X, cursor);
    cursor += 8;
  } else {
    autoTable(doc, {
      startY: cursor,
      theme: 'plain',
      margin: { left: CONTENT_X, right: CONTENT_X },
      styles: { font: 'helvetica', fontSize: 9.5, cellPadding: 1.5, textColor: EMERALD_950 },
      body: assetRows,
      columnStyles: { 1: { halign: 'right' } },
    });
    cursor = doc.lastAutoTable.finalY + 6;
  }

  // ---------- Liabilities ----------
  cursor = ensureSpace(doc, cursor, 30);
  cursor = drawSectionTitle(doc, cursor, 'Deductions', 'Liabilities');

  const liabRows = [];
  LIABILITY_FIELDS.forEach((f) => {
    const v = parseFloat(values[f.id] || 0);
    if (v > 0) liabRows.push([f.label, fmt(v, currency)]);
  });

  if (liabRows.length === 0) {
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(10);
    doc.setTextColor(...MUTED);
    doc.text('No liabilities entered.', CONTENT_X, cursor);
    cursor += 8;
  } else {
    autoTable(doc, {
      startY: cursor,
      theme: 'plain',
      margin: { left: CONTENT_X, right: CONTENT_X },
      styles: { font: 'helvetica', fontSize: 9.5, cellPadding: 1.5, textColor: EMERALD_950 },
      body: liabRows,
      columnStyles: { 1: { halign: 'right', textColor: ROSE_700, fontStyle: 'bold' } },
    });
    cursor = doc.lastAutoTable.finalY + 6;
  }

  // ---------- Disclaimer note ----------
  cursor = ensureSpace(doc, cursor, 22);
  doc.setDrawColor(...LIGHT_GREY);
  doc.setLineWidth(0.3);
  doc.line(CONTENT_X, cursor, PAGE_W - CONTENT_X, cursor);
  cursor += 5;
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(8);
  doc.setTextColor(...MUTED);
  const note =
    'Educational tool by Zamzam Capital. Prices and exchange rates are indicative reference values. ' +
    'Please consult a qualified scholar for guidance on your personal circumstances before finalising your Zakat.';
  const lines = doc.splitTextToSize(note, PAGE_W - CONTENT_X * 2);
  doc.text(lines, CONTENT_X, cursor);

  // ---------- Save ----------
  const filename = `Zamzam-Zakat-Report_${now.toISOString().slice(0, 10)}.pdf`;
  doc.save(filename);
}
