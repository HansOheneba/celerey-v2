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
    title: "2026 Market Outlook",
    description:
      "A forward-looking analysis of the global investment landscape as economies move from extreme volatility toward gradual normalization. The report explores easing inflation, cautious interest-rate cuts, regional growth differences, the rising impact of artificial intelligence, and practical portfolio strategies focused on quality, income, and diversification.",
    coverImage:
      "https://images.squarespace-cdn.com/content/v1/65ba13d52ed18742d3b5c312/16e66a77-434f-4338-98b4-8f1119d107a9/MO2026.png?format=2500w",
    pdfUrl: "https://www.celerey.co/s/2026-Market-Outlook-Celerey.pdf",
    date: "2026-02-01",
    category: "Outlook",
    tags: ["Outlook", "Ghana", "Macro"],
  },
  {
    id: "2",
    title: "Q4 Economic Update 2025",
    description:
      "A concise overview of key economic developments in the final quarter of 2025, covering inflation trends, interest-rate expectations, global growth patterns, and the implications for investors heading into 2026. The update highlights shifting policy signals, regional market dynamics, and practical considerations for portfolio positioning.",
    coverImage:
      "https://images.squarespace-cdn.com/content/v1/65ba13d52ed18742d3b5c312/a27958d7-f330-426f-ba9e-028e4d32e4ff/Q4.png?format=2500w",
    pdfUrl: "https://www.celerey.co/s/Q4-Economic-Update-2025-Celerey.pdf",
    date: "2026-01-22",
    category: "Economic Update",
    tags: ["Risk", "Framework"],
  },
];
