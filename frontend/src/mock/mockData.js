// Mock data for Zamzam Capital Zakat Calculator

export const CURRENCIES = [
  { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'AED', symbol: 'د.إ', name: 'UAE Dirham' },
  { code: 'SAR', symbol: '﷼', name: 'Saudi Riyal' },
  { code: 'QAR', symbol: 'QR', name: 'Qatari Riyal' },
  { code: 'KWD', symbol: 'KD', name: 'Kuwaiti Dinar' },
  { code: 'BHD', symbol: 'BD', name: 'Bahraini Dinar' },
  { code: 'OMR', symbol: 'RO', name: 'Omani Rial' },
  { code: 'PKR', symbol: '₨', name: 'Pakistani Rupee' },
  { code: 'BDT', symbol: '৳', name: 'Bangladeshi Taka' },
  { code: 'LKR', symbol: 'Rs', name: 'Sri Lankan Rupee' },
  { code: 'MYR', symbol: 'RM', name: 'Malaysian Ringgit' },
  { code: 'IDR', symbol: 'Rp', name: 'Indonesian Rupiah' },
  { code: 'TRY', symbol: '₺', name: 'Turkish Lira' },
  { code: 'RUB', symbol: '₽', name: 'Russian Ruble' },
];

// Static reference (Mumbai EOD, indicative) — used only as fallback if the live API fails.
export const NISAB_PRICES = {
  INR: { gold24: 14673, silver999: 250 },
  USD: { gold24: 154, silver999: 2.6 },
  GBP: { gold24: 121, silver999: 2.05 },
  EUR: { gold24: 141, silver999: 2.4 },
  AED: { gold24: 566, silver999: 9.55 },
  SAR: { gold24: 578, silver999: 9.75 },
  QAR: { gold24: 561, silver999: 9.46 },
  KWD: { gold24: 47.3, silver999: 0.80 },
  BHD: { gold24: 58.1, silver999: 0.98 },
  OMR: { gold24: 59.3, silver999: 1.00 },
  PKR: { gold24: 42900, silver999: 725 },
  BDT: { gold24: 16800, silver999: 285 },
  LKR: { gold24: 46200, silver999: 780 },
  MYR: { gold24: 720, silver999: 12.2 },
  IDR: { gold24: 2440000, silver999: 41500 },
  TRY: { gold24: 5400, silver999: 91 },
  RUB: { gold24: 12100, silver999: 205 },
};

// India retail premium applied on LBMA spot for INR display
// (import duty ~12% + GST ~3% + typical retail premium). Users can override via "Edit prices".
export const INR_RETAIL_MARKUP = { gold: 1.147, silver: 1.305 };

export const GOLD_NISAB_GRAMS = 85;
export const SILVER_NISAB_GRAMS = 595;
export const ZAKAT_RATE = 0.025;

export const GOLD_PURITIES = [
  { karat: '24K', multiplier: 1.0, label: '24 Karat (Pure)' },
  { karat: '22K', multiplier: 0.916, label: '22 Karat' },
  { karat: '21K', multiplier: 0.875, label: '21 Karat' },
  { karat: '18K', multiplier: 0.75, label: '18 Karat' },
  { karat: '14K', multiplier: 0.585, label: '14 Karat' },
];

export const CATEGORIES = [
  { id: 'salaried', icon: 'Briefcase', title: 'Salaried Employee', desc: 'Regular income from employment', tag: 'Personal' },
  { id: 'self-employed', icon: 'UserCog', title: 'Self-Employed', desc: 'Freelancer or consultant', tag: 'Personal' },
  { id: 'business', icon: 'Building2', title: 'Business Owner', desc: 'Retail, hotel, or services', tag: 'Business' },
  { id: 'investor', icon: 'TrendingUp', title: 'Investor', desc: 'Stocks, mutual funds, crypto', tag: 'Investment' },
  { id: 'farmer', icon: 'Sprout', title: 'Farmer', desc: 'Agricultural income', tag: 'Agriculture' },
  { id: 'retiree', icon: 'Armchair', title: 'Retiree', desc: 'Pension and savings', tag: 'Personal' },
  { id: 'student', icon: 'GraduationCap', title: 'Student', desc: 'Savings and scholarships', tag: 'Personal' },
  { id: 'women', icon: 'Gem', title: 'Women / Ladies', desc: 'Jewellery and mahr', tag: 'Personal' },
  { id: 'landlord', icon: 'Home', title: 'Landlord', desc: 'Rental income', tag: 'Property' },
  { id: 'crypto', icon: 'Bitcoin', title: 'Crypto Holder', desc: 'Digital assets', tag: 'Investment' },
  { id: 'livestock', icon: 'Cog', title: 'Livestock Owner', desc: 'Animals and produce', tag: 'Agriculture' },
  { id: 'professional', icon: 'Stethoscope', title: 'Professional', desc: 'Doctor, lawyer, etc.', tag: 'Personal' },
];

export const JEWELLERY_INFO = 'The Hanafi school guidance generally includes all gold and silver jewellery, while the Shafi\'i, Maliki, and Hanbali schools generally exempt jewellery kept strictly for personal use but include investment or stored jewellery.';

export const ASSET_GROUPS = [
  {
    key: 'cash',
    title: 'Cash & Savings',
    icon: 'Wallet',
    desc: 'Bank accounts, cash at hand, digital wallets',
    fields: [
      { id: 'cash_hand', label: 'Cash in hand' },
      { id: 'cash_bank', label: 'Bank accounts (savings/current)' },
      { id: 'cash_digital', label: 'Digital wallets (UPI, PayPal etc.)' },
      { id: 'cash_foreign', label: 'Foreign currency holdings' },
    ],
  },
  {
    key: 'gold',
    title: 'Gold',
    icon: 'Coins',
    desc: 'Jewellery, bullion, coins (by karat)',
    info: JEWELLERY_INFO,
    fields: [
      { id: 'gold_24', label: '24K — grams', purityKey: '24K' },
      { id: 'gold_22', label: '22K — grams', purityKey: '22K' },
      { id: 'gold_21', label: '21K — grams', purityKey: '21K' },
      { id: 'gold_18', label: '18K — grams', purityKey: '18K' },
    ],
    isMetal: 'gold',
  },
  {
    key: 'silver',
    title: 'Silver',
    icon: 'Coins',
    desc: 'Silver jewellery, bullion, coins',
    info: JEWELLERY_INFO,
    fields: [
      { id: 'silver_grams', label: 'Silver (999 fine) — grams' },
    ],
    isMetal: 'silver',
  },
  {
    key: 'investments',
    title: 'Investments',
    icon: 'TrendingUp',
    desc: 'Stocks, mutual funds, ETFs, bonds (Halal)',
    fields: [
      { id: 'inv_stocks', label: 'Shares / Equity (market value)' },
      { id: 'inv_mutual', label: 'Mutual funds / ETFs' },
      { id: 'inv_sukuk', label: 'Sukuk / Halal bonds' },
      { id: 'inv_dividends', label: 'Unpaid dividends due' },
    ],
  },
  {
    key: 'business',
    title: 'Business Assets',
    icon: 'Building2',
    desc: 'Inventory, receivables, trade goods',
    fields: [
      { id: 'biz_inventory', label: 'Inventory / stock-in-trade' },
      { id: 'biz_receivables', label: 'Trade receivables' },
      { id: 'biz_cash', label: 'Business cash reserves' },
    ],
  },
  {
    key: 'property',
    title: 'Real Estate (Investment)',
    icon: 'Home',
    desc: 'Rental income & properties bought for resale',
    fields: [
      { id: 'prop_rental', label: 'Saved rental income' },
      { id: 'prop_resale', label: 'Property bought for resale (market value)' },
    ],
  },
  {
    key: 'crypto',
    title: 'Cryptocurrency',
    icon: 'Bitcoin',
    desc: 'Digital assets at market value',
    fields: [
      { id: 'crypto_value', label: 'Total crypto holdings (market value)' },
    ],
  },
  {
    key: 'retirement',
    title: 'Retirement',
    icon: 'Armchair',
    desc: 'Accessible portion of pension / 401k / EPF / NPS',
    fields: [
      { id: 'ret_accessible', label: 'Accessible retirement funds' },
    ],
  },
  {
    key: 'loans',
    title: 'Loans Receivable',
    icon: 'HandCoins',
    desc: 'Money owed to you (likely to be repaid)',
    fields: [
      { id: 'loan_receivable', label: 'Loans you have given out' },
    ],
  },
];

export const LIABILITY_FIELDS = [
  { id: 'lia_loans', label: 'Personal loans due within 12 months' },
  { id: 'lia_bills', label: 'Pending bills / rent due' },
  { id: 'lia_taxes', label: 'Taxes due' },
  { id: 'lia_business', label: 'Business payables due within 12 months' },
];

export const SCHOLARLY_RULINGS = {
  Hanafi: [
    { topic: 'Jewellery', text: 'Zakat is due on gold/silver jewellery if it reaches nisab, even if worn regularly.' },
    { topic: 'Nisab Standard', text: 'Silver nisab (595g) is preferred for the benefit of recipients.' },
    { topic: 'Crypto', text: 'Treated as trade goods (urood al-tijara). Zakat due on market value.' },
    { topic: 'Stocks', text: 'Zakat on market value if held for trading. Only on dividends if held for returns.' },
    { topic: 'Business', text: 'Zakat on trade goods at market value. Fixed assets are exempt.' },
  ],
  Maliki: [
    { topic: 'Jewellery', text: 'Jewellery worn for adornment is exempt; surplus or stored jewellery is zakatable.' },
    { topic: 'Nisab Standard', text: 'Gold nisab (85g) historically used; silver nisab also valid.' },
    { topic: 'Agriculture', text: 'Detailed rules on ushr — 10% (rain-fed) / 5% (irrigated) of harvest.' },
    { topic: 'Stocks', text: 'Zakat based on company\'s zakatable assets, not full share value.' },
    { topic: 'Business', text: 'Zakat on stock-in-trade valued at acquisition or market depending on intent.' },
  ],
  "Shafi'i": [
    { topic: 'Jewellery', text: 'Reasonable jewellery worn regularly is exempt; excess is zakatable.' },
    { topic: 'Nisab Standard', text: 'Gold nisab (85g) is the standard reference.' },
    { topic: 'Crypto', text: 'Permissible types are zakatable on full market value at hawl.' },
    { topic: 'Stocks', text: 'Full market value zakatable if held for trade; otherwise dividends only.' },
    { topic: 'Pension', text: 'Zakat due on accessible portions; locked funds exempt until withdrawal.' },
  ],
  Hanbali: [
    { topic: 'Jewellery', text: 'Jewellery in normal use is exempt; jewellery hoarded as wealth is zakatable.' },
    { topic: 'Nisab Standard', text: 'Gold or silver nisab; whichever first reaches threshold.' },
    { topic: 'Crypto', text: 'Zakatable as wealth, full market value at hawl date.' },
    { topic: 'Business', text: 'Trade goods zakatable at market value.' },
    { topic: 'Debts', text: 'Liquid receivables due to you are zakatable upon receipt or annually.' },
  ],
};

export const FAQS = [
  {
    q: 'How is Zakat calculated?',
    a: 'Zakat is calculated at 2.5% of your zakatable wealth that has remained above the Nisab threshold for a full lunar year (hawl). Add up all qualifying assets — cash, gold, silver, investments, business assets, crypto — then subtract immediate liabilities (debts due within 12 months). If the net amount exceeds Nisab, multiply by 2.5%.',
  },
  {
    q: 'What is the Nisab — should I use gold or silver?',
    a: 'Nisab is the minimum threshold. Gold Nisab is 85g (7.5 tolas) of pure gold; Silver Nisab is 595g (52.5 tolas) of pure silver. Most scholars recommend silver Nisab as it is lower, ensuring more is given to the poor. Use gold Nisab if you only own gold and no other zakatable wealth (Hanafi guidance).',
  },
  {
    q: 'Who has to give Zakat?',
    a: 'Zakat is obligatory on every adult Muslim of sound mind who owns wealth above the Nisab threshold for a full lunar year (hawl). Children and the mentally incapacitated are exempt per the majority view; some schools require guardians to pay on their behalf.',
  },
  {
    q: 'When should I pay my Zakat?',
    a: 'Zakat becomes due on the completion of one lunar year (hawl) from the date your wealth first exceeded Nisab. Many Muslims pay during Ramadan for the multiplied reward, but any date works — just be consistent year over year.',
  },
  {
    q: 'Who can receive Zakat?',
    a: 'The Qur\'an (9:60) specifies eight categories: (1) the poor (fuqara), (2) the needy (masakin), (3) Zakat administrators, (4) those whose hearts are inclined to Islam, (5) freeing captives/slaves, (6) those in debt, (7) in the path of Allah (fi sabilillah), (8) the wayfarer (ibn al-sabil).',
  },
  {
    q: 'Can I pay Zakat to family members?',
    a: 'You can pay Zakat to poor siblings, uncles, aunts, cousins, and further relatives. However, you cannot pay it to your parents, grandparents, spouse, children, or grandchildren — providing for them is a separate obligation.',
  },
  {
    q: 'Is Zakat due on cryptocurrency?',
    a: 'Yes. Most contemporary scholars (including AAOIFI) treat permissible crypto holdings as trade goods or wealth. Zakat is calculated on the market value at the end of your hawl (zakat year). It is another matter however, that as per our Shariah Board and the views of all major Shariah scholars, it is impermissible to invest in cryptocurrency.',
  },
  {
    q: 'Is Zakat due on women\'s jewellery?',
    a: 'The four Sunni schools differ. Hanafi requires Zakat on all gold/silver jewellery exceeding nisab regardless of use. Maliki / Shafi\'i / Hanbali generally exempt jewellery worn regularly for adornment, but zakat is due on excess or stored jewellery.',
  },
  {
    q: 'What about retirement funds (EPF / NPS / 401k)?',
    a: 'Zakat is due on the accessible portion you could withdraw today (after applicable penalties/taxes). Funds that are entirely locked until retirement are typically exempt until withdrawal, per the majority view.',
  },
  {
    q: 'Are stocks and mutual funds zakatable?',
    a: 'If shares are held for trading: full market value is zakatable. If held for long-term dividend income: only the underlying zakatable assets (cash, receivables, inventory) of the company are zakatable — practically estimated as 25%–40% of market value, depending on the company. Always check Shariah compliance first.',
  },
  {
    q: 'Does Zamzam Capital store my financial data?',
    a: 'No. This calculator runs entirely in your browser. We do not collect, store, or transmit any of your financial inputs. No accounts. No tracking. No login required.',
  },
  {
    q: 'Can I deduct debts from my Zakat calculation?',
    a: 'Yes — debts and liabilities that are immediately due within the next 12 months (personal loans, bills, taxes, business payables) can be deducted from your zakatable assets. Long-term debt (e.g., home mortgage) is generally not fully deductible — consult a scholar for specifics.',
  },
];

export const HADITHS = [
  {
    arabic: 'وَأَقِيمُوا الصَّلَاةَ وَآتُوا الزَّكَاةَ',
    translation: '“Establish prayer and give Zakat.”',
    source: 'Qur\'an 2:43',
  },
];

export const STATS = [
  { value: '1.9B+', label: 'Muslims worldwide' },
  { value: '83', label: 'Countries covered' },
  { value: '10+', label: 'Currencies supported' },
  { value: '100%', label: 'Private · in your browser' },
];

export const YT_VIDEO_ID = '7AG6wmheZEA';
export const YT_VIDEO_URL = 'https://youtu.be/7AG6wmheZEA';
