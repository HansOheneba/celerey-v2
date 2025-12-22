export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white mt-16">
      <section className="max-w-5xl mx-auto px-6 py-20">
        {/* Header */}
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-gray-900">
            Empowering your financial future
          </h1>
          <p className="mt-6 text-lg text-gray-600 leading-relaxed">
            Our mission is to empower everyone, everywhere to achieve lasting
            financial security and freedom.
          </p>
        </div>

        {/* Body */}
        <div className="mt-16 grid gap-12 max-w-4xl">
          <p className="text-gray-700 text-lg leading-relaxed">
            We combine technology and expert insight to create a personalised
            experience that helps you grow and protect your wealth—now and into
            the future. Wherever you are on your journey, our focus is on giving
            you clarity and confidence in every financial decision you make.
          </p>

          <p className="text-gray-700 text-lg leading-relaxed">
            We’re dedicated to making wealth management accessible for all. Our
            mission is clear: to deliver intuitive, personalised financial
            solutions that put you in control—without complexity or pressure.
          </p>

          {/* Highlight */}
          <div className="border-l-4 border-gray-900 pl-6 py-2">
            <h2 className="text-2xl font-semibold text-gray-900">
              Tools that put you in control of your financial future
            </h2>
            <p className="mt-4 text-gray-700 leading-relaxed">
              We believe wealth management should be empowering, not
              intimidating. Our tools are designed to help you understand,
              manage, and protect your wealth with confidence today and for the
              long term.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
