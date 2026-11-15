"use client";

import React from "react";
import { BIRTHDAY_CONFIG } from "@/config/birthdayData";
import { Heart, Sparkles } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="relative bg-[#100E14] border-t border-[rgba(255,107,158,0.15)] py-12 px-4 sm:px-6 text-center text-xs text-[#7E778B]">
      <div className="max-w-4xl mx-auto flex flex-col items-center gap-4">
        {/* Monogram */}
        <div className="flex items-center gap-2 text-[#FF6B9E]">
          <Sparkles className="w-3.5 h-3.5" />
          <span className="font-display text-sm tracking-widest text-[#F8FAFC]">
            {BIRTHDAY_CONFIG.recipientName}
          </span>
          <span className="text-[#FF6B9E]">✦</span>
          <span>16 November 2026</span>
        </div>

        <p className="text-xs text-[#B8B2C2] max-w-md">
          A dedicated birthday tribute crafted with warm thoughts, cherished memories, and heartfelt prayers.
        </p>

        <div className="flex items-center gap-1.5 text-[11px] text-[#7E778B] pt-2">
          <span>Made with</span>
          <Heart className="w-3.5 h-3.5 text-[#FF6B9E] fill-[#FF6B9E]" />
          <span>for a special friend&apos;s special day</span>
        </div>
      </div>
    </footer>
  );
};

