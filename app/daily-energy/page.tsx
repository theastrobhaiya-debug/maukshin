import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Daily Energy Check | Mauksh",
  description:
    "Check your daily energy using numerology and discover practical guidance for navigating your day.",
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}