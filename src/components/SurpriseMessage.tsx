"use client";

import React, { useState } from "react";
import { BIRTHDAY_CONFIG } from "@/config/birthdayData";
import { Sparkles, Gift, Heart, RotateCcw, Copy, Check } from "lucide-react";

export const SurpriseMessage: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const surprise = BIRTHDAY_CONFIG.surprise;

  const handleCopyCode = () => {
    if (surprise.couponCode) {
      navigator.clipboard.writeText(surprise.couponCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <section id="surprise" className="relative py-24 px-4 sm:px-6 overflow-hidden">
      {/* Background ambient lighting */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#FF6B9E]/5 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-3xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1C1923] border border-[rgba(255,107,158,0.22)] text-[#FF6B9E] text-xs tracking-wider uppercase mb-3">
            <Gift className="w-3.5 h-3.5 text-[#FF6B9E]" />
            <span>{surprise.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-medium text-[#F8FAFC] tracking-tight mb-3">
            {surprise.title}
          </h2>
          <p className="text-sm sm:text-base text-[#B8B2C2]">
            {surprise.subtitle}
          </p>
        </div>

        {/* Interactive Envelope / Keepsake Box */}
        <div className="relative mx-auto max-w-xl">
          {/* Main Envelope Body */}
          <div
            className={`relative bg-[#1C1923] rounded-3xl border border-[rgba(255,107,158,0.25)] p-6 sm:p-10 shadow-[0_12px_40px_rgba(0,0,0,0.5)] transition-all duration-500 overflow-hidden ${
              isOpen
                ? "border-[#FF6B9E]/50 shadow-[0_16px_50px_rgba(255,107,158,0.15)] ring-1 ring-[#FF6B9E]/20"
                : "hover:border-[#FF6B9E]/40"
            }`}
          >
            {/* Shimmer light sweep on open */}
            {isOpen && (
              <div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FF6B9E]/10 to-transparent -translate-x-full animate-[shimmer_1.5s_ease-out_1] pointer-events-none"
                aria-hidden="true"
              />
            )}

            {!isOpen ? (
              /* CLOSED ENVELOPE STATE */
              <div className="py-8 sm:py-12 flex flex-col items-center text-center">
                {/* Wax Seal / Stamp Button */}
                <button
                  onClick={() => setIsOpen(true)}
                  className="group relative w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-[#FF6B9E] via-[#E14B82] to-[#B82B5F] p-[2px] shadow-[0_8px_28px_rgba(255,107,158,0.4)] transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-[#FF6B9E]/30"
                  aria-label="Klik untuk membuka kejutan ulang tahun"
                >
                  <div className="w-full h-full rounded-full bg-[#1C1923] flex flex-col items-center justify-center p-2 text-center transition-colors group-hover:bg-[#231E2D]">
                    <Sparkles className="w-6 h-6 text-[#FF6B9E] mb-1 animate-pulse" />
                    <span className="text-[10px] tracking-widest uppercase font-mono font-bold text-[#FF6B9E]">
                      {surprise.sealText}
                    </span>
                    <span className="text-[8px] text-[#B8B2C2] tracking-tighter">
                      16.11.2026
                    </span>
                  </div>
                </button>

                <h3 className="font-display text-xl sm:text-2xl font-medium text-[#F8FAFC] mt-8 mb-2">
                  Special Delivery for Najwa
                </h3>
                <p className="text-xs sm:text-sm text-[#B8B2C2] max-w-sm mb-6">
                  Ketuk segel di atas atau tombol di bawah untuk membuka pesan rahasia dan kartu ucapan khusus.
                </p>

                <button
                  onClick={() => setIsOpen(true)}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#FF6B9E] text-[#131118] font-semibold text-sm hover:bg-[#ff528d] transition-all duration-300 shadow-[0_4px_16px_rgba(255,107,158,0.3)] hover:-translate-y-0.5 active:translate-y-0"
                >
                  <Gift className="w-4 h-4" />
                  <span>{surprise.buttonLabel}</span>
                </button>
              </div>
            ) : (
              /* OPENED STATE: Secret letter & voucher */
              <div className="py-2 animate-in fade-in zoom-in-95 duration-400 space-y-6">
                {/* Header ribbon */}
                <div className="flex items-center justify-between pb-4 border-b border-[#282332]">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#FF6B9E] animate-ping" />
                    <span className="text-xs font-mono tracking-widest text-[#FF6B9E] uppercase">
                      Unlocked Birthday Keepsake
                    </span>
                  </div>

                  {/* Replay / Close Toggle */}
                  <button
                    onClick={() => setIsOpen(false)}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#25202E] text-xs text-[#B8B2C2] hover:text-[#F8FAFC] hover:bg-[#342D40] transition-colors border border-white/5"
                    title="Simpan kembali amplop"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>{surprise.buttonCloseLabel}</span>
                  </button>
                </div>

                {/* Secret Personal Letter */}
                <div className="bg-[#16131D] p-6 sm:p-8 rounded-2xl border border-[rgba(255,107,158,0.18)]">
                  <p className="font-display text-lg text-[#FF6B9E] mb-3">
                    {surprise.letterHead}
                  </p>
                  <p className="text-sm sm:text-base text-[#F8FAFC] leading-relaxed font-normal mb-4 whitespace-pre-line">
                    {surprise.letterBody}
                  </p>
                  <p className="text-xs italic text-[#A78BFA]">
                    ✦ {surprise.sparkleBlessing}
                  </p>
                </div>

                {/* Birthday Voucher Card */}
                <div className="relative bg-gradient-to-r from-[#201A2B] via-[#2A1E2E] to-[#1F1828] p-5 sm:p-6 rounded-2xl border border-[rgba(255,107,158,0.3)] shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <span className="inline-block text-[10px] font-mono tracking-wider uppercase text-[#FF6B9E] bg-[#FF6B9E]/10 px-2 py-0.5 rounded">
                      Gift Coupon
                    </span>
                    <h4 className="font-display text-base sm:text-lg font-medium text-[#F8FAFC]">
                      {surprise.couponTitle}
                    </h4>
                    <p className="text-xs text-[#B8B2C2]">
                      {surprise.couponDetail}
                    </p>
                  </div>

                  {/* Voucher Code Button */}
                  <div className="w-full sm:w-auto">
                    <button
                      onClick={handleCopyCode}
                      className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#131118] border border-[rgba(255,107,158,0.35)] text-xs font-mono text-[#FF6B9E] hover:border-[#FF6B9E] transition-colors"
                      title="Salin Kode Voucher"
                    >
                      {copied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400">Tersalin!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>{surprise.couponCode}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Warm Footer Note */}
                <div className="pt-2 text-center text-xs text-[#7E778B] flex items-center justify-center gap-1.5">
                  <Heart className="w-3.5 h-3.5 text-[#FF6B9E]" />
                  <span>Dibuat khusus untuk merayakan hari ulang tahunmu.</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

