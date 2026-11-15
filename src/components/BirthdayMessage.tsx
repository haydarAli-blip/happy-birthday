"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { birthdayConfig } from "@/lib/config";
import { Heart } from "lucide-react";

export default function BirthdayMessage() {
  const [expanded, setExpanded] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id="wishes" ref={ref} className="py-24 sm:py-32 relative">
      <div className="max-w-2xl mx-auto px-6">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <p className="text-xs tracking-[0.25em] text-text-secondary/70 uppercase mb-3">
            Birthday Wishes
          </p>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-text-primary">
            {birthdayConfig.message.title}
          </h2>
        </motion.div>

        {/* Message card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
        >
          {/* Decorative line on left */}
          <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-pink/40 via-pink/20 to-transparent" />

          <div className="pl-8">
            {/* Main message */}
            <p className="text-base sm:text-lg leading-[1.8] text-text-secondary whitespace-pre-line">
              {birthdayConfig.message.content}
            </p>

            {/* Extended message */}
            <AnimatePresence>
              {expanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <p className="text-base sm:text-lg leading-[1.8] text-text-secondary mt-6 whitespace-pre-line">
                    {birthdayConfig.message.extendedContent}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Toggle button */}
            <button
              onClick={() => setExpanded(!expanded)}
              className="mt-6 inline-flex items-center gap-2 text-sm text-pink hover:text-pink/80 transition-colors group"
            >
              <Heart
                size={14}
                className={`transition-transform ${
                  expanded ? "fill-pink" : "group-hover:scale-110"
                }`}
              />
              {expanded ? "Tutup Pesan" : "Buka Pesan Lengkap"}
            </button>
          </div>
        </motion.div>

        {/* Signature */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-12 text-right text-sm text-text-secondary/60 italic"
        >
          — with love ♡
        </motion.p>
      </div>
    </section>
  );
}

