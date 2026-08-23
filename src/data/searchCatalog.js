// Shared customer-facing search index for the eCitizen-style global search.
// Keep these entries broad and human-friendly; live products are merged at runtime.

export const STATIC_SEARCH_ENTRIES = [
  { id: "service-cyber", title: "Cyber Services", description: "Government services, legal documents, printing, scanning and digital support.", group: "Cyber Services", icon: "🖥️", route: "/cyber", keywords: "cyber government legal documents printing scanning" },
  { id: "service-government", title: "Government Services", description: "KRA, NTSA, HELB, SHA, NSSF, eCitizen, Immigration and CRB assistance.", group: "Cyber Services", icon: "🏛️", route: "/cyber/government", keywords: "kra ntsa helb sha nssf ecitizen immigration crb" },
  { id: "service-business", title: "Business Services", description: "Company registration, AGPO, tax compliance, tenders, KEBS and NCA support.", group: "Cyber Services", icon: "🏢", route: "/cyber/business", keywords: "company registration agpo tax tender kebs nca business" },
  { id: "service-printing", title: "Printing & Document Services", description: "Colour and black-and-white printing, scanning, PDF creation, lamination and binding.", group: "Cyber Services", icon: "🖨️", route: "/cyber/printing", keywords: "print printing scan scanning pdf lamination binding passport photo" },
  { id: "service-writing", title: "Writing Services", description: "Professional writing, editing and document preparation for your next application or opportunity.", group: "Cyber Services", icon: "✍️", route: "/cyber/writing", keywords: "writing editing application proposal letter" },

  { id: "service-hustle", title: "Hustle KE", description: "Reseller opportunities, business guidance, AGPO support and digital income ideas.", group: "Hustle KE", icon: "🔥", route: "/hustle", keywords: "hustle affiliate reseller income opportunity" },
  { id: "hustle-reseller", title: "Reseller Opportunities", description: "Explore practical ways to earn by connecting customers with useful WeberTech services.", group: "Hustle KE", icon: "📦", route: "/hustle", keywords: "reseller affiliate commissions earn" },
  { id: "hustle-business-plan", title: "Business Plans", description: "Clear, professional business plans and profiles for your next opportunity.", group: "Hustle KE", icon: "📑", route: "/hustle", keywords: "business plan profile proposal" },
  { id: "hustle-agpo", title: "AGPO Guidance", description: "Understand the steps and documents needed for public procurement opportunities.", group: "Hustle KE", icon: "🏛️", route: "/hustle", keywords: "agpo procurement tender youth women disability" },
  { id: "hustle-income", title: "Digital Income Support", description: "Learn how digital services and simple systems can support your hustle.", group: "Hustle KE", icon: "💰", route: "/hustle", keywords: "income digital money online work" },

  { id: "service-academy", title: "WeberTech Academy", description: "Learn digital skills that help you build, earn and grow in the digital economy.", group: "Academy", icon: "🎓", route: "/academy", keywords: "academy learn training course skills" },
  { id: "academy-web", title: "Web & App Development", description: "Build responsive websites, useful web apps and practical digital products.", group: "Academy", icon: "💻", route: "/academy", keywords: "website web app development coding programming" },
  { id: "academy-design", title: "Graphic Design & Branding", description: "Learn design principles, social media graphics and brand identity.", group: "Academy", icon: "🎨", route: "/academy", keywords: "graphic design branding logo creative" },
  { id: "academy-marketing", title: "Digital Marketing", description: "Grow a business online with content, social media and campaigns.", group: "Academy", icon: "📣", route: "/academy", keywords: "marketing social media content advertising" },
  { id: "academy-trading", title: "Forex & Crypto Trading", description: "Explore learning paths for forex and crypto trading skills and signals.", group: "Academy", icon: "📈", route: "/academy", keywords: "forex crypto trading signals" },

  { id: "service-electronics", title: "Electronics & Appliances", description: "Phones, tablets, TVs, fridges, woofers, accessories and electrical fittings.", group: "Electronics", icon: "📺", route: "/electronics", keywords: "electronics appliances technology shop" },
  { id: "electronics-phones", title: "Phones & Tablets", description: "Everyday smartphones, tablets, chargers, cases and accessories.", group: "Electronics", icon: "📱", route: "/electronics", keywords: "phone smartphone tablet charger cable" },
  { id: "electronics-tv", title: "TVs & Entertainment", description: "Smart TVs, woofers, speakers and accessories for home entertainment.", group: "Electronics", icon: "📺", route: "/electronics", keywords: "tv television woofer speaker entertainment" },
  { id: "electronics-power", title: "Power & Accessories", description: "Cables, adapters, power solutions and networking accessories.", group: "Electronics", icon: "🔌", route: "/electronics", keywords: "power cable adapter network accessories" },
  { id: "electronics-home", title: "Home & Office Tech", description: "Practical equipment for home offices, small businesses and study spaces.", group: "Electronics", icon: "🏠", route: "/electronics", keywords: "home office computer equipment" },

  { id: "service-dev", title: "Dev Services", description: "Websites, mobile apps, online stores, branding and custom management systems.", group: "Dev Services", icon: "💼", route: "/dev", keywords: "development website app software technology" },
  { id: "dev-websites", title: "Business Websites", description: "Professional websites and portfolios that make it easy for customers to contact you.", group: "Dev Services", icon: "🌐", route: "/dev", keywords: "website portfolio business web" },
  { id: "dev-stores", title: "Online Stores", description: "Trustworthy storefronts with product presentation and payment-ready foundations.", group: "Dev Services", icon: "🛒", route: "/dev", keywords: "ecommerce ecommerce store shop online" },
  { id: "dev-apps", title: "Mobile Apps", description: "Useful Android and iOS experiences for businesses and digital products.", group: "Dev Services", icon: "📲", route: "/dev", keywords: "mobile android ios app" },
  { id: "dev-systems", title: "Custom Systems", description: "Dashboards, booking tools, admin panels and workflow systems.", group: "Dev Services", icon: "⚙️", route: "/dev", keywords: "system dashboard admin panel booking workflow" },

  { id: "service-bundles", title: "Safaricom Bundles", description: "Data, airtime, minutes and SMS bundles delivered through M-PESA.", group: "Safaricom Bundles", icon: "📡", route: "https://bundles.webertech.co.ke", external: true, keywords: "bundles safaricom data airtime minutes sms okoa jahazi" },
  { id: "bundle-data", title: "Safaricom Data Bundles", description: "Affordable Safaricom data bundles from KES 19.", group: "Safaricom Bundles", icon: "📶", route: "https://bundles.webertech.co.ke", external: true, keywords: "internet data mb gb safaricom" },
  { id: "bundle-airtime", title: "Safaricom Airtime", description: "Discounted Safaricom airtime for yourself or another number.", group: "Safaricom Bundles", icon: "📞", route: "https://bundles.webertech.co.ke", external: true, keywords: "airtime top up recharge safaricom" },
  { id: "bundle-minutes", title: "Safaricom Minutes & SMS", description: "Buy minutes and SMS bundles quickly through the WeberTech bundle service.", group: "Safaricom Bundles", icon: "💬", route: "https://bundles.webertech.co.ke", external: true, keywords: "minutes sms calls messages safaricom" },
];

export const GROUP_ORDER = ["Cyber Services", "Hustle KE", "Academy", "Electronics", "Dev Services", "Safaricom Bundles"];
