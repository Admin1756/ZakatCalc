import { STATS } from '../mock/mockData';

export default function MissionSection() {
  return (
    <section className="bg-gradient-to-br from-emerald-50/60 to-amber-50/40 border-y border-emerald-900/10">
      <div className="max-w-7xl mx-auto px-5 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div>
            <div className="text-[10px] uppercase tracking-[0.22em] text-amber-700 font-bold">Our Mission</div>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-emerald-950 leading-tight">
              Helping Indian Muslims plan their wealth ethically — across the lifecycle.
            </h2>
            <p className="mt-5 text-emerald-900/75 text-base leading-relaxed">
              Built by Zamzam Capital, India&apos;s SEBI-registered Shariah-compliant research analyst. One private,
              scholar-verified toolkit for <strong>Zakat</strong>, <strong>Faraid</strong> and <strong>Wasiyyah</strong>.
              No accounts. No tracking. Free forever.
            </p>
            <div className="mt-6 inline-flex items-center gap-2 px-3 py-2 rounded-full bg-white border border-emerald-900/10 text-xs text-emerald-900">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" /> Endorsed by the Shariah Board of Infinity Consultants
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {STATS.map((s, i) => (
              <div key={i} className="bg-white border border-emerald-900/10 rounded-2xl p-6">
                <div className="text-3xl md:text-4xl font-extrabold text-emerald-950">{s.value}</div>
                <div className="mt-1 text-xs text-emerald-900/60 uppercase tracking-wider">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
