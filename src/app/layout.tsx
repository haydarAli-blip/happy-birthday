import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const playfairDisplay = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Happy Birthday, Najwa! ✦ 16 November 2026",
  description: "A special birthday greeting and memorable experience crafted with care.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${playfairDisplay.variable} ${plusJakartaSans.variable} scroll-smooth`}>
      <body className="min-h-screen bg-[#131118] text-[#F8FAFC] antialiased selection:bg-[#FF6B9E]/30 selection:text-white">
        {children}
      </body>
    </html>
  );
}
