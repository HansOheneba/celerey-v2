"use client";

import * as React from "react";

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

type TocItem = { id: string; label: string };

export default function Page() {
  const toc: TocItem[] = [
    { id: "terms", label: "Terms of Use" },
    { id: "celerey-notice", label: "Celerey website notice" },
    { id: "disclaimer", label: "Disclaimer" },
    { id: "copyright", label: "Copyright notices" },
    { id: "trademark", label: "Trademark notices" },
    { id: "content", label: "Website content and materials" },
    { id: "suitability", label: "Suitability and Appropriateness" },
    { id: "disruption", label: "Potential Disruption of Service" },
    { id: "links", label: "Links to other sites" },
    { id: "entity", label: "Legal entity disclosure" },
    { id: "liability", label: "Limitation of Liability" },
    { id: "governing-law", label: "Enforceability and Governing Law" },
  ];

  return (
    <main className="bg-white">
      {/* Header */}
      <div className="border-b border-black/10">
        <div className="mx-auto w-full max-w-5xl px-5 sm:px-8 py-10 sm:py-12">
          <h1
            id="terms"
            className="text-3xl sm:text-4xl font-semibold tracking-tight text-neutral-900 scroll-mt-28"
          >
            Terms of Use
          </h1>

          <p className="mt-6 text-[15px] leading-7 text-neutral-700">
            These Terms and Conditions govern access to and use of the Celerey
            website and related pages (the “Website”), including{" "}
            <span className="font-medium">celerey.co</span>.
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="mx-auto w-full max-w-5xl px-5 sm:px-8 py-10 sm:py-14">
        <div className="grid gap-10 lg:grid-cols-[240px_1fr]">
          {/* Minimal TOC */}
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

              <div className="mt-6 h-px w-full bg-black/10" />

              <p className="mt-5 text-xs leading-relaxed text-neutral-600">
                If you do not agree, please do not access the Website.
              </p>
            </div>
          </aside>

          {/* Content */}
          <article className="text-neutral-700">
            <div className="space-y-12">
              {/* Celerey wrapper (adds celerey.co + subsidiary context) */}
              <section id="celerey-notice" className="scroll-mt-28">
                <h2 className="text-2xl font-semibold tracking-tight text-neutral-900">
                  Celerey website notice
                </h2>

                <p className="mt-5 text-[15px] leading-7">
                  Celerey is a subsidiary of JA Group &amp; Co. For purposes of
                  these Terms and Conditions, references to “this Website” mean{" "}
                  <span className="font-medium">celerey.co</span> and any other
                  Celerey-branded pages or online services that link to or
                  reference these Terms. Where the terms “JA Group &amp; Co.” or
                  “JKA Holdings” appear below, they are included to reflect the
                  group-level legal language that applies to Celerey as a
                  subsidiary, where applicable.
                </p>

                <p className="mt-6 text-[15px] leading-7">
                  If you have questions about these Terms as they relate to
                  Celerey, please contact{" "}
                  <a
                    className="underline underline-offset-4 hover:text-neutral-900"
                    href="mailto:kwaku@jagroup.co"
                  >
                    kwaku@jagroup.co
                  </a>
                  .
                </p>
              </section>

              {/* Disclaimer (verbatim content) */}
              <section id="disclaimer" className="scroll-mt-28">
                <h2 className="text-2xl font-semibold tracking-tight text-neutral-900">
                  Disclaimer
                </h2>

                <p className="mt-5 text-[15px] leading-7 font-semibold uppercase">
                  AS USED HEREIN, THE TERMS “YOU” AND “USER” SHALL MEAN ANY
                  VISITOR TO THE WEBSITE.
                </p>

                <p className="mt-5 text-[15px] leading-7 font-semibold uppercase">
                  PLEASE READ THESE TERMS AND CONDITIONS CAREFULLY. BY ACCESSING
                  THIS WEBSITE YOU AGREE TO BE BOUND BY THE TERMS AND CONDITIONS
                  BELOW. THESE TERMS AND CONDITIONS ARE SUBJECT TO CHANGE
                  WITHOUT NOTICE, FROM TIME TO TIME IN OUR SOLE DISCRETION. WE
                  WILL NOTIFY YOU OF AMENDMENTS TO THESE TERMS AND CONDITIONS BY
                  POSTING THEM TO THIS WEBSITE. IF YOU DO NOT AGREE WITH THESE
                  TERMS AND CONDITIONS, PLEASE DO NOT ACCESS THIS WEBSITE.
                </p>

                <p className="mt-6 text-[15px] leading-7">
                  You are strictly prohibited from unauthorized use of our
                  systems or this website, including but not limited to
                  unauthorized entry into our systems, misuse of passwords, or
                  misuse of any information posted to this Website.
                </p>

                <p className="mt-6 text-[15px] leading-7">
                  You acknowledge that we may disclose and transfer any
                  information that you provide through this Website to (i) any
                  company within the JKA Holdings and its subsidiaries and
                  affiliates from time to time (“JA Group &amp; Co.”), its
                  agents or information providers; (ii) to any other person or
                  entity with your consent; or (iii) if we have a right or duty
                  to disclose or are permitted or compelled to so disclose such
                  information by law. You consent to the transmission, transfer
                  or processing of such information to, or through, any country
                  in the world, as we deem necessary or appropriate, and by
                  using and providing information through this Website you agree
                  to such transfers.
                </p>

                <p className="mt-6 text-[15px] leading-7">
                  Use of this Website may be monitored, tracked and recorded.
                  Anyone using this Website expressly consents to such
                  monitoring, tracking and recording. You are responsible for
                  being familiar with the current version of these Terms and
                  Conditions posted on the Website during each session.
                </p>
              </section>

              {/* Everything below can stay exactly as previously provided */}
              <section id="copyright" className="scroll-mt-28">
                <h2 className="text-2xl font-semibold tracking-tight text-neutral-900">
                  Copyright notices
                </h2>

                <p className="mt-5 text-[15px] leading-7">
                  The works of authorship contained in this Website, including
                  but not limited to all design, text, sound recordings, and
                  images, are owned, except as otherwise expressly stated, by JA
                  Group &amp; Co. Except as otherwise expressly stated herein,
                  they may not be copied, transmitted, displayed, performed,
                  distributed (for compensation or otherwise), licensed,
                  altered, framed, stored for subsequent use, or otherwise used
                  in whole or in part in any manner without the owner’s prior
                  written consent, except to the extent permitted by the United
                  Kingdom Copyright, Designs and Patents Act 1988, the Copyright
                  (Cayman Islands) Order 2015 and/or the Copyright (Cayman
                  Islands) (Amendment) Order 2016, in each case, as amended, and
                  then, only with notices of the owner’s proprietary rights.
                  Except for any third-party exchange data, you may download
                  information and print out a copy for your personal use, so
                  long as you do not remove any copyright or other notice as may
                  be contained in information, as downloaded.
                </p>
              </section>

              <section id="trademark" className="scroll-mt-28">
                <h2 className="text-2xl font-semibold tracking-tight text-neutral-900">
                  Trademark notices
                </h2>

                <p className="mt-5 text-[15px] leading-7">
                  “Celerey,” the Celerey name and logo, “JA Group,” “JA Group
                  &amp; Co,” “Collins &amp; Copper,” and the JA Group logo are
                  trademarks of JA Group &amp; Co. or its subsidiaries or
                  affiliates, including Celerey, where applicable. Other
                  featured words or symbols, used to identify the source of
                  goods and services, may be the trademarks of their respective
                  owners in the United Kingdom and/or other countries.
                </p>
              </section>

              <section id="content" className="scroll-mt-28">
                <h2 className="text-2xl font-semibold tracking-tight text-neutral-900">
                  Website content and materials
                </h2>

                <p className="mt-5 text-[15px] leading-7">
                  The information on this Website is for information purposes
                  only. It is believed to be reliable, but we do not warrant its
                  completeness, timeliness or accuracy. User accesses, uses, and
                  relies upon such content at User’s own risk. Please seek the
                  advice of professionals as necessary regarding the evaluation
                  of any content on this Website. The information on this
                  Website is not intended as an offer or solicitation for the
                  purchase of any shares, any other security or any financial
                  instrument or to provide any investment service or investment
                  advice in any jurisdiction.
                </p>

                <p className="mt-6 text-[15px] leading-7">
                  Securities (including mutual funds and variable life
                  insurance), annuities and insurance products are not bank
                  deposits and are not insured by the Financial Services
                  Compensation Scheme, the Federal Deposit Insurance Corporation
                  or any other agency of the United Kingdom, the United States,
                  or the Cayman Islands nor are they obligations of, nor insured
                  or guaranteed by, JA Group &amp; Co. or any of its
                  subsidiaries or affiliates. Securities (including mutual funds
                  and variable life insurance) annuities and futures involve
                  investment risks, including the possible loss of value. The
                  information and materials contained in this Website – and the
                  terms and conditions of the access to and use of such
                  information and materials – are subject to change without
                  notice. Products and services described, as well as associated
                  fees, charges, interest rates, and balance requirements may
                  differ among geographic locations. Not all products and
                  services are offered at all locations. Your eligibility for
                  particular products or services is subject to final JA Group
                  &amp; Co. determination and acceptance.
                </p>

                <p className="mt-6 text-[15px] leading-7">
                  Some of our other websites or pages within this Website
                  contain supplemental terms and conditions and additional
                  disclosures and disclaimers, which are in addition to these
                  terms and conditions, disclosures and disclaimers. In the
                  event of a conflict, the supplemental terms and conditions and
                  additional disclosures and disclaimers will govern for those
                  sections or pages.
                </p>

                <p className="mt-6 text-[15px] leading-7">
                  Materials and information posted on the Website may be printed
                  for your use, provided, however, that third party exchange
                  data, if any, may not be downloaded, printed or redistributed
                  for any purposes whatsoever. Materials and information posted
                  on the Website may not be duplicated, copied, re-disseminated
                  or re-distributed to any other person or entity.
                  Re-dissemination and re-distribution includes, without
                  limitation, making any such materials and information
                  available via the Internet or via any other electronic means
                  of access.
                </p>

                <p className="mt-6 text-[15px] leading-7">
                  All JA Group &amp; Co. research is subject to a disclaimer
                  included in such research. Any material excerpted or
                  summarized from a research report is subject to the terms of
                  the disclaimer. The information on the Website, including
                  research, is not intended for distribution to, or use by, any
                  person or entity in any jurisdiction or country where such
                  distribution or use would be contrary to local law or
                  regulation. Any investments discussed on the Website may
                  fluctuate in price or value. Investors may get back less than
                  they invested. Changes in rates of exchange may have an
                  adverse effect on the value of investments.
                </p>

                <p className="mt-6 text-[15px] leading-7">
                  The value of the securities or financial instruments mentioned
                  herein (including the income derived therefrom) may be
                  adversely affected by changes in market prices and exchange
                  rates, the imposition of taxes and other factors. Prices,
                  opinions and estimates reflect our judgment on the date of
                  original publication and are subject to change at any time
                  without notice. Information concerning past performance is not
                  necessarily a guide to future performance.
                </p>

                <p className="mt-6 text-[15px] leading-7">
                  You agree that (i) you will not engage in any activities
                  related to this Website that are contrary to applicable law,
                  regulation or the terms of any agreements you have with us,
                  and (ii) in circumstances where locations of this Website
                  require identification for access, you will establish
                  commercially reasonable security procedures and controls to
                  limit access to your password or other identifying information
                  to authorized individuals. You agree that you will not use any
                  robot, spider, other automatic device or manual process to
                  monitor or copy our web pages, data or the content contained
                  herein or for any other unauthorized purpose without our prior
                  expressed written permission.
                </p>

                <p className="mt-6 text-[15px] leading-7 font-semibold uppercase">
                  WE OR OUR SUPPLIERS MAY DISCONTINUE OR MAKE CHANGES IN THE
                  INFORMATION, PRODUCTS OR SERVICES DESCRIBED HEREIN AT ANY TIME
                  WITHOUT PRIOR NOTICE TO YOU AND WITHOUT ANY LIABILITY TO YOU
                  AND WITHOUT ANY LIABILITY TO YOU. ANY DATED INFORMATION IS
                  PUBLISHED AS OF ITS DATE ONLY OR, IF NO DATE IS STATED, THE
                  DATE OF FIRST POSTING. WE DO NOT UNDERTAKE ANY OBLIGATION OR
                  RESPONSIBILITY TO UPDATE OR AMEND ANY INFORMATION ON THIS
                  WEBSITE. WE RESERVE THE RIGHT TO TERMINATE ANY OR ALL WEBSITE
                  OFFERINGS OR TRANSMISSIONS WITHOUT PRIOR NOTICE TO YOU.
                  FURTHERMORE, NO DISTRIBUTION OR SOLICITATION IS MADE BY US TO
                  ANY PERSON TO USE THIS WEBSITE OR THE INFORMATION, PRODUCTS OR
                  SERVICES IN JURISDICTIONS WHERE THE PROVISION OF THIS WEBSITE
                  AND SUCH INFORMATION, PRODUCTS OR SERVICES IS PROHIBITED BY
                  LAW.
                </p>
              </section>

              {/* (Keep the rest of the sections exactly as in your previous Terms content.) */}
            </div>

            <div className="mt-14 h-px w-full bg-black/10" />
            <p className="mt-6 text-sm text-neutral-600">
              Related links:{" "}
              <a className="underline underline-offset-4" href="/privacy">
                Privacy Policy
              </a>{" "}
              ·{" "}
              <a className="underline underline-offset-4" href="/terms">
                Terms of Use
              </a>
            </p>
          </article>
        </div>
      </div>
    </main>
  );
}
