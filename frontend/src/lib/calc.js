import { NISAB_PRICES, GOLD_NISAB_GRAMS, SILVER_NISAB_GRAMS, ZAKAT_RATE, GOLD_PURITIES, ASSET_GROUPS, LIABILITY_FIELDS } from '../mock/mockData';

export function getNisabValues(currency, prices) {
  const p = prices || NISAB_PRICES[currency] || NISAB_PRICES.USD;
  return {
    goldNisab: p.gold24 * GOLD_NISAB_GRAMS,
    silverNisab: p.silver999 * SILVER_NISAB_GRAMS,
    pricePerGramGold: p.gold24,
    pricePerGramSilver: p.silver999,
  };
}

export function computeAssetValue(groupKey, values, prices) {
  const group = ASSET_GROUPS.find((g) => g.key === groupKey);
  if (!group) return 0;

  if (group.isMetal === 'gold') {
    return group.fields.reduce((sum, f) => {
      const grams = parseFloat(values[f.id] || 0);
      const purity = GOLD_PURITIES.find((p) => p.karat === f.purityKey);
      const m = purity ? purity.multiplier : 1;
      return sum + grams * m * prices.gold24;
    }, 0);
  }
  if (group.isMetal === 'silver') {
    return group.fields.reduce((sum, f) => {
      const grams = parseFloat(values[f.id] || 0);
      return sum + grams * prices.silver999;
    }, 0);
  }
  return group.fields.reduce((sum, f) => sum + parseFloat(values[f.id] || 0), 0);
}

export function computeTotals(values, currency, prices, standard = 'silver') {
  const p = prices || NISAB_PRICES[currency] || NISAB_PRICES.USD;
  const breakdown = {};
  let totalAssets = 0;
  ASSET_GROUPS.forEach((g) => {
    const v = computeAssetValue(g.key, values, p);
    breakdown[g.key] = v;
    totalAssets += v;
  });
  const totalLiabilities = LIABILITY_FIELDS.reduce(
    (s, f) => s + parseFloat(values[f.id] || 0),
    0
  );
  const netWealth = Math.max(totalAssets - totalLiabilities, 0);
  const goldNisab = p.gold24 * GOLD_NISAB_GRAMS;
  const silverNisab = p.silver999 * SILVER_NISAB_GRAMS;
  const nisabRef = standard === 'gold' ? goldNisab : silverNisab;
  const meetsNisab = netWealth >= nisabRef;
  const zakatDue = meetsNisab ? netWealth * ZAKAT_RATE : 0;
  return {
    breakdown,
    totalAssets,
    totalLiabilities,
    netWealth,
    goldNisab,
    silverNisab,
    nisabRef,
    standard,
    meetsNisab,
    zakatDue,
  };
}

export function formatMoney(amount, currency) {
  const symMap = {
    USD: '$', INR: '₹', GBP: '£', EUR: '€', AED: 'د.إ ', SAR: '﷼',
    QAR: 'QR ', KWD: 'KD ', BHD: 'BD ', OMR: 'RO ',
    PKR: '₨', BDT: '৳', LKR: 'Rs ', MYR: 'RM ', IDR: 'Rp ',
    TRY: '₺', RUB: '₽',
  };
  const sym = symMap[currency] || '';
  const n = Number(amount || 0);
  return `${sym}${n.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
}
