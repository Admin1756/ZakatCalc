import { Link } from 'react-router-dom';
import { Youtube, Instagram, Facebook, Linkedin, Twitter, Send } from 'lucide-react';

const LOGO_URL = 'https://customer-assets.emergentagent.com/job_zakat-essentials/artifacts/bu79azlv_images%20%288%29.png';

const FOOTER_LINKS_1 = [
  '© All Rights Reserved',
  'Complaints Board',
  'Terms & Conditions',
  'Grievance Redressal Process',
  'Individual Code of Conduct',
  'Disclosure Advice',
];
const FOOTER_LINKS_2 = [
  'Privacy Policy',
  'Internal Policy',
  'AML Policy',
  'Refund Policy',
  'Disclosure',
  'Disclaimer',
  'Investor Charter',
  'Zamzam Capital (#INH000016199)',
];

function Col({ title, children }) {
  return (
    <div>
      <div className="text-white font-semibold text-[15px] mb-3">{title}</div>
      <div className="space-y-1.5 text-[13.5px] text-emerald-50/95 leading-relaxed">{children}</div>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="mt-24">
      {/* Brand strip */}
      <div className="bg-white border-t border-emerald-900/10">
        <div className="max-w-7xl mx-auto px-5 lg:px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <Link to="/" className="flex items-center gap-3">
            <img src={LOGO_URL} alt="Zamzam Capital" className="h-12 w-auto" />
          </Link>
          <div className="flex items-center gap-6 text-sm">
            <Link to="/" className="text-emerald-900 hover:text-emerald-700">Zakat Calculator</Link>
            <Link to="/faraid" className="text-emerald-900 hover:text-emerald-700">Faraid</Link>
            <Link to="/wasiyyah" className="text-emerald-900 hover:text-emerald-700">Wasiyyah</Link>
            <Link to="/about" className="text-emerald-900 hover:text-emerald-700">About</Link>
          </div>
        </div>
      </div>

      {/* SEBI disclosure section — emerald green per Zamzam Capital site */}
      <div style={{ background: '#1f9b6f' }} className="text-white">
        <div className="max-w-7xl mx-auto px-5 lg:px-8 py-14">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <Col title="SEBI Registered Research Analyst Details:">
              <div>Registered Name: Zamzam Capital</div>
              <div>Type of Registration: Non-Individual</div>
              <div>Registration No: INH000016199</div>
              <div>Validity: Jun 12, 2024 – Perpetual</div>
            </Col>
            <Col title="SEBI Office Address:">
              <div>7th Floor, 756-L, Anna Salai</div>
              <div>Chennai – 600002, Tamil Nadu</div>
              <div>Tel. Board: +91-44- 28880222 / 28526686</div>
              <div>E-mail : sebisro@sebi.gov.in</div>
            </Col>
            <Col title="Registered Address:">
              <div>No. 6 Berlie Street</div>
              <div>Langford Town</div>
              <div>Shanthinagar</div>
              <div>Bangalore – 560025, Karnataka</div>
            </Col>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-10">
            <Col title="Principal Officer: Mr. Saif Ahmed">
              <div>Email: po@zamzam-capital.com</div>
              <div>Tel: +91 8694010200</div>
            </Col>
            <Col title="Compliance Officer: Mr. Shafik Ahmed">
              <div>Email: co@zamzam-capital.com</div>
              <div>Tel: +91 8694010200</div>
            </Col>
            <Col title="Grievance Officer: Mr. Shafik Ahmed">
              <div>Email: go@zamzam-capital.com</div>
              <div>Tel: +91 8694010200</div>
            </Col>
          </div>

          <div className="border-t border-white/25 my-10" />

          <div className="space-y-5 text-[13.5px] text-emerald-50/95 leading-relaxed">
            <p>
              For any service related assistance or grievances, you can reach us at{' '}
              <span className="underline decoration-amber-200/70 underline-offset-2">support@zamzam-capital.com</span>.
              We take minimum 15 working days to respond or to come up with the solution of your query. If you are unsatisfied
              with our response then you can escalate your issue to SEBI{' '}
              <a href="https://scores.sebi.gov.in/" className="text-amber-200 underline" target="_blank" rel="noreferrer">SCORES</a>
            </p>
            <p>
              With regard to physical complaints, investors may send their complaints to: Office of Investor Assistance and
              Education, Securities and Exchange Board of India, SEBI Bhavan, Plot No. C4-A, &lsquo;G&rsquo; Block, Bandra-Kurla Complex,
              Bandra (E), Mumbai – 400 051.
            </p>
            <p>
              <a href="https://smartodr.in/" className="text-amber-200 underline" target="_blank" rel="noreferrer">ODR Portal</a> could
              be accessed, if unsatisfied with the response. Your attention is drawn to the SEBI circular no.
              SEBI/HO/OIAE/OIAE_IAD-1/P/CIR/2023/131 dated July 31, 2023, on &ldquo;Online Resolution of Disputes in the Indian
              Securities Market&rdquo;.
            </p>
            <div>
              <div>
                Google Play: <span className="text-amber-200 underline break-all">https://play.google.com/store/search?q=sebi+scores&amp;c=apps</span>{' '}
                (Or) Search for &ldquo;SEBI SCORES&rdquo; in Google Play Link to SEBI Scores App
              </div>
              <div className="mt-1">
                Apple Store: <span className="text-amber-200 underline break-all">https://apps.apple.com/in/app/sebiscores/id1493257302</span>{' '}
                (Or) Search for &ldquo;SEBI SCORES&rdquo; in Apple App Store on website
              </div>
            </div>
          </div>

          <div className="border-t border-white/25 my-10" />

          <div className="space-y-4 text-[13.5px] italic text-emerald-50/95 leading-relaxed">
            <p>
              <strong className="not-italic">Disclaimer:</strong> &ldquo;Registration granted by SEBI and certification from NISM in no way
              guarantee performance of the intermediary or provide any assurance of returns to investors.&rdquo;
            </p>
            <p>
              <strong className="not-italic">Standard warning:</strong> &ldquo;Investment in securities market are subject to market risks.
              Read all the related documents carefully before investing.&rdquo;
            </p>
          </div>
        </div>
      </div>

      {/* Bottom links + socials */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-5 lg:px-8 py-10 text-center">
          <div className="flex flex-wrap justify-center items-center gap-x-2 gap-y-2 text-[13px] text-emerald-700">
            {FOOTER_LINKS_1.map((l, i) => (
              <span key={l} className="inline-flex items-center gap-2">
                <a href="#" className="hover:text-emerald-900 hover:underline">{l}</a>
                {i < FOOTER_LINKS_1.length - 1 && <span className="text-emerald-700/40">|</span>}
              </span>
            ))}
          </div>
          <div className="mt-3 flex flex-wrap justify-center items-center gap-x-2 gap-y-2 text-[13px] text-emerald-700">
            {FOOTER_LINKS_2.map((l, i) => (
              <span key={l} className="inline-flex items-center gap-2">
                <a href="#" className="hover:text-emerald-900 hover:underline">{l}</a>
                {i < FOOTER_LINKS_2.length - 1 && <span className="text-emerald-700/40">|</span>}
              </span>
            ))}
          </div>

          <div className="mt-7 flex justify-center items-center gap-2.5">
            {[Youtube, Instagram, Facebook, Twitter, Linkedin, Send].map((Icon, i) => (
              <a key={i} href="#" aria-label="social"
                className="w-9 h-9 rounded-md flex items-center justify-center text-white transition-transform hover:scale-105"
                style={{ background: '#1f9b6f' }}>
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>

          <div className="mt-6 text-xs text-emerald-900/55">
            Educational toolkit — consult your local scholar for personal rulings. © {new Date().getFullYear()} Zamzam Capital LLP.
          </div>
        </div>
      </div>
    </footer>
  );
}
