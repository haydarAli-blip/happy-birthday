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

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let isRunning = true;

    // Palette: Elegant Dark Rose, Champagne Gold, Soft Lavender, Crystal White
    const colors = [
      "#FF6B9E", // rose pink
      "#FFA3C1", // soft pink
      "#FFD166", // warm champagne gold
      "#A78BFA", // soft lavender
      "#FFFFFF", // starlight white
      "#F472B6", // bright pink
    ];

    const resizeCanvas = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const particles: Particle[] = [];
    const rockets: Rocket[] = [];

    const createExplosion = (x: number, y: number, color: string) => {
      const count = 45 + Math.floor(Math.random() * 25);
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.5;
        const speed = 1.5 + Math.random() * 4.5;
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          alpha: 1,
          color,
          size: 1.5 + Math.random() * 2,
          friction: 0.965,
          gravity: 0.05,
          decay: 0.012 + Math.random() * 0.015,
        });
      }
    };

    const launchRocket = () => {
      if (!isRunning || !canvas) return;
      const x = canvas.width * 0.15 + Math.random() * (canvas.width * 0.7);
      const targetY = canvas.height * 0.15 + Math.random() * (canvas.height * 0.35);
      const color = colors[Math.floor(Math.random() * colors.length)];
      rockets.push({
        x,
        y: canvas.height,
        targetY,
        vy: -(6 + Math.random() * 3),
        color,
      });
    };

    // Auto launch rockets periodically
    const launchInterval = setInterval(() => {
      if (Math.random() > 0.3) {
        launchRocket();
      }
    }, 1200);

    // Initial 2 rockets
    launchRocket();
    setTimeout(launchRocket, 400);

    const render = () => {
      if (!ctx || !canvas) return;

      // Gentle fade trail for dark rose atmosphere
      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = "rgba(19, 17, 24, 0.25)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.globalCompositeOperation = "lighter";

      // Update & draw rockets
      for (let i = rockets.length - 1; i >= 0; i--) {
        const r = rockets[i];
        r.y += r.vy;

        // Draw rocket head & spark trail
        ctx.beginPath();
        ctx.arc(r.x, r.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = r.color;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(r.x + (Math.random() - 0.5) * 2, r.y + 4, 1.2, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, 209, 102, 0.6)";
        ctx.fill();

        if (r.y <= r.targetY) {
          createExplosion(r.x, r.y, r.color);
          rockets.splice(i, 1);
        }
      }

      // Update & draw particles
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

        ctx.save();
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      isRunning = false;
      clearInterval(launchInterval);
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [active]);

  if (!active) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-30 transition-opacity duration-1000"
      aria-hidden="true"
    />
  );
};

