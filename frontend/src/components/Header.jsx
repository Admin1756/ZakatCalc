import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from './ui/button';

const LOGO_URL = 'https://customer-assets.emergentagent.com/job_zakat-essentials/artifacts/bu79azlv_images%20%288%29.png';

export default function Header() {
  const [open, setOpen] = useState(false);
  const loc = useLocation();
  const nav = [
    { label: 'Zakat Calculator', href: '/' },
    { label: 'Faraid', href: '/faraid' },
    { label: 'Wasiyyah', href: '/wasiyyah' },
    { label: 'About', href: '/about' },
  ];
  return (
    <header className="sticky top-0 z-40 bg-white/85 backdrop-blur-md border-b border-emerald-900/10">
      <div className="max-w-7xl mx-auto px-5 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="h-10 w-auto flex items-center bg-white rounded-md px-2 py-1 shadow-sm border border-emerald-900/5">
            <img src={LOGO_URL} alt="Zamzam Capital" className="h-7 w-auto" />
          </div>
          <div className="leading-tight hidden sm:block border-l border-emerald-900/10 pl-3 ml-1">
            <div className="text-[10px] uppercase tracking-[0.18em] text-amber-700 font-semibold">Zakat Engine</div>
            <div className="text-[11px] text-emerald-900/70">by Zamzam Capital</div>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {nav.map((n) => (
            <Link
              key={n.href}
              to={n.href}
              className={`px-3.5 py-2 rounded-md text-sm font-medium transition-colors ${
                loc.pathname === n.href ? 'text-emerald-900 bg-emerald-50' : 'text-emerald-900/70 hover:text-emerald-900 hover:bg-emerald-50/60'
              }`}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button asChild className="bg-emerald-900 hover:bg-emerald-800 text-amber-50 rounded-full px-5">
            <a href="#calculator">Start Calculator</a>
          </Button>
        </div>

        <button className="md:hidden p-2" onClick={() => setOpen(!open)} aria-label="menu">
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-emerald-900/10 bg-white">
          <div className="px-5 py-3 flex flex-col gap-1">
            {nav.map((n) => (
              <Link
                key={n.href}
                to={n.href}
                onClick={() => setOpen(false)}
                className={`px-3 py-2.5 rounded-md text-sm ${
                  loc.pathname === n.href ? 'bg-emerald-50 text-emerald-900 font-semibold' : 'text-emerald-900/80'
                }`}
              >
                {n.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
