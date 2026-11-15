"use client";

import React, { useEffect } from "react";
import { X, ChevronLeft, ChevronRight, Calendar, Tag } from "lucide-react";
import { MemoryItem } from "@/config/birthdayData";

interface LightboxProps {
  memory: MemoryItem | null;
  currentIndex: number;
  total: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export const Lightbox: React.FC<LightboxProps> = ({
  memory,
  currentIndex,
  total,
  onClose,
  onPrev,
  onNext,
}) => {
  useEffect(() => {
    if (!memory) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    // Lock background scroll
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [memory, onClose, onPrev, onNext]);

  if (!memory) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={memory.title}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#131118]/90 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      {/* Lightbox Modal Window */}
      <div
        className="relative max-w-4xl w-full bg-[#1C1923] rounded-2xl border border-[rgba(255,107,158,0.3)] shadow-[0_16px_50px_rgba(0,0,0,0.6)] overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#282332] bg-[#16131D]">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-[#FF6B9E] bg-[#FF6B9E]/10 px-2.5 py-0.5 rounded-full border border-[#FF6B9E]/20">
              {currentIndex + 1} / {total}
            </span>
            <h3 className="font-display font-medium text-base sm:text-lg text-[#F8FAFC]">
              {memory.title}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-[#25202E] text-[#B8B2C2] hover:text-[#F8FAFC] hover:bg-[#342D40] transition-colors"
            aria-label="Tutup pratinjau"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Image / Visual Area */}
        <div className="relative flex-1 bg-[#131118] flex items-center justify-center min-h-[320px] sm:min-h-[420px] p-6 overflow-hidden">
          {memory.imageSrc ? (
            // Real image if provided
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={memory.imageSrc}
              alt={memory.title}
              className="max-h-[60vh] max-w-full object-contain rounded-lg shadow-lg"
            />
          ) : (
            // Elegant Editorial Placeholder
            <div className="w-full h-full min-h-[300px] flex flex-col items-center justify-center text-center p-8 rounded-xl bg-gradient-to-b from-[#1C1923] via-[#241F2E] to-[#17141E] border border-[rgba(255,107,158,0.15)] relative overflow-hidden">
              <div
                className="absolute inset-0 bg-micro-dots opacity-30"
                aria-hidden="true"
              />
              <div className="relative z-10 max-w-md">
                <span className="text-4xl sm:text-5xl mb-4 block">✦</span>
                <span className="text-xs font-mono tracking-widest text-[#FF6B9E] uppercase mb-2 block">
                  Memory Keepsake
                </span>
                <p className="font-display text-2xl text-[#F8FAFC] font-medium mb-2">
                  {memory.title}
                </p>
                <p className="text-sm text-[#B8B2C2] italic">
                  &ldquo;{memory.caption}&rdquo;
                </p>
                <div className="mt-6 inline-flex items-center gap-2 text-xs text-[#7E778B] bg-[#131118]/60 px-3 py-1.5 rounded-full border border-white/5">
                  <span>Photo slot ready for your memories</span>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Arrows */}
          <button
            onClick={onPrev}
            aria-label="Foto sebelumnya"
            className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-[#1C1923]/80 hover:bg-[#FF6B9E] text-[#F8FAFC] hover:text-[#131118] transition-all border border-[rgba(255,107,158,0.2)]"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={onNext}
            aria-label="Foto berikutnya"
            className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-[#1C1923]/80 hover:bg-[#FF6B9E] text-[#F8FAFC] hover:text-[#131118] transition-all border border-[rgba(255,107,158,0.2)]"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Footer info in Lightbox */}
        <div className="px-6 py-4 bg-[#16131D] border-t border-[#282332] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[#B8B2C2]">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-[#FF6B9E]">
              <Tag className="w-3.5 h-3.5" />
              <span>{memory.category}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#7E778B]" />
              <span>{memory.date}</span>
            </span>
          </div>
          {memory.note && <p className="italic text-[#B8B2C2] sm:max-w-md">{memory.note}</p>}
        </div>
      </div>
    </div>
  );
};

