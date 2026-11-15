"use client";

import { useState, useRef, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { birthdayConfig } from "@/lib/config";
import { X, ImageIcon } from "lucide-react";
import Image from "next/image";

interface LightboxState {
  isOpen: boolean;
  index: number;
}

function PhotoPlaceholder({ aspect }: { aspect: string }) {
  const aspectClass =
    aspect === "portrait"
      ? "aspect-[3/4]"
      : aspect === "landscape"
      ? "aspect-[4/3]"
      : "aspect-square";

  return (
    <div
      className={`${aspectClass} bg-bg-secondary/80 rounded-lg flex flex-col items-center justify-center gap-3 border border-border-subtle`}
    >
      <ImageIcon size={28} className="text-text-secondary/30" />
      <span className="text-xs text-text-secondary/40 tracking-wide">
        Add photo
      </span>
    </div>
  );
}

export default function MemoryGallery() {
  const [lightbox, setLightbox] = useState<LightboxState>({
    isOpen: false,
    index: 0,
  });
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const photos = birthdayConfig.memories.photos;

  const openLightbox = (index: number) => {
    setLightbox({ isOpen: true, index });
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = useCallback(() => {
    setLightbox((prev) => ({ ...prev, isOpen: false }));
    document.body.style.overflow = "";
  }, []);

  const navigateLightbox = useCallback(
    (direction: number) => {
      setLightbox((prev) => ({
        ...prev,
        index: (prev.index + direction + photos.length) % photos.length,
      }));
    },
    [photos.length]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") navigateLightbox(-1);
      if (e.key === "ArrowRight") navigateLightbox(1);
    },
    [closeLightbox, navigateLightbox]
  );

  const handleImageLoad = (id: number) => {
    setLoadedImages((prev) => new Set(prev).add(id));
  };

  const handleImageError = (id: number) => {
    // Image failed to load - don't add to loaded set
    // The placeholder will show instead
  };

  return (
    <section id="memories" ref={ref} className="py-24 sm:py-32 relative">
      {/* Subtle separator */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-border-rose to-transparent" />

      <div className="max-w-4xl mx-auto px-6">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="text-xs tracking-[0.25em] text-text-secondary/70 uppercase mb-3">
            Our Memories
          </p>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-text-primary">
            {birthdayConfig.memories.title}
          </h2>
        </motion.div>

        {/* Editorial photo grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {photos.map((photo, index) => {
            const isLoaded = loadedImages.has(photo.id);
            // Vary sizes for editorial feel
            const spanClass =
              index === 0
                ? "sm:col-span-2 lg:col-span-2"
                : index === 3
                ? "sm:col-span-2 lg:col-span-1"
                : "";

            return (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className={`group cursor-pointer ${spanClass}`}
                onClick={() => isLoaded && openLightbox(index)}
                role="button"
                tabIndex={0}
                aria-label={`View photo: ${photo.caption}`}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    if (isLoaded) openLightbox(index);
                  }
                }}
              >
                <div className="relative overflow-hidden rounded-lg">
                  {!isLoaded && <PhotoPlaceholder aspect={photo.aspect} />}
                  <div className={isLoaded ? "block" : "hidden"}>
                    <div
                      className={`relative ${
                        photo.aspect === "portrait"
                          ? "aspect-[3/4]"
                          : photo.aspect === "landscape"
                          ? "aspect-[4/3]"
                          : "aspect-square"
                      }`}
                    >
                      <Image
                        src={photo.src}
                        alt={photo.caption}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        onLoad={() => handleImageLoad(photo.id)}
                        onError={() => handleImageError(photo.id)}
                      />
                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-bg-primary/0 group-hover:bg-bg-primary/30 transition-colors duration-300" />
                    </div>
                  </div>
                </div>
                {/* Caption */}
                <p className="mt-3 text-sm text-text-secondary/70 leading-relaxed">
                  {photo.caption}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox.isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="lightbox-overlay"
            onClick={closeLightbox}
            onKeyDown={handleKeyDown}
            tabIndex={0}
            role="dialog"
            aria-label="Photo lightbox"
            aria-modal="true"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative max-w-4xl max-h-[85vh] mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={photos[lightbox.index].src}
                alt={photos[lightbox.index].caption}
                width={1200}
                height={800}
                className="max-h-[80vh] w-auto h-auto rounded-lg object-contain"
              />
              <p className="mt-4 text-center text-sm text-text-secondary">
                {photos[lightbox.index].caption}
              </p>

              {/* Close button */}
              <button
                onClick={closeLightbox}
                className="absolute -top-12 right-0 text-text-secondary hover:text-text-primary transition-colors p-2"
                aria-label="Close lightbox"
              >
                <X size={20} />
              </button>

              {/* Navigation arrows */}
              {photos.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigateLightbox(-1);
                    }}
                    className="absolute top-1/2 -translate-y-1/2 -left-12 sm:-left-14 text-text-secondary hover:text-text-primary transition-colors p-2 text-2xl"
                    aria-label="Previous photo"
                  >
                    ‹
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigateLightbox(1);
                    }}
                    className="absolute top-1/2 -translate-y-1/2 -right-12 sm:-right-14 text-text-secondary hover:text-text-primary transition-colors p-2 text-2xl"
                    aria-label="Next photo"
                  >
                    ›
                  </button>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

