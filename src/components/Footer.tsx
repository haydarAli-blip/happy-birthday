"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { birthdayConfig } from "@/lib/config";
import { Heart } from "lucide-react";

export default function Footer() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <footer
      ref={ref}
      className="py-20 sm:py-28 relative"
    >
      {/* Subtle separator */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-border-rose to-transparent" />

      <div className="max-w-lg mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Closing message */}
          <p className="font-display text-xl sm:text-2xl text-text-primary leading-relaxed mb-4">
            Happy Birthday once again,
            <br />
            <span className="text-pink">{birthdayConfig.name}</span>.
          </p>
          <p className="text-sm text-text-secondary/60 mb-8">
            Wishing you nothing but the best. Always.
          </p>

          {/* Heart icon */}
          <Heart
            size={18}
            className="mx-auto text-pink/40 fill-pink/20"
          />
        </motion.div>

        {/* Bottom bar */}
        <div className="mt-16 pt-6 border-t border-border-subtle">
          <p className="text-xs text-text-secondary/30 tracking-wide">
            Made with care, just for you ✦ {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
}

