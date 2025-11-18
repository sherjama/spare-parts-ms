export default function AboutUs() {
  return (
    <div className="min-h-screen w-full bg-[#0f0f0f] text-gray-200 px-6 py-24">
      {/* ABOUT BLOCK */}
      <section className="max-w-4xl mx-auto bg-[#181818] rounded-2xl p-8 shadow-xl border border-gray-800">
        <h2 className="text-2xl font-bold mb-4 font-nexar3 text-white">
          What is Nexar?
        </h2>
        <p className="text-gray-300 leading-relaxed font-nexar1">
          Nexar is a modern and powerful{" "}
          <strong>Parts Management System</strong>
          designed to make inventory handling simple, accurate, and fast.
          Whether you manage a workshop, store, or distribution unit, Nexar
          ensures every part—from tiny components to large machinery items—is
          tracked with absolute accuracy.
        </p>

        <p className="mt-4 text-gray-300 leading-relaxed font-nexar1">
          From smart shelf mapping to real-time stock status, purchase bills,
          sales invoices, and analytics dashboards, Nexar gives you everything
          you need to manage your parts efficiently in one unified platform.
        </p>
      </section>

      {/* MISSION */}
      <section className="max-w-4xl mx-auto mt-16">
        <h2 className="text-2xl font-bold font-nexar3 mb-4">Our Mission</h2>
        <p className="text-gray-300 leading-relaxed font-nexar1">
          To deliver a next-generation inventory system that is
          <span className="text-indigo-400 font-semibold">
            {" "}
            fast, secure, accurate,
          </span>
          and easy for anyone to use. We aim to reduce manual errors, save
          thousands of working hours, and help businesses maintain complete
          control over their parts and stock.
        </p>
      </section>

      {/* FEATURES */}
      <section className="max-w-5xl mx-auto mt-16">
        <h2 className="text-2xl font-bold font-nexar3 mb-8 text-white">
          Why Nexar?
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card */}
          <FeatureCard
            title="Real-Time Inventory"
            desc="Track every part with instant updates and zero confusion."
          />
          <FeatureCard
            title="Smart Shelf System"
            desc="Organize shelves with intelligent mapping and quick search."
          />
          <FeatureCard
            title="Purchase & Sales Automation"
            desc="Auto-generate bills, invoices, and stock adjustments."
          />
          <FeatureCard
            title="Advanced Analytics"
            desc="View total sales, top-selling parts, and stock health."
          />
          <FeatureCard
            title="Secure & Reliable"
            desc="Built with MERN stack and JWT protection for maximum safety."
          />
          <FeatureCard
            title="Fast & Simple UI"
            desc="A clean dashboard that works smoothly on all devices."
          />
        </div>
      </section>

      {/* VISION */}
      <section className="max-w-4xl mx-auto mt-16">
        <h2 className="text-2xl font-bold font-nexar3 mb-4">Our Vision</h2>
        <p className="text-gray-300 leading-relaxed font-nexar1">
          We envision Nexar becoming the most trusted parts management companion
          for workshops, stores, and industries worldwide — helping businesses
          achieve efficiency, transparency, and long-term growth with
          confidence.
        </p>
      </section>

      {/* FOOTER */}
      <section className="max-w-4xl mx-auto mt-20 text-center">
        <h3 className="text-xl font-bold font-nexar3 text-white">
          Built with passion. Powered by innovation.
        </h3>
        <p className="text-gray-400 mt-2 font-nexar1">
          Thank you for choosing Nexar as your inventory partner.
        </p>
      </section>
    </div>
  );
}

function FeatureCard({ title, desc }) {
  return (
    <div className="bg-[#1c1c1c] border border-gray-800 rounded-xl p-5 hover:border-indigo-500 transition">
      <h3 className="font-bold text-lg text-white">{title}</h3>
      <p className="text-gray-400 mt-2 text-sm">{desc}</p>
    </div>
  );
}
