import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HeroSection from '../components/HeroSection';
import NisabTracker from '../components/NisabTracker';
import ZakatCalculator from '../components/ZakatCalculator';
import FAQSection from '../components/FAQSection';
import InterviewSection from '../components/InterviewSection';
import HighlightBanner from '../components/HighlightBanner';
import AboutSection from '../components/AboutSection';
import ConnectSection from '../components/ConnectSection';
import useLivePrices from '../hooks/useLivePrices';
import { NISAB_PRICES } from '../mock/mockData';

export default function Home() {
  const [currency, setCurrency] = useState('INR');
  const [standard, setStandard] = useState('silver');
  const live = useLivePrices();

  const [prices, setPrices] = useState({ ...NISAB_PRICES.INR });
  const [manual, setManual] = useState(false);

  useEffect(() => {
    if (manual) return;
    const src = live.pricesByCurrency && live.pricesByCurrency[currency];
    if (src) setPrices({ ...src });
    else setPrices({ ...(NISAB_PRICES[currency] || NISAB_PRICES.INR) });
  }, [currency, live.pricesByCurrency, manual]);

  const onEditPrices = (next) => { setManual(true); setPrices(next); };
  const onCurrencyChange = (c) => { setManual(false); setCurrency(c); };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />

        <section id="calculator" className="max-w-7xl mx-auto px-5 lg:px-8 -mt-10 lg:-mt-12 relative z-10">
          <NisabTracker
            currency={currency}
            setCurrency={onCurrencyChange}
            prices={prices}
            setPrices={onEditPrices}
            standard={standard}
            setStandard={setStandard}
            live={live}
            manual={manual}
            resetManual={() => setManual(false)}
          />
        </section>

        <section className="max-w-7xl mx-auto px-5 lg:px-8 py-14 lg:py-20">
          <ZakatCalculator currency={currency} prices={prices} standard={standard} />
        </section>

        <FAQSection />
        <InterviewSection />
        <HighlightBanner />
        <AboutSection />
        <ConnectSection />
      </main>
      <Footer />
    </div>
  );
}
