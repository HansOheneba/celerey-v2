export interface ResearchPaper {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  pdfUrl: string;
  date: string;
  category: string; // e.g., "Outlook", "Framework", "Research Note"
  pageCount?: number;
  tags: string[];
}

export const researchPapers: ResearchPaper[] = [
  {
    id: "1",
    title: "2026 Wealth Outlook — Ghana & Emerging Markets",
    description:
      "A grounded view on macro signals, portfolio positioning, and investor behavior across emerging markets with focus on Ghana's financial landscape.",
    coverImage:
      "https://images.unsplash.com/photo-1454165205744-3b78555e5572?auto=format&fit=crop&w=1200&q=80",
    pdfUrl: "/pdfs/2026-wealth-outlook.pdf",
    date: "2026-01-15",
    category: "Market Outlook",
    pageCount: 24,
    tags: ["Emerging Markets", "Ghana", "Macro Analysis", "2026"],
  },
  {
    id: "2",
    title: "Risk & Resilience Playbook",
    description:
      "A research-backed approach to protecting downside while staying invested. Practical frameworks for risk management in volatile markets.",
    coverImage:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80",
    pdfUrl: "/pdfs/risk-resilience-playbook.pdf",
    date: "2025-12-10",
    category: "Investment Framework",
    pageCount: 18,
    tags: ["Risk Management", "Portfolio Strategy", "Resilience"],
  },
  {
    id: "3",
    title: "Investor Psychology — What Actually Moves Decisions",
    description:
      "Patterns that quietly shape outcomes: fear, greed, recency bias, and discipline. Understanding the behavioral side of wealth building.",
    coverImage:
      "https://images.unsplash.com/photo-1523289333742-be1143f6b766?auto=format&fit=crop&w=1200&q=80",
    pdfUrl: "/pdfs/investor-psychology.pdf",
    date: "2025-11-20",
    category: "Behavioral Finance",
    pageCount: 15,
    tags: ["Psychology", "Behavioral Finance", "Decision Making"],
  },
  {
    id: "4",
    title: "The Alternative Assets Primer",
    description:
      "Beyond stocks and bonds: a practical guide to private equity, real estate, and alternative investments for sophisticated portfolios.",
    coverImage:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    pdfUrl: "/pdfs/alternative-assets-primer.pdf",
    date: "2025-10-05",
    category: "Asset Allocation",
    pageCount: 22,
    tags: ["Alternative Assets", "Private Equity", "Real Estate"],
  },
  {
    id: "5",
    title: "Tax-Efficient Wealth Strategies for High Earners",
    description:
      "Strategic approaches to minimize tax burden while maximizing wealth accumulation and preservation across different income levels.",
    coverImage:
      "https://images.unsplash.com/photo-1554224154-26032ffc0d07?auto=format&fit=crop&w=1200&q=80",
    pdfUrl: "/pdfs/tax-efficient-strategies.pdf",
    date: "2025-09-18",
    category: "Tax Planning",
    pageCount: 20,
    tags: ["Tax Strategy", "Wealth Preservation", "High Net Worth"],
  },
  {
    id: "6",
    title: "Generational Wealth Transfer Guide",
    description:
      "Comprehensive framework for passing wealth across generations while maintaining values, minimizing taxes, and ensuring financial literacy.",
    coverImage:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1200&q=80",
    pdfUrl: "/pdfs/generational-wealth-transfer.pdf",
    date: "2025-08-25",
    category: "Estate Planning",
    pageCount: 28,
    tags: ["Legacy", "Estate Planning", "Generational Wealth"],
  },
];
