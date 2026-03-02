export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#fbfaf8] mt-16">
      <section className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
        {/* Header */}
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-[11px] tracking-[0.24em] text-[#b07d3d]">
            ABOUT CELEREY
          </p>

          <h1 className="mt-10 font-serif font-thin text-4xl leading-[1.25] text-neutral-900 sm:text-5xl sm:leading-[1.25]">
            Wealth is not a number.
            <br className="hidden sm:block" />
            It is clarity, structure, and the confidence to act well.
          </h1>

          <div className="mx-auto mt-12 h-px w-24 bg-neutral-900/10" />

          <p className="mx-auto mt-10 max-w-2xl text-sm leading-7 text-neutral-600 sm:text-base">
            Celerey is a private advisory experience designed for people who
            want their financial life to feel calm, intentional, and properly
            governed, without noise, pressure, or complexity.
          </p>
        </div>

        {/* Body */}
        <div className="mx-auto mt-16 grid max-w-5xl gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left narrative */}
          <div className="lg:col-span-7">
            <div className="rounded-[26px] border border-black/10 bg-white/70 p-10 shadow-[0_18px_55px_rgba(0,0,0,0.06)]">
              <h2 className="font-serif text-2xl text-neutral-900">
                A quieter way to manage wealth
              </h2>

              <p className="mt-5 text-sm leading-7 text-neutral-700 sm:text-base">
                Most financial decisions are not difficult because the options
                are unclear. They are difficult because life is busy, priorities
                compete, and good structure rarely exists at the moment it is
                needed.
              </p>

              <p className="mt-5 text-sm leading-7 text-neutral-700 sm:text-base">
                Celerey exists to bring order. We help you define what matters,
                capture the right information, and make decisions with a level
                of discipline that protects both lifestyle and long-term
                outcomes.
              </p>

              <div className="mt-8 h-px w-full bg-black/10" />

              <p className="mt-8 text-sm leading-7 text-neutral-700 sm:text-base">
                We combine internationally informed advisory standards with a
                modern system for visibility and follow-through. The result is a
                service that feels private, composed, and genuinely useful.
              </p>
            </div>
          </div>

          {/* Right principles */}
          <div className="lg:col-span-5">
            <div className="rounded-[26px] border border-black/10 bg-white p-10 shadow-[0_18px_55px_rgba(0,0,0,0.05)]">
              <p className="text-[11px] tracking-[0.22em] text-[#b07d3d]">
                OUR PRINCIPLES
              </p>

              <ul className="mt-8 space-y-8">
                <li>
                  <p className="font-serif text-lg text-neutral-900">
                    Discretion
                  </p>
                  <p className="mt-2 text-sm leading-7 text-neutral-600">
                    Your financial life is handled with care, privacy, and
                    restraint.
                  </p>
                </li>

                <li>
                  <p className="font-serif text-lg text-neutral-900">
                    Structure
                  </p>
                  <p className="mt-2 text-sm leading-7 text-neutral-600">
                    We turn goals into plans, and plans into repeatable
                    decisions.
                  </p>
                </li>

                <li>
                  <p className="font-serif text-lg text-neutral-900">Clarity</p>
                  <p className="mt-2 text-sm leading-7 text-neutral-600">
                    We reduce noise and focus attention on what moves outcomes.
                  </p>
                </li>

                <li>
                  <p className="font-serif text-lg text-neutral-900">
                    Stewardship
                  </p>
                  <p className="mt-2 text-sm leading-7 text-neutral-600">
                    Wealth is preserved and grown through responsible decisions,
                    not urgency.
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Advisory + team credibility */}
        <div className="mx-auto mt-12 max-w-5xl">
          <div className="rounded-[26px] border border-black/10 bg-white/70 p-10 shadow-[0_18px_55px_rgba(0,0,0,0.06)]">
            <h2 className="font-serif text-2xl text-neutral-900">
              Internationally informed, locally grounded
            </h2>

            <p className="mt-5 max-w-3xl text-sm leading-7 text-neutral-700 sm:text-base">
              Our advisory team brings experience across wealth management,
              banking, investment strategy, tax planning, property, leadership,
              and governance. Celerey is built to support individuals, families,
              and founders who want a more deliberate standard of guidance.
            </p>

            <div className="mt-8 h-px w-full bg-black/10" />

            <p className="mt-8 max-w-3xl text-sm leading-7 text-neutral-700 sm:text-base">
              Whether you choose membership for long-term structure, or engage
              us privately for a specific decision, the work is always the same:
              to protect the downside, clarify the path, and ensure you remain
              in control.
            </p>
          </div>
        </div>

        {/* Bottom note */}
        <div className="mx-auto mt-14 max-w-4xl text-center">
          <p className="font-serif font-thin text-2xl leading-[1.4] text-neutral-900 sm:text-3xl">
            Wealth should feel steady.
            <br className="hidden sm:block" />
            Your decisions should feel considered.
          </p>

          <div className="mx-auto mt-10 h-px w-24 bg-neutral-900/10" />
        </div>
      </section>
    </main>
  );
}
