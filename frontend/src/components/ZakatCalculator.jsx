import { useMemo, useState } from 'react';
import * as Icons from 'lucide-react';
import { Button } from './ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { ASSET_GROUPS, LIABILITY_FIELDS } from '../mock/mockData';
import { computeTotals, formatMoney } from '../lib/calc';
import { CheckCircle2, Printer, RotateCcw, Sparkles, Info } from 'lucide-react';
import { toast } from 'sonner';

const STEP_LABELS = ['Assets', 'Liabilities', 'Result'];

export default function ZakatCalculator({ currency, prices, standard }) {
  const [step, setStep] = useState(0);
  const [values, setValues] = useState({});
  const totals = useMemo(() => computeTotals(values, currency, prices, standard), [values, currency, prices, standard]);
  const setField = (id, v) => setValues((p) => ({ ...p, [id]: v }));

  const reset = () => { setValues({}); setStep(0); };
  const exportPdf = () => {
    toast.success('Opening print dialog — use “Save as PDF” to download.');
    setTimeout(() => window.print(), 300);
  };

  return (
    <TooltipProvider delayDuration={100}>
      <div className="rounded-2xl bg-white border border-emerald-900/10 overflow-hidden shadow-sm">
        {/* Header / Stepper */}
        <div className="px-5 md:px-7 py-5 border-b border-emerald-900/10 bg-gradient-to-r from-emerald-50/60 to-amber-50/30">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-900 text-amber-100 flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-[0.22em] text-amber-700 font-bold">Zakat Calculator</div>
                <div className="text-base font-semibold text-emerald-950">Enter your zakatable assets</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {STEP_LABELS.map((s, i) => (
                <div key={s} className="flex items-center gap-2">
                  <div className={`w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center ${
                    i <= step ? 'bg-emerald-900 text-amber-50' : 'bg-emerald-900/10 text-emerald-900/60'
                  }`}>{i + 1}</div>
                  <span className={`text-xs font-medium ${i === step ? 'text-emerald-950' : 'text-emerald-900/60'}`}>{s}</span>
                  {i < STEP_LABELS.length - 1 && <div className="w-6 h-px bg-emerald-900/15 mx-1" />}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-5 md:p-7">
          {step === 0 && (
            <div className="space-y-6 zc-fade-in">
              {ASSET_GROUPS.map((g) => {
                const Icon = Icons[g.icon] || Icons.Wallet;
                return (
                  <div key={g.key} className="rounded-xl border border-emerald-900/10 p-4 md:p-5">
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-lg bg-emerald-50 flex items-center justify-center shrink-0">
                        <Icon className="w-4 h-4 text-emerald-800" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between flex-wrap gap-1">
                          <div className="flex items-center gap-1.5">
                            <div className="font-semibold text-emerald-950">{g.title}</div>
                            {g.info && (
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <button type="button" className="text-emerald-800/60 hover:text-emerald-900" aria-label="jewellery guidance">
                                    <Info className="w-3.5 h-3.5" />
                                  </button>
                                </TooltipTrigger>
                                <TooltipContent side="top" className="max-w-xs text-xs bg-black text-white border-black leading-relaxed">
                                  {g.info}
                                </TooltipContent>
                              </Tooltip>
                            )}
                          </div>
                          <div className="text-xs font-semibold text-emerald-900">{formatMoney(totals.breakdown[g.key], currency)}</div>
                        </div>
                        <div className="text-xs text-emerald-900/60 mt-0.5">{g.desc}</div>
                        <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2.5">
                          {g.fields.map((f) => (
                            <label key={f.id} className="text-xs">
                              <span className="text-emerald-900/75">{f.label}</span>
                              <input
                                type="number"
                                min="0"
                                value={values[f.id] || ''}
                                onChange={(e) => setField(f.id, e.target.value)}
                                placeholder="0"
                                className="mt-1 w-full px-3 py-2 border border-emerald-900/15 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-700/30 bg-white text-sm"
                              />
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {step === 1 && (
            <div className="zc-fade-in space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-emerald-950">Liabilities</h3>
                <p className="text-sm text-emerald-900/60">Debts &amp; bills due within the next 12 months are deductible.</p>
              </div>
              <div className="rounded-xl border border-emerald-900/10 p-5 grid grid-cols-1 md:grid-cols-2 gap-3">
                {LIABILITY_FIELDS.map((f) => (
                  <label key={f.id} className="text-xs">
                    <span className="text-emerald-900/75">{f.label}</span>
                    <input
                      type="number"
                      min="0"
                      value={values[f.id] || ''}
                      onChange={(e) => setField(f.id, e.target.value)}
                      placeholder="0"
                      className="mt-1 w-full px-3 py-2 border border-emerald-900/15 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-700/30 bg-white text-sm"
                    />
                  </label>
                ))}
              </div>
              <div className="rounded-xl bg-emerald-50/70 p-4 text-xs text-emerald-900/80 border border-emerald-900/10">
                <strong>Note:</strong> Long-term debts (e.g. home mortgage) are not fully deductible. Only the
                portion due within 12 months is typically deducted. Consult a scholar for complex cases.
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="zc-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2 rounded-2xl bg-gradient-to-br from-emerald-900 to-emerald-800 text-white p-7">
                  <div className="text-[10px] uppercase tracking-[0.22em] text-amber-300 font-bold">Your Zakat Due</div>
                  <div className="mt-2 text-5xl md:text-6xl font-extrabold tracking-tight">{formatMoney(totals.zakatDue, currency)}</div>
                  <div className="mt-2 text-sm text-amber-100/80">2.5% of net zakatable wealth above the {standard === 'gold' ? 'Gold' : 'Silver'} Nisab</div>
                  <div className="mt-6 flex items-center gap-2 text-sm">
                    {totals.meetsNisab ? (
                      <><CheckCircle2 className="w-4 h-4 text-amber-300" /> Above Nisab — Zakat is obligatory</>
                    ) : (
                      <><CheckCircle2 className="w-4 h-4 text-emerald-300/60" /> Below Nisab — No Zakat due this year</>
                    )}
                  </div>
                </div>
                <div className="rounded-2xl bg-amber-50/70 border border-amber-200/60 p-6">
                  <div className="text-[10px] uppercase tracking-[0.22em] text-amber-800 font-bold">Summary</div>
                  <dl className="mt-3 text-sm space-y-2">
                    <div className="flex justify-between"><dt className="text-emerald-900/70">Total assets</dt><dd className="font-semibold text-emerald-950">{formatMoney(totals.totalAssets, currency)}</dd></div>
                    <div className="flex justify-between"><dt className="text-emerald-900/70">Liabilities</dt><dd className="font-semibold text-rose-700">− {formatMoney(totals.totalLiabilities, currency)}</dd></div>
                    <div className="flex justify-between border-t border-amber-300/40 pt-2"><dt className="text-emerald-900">Net wealth</dt><dd className="font-bold text-emerald-950">{formatMoney(totals.netWealth, currency)}</dd></div>
                    <div className="flex justify-between text-xs"><dt className="text-emerald-900/60">Nisab reference ({standard})</dt><dd className="text-emerald-900/80">{formatMoney(totals.nisabRef, currency)}</dd></div>
                  </dl>
                </div>
              </div>

              <div className="mt-5 rounded-xl border border-emerald-900/10 p-5">
                <div className="text-sm font-semibold text-emerald-950 mb-3">Asset Breakdown</div>
                <div className="space-y-2">
                  {ASSET_GROUPS.map((g) => {
                    const v = totals.breakdown[g.key];
                    const pct = totals.totalAssets > 0 ? (v / totals.totalAssets) * 100 : 0;
                    if (v <= 0) return null;
                    return (
                      <div key={g.key} className="flex items-center gap-3 text-xs">
                        <div className="w-32 text-emerald-900/75 shrink-0">{g.title}</div>
                        <div className="flex-1 h-2 bg-emerald-900/5 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-emerald-700 to-emerald-500" style={{ width: `${pct}%` }} />
                        </div>
                        <div className="w-24 text-right font-semibold text-emerald-950">{formatMoney(v, currency)}</div>
                      </div>
                    );
                  })}
                  {totals.totalAssets === 0 && <div className="text-xs text-emerald-900/50">No assets entered yet.</div>}
                </div>
              </div>
            </div>
          )}

          {/* Footer actions */}
          <div className="mt-7 pt-5 border-t border-emerald-900/10 flex flex-wrap items-center justify-between gap-3 no-print">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={reset} className="border-emerald-900/15">
                <RotateCcw className="w-3.5 h-3.5 mr-1.5" /> Reset
              </Button>
              {step === 2 && (
                <Button variant="outline" size="sm" onClick={exportPdf} className="border-emerald-900/15">
                  <Printer className="w-3.5 h-3.5 mr-1.5" /> Print / PDF
                </Button>
              )}
            </div>
            <div className="flex items-center gap-2">
              {step > 0 && (
                <Button variant="ghost" onClick={() => setStep(step - 1)} className="text-emerald-900">Back</Button>
              )}
              {step < 2 && (
                <Button onClick={() => setStep(step + 1)} className="bg-emerald-900 hover:bg-emerald-800 text-amber-50 rounded-full px-6">
                  {step === 1 ? 'Calculate Zakat' : 'Continue'}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
