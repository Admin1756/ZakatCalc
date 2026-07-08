import { Phone, Mail, MapPin, IdCard, BadgeCheck } from 'lucide-react';

const LOGO_URL = 'https://customer-assets.emergentagent.com/job_zakat-essentials/artifacts/bu79azlv_images%20%288%29.png';

export default function Footer() {
  return (
    <footer>
      {/* Disclaimer strip (light) */}
      <div className="max-w-7xl mx-auto px-5 lg:px-8 pt-14 pb-10">
        <p className="text-xs italic text-emerald-900/70 leading-relaxed border-t border-emerald-900/10 pt-6">
          <strong className="not-italic text-emerald-950">Disclaimer:</strong> This Zakat calculator is provided by Zamzam
          Capital for educational purposes only and should not be construed as legal, financial or religious advice. While
          every effort has been made to ensure the accuracy of the calculations and the underlying Shariah methodology,
          users are strongly encouraged to consult a qualified scholar for guidance on their personal circumstances. Prices
          and exchange rates shown are indicative reference values &mdash; always verify with your local market before
          finalising your Zakat.
        </p>
      </div>

      {/* Dark corporate footer */}
      <div className="relative overflow-hidden" style={{ background: 'radial-gradient(1200px 500px at 20% 0%, #0d4d3a1a 0%, transparent 60%), #030a10' }}>
        <div className="absolute inset-0 opacity-30 pointer-events-none"
             style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(16,185,129,0.10) 1px, transparent 0)', backgroundSize: '28px 28px' }} />

        <div className="relative max-w-7xl mx-auto px-5 lg:px-8 py-14 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">
            {/* Brand column */}
            <div>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-white/95 flex items-center justify-center p-2 shadow-lg">
                  <img src={LOGO_URL} alt="Zamzam Capital" className="w-full h-auto" />
                </div>
                <div>
                  <div className="text-white text-2xl font-bold tracking-tight leading-none">Zamzam Capital</div>
                  <div className="mt-1.5 text-[11px] uppercase tracking-[0.28em] text-emerald-300/90 font-semibold">India</div>
                </div>
              </div>
              <p className="mt-6 text-sm text-slate-300/85 leading-relaxed max-w-sm">
                SEBI-registered Research Analyst firm offering Shariah-compliant research, education and ethical
                investment guidance for the Indian markets.
              </p>
              <div className="mt-6 inline-flex items-center gap-2 px-3.5 py-2 rounded-full border border-emerald-500/40 bg-emerald-500/5">
                <BadgeCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-[11.5px] uppercase tracking-[0.14em] text-emerald-200 font-semibold">
                  SEBI RA <span className="text-emerald-400/60">•</span> INH000016199
                </span>
              </div>
            </div>

            {/* SEBI Office column */}
            <div>
              <div className="flex items-center gap-2 text-emerald-300/90">
                <IdCard className="w-4 h-4" />
                <div className="text-[13px] uppercase tracking-[0.18em] text-white font-bold">SEBI Office Address</div>
              </div>
              <div className="mt-5 flex items-start gap-3 text-slate-300/90">
                <MapPin className="w-4 h-4 mt-0.5 text-emerald-400 shrink-0" />
                <div className="text-sm leading-relaxed">
                  SEBI Bhavan BKC, Plot No. C7,<br />
                  G Block, Bandra Kurla Complex,<br />
                  Bandra (East), Mumbai &ndash; 400051
                </div>
              </div>
              <div className="mt-4 flex items-center gap-3 text-slate-300/90">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href="tel:+912226449000" className="text-sm hover:text-emerald-300 transition-colors">
                  +91 22 2644 9000
                </a>
              </div>
            </div>

            {/* Registered Address column */}
            <div>
              <div className="flex items-center gap-2 text-emerald-300/90">
                <IdCard className="w-4 h-4" />
                <div className="text-[13px] uppercase tracking-[0.18em] text-white font-bold">Registered Address</div>
              </div>
              <div className="mt-5 flex items-start gap-3 text-slate-300/90">
                <MapPin className="w-4 h-4 mt-0.5 text-emerald-400 shrink-0" />
                <div className="text-sm leading-relaxed">
                  Zamzam Capital,<br />
                  Hyderabad, Telangana,<br />
                  India
                </div>
              </div>
              <div className="mt-4 flex items-center gap-3 text-slate-300/90">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href="mailto:contact@zamzamcapital.in" className="text-sm hover:text-emerald-300 transition-colors break-all">
                  contact@zamzamcapital.in
                </a>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-3 text-[11.5px] text-slate-400/70">
            <div>© {new Date().getFullYear()} Zamzam Capital. All rights reserved.</div>
            <div className="italic">Educational tool &mdash; not investment advice.</div>
          </div>
        </div>
      </div>
    </footer>
  );
}
