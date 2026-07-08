import { Sparkles } from 'lucide-react';

export default function HighlightBanner() {
  return (
    <section className="max-w-7xl mx-auto px-5 lg:px-8 pb-10">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-950 text-white p-8 md:p-12">
        <div className="absolute inset-0 opacity-15 zc-pattern" aria-hidden />
        <div className="relative flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="w-14 h-14 rounded-2xl bg-amber-300/15 flex items-center justify-center shrink-0">
            <Sparkles className="w-6 h-6 text-amber-300" />
          </div>
          <div className="flex-1">
            <p className="text-lg md:text-xl lg:text-2xl font-bold leading-snug text-white">
              Zakat purifies wealth, strengthens the ummah, and secures Allah’s blessing on every rupee you earn. Calculate it right — give it on time.
            </p>
            <p className="mt-3 text-sm md:text-base text-amber-100/85 italic">
              Placeholder line — replace with the exact copy you’d like highlighted here.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
