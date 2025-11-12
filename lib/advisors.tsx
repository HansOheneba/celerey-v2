// lib/advisors.ts
export interface Advisor {
  id: number;
  slug: string;
  name: string;
  title: string;
  bio: string;
  experience: string;
  expertise: string[];
  image?: string;
  created_at?: string;
  updated_at?: string;
}

// export const advisors: Advisor[] = [
//   {
//     slug: "jude-addo",
//     name: "Jude Addo",
//     title: "Co-Founder and CEO",
//     bio: `Jude Addo has an exceptional track record of building and leading wealth management franchises for both global banks and entrepreneurial ventures. With over a decade of experience in financial services, Jude has advised clients across more than 20 countries worldwide, managing lifetime assets under management (AUM) of $250 million.

// As the Founder and CEO of JA Group, Jude leads a dynamic team of investors, wealth managers, advisors, and real estate developers committed to helping individuals, businesses, and governments raise capital, grow wealth, and make a meaningful societal impact. Since founding JA Group in 2019, Jude has scaled assets under management to over $150 million, launched three new business lines, and developed a proprietary high-yield fixed income strategy that consistently delivers benchmark-beating returns.

// Prior to founding JA Group, he served as Director and Market Head of Private Banking at Standard Chartered in London, where he led the offshore wealth management business for West African clients, generating substantial new business and delivering innovative wealth planning solutions. He also played a pivotal role as Director of Transaction Banking at Standard Chartered, spearheading the “Banking Sustainable Ecosystems” program to support underserved communities.

// Earlier in his career, Jude held senior positions at J.P. Morgan in London, managing multi-product corporate banking relationships and honing expertise in credit, asset management, working capital, and risk management solutions.

// Beyond JA Group, Jude is Co-Founder and Venture Partner at Cornerstone VC, a pioneering £25 million fund backing diverse founders across the UK, and Co-Founder of Greenwood Partners LLP, an angel syndicate supporting underrepresented entrepreneurs.

// As a Trustee on the UK Board of World Vision—the world’s largest children’s charity—Jude contributes to strategic initiatives supporting disadvantaged children globally.

// He holds a Diploma in Investment Advice from the Chartered Institute of Securities and Investment (CISI) in the UK and a B.Sc. in Business Administration from Bryant University (USA), graduating Magna Cum Laude as a William E. Trueheart Scholar.`,
//     experience:
//       "Founder & CEO of JA Group; Co-Founder of Cornerstone VC; former Director at Standard Chartered and J.P. Morgan.",
//     expertise: [
//       "Wealth Management Leadership",
//       "Entrepreneurship & Fund Strategy",
//       "Private Banking & Corporate Finance",
//       "Investment Advisory & Capital Raising",
//       "Social Impact & Financial Inclusion",
//     ],
//     image: "/advisors/jude.jpg",
//   },
//   {
//     slug: "anna-agyekum",
//     name: "Anna Agyekum",
//     title: "International Property Consultant",
//     bio: `With over 24 years of experience in the real estate industry, Anna Agyekum is a seasoned property consultant and investor with a proven track record in both the UK and Ghana. Specializing in private clients, she is dedicated to helping individuals secure the best properties for both lifestyle and investment purposes.

// Her expertise extends beyond the UK and Ghana, with a strong focus on assisting the diaspora in safely investing in Ghana, South Africa, and East Africa. Passionate about Africa’s potential, Anna is committed to creating opportunities for sustainable investment and empowering her clients to make informed decisions in some of the continent’s most dynamic markets.

// With deep knowledge of both international and African property markets, Anna delivers bespoke solutions tailored to her client’s needs, ensuring exceptional results and long-term value.`,
//     experience:
//       "Specializes in international and African real estate investment, serving private clients and diaspora investors.",
//     expertise: [
//       "Extensive Real Estate Experience",
//       "Private Client Specialist",
//       "Diaspora Investment Expertise",
//       "Passion for Sustainable Investment",
//       "Tailored Property Solutions",
//     ],
//     image: "/advisors/anna.jpg",
//   },
//   {
//     slug: "christian-hamberger",
//     name: "Christian Hamberger",
//     title: "Wealth Management Consultant",
//     bio: `Christian is a highly accomplished banking professional with over 25 years of leadership experience across major financial hubs, including Frankfurt, London, Johannesburg, and Zurich. He began his career in investment banking at ABN Amro in London and has since held key roles at Merrill Lynch, Standard Chartered Bank, and Credit Suisse.

// Notably, Christian led Standard Chartered's Financial Institutions Capital Markets business across Sub-Saharan Africa and served as a senior banker managing European banking relationships at Credit Suisse.

// Now the COO and Senior Client Director at JA Group, Christian leverages his extensive expertise in strategic initiatives and wealth management, serving as a key advisor for Celerey.`,
//     experience:
//       "25+ years of experience in investment banking, capital markets, and high-net-worth advisory.",
//     expertise: [
//       "Banking & Financial Leadership",
//       "Investment Banking Expertise",
//       "Capital Markets & Institutional Finance",
//       "High-Net-Worth Client Advisory",
//       "Global Experience Across Major Financial Hubs",
//     ],
//     image: "/advisors/christian.jpg",
//   },
//   {
//     slug: "francis-gill",
//     name: "Francis Gill",
//     title: "Wealth Strategy Expert",
//     bio: `Francis Gill is a seasoned financial adviser and CEO of Humboldt Financial, a leading financial advisory firm in London. With extensive expertise in tax planning—including income, capital gains, and inheritance—alongside retirement planning and tax-efficient investments, Francis is known for delivering tailored, practical solutions that help clients secure their financial futures.

// Renowned for his meticulous attention to detail and client-first approach, Francis has worked with a diverse range of professionals, including solicitors, banking executives, entrepreneurs, and business owners.`,
//     experience:
//       "CEO of Humboldt Financial, specializing in tax planning, wealth preservation, and retirement strategies.",
//     expertise: [
//       "Expertise in Tax Planning & Wealth Preservation",
//       "Retirement & Investment Strategy Specialist",
//       "Strong Analytical & Problem-Solving Skills",
//       "Client-Centric & Detail-Oriented Approach",
//       "Proven Track Record in Financial Advisory Leadership",
//     ],
//     image: "/advisors/francis.jpg",
//   },
//   {
//     slug: "jerran-whyte",
//     name: "Jerran Whyte",
//     title: "Wealth Management Expert",
//     bio: `Jerran Whyte is a highly accomplished wealth management expert with extensive experience in financial advisory, planning, and investment management. He is the Founder and Managing Director of Belvedere Wealth Management in London and Belvedere Group in Windhoek, Namibia. Both firms are fully regulated, providing bespoke wealth management solutions to clients worldwide.`,
//     experience:
//       "Specializes in investment planning, tax strategies, and estate planning for individuals and businesses worldwide.",
//     expertise: [
//       "Wealth Management & Investment Expertise",
//       "Pension Advice & Estate Planning",
//       "Tax Mitigation Strategies",
//       "Personal & Corporate Finance Solutions",
//       "Global Wealth Management Experience",
//     ],
//     image: "/advisors/jerran.jpg",
//   },
//   {
//     slug: "chris-curtis",
//     name: "Chris Curtis",
//     title: "Wealth Consultant",
//     bio: `Chris is a seasoned Wealth Consultant with over 30 years of experience in financial services, specializing in investments, high-value mortgages, pensions, and sustainable investments for private clients, corporations, and trustees.`,
//     experience:
//       "Chartered Member of the Chartered Institute for Securities & Investments; accredited in investment and mortgage advice.",
//     expertise: [
//       "Extensive Financial Services Experience",
//       "Expertise in Investments and High-Value Mortgages",
//       "Chartered Member of CISI",
//       "Leadership at Top Financial Institutions",
//       "International Experience (Jersey, Gibraltar, Spain)",
//     ],
//     image: "/advisors/chris.jpg",
//   },
//   {
//     slug: "william-takyi",
//     name: "William Takyi",
//     title: "Wealth Management Advisor",
//     bio: `William is a seasoned financial strategist with extensive experience in wealth management, financial planning, and investment analysis. He has held key roles at NatWest and Coutts in the United Kingdom, where he specialized in portfolio management, tax-efficient investments, and financial planning for high-net-worth clients.`,
//     experience:
//       "Leverages deep investment and risk expertise to design strategies that help clients achieve long-term success.",
//     expertise: [
//       "Wealth Management Expertise",
//       "Investment & Risk Strategy",
//       "High-Net-Worth Client Advisory",
//       "Tax-Efficient Financial Planning",
//       "Strategic Portfolio Optimization",
//     ],
//     image: "/advisors/william.jpg",
//   },
//   {
//     slug: "beau-pk-sackey",
//     name: "Beau PK Sackey",
//     title: "Global Business Strategist",
//     bio: `Beau PK Sackey is a highly effective and multifaceted global business executive with over 18 years of experience in exports and trade, strategic initiatives, program and project management, and management consulting.`,
//     experience:
//       "Renowned for business turnarounds and operational excellence across banking, telecom, and manufacturing sectors.",
//     expertise: [
//       "Strategic Business Leadership",
//       "Program & Project Management",
//       "Business Turnarounds",
//       "Cross-Industry Consulting",
//       "Team Empowerment",
//     ],
//     image: "/advisors/beau.jpg",
//   },
//   {
//     slug: "liz-jones",
//     name: "Liz Jones",
//     title: "Executive Coach & Organisational Strategist",
//     bio: `Liz Jones is a seasoned executive coach and strategist with over 30 years of experience helping leaders align people, purpose, and performance. Her career includes senior leadership at Pfizer and advisory roles for leading African innovators.`,
//     experience:
//       "Founder of Amal Consulting; supports CEOs and founders across fintech, healthcare, and agriculture sectors.",
//     expertise: [
//       "Leadership Development",
//       "Organisational Strategy",
//       "Executive Coaching",
//       "Cross-Cultural Business Insight",
//       "People-Centred Change Management",
//     ],
//     image: "/advisors/liz.jpg",
//   },
//   {
//     slug: "lady-ann-essuman",
//     name: "Lady-Ann Essuman",
//     title: "Corporate Lawyer & Legal Strategist",
//     bio: `Lady-Ann Essuman is a corporate and commercial lawyer with over a decade of experience guiding businesses through restructuring, compliance, governance, and negotiations.`,
//     experience:
//       "Founder and Managing Attorney of VINT & Aletheia; serves on national boards including the Office of the Registrar of Companies and the Council on Foreign Relations, Ghana.",
//     expertise: [
//       "Corporate Law Expertise",
//       "Strategic Leadership",
//       "Regulatory Compliance",
//       "Client-Centered Advocacy",
//       "Mental Health Advocacy",
//     ],
//     image: "/advisors/ladyann.jpg",
//   },
// ];
