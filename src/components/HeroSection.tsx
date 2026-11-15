"use client";

import React from "react";
import { BIRTHDAY_CONFIG } from "@/config/birthdayData";
import { Calendar, Gift, Heart, Sparkles } from "lucide-react";

export const HeroSection: React.FC = () => {
  const scrollTo = (targetId: string) => {
    const el = document.getElementById(targetId);
    if (el) {
      const navOffset = 80;
      const elementPosition = el.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - navOffset,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 overflow-hidden"
    >
      {/* Delicate background lighting - subtle dark rose radial glow on one side */}
      <div
        className="absolute top-1/4 -right-16 w-96 h-96 rounded-full bg-[#FF6B9E]/8 blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-10 -left-16 w-80 h-80 rounded-full bg-[#A78BFA]/5 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      {/* Subtle micro dot grid overlay */}
      <div
        className="absolute inset-0 bg-micro-dots opacity-40 pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative max-w-4xl mx-auto text-center flex flex-col items-center">
        {/* Top delicate badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1C1923] border border-[rgba(255,107,158,0.25)] text-[#FF6B9E] text-xs tracking-widest font-medium uppercase mb-8 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-[#FF6B9E]" />
          <span>{BIRTHDAY_CONFIG.hero.badge}</span>
        </div>

        {/* Date capsule */}
        <div className="inline-flex items-center gap-2 text-xs text-[#B8B2C2] tracking-wider mb-6">
          <Calendar className="w-3.5 h-3.5 text-[#FF6B9E]" />
          <span className="font-medium">{BIRTHDAY_CONFIG.hero.dateTag}</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-display font-medium tracking-tight text-[#F8FAFC] leading-[1.12] mb-6 max-w-3xl">
          <span className="block text-2xl sm:text-3xl md:text-4xl font-normal text-[#B8B2C2] mb-2">
            {BIRTHDAY_CONFIG.hero.headlinePrefix}
          </span>
          <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#F8FAFC] via-[#FFE2ED] to-[#FF6B9E]">
            {BIRTHDAY_CONFIG.recipientName}
          </span>
        </h1>

        {/* Subheadline personal */}
        <p className="text-base sm:text-lg md:text-xl text-[#B8B2C2] max-w-2xl font-normal leading-relaxed mb-10">
          {BIRTHDAY_CONFIG.hero.subheadline}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          {/* Primary Button */}
          <button
            onClick={() => scrollTo("surprise")}
            className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#FF6B9E] text-[#131118] font-semibold text-sm hover:bg-[#ff528d] transition-all duration-300 shadow-[0_4px_20px_rgba(255,107,158,0.3)] hover:shadow-[0_6px_28px_rgba(255,107,158,0.45)] hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2.5"
          >
            <Gift className="w-4 h-4" />
            <span>{BIRTHDAY_CONFIG.hero.primaryButtonText}</span>
          </button>

          {/* Secondary Button */}
          <button
            onClick={() => scrollTo("message")}
            className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#1C1923] text-[#F8FAFC] border border-[rgba(255,107,158,0.22)] font-medium text-sm hover:bg-[#262130] hover:border-[#FF6B9E]/50 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2.5"
          >
            <Heart className="w-4 h-4 text-[#FF6B9E]" />
            <span>{BIRTHDAY_CONFIG.hero.secondaryButtonText}</span>
          </button>
        </div>

        {/* Elegant minimal hairline divider ornament */}
        <div className="mt-16 flex items-center justify-center gap-3 text-xs text-[#7E778B]">
          <span className="w-8 h-[1px] bg-gradient-to-r from-transparent to-[rgba(255,107,158,0.3)]" />
          <span className="text-[#FF6B9E]/60 text-xs">✦</span>
          <span className="w-8 h-[1px] bg-gradient-to-l from-transparent to-[rgba(255,107,158,0.3)]" />
        </div>
      </div>
    </section>
  );
};

