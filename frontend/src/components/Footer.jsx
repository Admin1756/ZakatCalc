import { Calculator, Mail, MapPin, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="mt-24 bg-emerald-950 text-emerald-100/90">
      <div className="max-w-7xl mx-auto px-5 lg:px-8 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-lg bg-amber-300/15 flex items-center justify-center">
              <Calculator className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <div className="text-base font-bold text-white">Zamzam Capital</div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-amber-300/90 font-semibold">Zakat Engine</div>
            </div>
          </div>
          <p className="mt-5 text-sm leading-relaxed text-emerald-100/70 max-w-md">
            A free, scholar-verified Zakat, Faraid &amp; Wasiyyah toolkit — built by Zamzam Capital,
            India&apos;s SEBI-registered Sharia-compliant research analyst (INH000016199).
          </p>
          <div className="mt-5 flex items-center gap-2 text-xs text-emerald-100/60">
            <Shield className="w-3.5 h-3.5 text-amber-300" />
            Private by design — your inputs never leave your browser.
          </div>
        </div>

        <div>
          <div className="text-xs uppercase tracking-wider text-amber-300/80 font-semibold mb-4">Tools</div>
          <ul className="space-y-2.5 text-sm">
            <li><Link to="/" className="hover:text-amber-200">Zakat Calculator</Link></li>
            <li><Link to="/faraid" className="hover:text-amber-200">Faraid (Inheritance)</Link></li>
            <li><Link to="/wasiyyah" className="hover:text-amber-200">Wasiyyah (Will Writer)</Link></li>
            <li><Link to="/about" className="hover:text-amber-200">About</Link></li>
          </ul>
        </div>

        <div>
          <div className="text-xs uppercase tracking-wider text-amber-300/80 font-semibold mb-4">Contact</div>
          <ul className="space-y-2.5 text-sm text-emerald-100/80">
            <li className="flex items-start gap-2"><Mail className="w-4 h-4 mt-0.5 text-amber-300/80" /> hello@zamzam-capital.com</li>
            <li className="flex items-start gap-2"><MapPin className="w-4 h-4 mt-0.5 text-amber-300/80" /> Bangalore, India</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-emerald-100/10">
        <div className="max-w-7xl mx-auto px-5 lg:px-8 py-5 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-emerald-100/50">
          <div>© {new Date().getFullYear()} Zamzam Capital LLP. Educational tool only — consult your local scholar for personal rulings.</div>
          <div className="font-arabic text-amber-200/80 text-base">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</div>
        </div>
      </div>
    </footer>
  );
}
