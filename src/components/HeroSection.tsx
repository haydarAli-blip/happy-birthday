"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { birthdayConfig } from "@/lib/config";
import { Sparkles } from "lucide-react";

export default function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background: dark with subtle radial glow */}
      <div className="absolute inset-0 bg-bg-primary">
        {/* Radial pink glow - very subtle, one side */}
        <div
          className="absolute top-1/4 -right-32 w-[600px] h-[600px] rounded-full opacity-[0.07]"
          style={{
            background:
              "radial-gradient(circle, #FF6B9E 0%, transparent 70%)",
          }}
        />
        {/* Tiny dot texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #F8FAFC 0.5px, transparent 0.5px)",
            backgroundSize: "24px 24px",
          }}
        />
      </div>

      {/* Decorative stars - positioned deliberately */}
      <div className="absolute top-[15%] left-[12%] w-1 h-1 rounded-full bg-pink opacity-40" style={{ animation: "twinkle 4s ease-in-out infinite" }} />
      <div className="absolute top-[25%] right-[20%] w-0.5 h-0.5 rounded-full bg-lavender opacity-30" style={{ animation: "twinkle 5s ease-in-out infinite 1s" }} />
      <div className="absolute bottom-[30%] left-[8%] w-0.5 h-0.5 rounded-full bg-pink opacity-25" style={{ animation: "twinkle 6s ease-in-out infinite 2s" }} />
      <div className="absolute top-[60%] right-[10%] w-1 h-1 rounded-full bg-text-secondary opacity-20" style={{ animation: "twinkle 4.5s ease-in-out infinite 0.5s" }} />
      {/* Thin decorative line */}
      <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-b from-transparent via-pink/20 to-transparent" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-2xl mx-auto">
        {/* Label */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xs tracking-[0.3em] text-text-secondary mb-8 uppercase flex items-center justify-center gap-2"
        >
          <span className="w-8 h-px bg-pink/40" />
          {birthdayConfig.hero.label}
          <span className="w-8 h-px bg-pink/40" />
        </motion.p>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-6"
        >
          <span className="text-text-primary">Happy Birthday,</span>
          <br />
          <span className="text-pink">{birthdayConfig.name}</span>
          <span className="text-pink">!</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-base sm:text-lg text-text-secondary leading-relaxed mb-4 max-w-md mx-auto"
        >
          {birthdayConfig.hero.subheadline}
        </motion.p>

        {/* Date */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="text-sm text-text-secondary/70 tracking-widest mb-10"
        >
          {birthdayConfig.hero.dateDisplay}
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 1 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={() => scrollToSection("surprise")}
            className="group inline-flex items-center gap-2 px-7 py-3 bg-pink text-bg-primary text-sm font-medium rounded-lg hover:bg-pink/90 active:scale-[0.98] transition-all duration-200 focus-visible:ring-2 focus-visible:ring-pink focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary"
          >
            <Sparkles size={15} className="opacity-70 group-hover:opacity-100 transition-opacity" />
            Open Your Surprise
          </button>
          <button
            onClick={() => scrollToSection("wishes")}
            className="inline-flex items-center px-7 py-3 text-sm font-medium text-text-secondary border border-border-rose rounded-lg hover:text-text-primary hover:border-pink/40 active:scale-[0.98] transition-all duration-200 focus-visible:ring-2 focus-visible:ring-pink focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary"
          >
            Read My Wishes
          </button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 1.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-5 h-8 rounded-full border border-text-secondary/30 flex items-start justify-center p-1.5">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 h-1 rounded-full bg-pink/60"
          />
        </div>
      </motion.div>
    </section>
  );
}

