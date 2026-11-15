"use client";

import React, { useEffect, useRef } from "react";

interface BirthdayFireworksProps {
  active?: boolean;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  color: string;
  size: number;
  friction: number;
  gravity: number;
  decay: number;
}

interface Rocket {
  x: number;
  y: number;
  targetY: number;
  vy: number;
  color: string;
}

export const BirthdayFireworks: React.FC<BirthdayFireworksProps> = ({ active = true }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!active) return;

    // Respect reduced motion preference
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let isRunning = true;
    let isTabVisible = true;

    // Palette: Elegant Dark Rose, Champagne Gold, Soft Lavender, Crystal White
    const colors = [
      "#FF6B9E", // rose pink
      "#FFA3C1", // soft petal pink
      "#FFD166", // warm champagne gold
      "#A78BFA", // soft lavender
      "#FFFFFF", // crystal white
      "#F472B6", // vibrant rose
    ];

    const resizeCanvas = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas, { passive: true });

    // Handle tab visibility to save 100% CPU when tab is hidden
    const handleVisibilityChange = () => {
      isTabVisible = !document.hidden;
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    const particles: Particle[] = [];
    const rockets: Rocket[] = [];
    const MAX_PARTICLES = 160; // Safe cap to prevent any lag on mobile devices

    const createExplosion = (x: number, y: number, color: string) => {
      // Limit total particles to guarantee 60 FPS
      if (particles.length > MAX_PARTICLES) return;

      const count = 35 + Math.floor(Math.random() * 20);
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.4;
        const speed = 1.8 + Math.random() * 4.2;
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          alpha: 1,
          color,
          size: 1.4 + Math.random() * 1.6,
          friction: 0.96,
          gravity: 0.055,
          decay: 0.014 + Math.random() * 0.014,
        });
      }
    };

    const launchRocket = () => {
      if (!isRunning || !canvas || !isTabVisible) return;
      if (rockets.length >= 3) return; // Keep max 3 simultaneous rockets for clean performance

      const x = canvas.width * 0.15 + Math.random() * (canvas.width * 0.7);
      const targetY = canvas.height * 0.15 + Math.random() * (canvas.height * 0.32);
      const color = colors[Math.floor(Math.random() * colors.length)];
      rockets.push({
        x,
        y: canvas.height,
        targetY,
        vy: -(7 + Math.random() * 3),
        color,
      });
    };

    // Auto-launch rockets every 1.5 - 2.2 seconds
    let lastLaunch = Date.now();
    const minLaunchDelay = 1400;

    // Inaugural burst of 2 celebration fireworks
    launchRocket();
    setTimeout(() => {
      if (isRunning) launchRocket();
    }, 450);

    const render = () => {
      if (!ctx || !canvas) return;

      if (!isTabVisible) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      // Check auto-launch timer
      const now = Date.now();
      if (now - lastLaunch > minLaunchDelay && Math.random() > 0.4) {
        launchRocket();
        lastLaunch = now;
      }

      // Trail clear: high-performance destination-out blend
      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = "rgba(19, 17, 24, 0.28)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Additive blend for radiant glow WITHOUT expensive shadowBlur
      ctx.globalCompositeOperation = "lighter";

      // Update & draw rockets
      for (let i = rockets.length - 1; i >= 0; i--) {
        const r = rockets[i];
        r.y += r.vy;

        ctx.fillStyle = r.color;
        ctx.beginPath();
        ctx.arc(r.x, r.y, 2.2, 0, Math.PI * 2);
        ctx.fill();

        // Subtle spark tail
        ctx.fillStyle = "rgba(255, 209, 102, 0.7)";
        ctx.beginPath();
        ctx.arc(r.x, r.y + 4, 1.2, 0, Math.PI * 2);
        ctx.fill();

        if (r.y <= r.targetY) {
          createExplosion(r.x, r.y, r.color);
          rockets.splice(i, 1);
        }
      }

      // Update & draw particles with zero garbage collection allocations
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.vx *= p.friction;
        p.vy *= p.friction;
        p.vy += p.gravity;
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      isRunning = false;
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      if (ctx && canvas) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    };
  }, [active]);

  if (!active) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-30 transition-opacity duration-700"
      aria-hidden="true"
    />
  );
};
