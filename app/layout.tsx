import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Image from "next/image";

// PP Cirka Font (note the correct spelling: Cirka, not Circa)
const ppCirka = localFont({
  src: [
    {
      path: "./fonts/ppcirka/PPCirka-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "./fonts/ppcirka/PPCirka-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/ppcirka/PPCirka-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/ppcirka/PPCirka-Semibold.otf",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-pp-cirka",
});

// Helvetica Font
const helvetica = localFont({
  src: [
    {
      path: "./fonts/helvetica/HelveticaNeueThin.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "./fonts/helvetica/HelveticaNeueLight.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/helvetica/HelveticaNeueRoman.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/helvetica/HelveticaNeueMedium.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/helvetica/HelveticaNeueBold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/helvetica/HelveticaNeueHeavy.otf",
      weight: "800",
      style: "normal",
    },
    {
      path: "./fonts/helvetica/HelveticaNeueBlackItalic.otf",
      weight: "900",
      style: "italic",
    },
    // Italic variants
    {
      path: "./fonts/helvetica/HelveticaNeueItalic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "./fonts/helvetica/HelveticaNeueLightItalic.otf",
      weight: "300",
      style: "italic",
    },
    {
      path: "./fonts/helvetica/HelveticaNeueMediumItalic.otf",
      weight: "600",
      style: "italic",
    },
    {
      path: "./fonts/helvetica/HelveticaNeueBoldItalic.otf",
      weight: "700",
      style: "italic",
    },
    {
      path: "./fonts/helvetica/HelveticaNeueHeavyItalic.otf",
      weight: "800",
      style: "italic",
    },
  ],
  variable: "--font-helvetica",
});

export const metadata: Metadata = {
  title: "Celerey | Personalized Wealth Planning For Everyone",
  description:
    "Celerey is an advanced wealth planning platform that helps you grow, protect, and optimize your assets through personalized strategies, tax-aware guidance, and secure, intuitive tools. Build your financial future with clarity and confidence.",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${ppCirka.variable} ${helvetica.variable} antialiased`}>
        <Image
          src="/logos/logoDark.png"
          alt=""
          width={1}
          height={1}
          priority
          className="hidden"
        />

        {children}
      </body>
    </html>
  );
}
