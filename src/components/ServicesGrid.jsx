// src/components/ServicesGrid.jsx
import { Link } from "react-router-dom";

const services = [
  {
    title: "Cyber Services",
    desc: "KRA, HELB, NTSA, eCitizen - All government services",
    link: "/cyber",
    icon: "🖥️"
  },
  {
    title: "Hustle KE Packages",
    desc: "CV Writing, Business Plans, AGPO Registration",
    link: "/hustle",
    icon: "💼"
  },
  {
    title: "Trading Academy",
    desc: "Learn Forex & Crypto. Get daily signals",
    link: "/academy",
    icon: "📈"
  },
  {
    title: "Electronics & Appliances",
    desc: "TVs, Fridges, Woofers, Phones, Electrical fittings",
    link: "/electronics",
    icon: "📺"
  },
  {
    title: "Bingwa Bundles",
    desc: "Safaricom Data, Airtime, SMS. With or without Okoa Jahazi",
    link: "/bundles",
    icon: "📱"
  }
];

export default function ServicesGrid() {
  return (
    <section id="services" className="py-20 px-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-12">Our Services & Products</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {services.map((service) => (
          <Link
            key={service.title}
            to={service.link}
            className="border p-6 rounded-xl hover:shadow-lg hover:border-blue-600 transition duration-300"
          >
            <div className="text-4xl mb-4">{service.icon}</div>
            <h3 className="text-xl font-bold mb-2">{service.title}</h3>
            <p className="text-gray-600">{service.desc}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}