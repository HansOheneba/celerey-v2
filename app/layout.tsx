import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

// --- PP Cirka ---
const ppCirka = localFont({
  src: [
    {
      path: "../public/fonts/ppcirka/PPCirka-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/ppcirka/PPCirka-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/ppcirka/PPCirka-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/ppcirka/PPCirka-Semibold.woff2",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-ppcirka",
  display: "swap",
});

// --- Helvetica Neue ---
const helveticaNeue = localFont({
  src: [
    {
      path: "../public/fonts/helvetica/HelveticaNeueThin.otf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../public/fonts/helvetica/HelveticaNeueLight.otf",
      weight: "300",
      style: "normal",
    },
   
   
  ],
  variable: "--font-helvetica",
  display: "swap",
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
      <body
        className={`${ppCirka.variable} ${helveticaNeue.variable} antialiased font-cirka`}
      >
        {children}
      </body>
    </html>
  );
}
