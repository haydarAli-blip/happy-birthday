"use client";

import React, { useState } from "react";
import { BIRTHDAY_CONFIG } from "@/config/birthdayData";
import { ChevronDown, ChevronUp, Heart, MailOpen, Quote } from "lucide-react";

export const BirthdayMessage: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section id="message" className="relative py-20 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1C1923] border border-[rgba(255,107,158,0.22)] text-[#FF6B9E] text-xs tracking-wider uppercase mb-3">
            <MailOpen className="w-3.5 h-3.5 text-[#FF6B9E]" />
            <span>{BIRTHDAY_CONFIG.messageCard.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-medium text-[#F8FAFC] tracking-tight mb-2">
            {BIRTHDAY_CONFIG.messageCard.title}
          </h2>
          <p className="text-sm sm:text-base text-[#B8B2C2]">
            {BIRTHDAY_CONFIG.messageCard.subtitle}
          </p>
        </div>

        {/* Message Card Container */}
        <div className="relative bg-[#1C1923] rounded-3xl p-7 sm:p-12 border border-[rgba(255,107,158,0.22)] shadow-[0_8px_36px_rgba(0,0,0,0.35)] overflow-hidden">
          {/* Subtle corner rose glow */}
          <div
            className="absolute top-0 right-0 w-64 h-64 bg-radial from-[#FF6B9E]/8 to-transparent pointer-events-none"
            aria-hidden="true"
          />

          {/* Decorative subtle Quote mark */}
          <div className="absolute top-6 left-6 text-[#FF6B9E]/10 pointer-events-none select-none">
            <Quote className="w-16 h-16 sm:w-20 sm:h-20" />
          </div>

          <div className="relative z-10">
            {/* Header / Subtitle in English */}
            <div className="flex items-center justify-between pb-6 mb-6 border-b border-[#282332]">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-[#25202E] border border-[rgba(255,107,158,0.3)] flex items-center justify-center text-[#FF6B9E]">
                  <Heart className="w-4 h-4 fill-[#FF6B9E]/30 text-[#FF6B9E]" />
                </span>
                <div>
                  <h3 className="font-display text-lg sm:text-xl font-medium text-[#F8FAFC]">
                    Wishing You Grace & Joy
                  </h3>
                  <span className="text-xs text-[#B8B2C2]">November 16, 2026</span>
                </div>
              </div>

              <span className="text-xs font-mono text-[#FF6B9E]/70 bg-[#FF6B9E]/10 px-2.5 py-1 rounded-full border border-[#FF6B9E]/20">
                Personal Note
              </span>
            </div>

            {/* Main Greeting Paragraph */}
            <div className="prose prose-invert max-w-none">
              <p className="text-base sm:text-lg text-[#F8FAFC] leading-relaxed font-normal sm:leading-loose">
                {BIRTHDAY_CONFIG.messageCard.mainParagraph}
              </p>

              {/* Extended Message Container */}
              <div
                className={`grid transition-all duration-500 ease-in-out ${
                  isExpanded ? "grid-rows-[1fr] opacity-100 mt-6 pt-6 border-t border-[#282332]" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden space-y-4">
                  {BIRTHDAY_CONFIG.messageCard.extendedParagraphs.map((para, idx) => (
                    <p
                      key={idx}
                      className="text-base sm:text-lg text-[#B8B2C2] leading-relaxed sm:leading-loose"
                    >
                      {para}
                    </p>
                  ))}

                  <div className="pt-4 border-t border-[#262130]">
                    <p className="italic text-sm text-[#FF6B9E]/90 font-display">
                      {BIRTHDAY_CONFIG.messageCard.signOff}
                    </p>
                    <p className="font-display font-medium text-base text-[#F8FAFC] mt-1">
                      {BIRTHDAY_CONFIG.messageCard.senderName}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Read More / Read Less Toggle */}
            <div className="mt-8 flex justify-center">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#25202E] text-xs sm:text-sm font-medium text-[#F8FAFC] border border-[rgba(255,107,158,0.25)] hover:border-[#FF6B9E]/60 hover:text-[#FF6B9E] transition-all duration-300 hover:shadow-md"
                aria-expanded={isExpanded}
              >
                <span>{isExpanded ? "Tutup Pesan Tambahan" : "Buka Pesan Lengkap"}</span>
                {isExpanded ? (
                  <ChevronUp className="w-4 h-4 text-[#FF6B9E]" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-[#FF6B9E]" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

