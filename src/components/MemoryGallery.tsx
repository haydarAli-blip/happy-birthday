"use client";

import React, { useState } from "react";
import { BIRTHDAY_CONFIG, MemoryItem } from "@/config/birthdayData";
import { Lightbox } from "./Lightbox";
import { Camera, Expand, Sparkles, Tag } from "lucide-react";

export const MemoryGallery: React.FC = () => {
  const [selectedMemoryIndex, setSelectedMemoryIndex] = useState<number | null>(null);

  const memories = BIRTHDAY_CONFIG.memories;

  const handleOpen = (index: number) => {
    setSelectedMemoryIndex(index);
  };

  const handleClose = () => {
    setSelectedMemoryIndex(null);
  };

  const handlePrev = () => {
    if (selectedMemoryIndex !== null) {
      setSelectedMemoryIndex((selectedMemoryIndex - 1 + memories.length) % memories.length);
    }
  };

  const handleNext = () => {
    if (selectedMemoryIndex !== null) {
      setSelectedMemoryIndex((selectedMemoryIndex + 1) % memories.length);
    }
  };

  // Aesthetic placeholder artwork generator for memory slots
  const renderPlaceholderVisual = (item: MemoryItem, index: number) => {
    const gradients = [
      "from-[#2B1B26] via-[#1F1728] to-[#141219]",
      "from-[#241A2E] via-[#2A1E29] to-[#15121B]",
      "from-[#2D1D24] via-[#1E1925] to-[#131118]",
      "from-[#221B2B] via-[#281822] to-[#16131D]",
      "from-[#2C1C29] via-[#1E1826] to-[#14121A]",
    ];
    const gradient = gradients[index % gradients.length];

    return (
      <div
        className={`w-full h-full min-h-[220px] bg-gradient-to-br ${gradient} p-6 flex flex-col justify-between relative overflow-hidden transition-transform duration-500 group-hover:scale-105`}
      >
        {/* Subtle decorative background rings */}
        <div
          className="absolute -right-8 -top-8 w-32 h-32 rounded-full border border-[rgba(255,107,158,0.1)] pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute -left-10 -bottom-10 w-40 h-40 rounded-full border border-[rgba(167,139,250,0.08)] pointer-events-none"
          aria-hidden="true"
        />

        {/* Top category chip */}
        <div className="relative z-10 flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#131118]/70 backdrop-blur-sm border border-[rgba(255,107,158,0.2)] text-[10px] uppercase tracking-wider text-[#FF6B9E] font-medium">
            <Tag className="w-2.5 h-2.5" />
            <span>{item.category}</span>
          </span>
          <span className="text-xs text-[#7E778B] font-mono">0{index + 1}</span>
        </div>

        {/* Center icon / aesthetic */}
        <div className="relative z-10 my-4 text-center">
          <div className="w-12 h-12 rounded-full bg-[#1C1923]/60 border border-[rgba(255,107,158,0.18)] flex items-center justify-center mx-auto text-[#FF6B9E]/80 group-hover:text-[#FF6B9E] group-hover:scale-110 transition-all">
            <Camera className="w-5 h-5" />
          </div>
          <span className="block mt-2 font-display text-sm text-[#F8FAFC]/90">
            {item.title}
          </span>
        </div>

        {/* Bottom date */}
        <div className="relative z-10 text-right">
          <span className="text-[11px] text-[#B8B2C2]/70 font-mono tracking-wider">
            {item.date}
          </span>
        </div>
      </div>
    );
  };

  return (
    <section id="memories" className="relative py-20 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1C1923] border border-[rgba(255,107,158,0.22)] text-[#FF6B9E] text-xs tracking-wider uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#FF6B9E]" />
            <span>Cherished Archive</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-medium text-[#F8FAFC] tracking-tight mb-3">
            Little Moments, Big Memories
          </h2>
          <p className="text-sm sm:text-base text-[#B8B2C2] leading-relaxed">
            Kumpulan potret dan cuplikan waktu yang mengabadikan tawa, cerita, dan kebersamaan yang hangat.
          </p>
        </div>

        {/* Editorial Asymmetrical Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6">
          {memories.map((item, index) => {
            // Asymmetrical spans for editorial feel:
            // 0: md:col-span-7 (Featured)
            // 1: md:col-span-5
            // 2: md:col-span-4
            // 3: md:col-span-4
            // 4: md:col-span-4
            let colSpan = "md:col-span-4";
            if (index === 0) colSpan = "md:col-span-7";
            if (index === 1) colSpan = "md:col-span-5";

            return (
              <div
                key={item.id}
                onClick={() => handleOpen(index)}
                className={`group relative bg-[#1C1923] rounded-2xl overflow-hidden border border-[rgba(255,107,158,0.22)] shadow-[0_4px_24px_rgba(0,0,0,0.3)] hover:border-[#FF6B9E]/60 transition-all duration-300 cursor-pointer flex flex-col justify-between ${colSpan}`}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleOpen(index);
                  }
                }}
                aria-label={`Buka memori: ${item.title}`}
              >
                {/* Visual Image / Placeholder */}
                <div className="relative overflow-hidden w-full h-56 sm:h-64">
                  {item.imageSrc ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={item.imageSrc}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    renderPlaceholderVisual(item, index)
                  )}

                  {/* Hover overlay hint */}
                  <div className="absolute inset-0 bg-[#131118]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1C1923]/90 text-xs text-[#F8FAFC] border border-[rgba(255,107,158,0.4)] shadow-lg">
                      <Expand className="w-3.5 h-3.5 text-[#FF6B9E]" />
                      <span>Lihat Foto</span>
                    </span>
                  </div>
                </div>

                {/* Editorial Caption Card */}
                <div className="p-5 sm:p-6 bg-[#1C1923] border-t border-[#25202E]">
                  <div className="flex items-center justify-between text-xs text-[#B8B2C2] mb-1.5">
                    <span className="text-[#FF6B9E] font-medium">{item.category}</span>
                    <span className="text-[11px] text-[#7E778B]">{item.date}</span>
                  </div>
                  <h3 className="font-display font-medium text-base sm:text-lg text-[#F8FAFC] mb-2 group-hover:text-[#FF6B9E] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#B8B2C2] leading-relaxed line-clamp-2">
                    {item.caption}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Note on how to customize photos */}
        <p className="text-center text-xs text-[#7E778B] mt-8">
          ✦ Foto dapat diganti dengan menambahkan file ke folder <code className="text-[#FF6B9E]/80">public/images/</code> atau melalui konfigurasi <code className="text-[#FF6B9E]/80">birthdayData.ts</code>.
        </p>
      </div>

      {/* Lightbox Modal */}
      {selectedMemoryIndex !== null && (
        <Lightbox
          memory={memories[selectedMemoryIndex]}
          currentIndex={selectedMemoryIndex}
          total={memories.length}
          onClose={handleClose}
          onPrev={handlePrev}
          onNext={handleNext}
        />
      )}
    </section>
  );
};

