import { useMemo, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Button } from '../components/ui/button';
import { ScrollText, Plus, Trash2, Printer, AlertCircle } from 'lucide-react';
import { formatMoney } from '../lib/calc';
import { toast } from 'sonner';

export default function WasiyyahWriter() {
  const [testator, setTestator] = useState({ name: '', city: '', date: new Date().toISOString().slice(0, 10) });
  const [estate, setEstate] = useState('');
  const [bequests, setBequests] = useState([{ beneficiary: '', amount: '', purpose: '' }]);
  const [guardian, setGuardian] = useState({ name: '', relation: '' });
  const [letter, setLetter] = useState('');
  const [currency] = useState('INR');

  const E = parseFloat(estate || 0);
  const totalBequest = useMemo(() => bequests.reduce((s, b) => s + parseFloat(b.amount || 0), 0), [bequests]);
  const cap = E * (1 / 3);
  const overCap = totalBequest > cap;

  const addBequest = () => setBequests([...bequests, { beneficiary: '', amount: '', purpose: '' }]);
  const removeBequest = (i) => setBequests(bequests.filter((_, idx) => idx !== i));
  const updateBequest = (i, k, v) => setBequests(bequests.map((b, idx) => (idx === i ? { ...b, [k]: v } : b)));

  const print = () => {
    if (overCap) { toast.error('Bequests exceed the 1/3 cap. Please adjust.'); return; }
    toast.success('Opening print dialog…');
    setTimeout(() => window.print(), 200);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 max-w-5xl mx-auto px-5 lg:px-8 py-12">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-lg bg-amber-200 text-emerald-900 flex items-center justify-center"><ScrollText className="w-5 h-5" /></div>
          <div className="text-[10px] uppercase tracking-[0.22em] text-amber-700 font-bold">Wasiyyah Writer · Educational</div>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-emerald-950">Shariah-aligned Will Writer</h1>
        <p className="mt-3 text-emerald-900/70 max-w-2xl text-sm leading-relaxed">
          Compose your <em>Wasiyyah</em> within the classical 1/3 cap. Print, sign in front of two witnesses, and store securely.
        </p>

        <div className="mt-8 space-y-6">
          <div className="rounded-2xl bg-white border border-emerald-900/10 p-6">
            <h2 className="text-base font-semibold text-emerald-950 mb-4">Testator Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <Field label="Full name" value={testator.name} onChange={(v) => setTestator({ ...testator, name: v })} />
              <Field label="City / Country" value={testator.city} onChange={(v) => setTestator({ ...testator, city: v })} />
              <Field label="Date" type="date" value={testator.date} onChange={(v) => setTestator({ ...testator, date: v })} />
            </div>
          </div>

          <div className="rounded-2xl bg-white border border-emerald-900/10 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-semibold text-emerald-950">Estate &amp; Bequests (within 1/3)</h2>
              <div className="text-xs text-emerald-900/65">1/3 cap: <strong className={overCap ? 'text-rose-700' : 'text-emerald-900'}>{formatMoney(cap, currency)}</strong></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
              <Field label="Total estate value" type="number" value={estate} onChange={setEstate} />
              <div className="flex items-end">
                <div className="text-xs text-emerald-900/70">Total bequests: <strong className={overCap ? 'text-rose-700' : 'text-emerald-900'}>{formatMoney(totalBequest, currency)}</strong></div>
              </div>
            </div>
            <div className="space-y-3">
              {bequests.map((b, i) => (
                <div key={i} className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1.5fr_auto] gap-2 items-end">
                  <Field label={i === 0 ? 'Beneficiary (non-heir)' : ''} value={b.beneficiary} onChange={(v) => updateBequest(i, 'beneficiary', v)} />
                  <Field label={i === 0 ? 'Amount' : ''} type="number" value={b.amount} onChange={(v) => updateBequest(i, 'amount', v)} />
                  <Field label={i === 0 ? 'Purpose / instruction' : ''} value={b.purpose} onChange={(v) => updateBequest(i, 'purpose', v)} />
                  <Button variant="ghost" size="icon" onClick={() => removeBequest(i)} className="text-rose-700 hover:bg-rose-50">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
            <Button variant="outline" onClick={addBequest} className="mt-3 border-emerald-900/15">
              <Plus className="w-4 h-4 mr-1.5" /> Add bequest
            </Button>
            {overCap && (
              <div className="mt-4 rounded-lg bg-rose-50 border border-rose-200 p-3 text-xs text-rose-800 flex gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" /> Bequests exceed the 1/3 cap permitted by Shariah. Reduce or seek heir consent.
              </div>
            )}
          </div>

          <div className="rounded-2xl bg-white border border-emerald-900/10 p-6">
            <h2 className="text-base font-semibold text-emerald-950 mb-4">Guardian for Minors (optional)</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Field label="Guardian name" value={guardian.name} onChange={(v) => setGuardian({ ...guardian, name: v })} />
              <Field label="Relation" value={guardian.relation} onChange={(v) => setGuardian({ ...guardian, relation: v })} />
            </div>
          </div>

          <div className="rounded-2xl bg-white border border-emerald-900/10 p-6">
            <h2 className="text-base font-semibold text-emerald-950 mb-2">Confidential Family Letter (optional)</h2>
            <p className="text-xs text-emerald-900/65 mb-3">A personal note for your loved ones — appended to your Wasiyyah PDF.</p>
            <textarea
              value={letter}
              onChange={(e) => setLetter(e.target.value)}
              rows={6}
              placeholder="Bismillah… My beloved family,"
              className="w-full px-3 py-2.5 border border-emerald-900/15 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-700/30 text-sm"
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="text-xs text-emerald-900/60 max-w-md">
              Print, sign in front of two witnesses, and keep with your trusted family or scholar.
            </div>
            <Button onClick={print} disabled={overCap} className="bg-emerald-900 hover:bg-emerald-800 text-amber-50 rounded-full px-6">
              <Printer className="w-4 h-4 mr-1.5" /> Generate Wasiyyah PDF
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function Field({ label, value, onChange, type = 'text' }) {
  return (
    <label className="text-xs">
      {label && <span className="text-emerald-900/75 block mb-1">{label}</span>}
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2.5 border border-emerald-900/15 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-700/30 text-sm"
      />
    </label>
  );
}
