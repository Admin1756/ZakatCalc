// Simplified placeholder footer band — the full brand footer will be injected from the Zamzam Capital home site.
export default function Footer() {
  return (
    <footer className="mt-16">
      <div className="max-w-7xl mx-auto px-5 lg:px-8 pb-8">
        <p className="text-xs italic text-emerald-900/70 leading-relaxed border-t border-emerald-900/10 pt-6">
          <strong className="not-italic text-emerald-950">Disclaimer:</strong> This Zakat calculator is provided by Zamzam Capital
          for educational purposes only and should not be construed as legal, financial or religious advice. While every effort
          has been made to ensure the accuracy of the calculations and the underlying Shariah methodology, users are strongly
          encouraged to consult a qualified scholar for guidance on their personal circumstances. Prices and exchange rates
          shown are indicative reference values — always verify with your local market before finalising your Zakat.
        </p>
      </div>

      <div className="bg-emerald-950 text-emerald-100/70">
        <div className="max-w-7xl mx-auto px-5 lg:px-8 py-10 text-center text-sm tracking-wider uppercase">
          Footer
        </div>
      </div>
    </footer>
  );
}
