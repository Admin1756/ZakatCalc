import Header from '../components/Header';
import Footer from '../components/Footer';
import { Shield, Award, Users, BookOpen } from 'lucide-react';

const PILLARS = [
  { icon: Shield, title: 'Private by design', body: 'Your inputs never leave your browser. No accounts, no tracking, no telemetry.' },
  { icon: Award, title: 'SEBI Registered', body: 'Zamzam Capital is SEBI-registered Research Analyst (INH000016199) for Sharia-compliant investing in India.' },
  { icon: BookOpen, title: 'Scholar Verified', body: 'Methodology endorsed by leading Indian seminaries — Deoband, Mazahir Uloom, Nadwatul Ulama, Imarat Sharia.' },
  { icon: Users, title: 'Free forever', body: 'Made for the ummah — no paywalls, no upsells. Use it, share it, print it for your masjid.' },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="max-w-5xl mx-auto px-5 lg:px-8 py-16">
          <div className="text-[10px] uppercase tracking-[0.22em] text-amber-700 font-bold">About</div>
          <h1 className="mt-3 text-4xl md:text-5xl font-bold text-emerald-950 leading-tight">A free, scholar-verified Islamic estate toolkit by Zamzam Capital.</h1>
          <p className="mt-6 text-lg text-emerald-900/75 max-w-3xl leading-relaxed">
            Zamzam Capital is India&apos;s pioneering SEBI-registered Sharia-compliant research analyst. We built this Zakat,
            Faraid &amp; Wasiyyah toolkit so every Muslim — employee, business owner, student, retiree — can fulfill the
            third pillar of Islam with clarity and confidence.
          </p>
        </section>

        <section className="bg-gradient-to-br from-emerald-50/60 to-amber-50/40 border-y border-emerald-900/10">
          <div className="max-w-6xl mx-auto px-5 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-2 gap-5">
            {PILLARS.map((p, i) => (
              <div key={i} className="bg-white border border-emerald-900/10 rounded-2xl p-7">
                <div className="w-11 h-11 rounded-xl bg-emerald-900 text-amber-200 flex items-center justify-center">
                  <p.icon className="w-5 h-5" />
                </div>
                <h3 className="mt-4 text-xl font-bold text-emerald-950">{p.title}</h3>
                <p className="mt-2 text-sm text-emerald-900/75 leading-relaxed">{p.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="max-w-5xl mx-auto px-5 lg:px-8 py-20">
          <div className="text-[10px] uppercase tracking-[0.22em] text-amber-700 font-bold">Methodology</div>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold text-emerald-950">Anchored in the methodology of Mufti Taqi Usmani (DB).</h2>
          <p className="mt-5 text-emerald-900/75 leading-relaxed">
            Our Sharia screening framework follows the criteria developed by one of the foremost contemporary Islamic
            scholars, formally endorsed by Darul Uloom Deoband, Mazahir Uloom (Saharanpur), Darul Uloom Nadwatul Ulama
            (Lucknow) and Imarat Sharia (Patna). The same scholarly rigor underpins this Zakat toolkit.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 px-3 py-2 rounded-full bg-emerald-900 text-amber-100 text-xs">
            All activities certified by the Sharia Board of Infinity Consultants.
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
