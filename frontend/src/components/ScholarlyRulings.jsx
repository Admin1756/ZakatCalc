import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/tabs';
import { SCHOLARLY_RULINGS } from '../mock/mockData';
import { BookOpen } from 'lucide-react';

export default function ScholarlyRulings() {
  const [school, setSchool] = useState('Hanafi');
  const schools = Object.keys(SCHOLARLY_RULINGS);

  return (
    <section id="rulings" className="max-w-7xl mx-auto px-5 lg:px-8 py-20">
      <div className="flex items-end justify-between flex-wrap gap-3 mb-8">
        <div>
          <div className="text-[10px] uppercase tracking-[0.22em] text-amber-700 font-bold flex items-center gap-2">
            <BookOpen className="w-3.5 h-3.5" /> Scholarly Rulings
          </div>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold text-emerald-950">Across the four Sunni schools.</h2>
          <p className="text-sm text-emerald-900/70 mt-2 max-w-2xl">
            Curated reference points based on classical &amp; contemporary fatawa. Always consult your local scholar for personal rulings.
          </p>
        </div>
      </div>

      <Tabs value={school} onValueChange={setSchool}>
        <TabsList className="bg-emerald-50/60 border border-emerald-900/10 p-1 h-auto flex-wrap">
          {schools.map((s) => (
            <TabsTrigger key={s} value={s} className="data-[state=active]:bg-emerald-900 data-[state=active]:text-amber-50 text-sm px-4 py-2">
              {s}
            </TabsTrigger>
          ))}
        </TabsList>
        {schools.map((s) => (
          <TabsContent key={s} value={s} className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {SCHOLARLY_RULINGS[s].map((r, i) => (
                <div key={i} className="bg-white border border-emerald-900/10 rounded-xl p-5 hover:border-emerald-900/25 transition-colors">
                  <div className="text-[10px] uppercase tracking-[0.18em] text-amber-700 font-bold">{s}</div>
                  <div className="mt-1.5 text-base font-semibold text-emerald-950">{r.topic}</div>
                  <p className="mt-2 text-sm text-emerald-900/75 leading-relaxed">{r.text}</p>
                </div>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
}
