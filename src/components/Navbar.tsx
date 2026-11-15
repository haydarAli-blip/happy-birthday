"use client";

import React, { useState, useEffect } from "react";
import { BIRTHDAY_CONFIG } from "@/config/birthdayData";
import { MusicPlayer } from "./MusicPlayer";
import { Menu, X, Sparkles } from "lucide-react";

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      // Section tracking
      const sections = ["hero", "countdown", "message", "surprise", "wishes"];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetId = href.replace("#", "");
    const element = document.getElementById(targetId);
    if (element) {
      const navOffset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - navOffset,
        behavior: "smooth",
      });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#131118]/85 backdrop-blur-md border-b border-[rgba(255,107,158,0.18)] py-3 shadow-[0_4px_30px_rgba(0,0,0,0.4)]"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Brand / Monogram */}
        <a
          href="#hero"
          onClick={(e) => scrollToSection(e, "#hero")}
          className="group flex items-center gap-2 text-sm font-semibold tracking-wider text-[#F8FAFC] transition-colors"
        >
          <span className="w-7 h-7 rounded-full bg-[#1C1923] border border-[rgba(255,107,158,0.25)] flex items-center justify-center text-[#FF6B9E] group-hover:border-[#FF6B9E]/50 group-hover:scale-105 transition-all">
            <Sparkles className="w-3.5 h-3.5" />
          </span>
          <span className="font-display tracking-normal text-base font-medium">
            Najwa<span className="text-[#FF6B9E]">.</span>
          </span>
          <span className="hidden sm:inline-block text-[11px] uppercase tracking-widest text-[#B8B2C2] pl-2 border-l border-[#282332]">
            16 Nov 2026
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 bg-[#1C1923]/60 backdrop-blur-sm px-3 py-1.5 rounded-full border border-[rgba(255,107,158,0.15)]">
          {BIRTHDAY_CONFIG.navLinks.map((link) => {
            const isActive = activeSection === link.href.replace("#", "");
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className={`relative px-3.5 py-1 text-xs font-medium rounded-full transition-all duration-200 ${
                  isActive
                    ? "text-[#F8FAFC] bg-[#FF6B9E]/15 border border-[#FF6B9E]/30"
                    : "text-[#B8B2C2] hover:text-[#F8FAFC] hover:bg-white/5"
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Right side: Music Player + Mobile Hamburger */}
        <div className="flex items-center gap-3">
          <MusicPlayer compact />

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-[#1C1923] text-[#B8B2C2] hover:text-white border border-[rgba(255,107,158,0.2)]"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#1C1923] border-b border-[rgba(255,107,158,0.2)] px-6 py-4 mt-2 space-y-2 shadow-2xl animate-in slide-in-from-top-2 duration-200">
          {BIRTHDAY_CONFIG.navLinks.map((link) => {
            const isActive = activeSection === link.href.replace("#", "");
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className={`block px-4 py-2 text-sm rounded-lg transition-colors ${
                  isActive
                    ? "text-[#FF6B9E] bg-[#FF6B9E]/10 font-medium"
                    : "text-[#B8B2C2] hover:text-[#F8FAFC] hover:bg-[#25212F]"
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </div>
      )}
    </header>
  );
};

