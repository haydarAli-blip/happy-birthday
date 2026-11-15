"use client";

import React, { useState, useEffect, useMemo, useSyncExternalStore } from "react";
import { BIRTHDAY_CONFIG } from "@/config/birthdayData";
import { Clock, PartyPopper, Sparkles, CheckCircle2, Heart, Expand, X, Camera } from "lucide-react";
import { BirthdayFireworks } from "./BirthdayFireworks";

type PreviewMode = "live" | "before" | "special_day" | "after";

const emptySubscribe = () => () => {};

export const BirthdayCountdown: React.FC = () => {
  // Target: 16 November 2026 00:00:00 WIB (UTC+7)
  const targetTimestamp = useMemo(() => {
    return new Date(BIRTHDAY_CONFIG.targetIsoDate).getTime();
  }, []);

  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const [currentTime, setCurrentTime] = useState<number | null>(null);
  const [previewMode, setPreviewMode] = useState<PreviewMode>("live");
  const [showFireworks, setShowFireworks] = useState(true);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [photoLoaded, setPhotoLoaded] = useState(false);

  const photoConfig = BIRTHDAY_CONFIG.featuredPhoto;

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentTime(Date.now());
    }, 0);
    const interval = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);
    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (!photoConfig.imageSrc) return;
    const img = new window.Image();
    img.src = photoConfig.imageSrc;
    img.onload = () => setPhotoLoaded(true);
    img.onerror = () => setPhotoLoaded(false);
  }, [photoConfig.imageSrc]);

  // Compute effective difference based on mode or live clock
  const { difference, status } = useMemo(() => {
    let diff: number;

    if (previewMode === "before") {
      // Simulate 5 hours, 24 minutes, 12 seconds remaining
      diff = 5 * 3600 * 1000 + 24 * 60 * 1000 + 12 * 1000;
    } else if (previewMode === "special_day") {
      // Simulate exact birthday day (e.g., 6 hours into Nov 16)
      diff = -6 * 3600 * 1000;
    } else if (previewMode === "after") {
      // Simulate 3 days after birthday
      diff = -3 * 86400 * 1000;
    } else {
      // Live mode
      const now = currentTime ?? targetTimestamp;
      diff = targetTimestamp - now;
    }

    let currentStatus: "before" | "special_day" | "after" = "before";
    if (diff > 0) {
      currentStatus = "before";
    } else if (diff <= 0 && diff > -86400000) {
      // Within the 24 hours of 16 Nov 2026
      currentStatus = "special_day";
    } else {
      currentStatus = "after";
    }

    return { difference: diff, status: currentStatus };
  }, [currentTime, targetTimestamp, previewMode]);

  // Breakdown of units
  const timeUnits = useMemo(() => {
    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }
    const totalSeconds = Math.floor(difference / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return { days, hours, minutes, seconds };
  }, [difference]);

  const padZero = (num: number) => String(num).padStart(2, "0");

  return (
    <section id="countdown" className="relative py-20 px-4 sm:px-6">
      {/* Celebration Fireworks when birthday midnight arrives */}
      <BirthdayFireworks active={mounted && status === "special_day" && showFireworks} />

      {/* Subtle section border accent */}
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1C1923] border border-[rgba(255,107,158,0.22)] text-[#FF6B9E] text-xs tracking-wider uppercase mb-3">
            <Clock className="w-3.5 h-3.5 text-[#FF6B9E]" />
            <span>{BIRTHDAY_CONFIG.countdown.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-medium text-[#F8FAFC] tracking-tight mb-3">
            {status === "special_day"
              ? BIRTHDAY_CONFIG.countdown.celebrationTitle
              : status === "after"
              ? BIRTHDAY_CONFIG.countdown.postCelebrationTitle
              : BIRTHDAY_CONFIG.countdown.title}
          </h2>
          <p className="text-sm sm:text-base text-[#B8B2C2] leading-relaxed">
            {status === "special_day"
              ? BIRTHDAY_CONFIG.countdown.celebrationSubtitle
              : status === "after"
              ? BIRTHDAY_CONFIG.countdown.postCelebrationSubtitle
              : BIRTHDAY_CONFIG.countdown.subtitle}
          </p>
        </div>

        {/* Countdown Content */}
        {mounted && status === "before" ? (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-3xl mx-auto">
            {/* Days Card */}
            <div className="group relative bg-[#1C1923] rounded-2xl p-6 sm:p-8 text-center border border-[rgba(255,107,158,0.22)] shadow-[0_4px_24px_rgba(0,0,0,0.3)] transition-all duration-300 hover:border-[#FF6B9E]/50 hover:-translate-y-1">
              <span className="block font-display text-4xl sm:text-5xl md:text-6xl font-semibold text-[#FF6B9E] mb-2 tracking-tight">
                {padZero(timeUnits.days)}
              </span>
              <span className="text-xs uppercase tracking-widest text-[#B8B2C2] font-medium">
                Days
              </span>
              <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-[#FF6B9E]/30" />
            </div>

            {/* Hours Card */}
            <div className="group relative bg-[#1C1923] rounded-2xl p-6 sm:p-8 text-center border border-[rgba(255,107,158,0.22)] shadow-[0_4px_24px_rgba(0,0,0,0.3)] transition-all duration-300 hover:border-[#FF6B9E]/50 hover:-translate-y-1">
              <span className="block font-display text-4xl sm:text-5xl md:text-6xl font-semibold text-[#FF6B9E] mb-2 tracking-tight">
                {padZero(timeUnits.hours)}
              </span>
              <span className="text-xs uppercase tracking-widest text-[#B8B2C2] font-medium">
                Hours
              </span>
              <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-[#FF6B9E]/30" />
            </div>

            {/* Minutes Card */}
            <div className="group relative bg-[#1C1923] rounded-2xl p-6 sm:p-8 text-center border border-[rgba(255,107,158,0.22)] shadow-[0_4px_24px_rgba(0,0,0,0.3)] transition-all duration-300 hover:border-[#FF6B9E]/50 hover:-translate-y-1">
              <span className="block font-display text-4xl sm:text-5xl md:text-6xl font-semibold text-[#FF6B9E] mb-2 tracking-tight">
                {padZero(timeUnits.minutes)}
              </span>
              <span className="text-xs uppercase tracking-widest text-[#B8B2C2] font-medium">
                Minutes
              </span>
              <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-[#FF6B9E]/30" />
            </div>

            {/* Seconds Card */}
            <div className="group relative bg-[#1C1923] rounded-2xl p-6 sm:p-8 text-center border border-[rgba(255,107,158,0.22)] shadow-[0_4px_24px_rgba(0,0,0,0.3)] transition-all duration-300 hover:border-[#FF6B9E]/50 hover:-translate-y-1">
              <span className="block font-display text-4xl sm:text-5xl md:text-6xl font-semibold text-[#FF6B9E] mb-2 tracking-tight tabular-nums">
                {padZero(timeUnits.seconds)}
              </span>
              <span className="text-xs uppercase tracking-widest text-[#B8B2C2] font-medium">
                Seconds
              </span>
              <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-[#FF6B9E]/50 animate-ping" />
            </div>
          </div>
        ) : mounted && status === "special_day" ? (
          /* Special Day State: Celebration Card + Revealed Portrait Photo */
          <div className="space-y-10 max-w-2xl mx-auto animate-in fade-in zoom-in-95 duration-500">
            {/* Top Celebration Card */}
            <div className="bg-[#1C1923] rounded-3xl p-8 sm:p-10 border border-[#FF6B9E]/40 text-center shadow-[0_8px_32px_rgba(255,107,158,0.18)] relative overflow-hidden">
              <div className="w-16 h-16 rounded-full bg-[#FF6B9E]/15 border border-[#FF6B9E]/40 flex items-center justify-center mx-auto mb-4 text-[#FF6B9E]">
                <PartyPopper className="w-8 h-8 animate-bounce" />
              </div>
              <span className="inline-block px-3 py-1 rounded-full bg-[#FF6B9E]/20 text-[#FF6B9E] text-xs font-semibold tracking-wider uppercase mb-3">
                Hari Spesial Tiba!
              </span>
              <h3 className="text-2xl sm:text-3xl font-display font-medium text-[#F8FAFC] mb-3">
                Selamat Ulang Tahun, {BIRTHDAY_CONFIG.nickname}!
              </h3>
              <p className="text-[#B8B2C2] text-sm sm:text-base leading-relaxed max-w-lg mx-auto mb-6">
                Hari ini adalah harimu. Buka kado kejutan dan baca untaian doa yang telah disiapkan khusus untuk menyambut umur barumu.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href="#surprise"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#FF6B9E] text-[#131118] font-semibold text-sm hover:bg-[#ff528d] transition-colors shadow-lg"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Buka Kejutan Sekarang</span>
                </a>

                <button
                  onClick={() => setShowFireworks(!showFireworks)}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-[#25202E] text-[#B8B2C2] hover:text-[#FF6B9E] text-xs font-medium border border-[rgba(255,107,158,0.25)] hover:border-[#FF6B9E]/50 transition-colors"
                >
                  <span>{showFireworks ? "🎆 Kembang Api: Nyala" : "🎆 Nyalakan Kembang Api"}</span>
                </button>
              </div>
            </div>

            {/* Birthday Girl Portrait Reveal (Muncul tepat di bawah kartu perayaan) */}
            <div className="flex flex-col items-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1C1923] border border-[rgba(255,107,158,0.22)] text-[#FF6B9E] text-xs tracking-wider uppercase mb-5">
                <Sparkles className="w-3.5 h-3.5 text-[#FF6B9E]" />
                <span>The Birthday Girl</span>
              </div>

              <div
                onClick={() => setLightboxOpen(true)}
                className="group relative w-full max-w-sm sm:max-w-md bg-[#1C1923] p-3.5 sm:p-4 rounded-3xl border border-[rgba(255,107,158,0.3)] shadow-[0_12px_40px_rgba(0,0,0,0.5)] hover:border-[#FF6B9E]/70 transition-all duration-500 cursor-pointer hover:-translate-y-1"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setLightboxOpen(true);
                  }
                }}
                aria-label="Lihat foto profil Najwa dalam ukuran penuh"
              >
                {/* Glow behind card */}
                <div
                  className="absolute -inset-1 rounded-3xl bg-gradient-to-b from-[#FF6B9E]/20 to-transparent blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  aria-hidden="true"
                />

                {/* Photo Container */}
                <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden bg-gradient-to-b from-[#251D2A] via-[#1D1724] to-[#141219] border border-[rgba(255,107,158,0.2)] flex flex-col items-center justify-center">
                  {photoLoaded ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={photoConfig.imageSrc}
                      alt={photoConfig.altText || "Foto Najwa Mizu Abhita"}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full p-8 flex flex-col items-center justify-center text-center">
                      <div className="w-16 h-16 rounded-full bg-[#1C1923] border border-[rgba(255,107,158,0.25)] flex items-center justify-center text-[#FF6B9E] mb-4">
                        <Camera className="w-8 h-8" />
                      </div>
                      <span className="font-display text-xl text-[#F8FAFC] font-medium mb-1">
                        {photoConfig.title}
                      </span>
                      <p className="text-xs text-[#B8B2C2] max-w-[240px] leading-relaxed mb-4">
                        {photoConfig.placeholderNote}
                      </p>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#131118] text-[10px] font-mono text-[#FF6B9E] border border-[rgba(255,107,158,0.2)]">
                        public/images/najwa.jpg
                      </span>
                    </div>
                  )}

                  {/* Hover overlay hint */}
                  <div className="absolute inset-0 bg-[#131118]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#1C1923]/95 text-xs text-[#F8FAFC] border border-[rgba(255,107,158,0.4)] shadow-xl">
                      <Expand className="w-3.5 h-3.5 text-[#FF6B9E]" />
                      <span>Perbesar Foto</span>
                    </span>
                  </div>
                </div>

                {/* Photo Caption Box */}
                <div className="pt-4 pb-1 px-2 text-center">
                  <h4 className="font-display font-medium text-base sm:text-lg text-[#F8FAFC] flex items-center justify-center gap-2">
                    <span>{photoConfig.captionTitle}</span>
                    <Heart className="w-3.5 h-3.5 text-[#FF6B9E] fill-[#FF6B9E]" />
                  </h4>
                  <p className="text-xs text-[#B8B2C2] mt-1 font-normal leading-relaxed">
                    {photoConfig.captionSubtitle}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Post Birthday State */
          <div className="max-w-2xl mx-auto bg-[#1C1923] rounded-2xl p-8 sm:p-10 border border-[rgba(255,107,158,0.22)] text-center shadow-xl">
            <div className="w-14 h-14 rounded-full bg-[#A78BFA]/15 border border-[#A78BFA]/30 flex items-center justify-center mx-auto mb-4 text-[#A78BFA]">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-display font-medium text-[#F8FAFC] mb-2">
              The Journey Continues ✦
            </h3>
            <p className="text-[#B8B2C2] text-sm leading-relaxed max-w-lg mx-auto">
              Ulang tahun telah disambut dengan penuh suka cita. Semoga setiap hari di tahun ini membawa langkah yang bermakna dan senyum yang tulus.
            </p>
          </div>
        )}

        {/* Timezone Note & Simulation Switcher */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#7E778B] max-w-3xl mx-auto pt-6 border-t border-[#1C1923]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#FF6B9E]" />
            <span>Target: 16 November 2026</span>
          </div>

          {/* Interactive preview toggle to test and demonstrate all states */}
          <div className="flex items-center gap-1.5 bg-[#1C1923]/90 px-2 py-1 rounded-full border border-[rgba(255,107,158,0.15)] text-[11px]">
            <span className="text-[#B8B2C2] px-1.5">View Mode:</span>
            <button
              onClick={() => setPreviewMode("live")}
              className={`px-2 py-0.5 rounded-full transition-colors ${
                previewMode === "live"
                  ? "bg-[#FF6B9E] text-[#131118] font-medium"
                  : "text-[#B8B2C2] hover:text-[#F8FAFC]"
              }`}
            >
              Live
            </button>
            <button
              onClick={() => setPreviewMode("before")}
              className={`px-2 py-0.5 rounded-full transition-colors ${
                previewMode === "before"
                  ? "bg-[#FF6B9E] text-[#131118] font-medium"
                  : "text-[#B8B2C2] hover:text-[#F8FAFC]"
              }`}
            >
              Countdown
            </button>
            <button
              onClick={() => setPreviewMode("special_day")}
              className={`px-2 py-0.5 rounded-full transition-colors ${
                previewMode === "special_day"
                  ? "bg-[#FF6B9E] text-[#131118] font-medium"
                  : "text-[#B8B2C2] hover:text-[#F8FAFC]"
              }`}
            >
              Special Day
            </button>
            <button
              onClick={() => setPreviewMode("after")}
              className={`px-2 py-0.5 rounded-full transition-colors ${
                previewMode === "after"
                  ? "bg-[#FF6B9E] text-[#131118] font-medium"
                  : "text-[#B8B2C2] hover:text-[#F8FAFC]"
              }`}
            >
              Post-Day
            </button>
          </div>
        </div>
      </div>

      {/* Lightbox Modal for Photo */}
      {lightboxOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#131118]/90 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setLightboxOpen(false)}
        >
          <div
            className="relative max-w-lg w-full bg-[#1C1923] rounded-3xl border border-[rgba(255,107,158,0.3)] p-4 shadow-[0_16px_50px_rgba(0,0,0,0.6)] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-[#25202E] text-[#B8B2C2] hover:text-[#F8FAFC] transition-colors"
              aria-label="Tutup foto"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-full aspect-[4/5] rounded-2xl overflow-hidden bg-[#131118] flex items-center justify-center mt-6">
              {photoLoaded ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={photoConfig.imageSrc}
                  alt={photoConfig.altText}
                  className="w-full h-full object-cover"
                />
              ) : null}
            </div>

            <div className="pt-4 pb-2 text-center">
              <p className="font-display text-base text-[#F8FAFC]">
                {photoConfig.captionTitle}
              </p>
              <p className="text-xs text-[#B8B2C2] mt-0.5">
                {photoConfig.captionSubtitle}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
