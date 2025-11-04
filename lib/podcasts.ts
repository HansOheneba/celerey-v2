export interface Podcast {
  id: string;
  slug: string;
  title: string;
  host: string;
  duration: string;
  date: string;
  image: string;
  description: string;
  spotifyLink: string;
  spotifyEmbedUrl: string;
  transcript?: string; 
  tags: string[];
}
export const podcasts: Podcast[] = [
  {
    id: "1",
    slug: "ai-in-investing",
    title: "AI in Investing — Smarter Portfolios",
    host: "Celerey Talk Series",
    duration: "28 min",
    date: "2025-09-10",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80",
    description:
      "Explore how AI and machine learning are transforming investment management — from predictive analytics to intelligent asset allocation.",
    spotifyLink: "https://open.spotify.com/show/4rbTr3QpQ6PoGvblp214lw", // Sample show link :contentReference[oaicite:0]{index=0}
    spotifyEmbedUrl:
      "https://open.spotify.com/embed/show/4rbTr3QpQ6PoGvblp214lw",
    tags: ["AI", "Finance", "Innovation"],
  },
  {
    id: "2",
    slug: "psychology-of-money",
    title: "The Psychology of Money",
    host: "Celerey Insights Team",
    duration: "35 min",
    date: "2025-09-05",
    image:
      "https://images.unsplash.com/photo-1604594849809-dfedbc827105?auto=format&fit=crop&w=1200&q=80",
    description:
      "Behavioral finance expert explains how our emotions and biases influence financial success — and how to manage them effectively.",
    spotifyLink: "https://open.spotify.com/episode/3ygRxoD5qx4IyLXeIGyVZT", // Episode link :contentReference[oaicite:1]{index=1}
    spotifyEmbedUrl:
      "https://open.spotify.com/embed/episode/3ygRxoD5qx4IyLXeIGyVZT",
    tags: ["Behavioral Finance", "Mindset", "Wealth"],
  },
  {
    id: "3",
    slug: "global-markets-deep-dive",
    title: "Global Markets Deep Dive",
    host: "Celerey Global Team",
    duration: "42 min",
    date: "2025-08-22",
    image:
      "https://images.unsplash.com/photo-1508385082359-f38ae991e8f2?auto=format&fit=crop&w=1200&q=80",
    description:
      "Trends shaping global wealth creation in emerging economies, and what investors should know about 2025’s fast-changing financial landscape.",
    spotifyLink: "https://open.spotify.com/episode/3ygRxoD5qx4IyLXeIGyVZT", // Episode link :contentReference[oaicite:1]{index=1}
    spotifyEmbedUrl:
      "https://open.spotify.com/embed/episode/3ygRxoD5qx4IyLXeIGyVZT",
    tags: ["Global Markets", "Investing", "Economy"],
  },
];
