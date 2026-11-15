"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { birthdayConfig } from "@/lib/config";
import { Gift, Sparkles } from "lucide-react";

export default function SurpriseMessage() {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section
      id="surprise"
      ref={ref}
      className="py-24 sm:py-32 relative"
    >
      {/* Subtle separator */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-border-rose to-transparent" />

      <div className="max-w-xl mx-auto px-6 text-center">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <p className="text-xs tracking-[0.25em] text-text-secondary/70 uppercase mb-3">
            Just for You
          </p>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-text-primary">
            {birthdayConfig.surprise.title}
          </h2>
        </motion.div>

        {/* Envelope / Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative"
        >
          {/* Closed state - Envelope */}
          <div
            className={`relative transition-all duration-500 ${
              isOpen ? "opacity-0 scale-95 h-0 overflow-hidden" : "opacity-100"
            }`}
          >
            {/* Envelope body */}
            <div className="relative mx-auto max-w-sm py-16 px-8 bg-bg-secondary/60 border border-border-rose rounded-xl">
              {/* Decorative seal */}
              <div className="w-14 h-14 mx-auto mb-6 rounded-full bg-bg-primary border-2 border-pink/30 flex items-center justify-center">
                <Gift size={22} className="text-pink" />
              </div>

              <p className="text-sm text-text-secondary mb-8">
                There&apos;s a little something waiting inside...
              </p>

              <button
                onClick={() => setIsOpen(true)}
                className="group inline-flex items-center gap-2 px-7 py-3 bg-pink text-bg-primary text-sm font-medium rounded-lg hover:bg-pink/90 active:scale-[0.98] transition-all duration-200 focus-visible:ring-2 focus-visible:ring-pink focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary"
              >
                <Sparkles size={15} className="opacity-70 group-hover:opacity-100" />
                {birthdayConfig.surprise.buttonText}
              </button>
            </div>
          </div>

          {/* Open state - Message revealed */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="relative mx-auto max-w-md"
              >
                {/* Shimmer effect on card edges */}
                <div className="absolute -inset-px rounded-xl bg-gradient-to-r from-pink/20 via-lavender/10 to-pink/20 shimmer" />

                <div className="relative py-12 px-8 bg-bg-secondary/80 border border-border-rose rounded-xl">
                  {/* Sparkle decorations */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3, duration: 0.4 }}
                    className="absolute top-4 right-6"
                  >
                    <Sparkles size={14} className="text-pink/50" />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5, duration: 0.4 }}
                    className="absolute bottom-6 left-6"
                  >
                    <Sparkles size={10} className="text-lavender/40" />
                  </motion.div>

                  {/* Message content */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  >
                    <div className="w-10 h-10 mx-auto mb-6 rounded-full bg-pink/10 flex items-center justify-center">
                      <span className="text-lg">💌</span>
                    </div>

                    <p className="text-base leading-[1.8] text-text-secondary whitespace-pre-line">
                      {birthdayConfig.surprise.message}
                    </p>
                  </motion.div>

                  {/* Close / Replay button */}
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    onClick={() => setIsOpen(false)}
                    className="mt-8 text-xs text-text-secondary/50 hover:text-text-secondary transition-colors tracking-wide"
                  >
                    Close &amp; replay anytime
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

