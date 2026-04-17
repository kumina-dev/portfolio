import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ville Syrjälä | Portfolio",
  description:
    "Software developer portfolio for Ville Syrjälä. TypeScript, React, Next.js, Expo, Go, Prisma, Firebase, Supabase, MySQL.",
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
