"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { birthdayConfig } from "@/lib/config";
import { Play, Pause, Volume2, VolumeX, Music } from "lucide-react";

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [hasAudio, setHasAudio] = useState(birthdayConfig.music.hasAudio);
  const [expanded, setExpanded] = useState(false);

  // Check if audio file exists
  useEffect(() => {
    if (birthdayConfig.music.hasAudio && audioRef.current) {
      audioRef.current.addEventListener("error", () => {
        setHasAudio(false);
      });
    }
  }, []);

  const togglePlay = useCallback(() => {
    if (!audioRef.current || !hasAudio) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {
        setHasAudio(false);
      });
    }
    setIsPlaying(!isPlaying);
  }, [isPlaying, hasAudio]);

  const toggleMute = useCallback(() => {
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  }, [isMuted]);

  return (
    <div className="fixed top-20 right-4 z-40 sm:top-4 sm:right-4">
      {hasAudio && (
        <audio ref={audioRef} src={birthdayConfig.music.src} loop preload="auto" />
      )}

      {/* Collapsed state - just icon */}
      {!expanded ? (
        <button
          onClick={() => setExpanded(true)}
          className="w-9 h-9 rounded-full bg-bg-secondary/90 backdrop-blur-sm border border-border-subtle flex items-center justify-center text-text-secondary hover:text-pink hover:border-border-rose transition-all"
          aria-label="Open music player"
        >
          <Music size={14} />
          {isPlaying && (
            <span
              className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-pink"
              style={{ animation: "music-pulse 1.5s ease-in-out infinite" }}
            />
          )}
        </button>
      ) : (
        /* Expanded state */
        <div className="bg-bg-secondary/95 backdrop-blur-sm border border-border-subtle rounded-lg p-3 min-w-[200px] shadow-xl shadow-black/20">
          <div className="flex items-center gap-3">
            {/* Play/Pause */}
            <button
              onClick={togglePlay}
              disabled={!hasAudio}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                hasAudio
                  ? "bg-pink/10 text-pink hover:bg-pink/20"
                  : "bg-bg-primary text-text-secondary/30 cursor-not-allowed"
              }`}
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? <Pause size={14} /> : <Play size={14} className="ml-0.5" />}
            </button>

            {/* Track info */}
            <div className="flex-1 min-w-0">
              {hasAudio ? (
                <>
                  <p className="text-xs font-medium text-text-primary truncate">
                    {birthdayConfig.music.title}
                  </p>
                  <p className="text-[10px] text-text-secondary/70 truncate">
                    {birthdayConfig.music.artist}
                  </p>
                </>
              ) : (
                <p className="text-xs text-text-secondary/50">
                  No music loaded
                </p>
              )}
            </div>

            {/* Volume */}
            {hasAudio && (
              <button
                onClick={toggleMute}
                className="text-text-secondary/60 hover:text-text-secondary transition-colors p-1"
                aria-label={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? <VolumeX size={13} /> : <Volume2 size={13} />}
              </button>
            )}

            {/* Close */}
            <button
              onClick={() => setExpanded(false)}
              className="text-text-secondary/40 hover:text-text-secondary transition-colors text-xs p-1"
              aria-label="Minimize player"
            >
              ✕
            </button>
          </div>

          {/* Playing indicator */}
          {isPlaying && (
            <div className="flex items-center gap-1 mt-2 justify-center">
              {[...Array(4)].map((_, i) => (
                <span
                  key={i}
                  className="w-0.5 bg-pink/60 rounded-full"
                  style={{
                    height: `${6 + Math.random() * 8}px`,
                    animation: `music-pulse ${0.6 + i * 0.15}s ease-in-out infinite ${i * 0.1}s`,
                  }}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

