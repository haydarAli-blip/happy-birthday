import HeroSection from "@/components/HeroSection";
import BirthdayCountdown from "@/components/BirthdayCountdown";
import BirthdayMessage from "@/components/BirthdayMessage";
import MemoryGallery from "@/components/MemoryGallery";
import SurpriseMessage from "@/components/SurpriseMessage";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import MusicPlayer from "@/components/MusicPlayer";

export default function Home() {
  return (
    <>
      <Navbar />
      <MusicPlayer />
      <main>
        <HeroSection />
        <BirthdayCountdown />
        <BirthdayMessage />
        <MemoryGallery />
        <SurpriseMessage />
      </main>
      <Footer />
    </>
  );
}
