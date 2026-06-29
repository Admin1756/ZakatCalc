import { useMemo, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Button } from '../components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Scale, Users, AlertCircle, Printer } from 'lucide-react';
import { formatMoney } from '../lib/calc';
import { toast } from 'sonner';

function useFaraidCalculation(estate, heirs) {
  return useMemo(() => {
    // Simplified Faraid calculation — Quranic shares (educational, not legal advice)
    const E = Math.max(parseFloat(estate || 0), 0);
    const shares = {};

    const sons = parseInt(heirs.sons || 0);
    const daughters = parseInt(heirs.daughters || 0);
    const spouse = heirs.spouse; // 'husband' | 'wife' | 'none'
    const father = heirs.father;
    const mother = heirs.mother;

    // Spouse share (with children present here we assume yes when sons+daughters>0)
    const hasChildren = sons + daughters > 0;
    if (spouse === 'husband') shares.Husband = hasChildren ? 1 / 4 : 1 / 2;
    if (spouse === 'wife') shares.Wife = hasChildren ? 1 / 8 : 1 / 4;

    // Parents
    if (mother) shares.Mother = hasChildren ? 1 / 6 : 1 / 3;
    if (father) shares.Father = hasChildren ? 1 / 6 : 0; // residue handled below

    // Remainder for children
    const fixedTotal = Object.values(shares).reduce((s, v) => s + v, 0);
    let residue = 1 - fixedTotal;
    if (residue < 0) residue = 0;

    if (sons + daughters > 0) {
      // sons: daughters = 2:1
      const units = sons * 2 + daughters * 1;
      if (units > 0) {
        const perUnit = residue / units;
        if (sons > 0) shares.Sons = perUnit * sons * 2;
        if (daughters > 0) shares.Daughters = perUnit * daughters;
      }
    } else if (father) {
      // Father takes residue if no descendants
      shares.Father = (shares.Father || 0) + residue;
    }

    // Compute amounts
    const breakdown = Object.entries(shares).map(([heir, frac]) => ({
      heir,
      fraction: frac,
      amount: E * frac,
      count: heir === 'Sons' ? sons : heir === 'Daughters' ? daughters : 1,
    })).filter((r) => r.fraction > 0);

    const totalDistributed = breakdown.reduce((s, r) => s + r.amount, 0);
    return { breakdown, totalDistributed, estate: E };
  }, [estate, heirs]);
}

export default function FaraidPage() {
  const [currency] = useState('INR');
  const [estate, setEstate] = useState('');
  const [heirs, setHeirs] = useState({
    sons: 0, daughters: 0, spouse: 'none', father: false, mother: false,
  });
  const { breakdown, totalDistributed, estate: E } = useFaraidCalculation(estate, heirs);

  const update = (k, v) => setHeirs((p) => ({ ...p, [k]: v }));

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 max-w-6xl mx-auto px-5 lg:px-8 py-12">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-lg bg-emerald-900 text-amber-200 flex items-center justify-center"><Scale className="w-5 h-5" /></div>
          <div className="text-[10px] uppercase tracking-[0.22em] text-amber-700 font-bold">Faraid Engine · Educational</div>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-emerald-950">Islamic Inheritance Calculator</h1>
        <p className="mt-3 text-emerald-900/70 max-w-2xl text-sm leading-relaxed">
          Deterministic Quranic share calculation across major schools. Estimates only — verify with a qualified scholar and local civil-law before distribution.
        </p>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="rounded-2xl bg-white border border-emerald-900/10 p-6">
            <h2 className="text-base font-semibold text-emerald-950 flex items-center gap-2"><Users className="w-4 h-4" /> The Estate &amp; Heirs</h2>

            <label className="block mt-5 text-xs">
              <span className="text-emerald-900/75">Net estate value (after debts &amp; funeral)</span>
              <input type="number" min="0" value={estate} onChange={(e) => setEstate(e.target.value)} placeholder="0"
                className="mt-1.5 w-full px-3 py-2.5 border border-emerald-900/15 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-700/30 text-sm" />
            </label>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <label className="text-xs"><span className="text-emerald-900/75">Number of sons</span>
                <input type="number" min="0" value={heirs.sons} onChange={(e) => update('sons', e.target.value)}
                  className="mt-1.5 w-full px-3 py-2 border border-emerald-900/15 rounded-md text-sm" /></label>
              <label className="text-xs"><span className="text-emerald-900/75">Number of daughters</span>
                <input type="number" min="0" value={heirs.daughters} onChange={(e) => update('daughters', e.target.value)}
                  className="mt-1.5 w-full px-3 py-2 border border-emerald-900/15 rounded-md text-sm" /></label>
            </div>

            <div className="mt-4">
              <span className="text-xs text-emerald-900/75">Surviving spouse</span>
              <Select value={heirs.spouse} onValueChange={(v) => update('spouse', v)}>
                <SelectTrigger className="mt-1.5 h-10"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">No spouse</SelectItem>
                  <SelectItem value="husband">Husband (deceased was a woman)</SelectItem>
                  <SelectItem value="wife">Wife (deceased was a man)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <label className="flex items-center gap-2 text-sm text-emerald-900">
                <input type="checkbox" checked={heirs.father} onChange={(e) => update('father', e.target.checked)} className="accent-emerald-800" /> Father alive
              </label>
              <label className="flex items-center gap-2 text-sm text-emerald-900">
                <input type="checkbox" checked={heirs.mother} onChange={(e) => update('mother', e.target.checked)} className="accent-emerald-800" /> Mother alive
              </label>
            </div>

            <div className="mt-5 rounded-lg bg-amber-50/70 border border-amber-200/60 p-3 text-xs text-emerald-900/80 flex gap-2">
              <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              Simplified model. Siblings, grandchildren, and Awl/Radd adjustments are not included in this MVP — consult a scholar.
            </div>
          </div>

          <div className="rounded-2xl bg-gradient-to-br from-emerald-900 to-emerald-800 text-white p-7">
            <div className="text-[10px] uppercase tracking-[0.22em] text-amber-300 font-bold">Distribution</div>
            <div className="mt-2 text-3xl font-bold">Total estate: {formatMoney(E, currency)}</div>

            <div className="mt-6 space-y-3">
              {breakdown.length === 0 && (
                <div className="text-amber-100/70 text-sm">Enter heirs to see shares.</div>
              )}
              {breakdown.map((r) => (
                <div key={r.heir} className="flex items-center justify-between bg-emerald-950/30 rounded-lg p-3 border border-emerald-100/10">
                  <div>
                    <div className="text-sm font-semibold">{r.heir}{r.count > 1 ? ` (×${r.count})` : ''}</div>
                    <div className="text-[11px] text-amber-200/80">Share: {(r.fraction * 100).toFixed(2)}%</div>
                  </div>
                  <div className="text-amber-200 font-bold text-lg">{formatMoney(r.amount, currency)}</div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-5 border-t border-emerald-100/10 flex items-center justify-between text-sm">
              <span className="text-amber-100/70">Distributed</span>
              <span className="font-semibold">{formatMoney(totalDistributed, currency)}</span>
            </div>
            <Button onClick={() => { toast.success('Opening print dialog'); setTimeout(() => window.print(), 200); }} className="mt-5 w-full bg-amber-300 hover:bg-amber-200 text-emerald-950 font-semibold">
              <Printer className="w-4 h-4 mr-1.5" /> Print Result
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
