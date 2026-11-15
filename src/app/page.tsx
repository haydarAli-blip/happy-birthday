import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { BirthdayCountdown } from "@/components/BirthdayCountdown";
import { BirthdayMessage } from "@/components/BirthdayMessage";
import { SurpriseMessage } from "@/components/SurpriseMessage";
import { BirthdayWishes } from "@/components/BirthdayWishes";
import { Footer } from "@/components/Footer";
import { BackToTop } from "@/components/BackToTop";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#131118] text-[#F8FAFC] selection:bg-[#FF6B9E]/30 selection:text-white overflow-x-hidden">
      {/* Fixed Navigation Header */}
      <Navbar />

      {/* Main Content Layout */}
      <main className="relative z-10 flex flex-col">
        {/* 1. Hero Section */}
        <HeroSection />

        {/* 2. Birthday Countdown Section */}
        <BirthdayCountdown />

        {/* 3. Birthday Message Card Section */}
        <BirthdayMessage />

        {/* 4. Interactive Birthday Surprise Section */}
        <SurpriseMessage />

        {/* 5. Closing & Birthday Wishes Section */}
        <BirthdayWishes />
      </main>

      {/* Footer */}
      <Footer />

      {/* Back to top interactive helper */}
      <BackToTop />
    </div>
  );
}
