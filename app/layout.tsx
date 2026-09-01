import type { Metadata } from "next";
import "./globals.css";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "KaalDarpan — Vedic Astrology",
    template: "%s — KaalDarpan",
  },

  description:
    "KaalDarpan brings Vedic astrology and planetary wisdom into a simple modern experience.",

  icons: {
    icon: "/assets/kaaldarpan-logo.png",
    apple: "/assets/kaaldarpan-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />

        <main>
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}