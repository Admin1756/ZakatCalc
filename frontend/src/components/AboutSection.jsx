import { Award, Leaf, ShieldCheck, GraduationCap } from 'lucide-react';

const FEATURES = [
  {
    icon: Award,
    title: 'SEBI Registered',
    body: '100% compliant with regulatory standards — allowing us to publish research on stocks to the public.',
  },
  {
    icon: Leaf,
    title: 'Ethical Investing',
    body: 'Committed to socially responsible investment practices that align with moral and ethical principles.',
  },
  {
    icon: ShieldCheck,
    title: 'Shariah Compliant',
    body: 'All recommendations screened for Shariah compliance — no interest-based businesses or non-halal (haram) sectors.',
  },
  {
    icon: GraduationCap,
    title: 'Investor Education',
    body: 'Empowering investors with knowledge, research tools and educational resources for informed decisions.',
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="scroll-mt-20">
      <div className="max-w-7xl mx-auto px-5 lg:px-8 py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-16 items-start">
          <div>
            <div className="text-[10px] uppercase tracking-[0.22em] text-amber-700 font-bold">Who We Are</div>
            <h2 className="mt-3 text-3xl md:text-4xl lg:text-5xl font-bold text-emerald-950 leading-tight">
              About Zamzam Capital
            </h2>
            <p className="mt-6 text-base lg:text-lg text-emerald-900/75 leading-relaxed">
              Zamzam Capital is a SEBI-registered Research Analyst firm that specializes in
              Shariah-compliant stock recommendations and portfolios in the Indian stock market.
            </p>
            <p className="mt-4 text-base lg:text-lg text-emerald-900/75 leading-relaxed">
              Our mission is to help investors make informed financial decisions through research,
              education, and ethical investment principles.
            </p>

            <div className="mt-8 inline-flex items-center gap-4 rounded-2xl bg-gradient-to-br from-emerald-50/80 to-amber-50/40 border border-emerald-900/10 px-5 py-4">
              <div className="w-11 h-11 rounded-xl bg-emerald-900 text-amber-200 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-[0.18em] text-amber-700 font-bold">SEBI Registered</div>
                <div className="text-sm font-semibold text-emerald-950">Research Analyst</div>
                <div className="text-[11px] text-emerald-900/70 mt-0.5">License No: INH000016199 · BSE Enlistment No: 6158</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {FEATURES.map((f, i) => (
              <div key={i} className="group bg-white border border-emerald-900/10 rounded-2xl p-6 hover:border-emerald-900/25 hover:shadow-md hover:shadow-emerald-900/5 transition-all">
                <div className="w-11 h-11 rounded-xl bg-emerald-50 group-hover:bg-emerald-100 flex items-center justify-center transition-colors">
                  <f.icon className="w-5 h-5 text-emerald-800" />
                </div>
                <h3 className="mt-4 text-lg font-bold text-emerald-950">{f.title}</h3>
                <p className="mt-2 text-sm text-emerald-900/70 leading-relaxed">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
