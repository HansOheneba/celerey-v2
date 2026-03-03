"use client";

import * as React from "react";

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

type TocItem = { id: string; label: string };

export default function Page() {
  const updated = "March 3, 2026";

  const toc: TocItem[] = [
    { id: "privacy-policy", label: "Privacy Policy" },
    { id: "privacy-principles", label: "Privacy Principles" },
    { id: "legal-basis", label: "Legal basis for processing" },
    { id: "how-we-use", label: "How we use information" },
    {
      id: "data-minimisation",
      label: "Data minimisation, accuracy, and retention",
    },
    { id: "mobile", label: "Mobile and device information" },
    { id: "sharing", label: "Sharing personal information" },
    { id: "consent-transfers", label: "Consent and transfers" },
    { id: "rights", label: "Your rights and choices" },
    { id: "advertising", label: "Online activity and advertising" },
    { id: "policy-changes", label: "Policy changes" },
    { id: "contact", label: "Contact us" },
  ];

  return (
    <main className="bg-white">
      {/* Top doc header */}
      <div className="border-b border-black/10">
        <div className="mx-auto w-full max-w-5xl px-5 sm:px-8 py-10 sm:py-12">
          <h1
            id="privacy-policy"
            className="text-3xl sm:text-4xl font-semibold tracking-tight text-neutral-900 scroll-mt-28"
          >
            Privacy Policy
          </h1>

          <p className="mt-3 text-sm text-neutral-600">
            <span className="font-medium text-neutral-700">Last updated:</span>{" "}
            {updated}
          </p>

          <p className="mt-6 text-[15px] leading-7 text-neutral-700">
            Celerey is a subsidiary of JA Group &amp; Co. and, as such, we
            follow JA Group &amp; Co.&apos;s privacy practices and terms where
            applicable. This Online Privacy Policy explains what and how we
            collect, share, use, and protect your personal information when you
            visit or use this and other online services offered by JKA Holdings
            and each of its subsidiaries and affiliates (&quot;JA Group &amp;
            Co.&quot;) that link to or reference this Policy (collectively, our
            &quot;online services&quot;). Contact details are provided below.
            Other privacy principles or policies could apply depending on how
            you interact with us, the financial products or services you may
            ultimately obtain from us, or the jurisdiction in which we are doing
            business with you.
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="mx-auto w-full max-w-5xl px-5 sm:px-8 py-10 sm:py-14">
        <div className="grid gap-10 lg:grid-cols-[240px_1fr]">
          {/* Minimal TOC (document-like, no cards) */}
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <p className="text-xs uppercase tracking-[0.22em] text-neutral-500">
                Contents
              </p>

              <nav className="mt-4 space-y-2">
                {toc.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => scrollToId(t.id)}
                    className="block w-full text-left text-sm text-neutral-700 hover:text-neutral-900"
                  >
                    {t.label}
                  </button>
                ))}
              </nav>

          
             
            </div>
          </aside>

          {/* Content */}
          <article className="text-neutral-700">
            {/* Section helper styles */}
            <div className="space-y-12">
              <section id="privacy-principles" className="scroll-mt-28">
                <h2 className="text-2xl font-semibold tracking-tight text-neutral-900">
                  Privacy Principles
                </h2>

                <p className="mt-5 font-semibold text-neutral-900">
                  Your privacy is important to us.
                </p>

                <h3 className="mt-8 text-lg font-semibold text-neutral-900">
                  We work hard to protect your information.
                </h3>
                <p className="mt-3 text-[15px] leading-7">
                  We take our responsibility to protect the privacy and
                  confidentiality of your information, including personal
                  information, very seriously. We maintain physical, electronic
                  and procedural safeguards that comply with applicable legal
                  standards to secure such information from unauthorised access
                  and use, accidental or unlawful alteration and destruction,
                  and other unlawful or unauthorised forms of Processing. We
                  hold our employees accountable for complying with relevant
                  policies, procedures, rules and regulations concerning the
                  privacy and confidentiality of information.
                </p>

                <h3 className="mt-8 text-lg font-semibold text-neutral-900">
                  We want you to understand the type of information we collect
                  and how we use it.
                </h3>
                <p className="mt-3 text-[15px] leading-7">
                  The types of personal information we collect from you when you
                  visit or use our online services include your name, email
                  address, mailing address, telephone number(s), account
                  numbers, limited location information, user name and password.
                  We may also collect payment card information, National
                  Insurance numbers, Social Security numbers, driver’s license
                  numbers (or comparable), gender, race, nationality, and
                  biometric identifiers when you provide it directly to us while
                  using our online services and where we believe it is
                  reasonably required for ordinary business purposes. In some
                  instances, we create personal information about you, such as
                  records of your interactions with us, and details of your
                  accounts. We do not seek to collect or process sensitive
                  personal information unless it is required or permitted by
                  law; necessary for the detection or prevention of crime;
                  necessary to establish, exercise or defend legal rights; or we
                  have your prior explicit consent.
                </p>

                <p className="mt-6 text-[15px] leading-7">
                  In addition to the personal information described above, we
                  collect certain information about your use of our online
                  services. For example, we capture the IP address of the device
                  you use to connect to the online service, the type of
                  operating system and browser you use, and information about
                  the site you came from, the parts of our online service you
                  access, and the site you visit next. As explained in more
                  detail in our Cookies Policy, we and our third-party partners
                  use cookies (as well as web beacons or other technologies) to
                  collect and store this and other information about your visit
                  to, or use of, our online services. We may later associate the
                  usage and additional information we collect online with
                  personal information about you, as permitted or required by
                  law.
                </p>

                <p className="mt-6 text-[15px] leading-7">
                  We sometimes collect information about you from additional
                  online and offline sources including social media (to the
                  extent you choose to make your personal information public)
                  and commercially available third-party sources, such as credit
                  reporting agencies. We may combine this information with the
                  personal and other information we have collected about you
                  under this Online Privacy Policy.
                </p>
              </section>

              <section id="legal-basis" className="scroll-mt-28">
                <h2 className="text-2xl font-semibold tracking-tight text-neutral-900">
                  Legal basis for processing
                </h2>
                <p className="mt-5 text-[15px] leading-7">
                  Where we are required to establish a legal basis to process
                  your personal information as described in this Online Privacy
                  Policy, we will do so on the basis that we have obtained your
                  prior express consent to the processing; we have a legitimate
                  business interest in the processing that is not overridden by
                  your interests, fundamental rights, or freedoms; or the
                  processing is needed to comply with applicable law, to perform
                  under your contract(s) with us, or to protect the vital
                  interests of any individual.
                </p>
              </section>

              <section id="how-we-use" className="scroll-mt-28">
                <h2 className="text-2xl font-semibold tracking-tight text-neutral-900">
                  How we use information
                </h2>
                <p className="mt-5 text-[15px] leading-7">
                  We use and otherwise process the information we collect from
                  you to help us deliver our online services; to administer,
                  evaluate and improve our business (including developing new
                  products and services, improving existing products and
                  services, performing data analytics and other research tasks,
                  communicating with you via any means, and performing
                  accounting, auditing and other internal functions); manage our
                  risks; to market our services and products; and to comply with
                  and enforce applicable laws and regulations, relevant industry
                  standards, contractual obligations and our policies. We also
                  use data that we collect on an aggregate or anonymous basis
                  (such that it does not identify any individuals or clients)
                  for various business purposes, where permissible under
                  applicable laws and regulations.
                </p>
              </section>

              <section id="data-minimisation" className="scroll-mt-28">
                <h2 className="text-2xl font-semibold tracking-tight text-neutral-900">
                  Data minimisation, accuracy, and retention
                </h2>

                <p className="mt-5 text-[15px] leading-7">
                  We aim to collect only what we need, keep it up-to-date and
                  remove it when we no longer need it. We take reasonable steps
                  to ensure that the personal information we process is limited
                  to what we require in connection with the purposes set out in
                  this Policy; it is accurate and, where necessary, kept up to
                  date; and it is erased or rectified without delay if it is
                  inaccurate. From time to time, we may ask you to confirm the
                  accuracy of your personal information.
                </p>

                <p className="mt-6 text-[15px] leading-7">
                  For some of our online services, you can review or update
                  certain account information by logging in and accessing a user
                  profile section. If you cannot change the incorrect
                  information online, or you prefer to request changes offline,
                  please contact your JA Group &amp; Co. representative using
                  the contact information listed on your statements, records, or
                  other relevant client materials.
                </p>

                <p className="mt-6 text-[15px] leading-7">
                  We will retain copies in a form that permits identification
                  for as long as we deem necessary in connection with the
                  purposes set out in this Policy, unless applicable law
                  requires a longer retention period. In particular, we will
                  retain personal information for as long as it is needed to
                  establish, exercise or defend any legal rights.
                </p>
              </section>

              <section id="mobile" className="scroll-mt-28">
                <h2 className="text-2xl font-semibold tracking-tight text-neutral-900">
                  Mobile and device information
                </h2>
                <p className="mt-5 text-[15px] leading-7">
                  We respect and protect your privacy even when you’re on the
                  go. For your convenience, JA Group &amp; Co. may offer you the
                  ability to access some of our products and services through
                  mobile applications and mobile-optimised websites. When you
                  interact with us through your mobile device, we collect
                  information such as unique device identifiers, screen
                  resolution and other device settings, information about your
                  location, and analytical information about how you use your
                  mobile device. We typically ask your permission before
                  collecting certain information such as precise geolocation
                  information.
                </p>
              </section>

              <section id="sharing" className="scroll-mt-28">
                <h2 className="text-2xl font-semibold tracking-tight text-neutral-900">
                  Sharing personal information
                </h2>

                <p className="mt-5 text-[15px] leading-7">
                  We share personal information with affiliates and with others
                  when we believe it will enhance the services and products we
                  can provide to you or for legal and routine business reasons.
                  We share personal information among our affiliates and
                  business units when we believe it will enhance the services we
                  can provide, but only in circumstances where such sharing
                  conforms to law, any applicable confidentiality agreements,
                  and our policies and practices. Additionally, we reserve the
                  right to share your personal information in connection with a
                  corporate change including a merger, acquisition or sale of
                  all or any relevant portion of our business or assets.
                </p>

                <p className="mt-6 text-[15px] leading-7">
                  We disclose the information we have about you as required or
                  permitted by law. For example, we share information with
                  regulatory authorities and law enforcement officials when we
                  believe in good faith that such disclosure is necessary to
                  comply with legal requirements.
                </p>

                <p className="mt-6 text-[15px] leading-7">
                  We share information with third parties where appropriate to
                  protect against fraud or verify or enforce our terms of use,
                  our other rights, or other applicable policies. From time to
                  time, we enter into agreements with other companies to provide
                  services to us or to make services and products available to
                  you. If these companies receive your personal information,
                  they are required to safeguard it and only use it for those
                  purposes we specify.
                </p>

                <p className="mt-6 text-[15px] leading-7">
                  JA Group &amp; Co. believes that keeping your information
                  secure and private is important, particularly when using
                  third-party websites and applications that can help you invest
                  or manage your finances.
                </p>
              </section>

              <section id="consent-transfers" className="scroll-mt-28">
                <h2 className="text-2xl font-semibold tracking-tight text-neutral-900">
                  Consent and transfers
                </h2>

                <p className="mt-5 text-[15px] leading-7">
                  We can share your personal information with any person or
                  entity if we have your consent to do so. We transmit, transfer
                  or process information to, or through, other countries in the
                  world, as we deem necessary, appropriate or consistent with
                  legal or regulatory obligations.
                </p>

                <p className="mt-6 text-[15px] leading-7">
                  As a global company, we strive to provide you with access to
                  the highest quality financial products and services wherever
                  you are. To do this, we sometimes share your personal
                  information among members of the JA Group &amp; Co. family of
                  companies or service providers and other third parties that
                  are located outside your home country. These countries may
                  have different laws and data protection compliance
                  requirements, with some providing more protection than others.
                  JA Group &amp; Co. will take appropriate steps to ensure your
                  personal information is handled as described in this Online
                  Privacy Policy.
                </p>

                <p className="mt-6 text-[15px] leading-7">
                  Where required, we comply with applicable legal frameworks
                  relating to the transfer of personal information.
                </p>
              </section>

              <section id="rights" className="scroll-mt-28">
                <h2 className="text-2xl font-semibold tracking-tight text-neutral-900">
                  Your rights and choices
                </h2>

                <p className="mt-5 text-[15px] leading-7">
                  We respect your rights concerning the processing of personal
                  information and provide you with relevant and appropriate
                  choices. Depending on how and where you interact with us, you
                  may have a right to one or more of the following with respect
                  to the personal information we process or control:
                </p>

                {/* Bullet list from your source */}
                <ul className="mt-4 list-disc pl-5 space-y-2 text-[15px] leading-7">
                  <li>
                    request access to, or copies of, your personal information,
                    together with details about how we process it;
                  </li>
                  <li>request rectification of any inaccuracies;</li>
                  <li>request erasure or restriction of Processing;</li>
                  <li>object to processing by us or on our behalf;</li>
                  <li>
                    have personal information transferred to another party;
                  </li>
                  <li>withdraw consent to the processing; and</li>
                  <li>
                    lodge complaints with a data protection authority regarding
                    any processing by us or on our behalf.
                  </li>
                </ul>

                <p className="mt-6 text-[15px] leading-7">
                  To exercise one or more of these rights or to ask a question
                  about them, please use the contact details provided below.
                </p>

                <p className="mt-6 text-[15px] leading-7">
                  In addition to the rights you have under applicable data
                  protection laws, we may give you choices regarding the sharing
                  of personal information with affiliates and third parties
                  based on your relationship(s) with us as a financial
                  institution. Choices you have about the sharing of your
                  personal information will be described in the privacy policies
                  or notices you receive from us, such as those provided in
                  connection with particular financial products or services you
                  obtain from us.
                </p>
              </section>

              <section id="advertising" className="scroll-mt-28">
                <h2 className="text-2xl font-semibold tracking-tight text-neutral-900">
                  Online activity and advertising
                </h2>

                <p className="mt-5 text-[15px] leading-7">
                  We respect your decisions about the collection of personal
                  information related to your online activities over time and
                  across different websites for advertising purposes. JA Group
                  &amp; Co. does not allow unaffiliated third parties to collect
                  personal information about your online activities when you
                  visit our online services. Nor do we use personal information
                  collected across non-affiliated websites for the purpose of
                  serving you advertising related to your browsing behaviour. If
                  we engage in this practice in the future, we will provide
                  appropriate notice and choice so that you can opt-out of the
                  practice.
                </p>
              </section>

              <section id="policy-changes" className="scroll-mt-28">
                <h2 className="text-2xl font-semibold tracking-tight text-neutral-900">
                  Policy changes
                </h2>

                <p className="mt-5 text-[15px] leading-7">
                  We may change this Online Privacy Policy from time to time.
                  When we do, we will let you know by appropriate means such as
                  by posting the revised text on this page with a new “Last
                  Updated” date. All changes will become effective when posted
                  unless indicated otherwise. We encourage you to regularly
                  check this page to review any changes we might make.
                </p>
              </section>

              <section id="contact" className="scroll-mt-28">
                <h2 className="text-2xl font-semibold tracking-tight text-neutral-900">
                  Contact us
                </h2>

                <p className="mt-5 text-[15px] leading-7">
                  If you have any comments, questions or concerns about any of
                  the information in this Online Privacy Policy, or any other
                  issues relating to the processing of your personal information
                  by JA Group &amp; Co. under this Policy, please get in touch
                  with your regular JA Group &amp; Co. contact, or:
                </p>

                <address className="mt-5 not-italic text-[15px] leading-7 text-neutral-700">
                  Legal Team, JA Group &amp; Co
                  <br />
                  c/o Walkers Corporate Limited, 190 Elgin Avenue, George Town,
                  <br />
                  Grand Cayman KY1-9008, Cayman Islands
                  <br />
                  Email:{" "}
                  <a
                    className="underline underline-offset-4 hover:text-neutral-900"
                    href="mailto:kwaku@jagroup.co"
                  >
                    kwaku@jagroup.co
                  </a>
                </address>

                <p className="mt-6 text-[15px] leading-7">
                  If you would like to contact the JA Group &amp; Co Data
                  Protection Officer, please send an email to{" "}
                  <a
                    className="underline underline-offset-4 hover:text-neutral-900"
                    href="mailto:kwaku@jagroup.co"
                  >
                    kwaku@jagroup.co
                  </a>
                  .
                </p>
              </section>
            </div>

            {/* End spacing */}
            <div className="mt-14 h-px w-full bg-black/10" />
            <p className="mt-6 text-sm text-neutral-600">
              Related links:{" "}
              <a className="underline underline-offset-4" href="/terms">
                Terms of Service
              </a>{" "}
              ·{" "}
              <a className="underline underline-offset-4" href="/privacy">
                Privacy Policy
              </a>
            </p>
          </article>
        </div>
      </div>
    </main>
  );
}
