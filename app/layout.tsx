import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ville Syrjälä | Product-focused software developer",
  description:
    "Portfolio and case studies for Ville Syrjälä, a software developer focused on product execution, interface systems, and maintainable architecture.",
};

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
