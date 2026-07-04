import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HeroSection from '../components/HeroSection';
import NisabTracker from '../components/NisabTracker';
import ZakatCalculator from '../components/ZakatCalculator';
import ScholarlyRulings from '../components/ScholarlyRulings';
import FAQSection from '../components/FAQSection';
import MissionSection from '../components/MissionSection';
import InterviewSection from '../components/InterviewSection';
import { NISAB_PRICES } from '../mock/mockData';

export default function Home() {
  const [currency, setCurrency] = useState('INR');
  const [prices, setPrices] = useState({ ...NISAB_PRICES.INR });
  const [standard, setStandard] = useState('silver');

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />

        {/* Calculator Section */}
        <section id="calculator" className="max-w-7xl mx-auto px-5 lg:px-8 -mt-10 lg:-mt-12 relative z-10">
          <NisabTracker
            currency={currency}
            setCurrency={setCurrency}
            prices={prices}
            setPrices={setPrices}
            standard={standard}
            setStandard={setStandard}
          />
        </section>

        <section className="max-w-7xl mx-auto px-5 lg:px-8 py-14 lg:py-20">
          <ZakatCalculator currency={currency} prices={prices} standard={standard} />
        </section>

        <MissionSection />
        <ScholarlyRulings />
        <FAQSection />
        <InterviewSection />
      </main>
      <Footer />
    </div>
  );
}
