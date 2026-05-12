// src/components/Testimonials.jsx
const testimonials = [
  {
    name: "Peter Kamau",
    role: "Hustle KE Client",
    text: "WeberTech alinisaidia kupata AGPO certificate na business plan. Saa hii napata tenders za serikali!",
    image: "👨🏿‍💼"
  },
  {
    name: "Grace Wanjiku", 
    role: "Trading Academy Student",
    text: "Signals zao ni legit. Nimeanza kupata profit kwa forex baada ya mwezi mmoja tu.",
    image: "👩🏿‍💻"
  },
  {
    name: "James Omondi",
    role: "Bundles Customer",
    text: "Bingwa Sokoni bundles ni cheap kuliko *544#. Na ukiwa na Okoa Jahazi bado unapata!",
    image: "👨🏿‍🎓"
  }
];

export default function Testimonials() {
  return (
    <section className="bg-gray-50 py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">What Our Customers Say</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-md">
              <div className="text-4xl mb-4">{testimonial.image}</div>
              <p className="text-gray-600 mb-4 italic">"{testimonial.text}"</p>
              <div>
                <p className="font-bold">{testimonial.name}</p>
                <p className="text-sm text-blue-600">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}