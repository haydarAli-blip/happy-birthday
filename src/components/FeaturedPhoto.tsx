"use client";

import React, { useState, useEffect } from "react";
import { BIRTHDAY_CONFIG } from "@/config/birthdayData";
import { Sparkles, Camera, Heart, Expand, X } from "lucide-react";

export const FeaturedPhoto: React.FC = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const photoConfig = BIRTHDAY_CONFIG.featuredPhoto;

  useEffect(() => {
    if (!photoConfig.imageSrc) {
      return;
    }
    const img = new window.Image();
    img.src = photoConfig.imageSrc;
    img.onload = () => setImageLoaded(true);
    img.onerror = () => setImageLoaded(false);
  }, [photoConfig.imageSrc]);

  return (
    <section id="photo" className="relative py-12 px-4 sm:px-6">
      <div className="max-w-xl mx-auto flex flex-col items-center">
        {/* Subtle top indicator */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1C1923] border border-[rgba(255,107,158,0.22)] text-[#FF6B9E] text-xs tracking-wider uppercase mb-6">
          <Sparkles className="w-3.5 h-3.5 text-[#FF6B9E]" />
          <span>{photoConfig.tag}</span>
        </div>

        {/* Featured Photo Frame */}
        <div
          onClick={() => setLightboxOpen(true)}
          className="group relative w-full max-w-sm sm:max-w-md bg-[#1C1923] p-3.5 sm:p-4 rounded-3xl border border-[rgba(255,107,158,0.25)] shadow-[0_12px_40px_rgba(0,0,0,0.45)] hover:border-[#FF6B9E]/60 transition-all duration-500 cursor-pointer hover:-translate-y-1"
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
          {/* Subtle glow effect behind card */}
          <div
            className="absolute -inset-1 rounded-3xl bg-gradient-to-b from-[#FF6B9E]/15 to-transparent blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            aria-hidden="true"
          />

          {/* Image Container */}
          <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden bg-gradient-to-b from-[#251D2A] via-[#1D1724] to-[#141219] border border-[rgba(255,107,158,0.15)] flex flex-col items-center justify-center">
            {imageLoaded ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={photoConfig.imageSrc}
                alt={photoConfig.altText || "Foto Najwa Mizu Abhita"}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            ) : (
              /* Fallback / Upload Guidance Placeholder */
              <div className="w-full h-full p-8 flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 rounded-full bg-[#1C1923] border border-[rgba(255,107,158,0.25)] flex items-center justify-center text-[#FF6B9E] mb-4 group-hover:scale-110 group-hover:border-[#FF6B9E] transition-all">
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
            <h3 className="font-display font-medium text-base sm:text-lg text-[#F8FAFC] flex items-center justify-center gap-2">
              <span>{photoConfig.captionTitle}</span>
              <Heart className="w-3.5 h-3.5 text-[#FF6B9E] fill-[#FF6B9E]" />
            </h3>
            <p className="text-xs text-[#B8B2C2] mt-1 font-normal leading-relaxed">
              {photoConfig.captionSubtitle}
            </p>
          </div>
        </div>

        {/* Minimalist divider */}
        <div className="mt-14 flex items-center justify-center gap-3 text-xs text-[#7E778B]">
          <span className="w-12 h-[1px] bg-gradient-to-r from-transparent to-[rgba(255,107,158,0.3)]" />
          <span className="text-[#FF6B9E]/60 text-xs">✦</span>
          <span className="w-12 h-[1px] bg-gradient-to-l from-transparent to-[rgba(255,107,158,0.3)]" />
        </div>
      </div>

      {/* Lightbox Modal */}
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
              {imageLoaded ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={photoConfig.imageSrc}
                  alt={photoConfig.altText}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="p-8 text-center flex flex-col items-center justify-center">
                  <Camera className="w-12 h-12 text-[#FF6B9E] mb-3" />
                  <p className="font-display text-lg text-[#F8FAFC]">{photoConfig.title}</p>
                  <p className="text-xs text-[#B8B2C2] mt-1">{photoConfig.placeholderNote}</p>
                </div>
              )}
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
