import { MessageCircle, Send, Instagram, Youtube, ArrowUpRight } from 'lucide-react';

const CHANNELS = [
  {
    icon: MessageCircle,
    label: 'WhatsApp',
    tag: 'Chat with us directly',
    href: 'https://api.whatsapp.com/send/?phone=8694010200&text&type=phone_number&app_absent=0',
    accent: 'from-emerald-600 to-emerald-500',
  },
  {
    icon: Send,
    label: 'Telegram',
    tag: 'Join our channel',
    href: 'https://t.me/zamzamcapital',
    accent: 'from-sky-600 to-sky-500',
  },
  {
    icon: Instagram,
    label: 'Instagram',
    tag: 'Follow our updates',
    href: 'https://www.instagram.com/zamzamcapital',
    accent: 'from-pink-600 to-fuchsia-500',
  },
  {
    icon: Youtube,
    label: 'YouTube',
    tag: 'Grow your knowledge',
    href: 'https://www.youtube.com/@ZamzamCapital',
    accent: 'from-red-600 to-rose-500',
  },
];

export default function ConnectSection() {
  return (
    <section id="connect" className="scroll-mt-20 bg-gradient-to-br from-emerald-50/60 to-amber-50/40 border-y border-emerald-900/10">
      <div className="max-w-7xl mx-auto px-5 lg:px-8 py-20 lg:py-24">
        <div className="text-center max-w-2xl mx-auto">
          <div className="text-[10px] uppercase tracking-[0.22em] text-amber-700 font-bold">Stay Connected</div>
          <h2 className="mt-3 text-3xl md:text-4xl lg:text-5xl font-bold text-emerald-950">Join Our Community</h2>
          <p className="mt-4 text-emerald-900/75 leading-relaxed">
            Follow Zamzam Capital across our social media platforms for our latest research, Q&amp;A sessions,
            Shariah compliance knowledge and updates.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {CHANNELS.map((c) => (
            <a
              key={c.label}
              href={c.href}
              target="_blank"
              rel="noreferrer"
              className="group bg-white border border-emerald-900/10 rounded-2xl p-6 hover:border-emerald-900/25 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-emerald-900/5 transition-all relative overflow-hidden"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${c.accent} text-white flex items-center justify-center shadow-md`}>
                <c.icon className="w-5 h-5" />
              </div>
              <div className="mt-4 flex items-start justify-between gap-2">
                <div>
                  <h3 className="text-lg font-bold text-emerald-950">{c.label}</h3>
                  <p className="text-sm text-emerald-900/70 mt-1">{c.tag}</p>
                </div>
                <ArrowUpRight className="w-4 h-4 text-emerald-900/40 group-hover:text-emerald-900 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform shrink-0" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
