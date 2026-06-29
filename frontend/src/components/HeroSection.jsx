import { ArrowRight, Sparkles, ScrollText, Coins } from 'lucide-react';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* subtle pattern */}
      <div className="absolute inset-0 zc-arabic-pattern" aria-hidden />
      <div className="absolute inset-0 zc-pattern opacity-60" aria-hidden />

      <div className="relative max-w-7xl mx-auto px-5 lg:px-8 pt-16 pb-20 lg:pt-24 lg:pb-28">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-900/5 border border-emerald-900/10 text-[11px] font-semibold tracking-wider uppercase text-emerald-900">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            Bismillah · Calculate · Plan · Fulfill
          </div>
          <h1 className="mt-6 text-4xl sm:text-5xl lg:text-[64px] leading-[1.05] font-extrabold text-emerald-950">
            Calculate your <span className="italic font-arabic text-emerald-800">Zakat</span><br />
            with scholarly precision.
          </h1>
          <p className="mt-6 text-lg text-emerald-900/70 max-w-2xl leading-relaxed">
            Live gold &amp; silver Nisab, personal &amp; business assets across every major school — backed by
            Zamzam Capital&apos;s Sharia-compliant research. Free, private, browser-based.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Button asChild size="lg" className="bg-emerald-900 hover:bg-emerald-800 text-amber-50 rounded-full px-7 h-12 text-[15px] shadow-lg shadow-emerald-900/20">
              <a href="#calculator">Start Calculator <ArrowRight className="ml-1.5 w-4 h-4" /></a>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full h-12 px-7 border-emerald-900/20 text-emerald-900 hover:bg-emerald-50">
              <Link to="/faraid">Open Faraid <ArrowRight className="ml-1.5 w-4 h-4" /></Link>
            </Button>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 text-[13px] text-emerald-900/70">
            <span className="flex items-center gap-1.5"><Coins className="w-4 h-4 text-amber-600" /> Live Nisab tracking</span>
            <span className="flex items-center gap-1.5"><ScrollText className="w-4 h-4 text-amber-600" /> 4 Sunni schools</span>
            <span className="flex items-center gap-1.5"><Sparkles className="w-4 h-4 text-amber-600" /> 10+ currencies</span>
          </div>
        </div>

        {/* Floating Hadith Card */}
        <div className="absolute right-4 lg:right-12 top-24 hidden lg:block max-w-sm zc-float">
          <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-emerald-900/10 p-6 shadow-xl shadow-emerald-900/5">
            <div className="text-[10px] uppercase tracking-[0.2em] text-amber-700 font-semibold">Qur&apos;an 2:43</div>
            <div className="font-arabic text-2xl text-emerald-950 mt-3 leading-snug text-right" dir="rtl">
              وَأَقِيمُوا الصَّلَاةَ وَآتُوا الزَّكَاةَ
            </div>
            <p className="mt-4 text-sm italic text-emerald-900/70">“Establish prayer and give Zakat.”</p>
          </div>
        </div>
      </div>
    </section>
  );
}
