"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { birthdayConfig } from "@/lib/config";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

type CountdownState = "counting" | "today" | "passed";

function getJakartaTime(): Date {
  // Get current time in Asia/Jakarta
  const now = new Date();
  const jakartaStr = now.toLocaleString("en-US", { timeZone: "Asia/Jakarta" });
  return new Date(jakartaStr);
}

function getTargetDate(): Date {
  // Target: November 16, 2026, 00:00:00 Asia/Jakarta
  // We parse it as Jakarta midnight
  const [year, month, day] = birthdayConfig.birthdayDate.split("-").map(Number);
  // Create date string that represents midnight Jakarta
  const targetStr = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}T00:00:00+07:00`;
  return new Date(targetStr);
}

function calculateTimeLeft(): { state: CountdownState; timeLeft: TimeLeft } {
  const now = new Date();
  const target = getTargetDate();
  const endOfDay = new Date(target.getTime() + 24 * 60 * 60 * 1000); // End of birthday

  const diff = target.getTime() - now.getTime();
  const diffEnd = endOfDay.getTime() - now.getTime();

  if (diff > 0) {
    // Before birthday - count down
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);
    return {
      state: "counting",
      timeLeft: { days, hours, minutes, seconds },
    };
  } else if (diffEnd > 0) {
    // It's the birthday!
    return {
      state: "today",
      timeLeft: { days: 0, hours: 0, minutes: 0, seconds: 0 },
    };
  } else {
    // Birthday has passed
    return {
      state: "passed",
      timeLeft: { days: 0, hours: 0, minutes: 0, seconds: 0 },
    };
  }
}

function CountdownCard({
  value,
  label,
  index,
}: {
  value: number;
  label: string;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.1 * index }}
      className="flex flex-col items-center gap-2 p-5 sm:p-6 bg-bg-secondary/60 border border-border-rose rounded-xl"
    >
      <span className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-pink tabular-nums leading-none">
        {String(value).padStart(2, "0")}
      </span>
      <span className="text-xs tracking-[0.2em] text-text-secondary uppercase">
        {label}
      </span>
    </motion.div>
  );
}

export default function BirthdayCountdown() {
  const [mounted, setMounted] = useState(false);
  const [countdown, setCountdown] = useState(calculateTimeLeft);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => {
      setCountdown(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (!mounted) {
    return (
      <section id="countdown" className="py-24 sm:py-32">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex flex-col items-center gap-2 p-5 sm:p-6 bg-bg-secondary/60 border border-border-rose rounded-xl animate-pulse"
              >
                <span className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-pink/30 leading-none">
                  --
                </span>
                <span className="text-xs tracking-[0.2em] text-text-secondary/50 uppercase">
                  {["Days", "Hours", "Minutes", "Seconds"][i]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  const { state, timeLeft } = countdown;

  return (
    <section
      id="countdown"
      ref={sectionRef}
      className="py-24 sm:py-32 relative"
    >
      {/* Subtle separator */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-border-rose to-transparent" />

      <div className="max-w-3xl mx-auto px-6">
        {/* Section label */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center text-xs tracking-[0.25em] text-text-secondary/70 uppercase mb-10"
        >
          {state === "counting"
            ? "Counting down to your special day"
            : state === "today"
            ? "The wait is over"
            : "We celebrated"}
        </motion.p>

        {state === "counting" ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <CountdownCard value={timeLeft.days} label="Days" index={0} />
            <CountdownCard value={timeLeft.hours} label="Hours" index={1} />
            <CountdownCard value={timeLeft.minutes} label="Minutes" index={2} />
            <CountdownCard value={timeLeft.seconds} label="Seconds" index={3} />
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center py-12"
          >
            <p className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-pink mb-4">
              {state === "today"
                ? "It's Your Special Day!"
                : "Happy Birthday! 🎂"}
            </p>
            <p className="text-text-secondary text-base sm:text-lg">
              {state === "today"
                ? `Selamat ulang tahun, ${birthdayConfig.name}!`
                : `Semoga tahun ini penuh kebahagiaan untuk ${birthdayConfig.name}.`}
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}

