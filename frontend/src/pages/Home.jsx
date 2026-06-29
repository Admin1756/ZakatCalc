import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HeroSection from '../components/HeroSection';
import NisabTracker from '../components/NisabTracker';
import CategorySelector from '../components/CategorySelector';
import ZakatCalculator from '../components/ZakatCalculator';
import ScholarlyRulings from '../components/ScholarlyRulings';
import FAQSection from '../components/FAQSection';
import MissionSection from '../components/MissionSection';
import { NISAB_PRICES, HADITHS } from '../mock/mockData';
import { ArrowRight, Scale, ScrollText } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  const [currency, setCurrency] = useState('INR');
  const [prices, setPrices] = useState({ ...NISAB_PRICES.INR });
  const [category, setCategory] = useState(null);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />

        {/* Calculator Section */}
        <section id="calculator" className="max-w-7xl mx-auto px-5 lg:px-8 -mt-10 lg:-mt-12 relative z-10">
          <NisabTracker currency={currency} setCurrency={setCurrency} prices={prices} setPrices={setPrices} />
        </section>

        <section className="max-w-7xl mx-auto px-5 lg:px-8 py-14 lg:py-20 space-y-10">
          <CategorySelector selected={category} onSelect={setCategory} />
          <ZakatCalculator category={category} currency={currency} />
        </section>

        {/* Hadith Strip */}
        <section className="bg-emerald-950 text-emerald-50 py-14">
          <div className="max-w-5xl mx-auto px-5 lg:px-8 text-center">
            <div className="text-[10px] uppercase tracking-[0.25em] text-amber-300 font-bold">{HADITHS[0].source}</div>
            <div dir="rtl" className="font-arabic text-3xl md:text-5xl mt-4 leading-snug text-amber-100">
              {HADITHS[0].arabic}
            </div>
            <p className="mt-5 italic text-emerald-100/80 text-lg">{HADITHS[0].translation}</p>
          </div>
        </section>

        {/* Other tools */}
        <section className="max-w-7xl mx-auto px-5 lg:px-8 py-20">
          <div className="text-center mb-12">
            <div className="text-[10px] uppercase tracking-[0.22em] text-amber-700 font-bold">More tools</div>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-emerald-950">Plan your complete Islamic estate.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Link to="/faraid" className="group rounded-2xl bg-white border border-emerald-900/10 p-7 hover:border-emerald-900/30 hover:shadow-lg hover:shadow-emerald-900/5 transition-all">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-emerald-50 flex items-center justify-center"><Scale className="w-5 h-5 text-emerald-800" /></div>
                <div className="text-[10px] uppercase tracking-[0.22em] text-amber-700 font-bold">Faraid Engine</div>
              </div>
              <h3 className="mt-4 text-2xl font-bold text-emerald-950">Islamic Inheritance, calculated deterministically.</h3>
              <p className="mt-2.5 text-sm text-emerald-900/70 leading-relaxed">Quranic shares across every major school, with plain-language explanations. Awl · Radd · Hajb covered.</p>
              <span className="mt-5 inline-flex items-center text-sm font-semibold text-emerald-800 group-hover:text-emerald-950">Open Faraid Calculator <ArrowRight className="ml-1.5 w-4 h-4" /></span>
            </Link>
            <Link to="/wasiyyah" className="group rounded-2xl bg-white border border-emerald-900/10 p-7 hover:border-emerald-900/30 hover:shadow-lg hover:shadow-emerald-900/5 transition-all">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-amber-50 flex items-center justify-center"><ScrollText className="w-5 h-5 text-amber-700" /></div>
                <div className="text-[10px] uppercase tracking-[0.22em] text-amber-700 font-bold">Wasiyyah Module</div>
              </div>
              <h3 className="mt-4 text-2xl font-bold text-emerald-950">Write a Sharia-aligned Islamic will.</h3>
              <p className="mt-2.5 text-sm text-emerald-900/70 leading-relaxed">Bequests within the 1/3 limit, guardianship for minors, a confidential family letter — print as a formal Wasiyyah PDF.</p>
              <span className="mt-5 inline-flex items-center text-sm font-semibold text-emerald-800 group-hover:text-emerald-950">Open Will Writer <ArrowRight className="ml-1.5 w-4 h-4" /></span>
            </Link>
          </div>
        </section>

        <MissionSection />
        <ScholarlyRulings />
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
}
