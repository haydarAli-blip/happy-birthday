"use client";

import React, { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

export const BackToTop: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Kembali ke atas halaman"
      className="fixed bottom-6 right-6 z-40 p-3 rounded-full bg-[#1C1923] text-[#F8FAFC] border border-[rgba(255,107,158,0.3)] shadow-[0_4px_20px_rgba(0,0,0,0.5)] hover:bg-[#FF6B9E] hover:text-[#131118] hover:border-[#FF6B9E] transition-all duration-300 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-[#FF6B9E]"
    >
      <ArrowUp className="w-4 h-4" />
    </button>
  );
};

