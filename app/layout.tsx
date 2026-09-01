import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kaaldarpan",
  description: "Vedic astrology, Panchang and horoscope",
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
      <body>{children}</body>
    </html>
  );
}