"use client";

import React, { useState, useEffect } from "react";
import { BIRTHDAY_CONFIG, WishItem } from "@/config/birthdayData";
import { Heart, Send, Sparkles, Flame, CheckCircle, MessageSquarePlus } from "lucide-react";

export const BirthdayWishes: React.FC = () => {
  const [wishes, setWishes] = useState<WishItem[]>(BIRTHDAY_CONFIG.wishesWall.defaultWishes);
  const [senderName, setSenderName] = useState("");
  const [senderRole, setSenderRole] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Make a Wish Candle state
  const [candleBlown, setCandleBlown] = useState(false);
  const [wishMade, setWishMade] = useState(false);

  // Load any stored wishes from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("najwa_birthday_wishes");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setTimeout(() => {
            setWishes(parsed);
          }, 0);
        }
      }
    } catch {
      // LocalStorage fallback
    }
  }, []);

  const handleAddWish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderName.trim() || !message.trim()) return;

    setIsSubmitting(true);

    const newWish: WishItem = {
      id: "user-wish-" + Date.now(),
      sender: senderName.trim(),
      relationship: senderRole.trim() || "Friend",
      message: message.trim(),
      date: "Just now",
      avatarColor: "#FF6B9E",
    };

    const updated = [newWish, ...wishes];
    setWishes(updated);
    try {
      localStorage.setItem("najwa_birthday_wishes", JSON.stringify(updated));
    } catch {
      // ignore
    }

    setSenderName("");
    setSenderRole("");
    setMessage("");
    setIsSubmitting(false);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const handleBlowCandle = () => {
    if (!wishMade) {
      setWishMade(true);
    } else {
      setCandleBlown(true);
    }
  };

  const handleRelightCandle = () => {
    setCandleBlown(false);
    setWishMade(false);
  };

  return (
    <section id="wishes" className="relative py-24 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1C1923] border border-[rgba(255,107,158,0.22)] text-[#FF6B9E] text-xs tracking-wider uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#FF6B9E]" />
            <span>{BIRTHDAY_CONFIG.wishesWall.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-medium text-[#F8FAFC] tracking-tight mb-3">
            {BIRTHDAY_CONFIG.wishesWall.title}
          </h2>
          <p className="text-sm sm:text-base text-[#B8B2C2]">
            {BIRTHDAY_CONFIG.wishesWall.subtitle}
          </p>
        </div>

        {/* Interactive Virtual Candle: Make a Wish Experience */}
        <div className="mb-16 max-w-lg mx-auto bg-[#1C1923] p-8 rounded-3xl border border-[rgba(255,107,158,0.25)] text-center shadow-[0_8px_30px_rgba(0,0,0,0.35)] relative overflow-hidden">
          <span className="text-[11px] font-mono tracking-widest text-[#FF6B9E] uppercase block mb-4">
            ✦ Virtual Birthday Candle Ritual ✦
          </span>

          {/* Candle Graphic */}
          <div className="relative w-16 h-28 mx-auto flex flex-col items-center justify-end mb-4">
            {/* Candle Flame / Smoke */}
            {!candleBlown ? (
              <div className="relative flex flex-col items-center">
                {/* Flame glow */}
                <div className="w-6 h-6 rounded-full bg-[#FF6B9E]/40 blur-md absolute -top-1 animate-pulse" />
                {/* Flame core */}
                <div className="w-4 h-7 rounded-full bg-gradient-to-t from-[#FF6B9E] via-[#FFAE7A] to-amber-200 animate-[bounce_1.8s_infinite] shadow-[0_0_15px_#FF6B9E]" />
                {/* Wick */}
                <div className="w-0.5 h-3 bg-[#3A3345]" />
              </div>
            ) : (
              <div className="relative flex flex-col items-center animate-in fade-in duration-300">
                {/* Smoke wisp */}
                <span className="text-xs text-[#B8B2C2] animate-[fade-out_2s_infinite]">
                  ☁
                </span>
                {/* Smoldering wick */}
                <div className="w-0.5 h-3 bg-[#4A4255]" />
                <div className="w-1.5 h-1.5 rounded-full bg-[#FF6B9E]/60 blur-[1px]" />
              </div>
            )}

            {/* Candle Body */}
            <div className="w-8 h-16 rounded-t-sm bg-gradient-to-b from-[#2D2338] via-[#241C2D] to-[#1C1625] border-t border-x border-[rgba(255,107,158,0.3)] shadow-inner flex flex-col justify-around py-1">
              <div className="w-full h-[1px] bg-[#FF6B9E]/20" />
              <div className="w-full h-[1px] bg-[#FF6B9E]/20" />
            </div>
            {/* Candle Base Plate */}
            <div className="w-16 h-2 bg-[#17131F] rounded-full border border-[rgba(255,107,158,0.3)]" />
          </div>

          {/* Candle Action Buttons & Messages */}
          {!candleBlown ? (
            <div>
              <p className="text-sm text-[#F8FAFC] font-medium mb-1">
                {!wishMade
                  ? "Tutup mata, ucapkan harapanmu dalam hati..."
                  : "Harapan telah tersimpan! Sekarang tiup lilinnya."}
              </p>
              <p className="text-xs text-[#B8B2C2] mb-5">
                {!wishMade
                  ? "Momen hening untuk merajut doa terbaik di tahun yang baru."
                  : "Klik tombol di bawah untuk meniup api lilin."}
              </p>

              <button
                onClick={handleBlowCandle}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#FF6B9E] text-[#131118] font-semibold text-xs sm:text-sm hover:bg-[#ff528d] transition-all duration-300 shadow-md"
              >
                <Flame className="w-4 h-4 fill-current" />
                <span>{!wishMade ? "1. Make a Wish" : "2. Tiup Lilin ✦"}</span>
              </button>
            </div>
          ) : (
            <div className="space-y-3 animate-in fade-in zoom-in duration-300">
              <span className="inline-block px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-400 text-xs font-medium border border-emerald-500/30">
                Harapanmu Terucap! ✦
              </span>
              <p className="text-sm text-[#F8FAFC] font-display font-medium">
                &ldquo;Semoga setiap doa dan harapan baikmu di umur baru ini terwujud dengan indah.&rdquo;
              </p>
              <div>
                <button
                  onClick={handleRelightCandle}
                  className="text-xs text-[#B8B2C2] hover:text-[#FF6B9E] transition-colors underline underline-offset-4"
                >
                  Nyalakan lilin lagi
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Wishes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-14">
          {wishes.map((item) => (
            <div
              key={item.id}
              className="bg-[#1C1923] p-6 rounded-2xl border border-[rgba(255,107,158,0.22)] shadow-[0_4px_20px_rgba(0,0,0,0.3)] flex flex-col justify-between hover:border-[#FF6B9E]/50 transition-colors"
            >
              <div>
                {/* Sender Header */}
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-[#131118] shadow-sm"
                    style={{ backgroundColor: item.avatarColor || "#FF6B9E" }}
                  >
                    {item.sender.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h4 className="font-medium text-sm text-[#F8FAFC]">
                      {item.sender}
                    </h4>
                    <span className="text-[11px] text-[#FF6B9E] font-medium">
                      {item.relationship}
                    </span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-[#B8B2C2] leading-relaxed">
                  &ldquo;{item.message}&rdquo;
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#262130] flex items-center justify-between text-[11px] text-[#7E778B]">
                <span>{item.date}</span>
                <Heart className="w-3.5 h-3.5 text-[#FF6B9E]/60" />
              </div>
            </div>
          ))}
        </div>

        {/* Add Your Own Wish Form */}
        <div className="max-w-2xl mx-auto bg-[#1C1923] p-7 sm:p-9 rounded-3xl border border-[rgba(255,107,158,0.22)] shadow-xl">
          <div className="flex items-center gap-2 mb-2">
            <MessageSquarePlus className="w-4 h-4 text-[#FF6B9E]" />
            <h3 className="font-display text-lg sm:text-xl font-medium text-[#F8FAFC]">
              Kirim Doa atau Ucapan Tambahan
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-[#B8B2C2] mb-6">
            Punya kata-kata personal lain untuk Najwa? Tulis di sini agar tersimpan rapi di halaman ini.
          </p>

          <form onSubmit={handleAddWish} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-[#B8B2C2] font-medium mb-1.5">
                  Nama Kamu <span className="text-[#FF6B9E]">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Sarah / Rekan Kerja"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#131118] border border-[rgba(255,107,158,0.25)] text-sm text-[#F8FAFC] placeholder-[#7E778B] focus:outline-none focus:border-[#FF6B9E] transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs text-[#B8B2C2] font-medium mb-1.5">
                  Hubungan / Panggilan (opsional)
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Teman Sebangku"
                  value={senderRole}
                  onChange={(e) => setSenderRole(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#131118] border border-[rgba(255,107,158,0.25)] text-sm text-[#F8FAFC] placeholder-[#7E778B] focus:outline-none focus:border-[#FF6B9E] transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs text-[#B8B2C2] font-medium mb-1.5">
                Pesan Ucapan & Doa <span className="text-[#FF6B9E]">*</span>
              </label>
              <textarea
                required
                rows={3}
                placeholder="Tuliskan harapan, ucapan selamat, atau doa hangat untuk Najwa..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-[#131118] border border-[rgba(255,107,158,0.25)] text-sm text-[#F8FAFC] placeholder-[#7E778B] focus:outline-none focus:border-[#FF6B9E] transition-colors resize-none"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              {submitted ? (
                <span className="flex items-center gap-1.5 text-xs text-emerald-400">
                  <CheckCircle className="w-4 h-4" />
                  <span>Ucapan berhasil ditambahkan ke dinding harapan!</span>
                </span>
              ) : (
                <span className="text-[11px] text-[#7E778B]">
                  Pesan akan langsung muncul pada daftar ucapan di atas.
                </span>
              )}

              <button
                type="submit"
                disabled={isSubmitting || !senderName.trim() || !message.trim()}
                className="px-6 py-2.5 rounded-full bg-[#FF6B9E] text-[#131118] font-semibold text-xs sm:text-sm hover:bg-[#ff528d] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-md"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Kirim Ucapan</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

