// app/faqs/page.tsx
"use client";

import Link from "next/link";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

type Faq = {
  q: string;
  a: React.ReactNode;
  category: "Getting Started" | "Payments" | "Advisory" | "Tools" | "Security & Privacy" | "Account";
};

const faqs: Faq[] = [
  {
    category: "Getting Started",
    q: "What is Celerey?",
    a: (
      <>
        Celerey is a personal finance and advisory platform helping you turn income into strategy with smart tools and guided
        advisory sessions. You can explore tools for budgeting and savings, and you can also book a session for more tailored
        support.
      </>
    ),
  },
  {
    category: "Getting Started",
    q: "How do I get started?",
    a: (
      <ol className="list-decimal pl-5 space-y-2">
        <li>Explore tools (Budget Planner, Money Manager, Savings Goals Calculator).</li>
        <li>Create your profile during onboarding.</li>
        <li>If you’re booking a session, complete payment and then choose an available slot.</li>
      </ol>
    ),
  },
  {
    category: "Advisory",
    q: "What happens after I book an advisory session?",
    a: (
      <>
        After payment is confirmed, you’ll be taken to onboarding to complete a few details. Then you’ll select a session time.
        You’ll receive confirmation and any next steps needed to prepare.
      </>
    ),
  },
  {
    category: "Advisory",
    q: "What kind of topics can I cover in a session?",
    a: (
      <ul className="list-disc pl-5 space-y-2">
        <li>Cashflow and budgeting setup</li>
        <li>Debt payoff strategy</li>
        <li>Savings goals and planning</li>
        <li>Income planning and priorities</li>
        <li>Building a simple, sustainable financial system</li>
      </ul>
    ),
  },
  {
    category: "Payments",
    q: "How do payments work?",
    a: (
      <>
        Payments are processed securely. After checkout, Celerey confirms the payment and automatically unlocks onboarding and
        session booking. If confirmation takes a moment, the page will keep checking until it updates.
      </>
    ),
  },
  {
    category: "Payments",
    q: "My payment is taking long to confirm — what should I do?",
    a: (
      <>
        First, refresh the page once and give it a moment. If you were charged but the status still doesn’t update, contact
        support and share the email/phone used during checkout so we can verify quickly.
      </>
    ),
  },
  {
    category: "Payments",
    q: "Can I get a receipt or proof of payment?",
    a: (
      <>
        Yes. You’ll receive confirmation from the payment provider, and Celerey can also confirm your payment status if you
        contact support.
      </>
    ),
  },
  {
    category: "Tools",
    q: "Are the tools free to use?",
    a: (
      <>
        Many tools can be explored directly. Some experiences (like booking advisory sessions) may require payment. If something
        is paid, you’ll see that clearly before checkout.
      </>
    ),
  },
  {
    category: "Account",
    q: "Do I need an account to use Celerey?",
    a: (
      <>
        You can browse and explore, but for personalized experiences like onboarding, saving progress, or booking a session,
        you’ll need to complete the account/profile flow.
      </>
    ),
  },
  {
    category: "Account",
    q: "Can I update my details after onboarding?",
    a: (
      <>
        Yes. You can update key profile details anytime. If you need help changing something sensitive, support can assist.
      </>
    ),
  },
  {
    category: "Security & Privacy",
    q: "How does Celerey protect my information?",
    a: (
      <>
        Celerey is designed to keep your data protected with secure handling of sensitive information and encrypted transport.
        Access to payment confirmation is handled through the payment provider’s secure flow.
      </>
    ),
  },
  {
    category: "Security & Privacy",
    q: "Does Celerey store my card details?",
    a: (
      <>
        No. Card details are handled by the payment provider. Celerey only receives confirmation details needed to unlock access.
      </>
    ),
  },
];

const categories: Faq["category"][] = [
  "Getting Started",
  "Payments",
  "Advisory",
  "Tools",
  "Security & Privacy",
  "Account",
];

export default function FAQsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f4f3f2] to-white">
        <div className="h-24"></div>
      <div className="container mx-auto max-w-4xl px-4 py-12 sm:py-16">
        {/* Header */}
        <div className="text-center">
          <h1 className="font-serif text-3xl text-neutral-900 sm:text-4xl">FAQs</h1>
          <p className="mt-3 text-sm text-neutral-600 sm:text-base">
            Quick answers to common questions about Celerey, payments, advisory sessions, and tools.
          </p>
        </div>

        {/* Quick actions */}
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button asChild className="h-11 rounded-full bg-[#1B1856] px-6 text-white hover:bg-[#1B1856]/90">
            <Link href="/contact">Contact Support</Link>
          </Button>
          <Button asChild variant="outline" className="h-11 rounded-full border-black/10 px-6">
            <Link href="/tools">Explore Tools</Link>
          </Button>
        </div>

        {/* Content */}
        <div className="mt-10 space-y-8">
          {categories.map((cat) => {
            const items = faqs.filter((f) => f.category === cat);
            return (
              <section key={cat} className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm sm:p-8">
                <div className="mb-5">
                  <h2 className="text-lg font-semibold text-neutral-900">{cat}</h2>
                  <p className="mt-1 text-sm text-neutral-600">
                    {cat === "Getting Started" && "Basics of what Celerey is and how to begin."}
                    {cat === "Payments" && "Checkout, confirmation, and payment troubleshooting."}
                    {cat === "Advisory" && "What sessions cover and what to expect."}
                    {cat === "Tools" && "Using Celerey tools and what’s available."}
                    {cat === "Security & Privacy" && "How data and payments are handled."}
                    {cat === "Account" && "Profile, onboarding, and updates."}
                  </p>
                </div>

                <Accordion type="single" collapsible className="w-full">
                  {items.map((f, idx) => (
                    <AccordionItem key={`${cat}-${idx}`} value={`${cat}-${idx}`} className="border-black/10">
                      <AccordionTrigger className="text-left text-neutral-900 hover:no-underline">
                        {f.q}
                      </AccordionTrigger>
                      <AccordionContent className="text-sm leading-relaxed text-neutral-700">
                        {f.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </section>
            );
          })}
        </div>

        {/* Footer CTA */}
        <div className="mt-10 rounded-3xl border border-black/10 bg-[#1B1856] p-8 text-center text-white">
          <h3 className="text-xl font-semibold">Still have questions?</h3>
          <p className="mt-2 text-sm text-white/80">
            Reach out and we’ll help you get clarity fast.
          </p>
          <div className="mt-5 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild className="h-11 rounded-full bg-white px-6 text-[#1B1856] hover:bg-white/90">
              <Link href="/contact">Contact Support</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="h-11 rounded-full border-white/30 bg-transparent px-6 text-white hover:bg-white/10"
            >
              <Link href="/advisors">Meet Our Advisors</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
