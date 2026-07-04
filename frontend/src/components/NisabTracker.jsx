import { useMemo, useState } from 'react';
import { Coins, TrendingUp, RefreshCw, Info } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Button } from './ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { CURRENCIES, NISAB_PRICES, GOLD_NISAB_GRAMS, SILVER_NISAB_GRAMS } from '../mock/mockData';
import { formatMoney } from '../lib/calc';

export default function NisabTracker({ currency, setCurrency, prices, setPrices, standard, setStandard }) {
  const [editing, setEditing] = useState(false);
  const p = prices || NISAB_PRICES[currency];

  const { goldNisab, silverNisab } = useMemo(() => ({
    goldNisab: p.gold24 * GOLD_NISAB_GRAMS,
    silverNisab: p.silver999 * SILVER_NISAB_GRAMS,
  }), [p]);

  const resetPrices = () => setPrices({ ...NISAB_PRICES[currency] });

  return (
    <TooltipProvider delayDuration={100}>
      <div className="relative bg-gradient-to-br from-emerald-50/80 via-white to-amber-50/40 border border-emerald-900/10 rounded-2xl p-5 md:p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-amber-700 font-bold">Live Nisab Tracker</div>
            <div className="mt-1.5 text-xl font-bold text-emerald-950">Today&apos;s Threshold</div>
            <div className="text-xs text-emerald-900/60 mt-0.5">
              Reference prices (Mumbai EOD, indicative). Click “Edit prices” to enter your own.
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Select value={currency} onValueChange={(v) => { setCurrency(v); setPrices({ ...NISAB_PRICES[v] }); }}>
              <SelectTrigger className="w-[110px] h-9 bg-white border-emerald-900/15"><SelectValue /></SelectTrigger>
              <SelectContent>
                {CURRENCIES.map((c) => (
                  <SelectItem key={c.code} value={c.code}>{c.code} · {c.symbol}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm" className="h-9 border-emerald-900/15" onClick={() => setEditing(!editing)}>
              {editing ? 'Done' : 'Edit prices'}
            </Button>
          </div>
        </div>

        {/* Nisab standard chooser — Gold or Silver */}
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-xl bg-white border border-emerald-900/10 p-3">
          <div className="flex items-center gap-2 text-sm text-emerald-900">
            <span className="font-semibold">Nisab standard for this calculation</span>
            <Tooltip>
              <TooltipTrigger asChild>
                <button type="button" className="text-emerald-800/70 hover:text-emerald-900" aria-label="info">
                  <Info className="w-3.5 h-3.5" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="top" className="max-w-xs text-xs bg-emerald-950 text-white border-emerald-950">
                Silver Nisab (595g / 52.5 tolas) is the lower threshold and is preferred by most contemporary scholars — ensuring more Muslims are eligible to give.
                Gold Nisab (85g / 7.5 tolas) may be used if silver is not owned.
              </TooltipContent>
            </Tooltip>
          </div>
          <div className="inline-flex rounded-full bg-emerald-900/5 p-1">
            {[
              { key: 'silver', label: `Silver (595g · 52.5 tolas)`, val: silverNisab },
              { key: 'gold', label: `Gold (85g · 7.5 tolas)`, val: goldNisab },
            ].map((o) => (
              <button
                key={o.key}
                onClick={() => setStandard(o.key)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                  standard === o.key ? 'bg-emerald-900 text-amber-50 shadow-sm' : 'text-emerald-900/70 hover:text-emerald-900'
                }`}
              >
                {o.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Gold */}
          <div className={`bg-white rounded-xl border p-5 transition-colors ${standard === 'gold' ? 'border-amber-400 ring-2 ring-amber-200/60' : 'border-amber-200/60'}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-lg bg-amber-100 flex items-center justify-center">
                  <Coins className="w-4 h-4 text-amber-700" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-emerald-950">Gold Nisab</div>
                  <div className="text-[11px] text-emerald-900/60">{GOLD_NISAB_GRAMS}g · 7.5 tolas · 24K</div>
                </div>
              </div>
              {editing ? (
                <input
                  type="number"
                  value={p.gold24}
                  onChange={(e) => setPrices({ ...p, gold24: parseFloat(e.target.value) || 0 })}
                  className="w-24 text-right text-sm border border-amber-200 rounded-md px-2 py-1"
                />
              ) : (
                <div className="text-right">
                  <div className="text-[11px] text-emerald-900/60">per gram</div>
                  <div className="text-sm font-semibold text-emerald-900">{formatMoney(p.gold24, currency)}</div>
                </div>
              )}
            </div>
            <div className="mt-4 pt-4 border-t border-amber-100">
              <div className="text-[11px] text-emerald-900/60 uppercase tracking-wider">Threshold</div>
              <div className="text-2xl font-bold text-amber-700">{formatMoney(goldNisab, currency)}</div>
            </div>
          </div>

          {/* Silver */}
          <div className={`bg-white rounded-xl border p-5 transition-colors ${standard === 'silver' ? 'border-emerald-600 ring-2 ring-emerald-200/60' : 'border-slate-200'}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center">
                  <Coins className="w-4 h-4 text-slate-500" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-emerald-950">Silver Nisab</div>
                  <div className="text-[11px] text-emerald-900/60">{SILVER_NISAB_GRAMS}g · 52.5 tolas · 999</div>
                </div>
              </div>
              {editing ? (
                <input
                  type="number"
                  step="0.01"
                  value={p.silver999}
                  onChange={(e) => setPrices({ ...p, silver999: parseFloat(e.target.value) || 0 })}
                  className="w-24 text-right text-sm border border-slate-200 rounded-md px-2 py-1"
                />
              ) : (
                <div className="text-right">
                  <div className="text-[11px] text-emerald-900/60">per gram</div>
                  <div className="text-sm font-semibold text-emerald-900">{formatMoney(p.silver999, currency)}</div>
                </div>
              )}
            </div>
            <div className="mt-4 pt-4 border-t border-slate-100">
              <div className="text-[11px] text-emerald-900/60 uppercase tracking-wider">Threshold</div>
              <div className="text-2xl font-bold text-slate-600">{formatMoney(silverNisab, currency)}</div>
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between text-xs text-emerald-900/65">
          <div className="flex items-center gap-1.5"><TrendingUp className="w-3.5 h-3.5" /> Zakat rate <span className="font-bold text-emerald-900">2.5%</span> on net wealth above the chosen Nisab</div>
          {editing && (
            <button onClick={resetPrices} className="inline-flex items-center gap-1 hover:text-emerald-900">
              <RefreshCw className="w-3 h-3" /> reset
            </button>
          )}
        </div>
      </div>
    </TooltipProvider>
  );
}
