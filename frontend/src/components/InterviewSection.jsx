import { useState } from 'react';
import { Play, ExternalLink, Youtube } from 'lucide-react';
import { YT_VIDEO_ID, YT_VIDEO_URL } from '../mock/mockData';

const QUESTIONS = [
  'Who has to give Zakat?',
  'How much Zakat is to be given?',
  'Who can receive Zakat?',
  'When to give Zakat?',
  'How to give Zakat?',
];

export default function InterviewSection() {
  const [playing, setPlaying] = useState(false);
  return (
    <section className="max-w-7xl mx-auto px-5 lg:px-8 py-16 lg:py-20">
      <div className="rounded-3xl overflow-hidden bg-gradient-to-br from-emerald-950 via-emerald-900 to-emerald-800 text-white">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="p-8 lg:p-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-300/15 text-[10px] font-bold tracking-[0.22em] uppercase text-amber-200">
              <Youtube className="w-3.5 h-3.5" /> Founder Interview
            </div>
            <h2 className="mt-5 text-3xl md:text-4xl font-bold leading-tight">
              Learn more about Zakat — with our Founder, Mr. Saif Ahmed.
            </h2>
            <p className="mt-4 text-emerald-100/80 text-base leading-relaxed">
              Watch this detailed interview to specifically get answers to the following questions:
            </p>
            <ul className="mt-5 space-y-2.5">
              {QUESTIONS.map((q, i) => (
                <li key={i} className="flex items-start gap-3 text-[15px]">
                  <span className="mt-0.5 shrink-0 w-6 h-6 rounded-full bg-amber-300/20 text-amber-200 text-xs font-bold flex items-center justify-center">{i + 1}</span>
                  <span className="text-emerald-50">{q}</span>
                </li>
              ))}
            </ul>
            <a
              href={YT_VIDEO_URL}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex items-center gap-2 text-amber-300 hover:text-amber-200 font-semibold text-sm"
            >
              Open on YouTube <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          <div className="relative bg-black/60 min-h-[280px] lg:min-h-[420px] flex items-center justify-center p-4 lg:p-6">
            {playing ? (
              <iframe
                title="Zakat Interview — Saif Ahmed"
                src={`https://www.youtube.com/embed/${YT_VIDEO_ID}?autoplay=1&rel=0`}
                className="absolute inset-4 lg:inset-6 w-[calc(100%-2rem)] lg:w-[calc(100%-3rem)] h-[calc(100%-2rem)] lg:h-[calc(100%-3rem)] rounded-xl"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <button
                type="button"
                onClick={() => setPlaying(true)}
                className="relative w-full h-full max-h-[380px] rounded-xl overflow-hidden group shadow-2xl"
                aria-label="Play interview"
              >
                <img
                  src={`https://i.ytimg.com/vi/${YT_VIDEO_ID}/hqdefault.jpg`}
                  alt="Interview thumbnail"
                  className="w-full h-full object-contain bg-black"
                  onError={(e) => { e.currentTarget.src = `https://i.ytimg.com/vi/${YT_VIDEO_ID}/mqdefault.jpg`; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/50 via-transparent to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="w-20 h-20 rounded-full bg-amber-300 text-emerald-950 flex items-center justify-center shadow-2xl transition-transform group-hover:scale-105">
                    <Play className="w-8 h-8 fill-current ml-1" />
                  </span>
                </div>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
