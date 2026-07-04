import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { FAQS } from '../mock/mockData';
import { HelpCircle } from 'lucide-react';

export default function FAQSection() {
  return (
    <section id="faq" className="max-w-4xl mx-auto px-5 lg:px-8 py-20">
      <div className="text-center mb-10">
        <div className="text-[10px] uppercase tracking-[0.22em] text-amber-700 font-bold inline-flex items-center gap-2">
          <HelpCircle className="w-3.5 h-3.5" /> Frequently Asked Questions
        </div>
        <h2 className="mt-3 text-3xl md:text-4xl font-bold text-emerald-950">Zakat Queries — answered.</h2>
        <p className="text-sm text-emerald-900/70 mt-3 max-w-xl mx-auto">
          Short answers with the underlying scholarly reasoning. Always cross-check with your local scholar.
        </p>
      </div>

      <Accordion type="single" collapsible className="space-y-2.5">
        {FAQS.map((f, i) => (
          <AccordionItem
            key={i}
            value={`item-${i}`}
            className="bg-white border border-emerald-900/10 rounded-xl px-5 data-[state=open]:border-emerald-900/30"
          >
            <AccordionTrigger className="text-left text-emerald-950 font-semibold hover:no-underline">
              <span className="flex items-start gap-3">
                <span className="text-amber-700 text-xs font-bold mt-1">{String(i + 1).padStart(2, '0')}</span>
                {f.q}
              </span>
            </AccordionTrigger>
            <AccordionContent className="text-sm text-emerald-900/75 leading-relaxed pl-7">
              {f.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
