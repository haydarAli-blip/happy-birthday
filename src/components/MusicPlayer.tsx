"use client";

import React, { useState, useEffect, useRef } from "react";
import { Play, Pause, Volume2, VolumeX, Music } from "lucide-react";
import { BIRTHDAY_CONFIG } from "@/config/birthdayData";
import { ambientAudio } from "@/utils/ambientAudio";

interface MusicPlayerProps {
  compact?: boolean;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({ compact = false }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(BIRTHDAY_CONFIG.music.defaultVolume);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const hasCustomAudio = Boolean(BIRTHDAY_CONFIG.music.customAudioSrc);

  const togglePlay = () => {
    if (isPlaying) {
      if (hasCustomAudio && audioRef.current) {
        audioRef.current.pause();
      } else if (ambientAudio) {
        ambientAudio.pause();
      }
      setIsPlaying(false);
    } else {
      if (hasCustomAudio && audioRef.current) {
        audioRef.current.play().catch(() => {
          // fallback to ambient synth if custom audio fails
          ambientAudio?.play();
        });
      } else if (ambientAudio) {
        ambientAudio.play();
      }
      setIsPlaying(true);
    }
  };

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
    if (newVolume === 0) {
      setIsMuted(true);
    } else {
      setIsMuted(false);
    }
    if (hasCustomAudio && audioRef.current) {
      audioRef.current.volume = newVolume;
    }
    ambientAudio?.setVolume(newVolume);
  };

  const toggleMute = () => {
    if (isMuted) {
      setIsMuted(false);
      handleVolumeChange(volume > 0 ? volume : 0.5);
    } else {
      setIsMuted(true);
      if (hasCustomAudio && audioRef.current) {
        audioRef.current.volume = 0;
      }
      ambientAudio?.setVolume(0);
    }
  };

  useEffect(() => {
    const currentAudio = audioRef.current;
    return () => {
      ambientAudio?.pause();
      if (currentAudio) {
        currentAudio.pause();
      }
    };
  }, []);

  if (compact) {
    return (
      <div className="flex items-center gap-2">
        {hasCustomAudio && (
          <audio
            ref={audioRef}
            src={BIRTHDAY_CONFIG.music.customAudioSrc}
            loop
            preload="metadata"
          />
        )}
        <button
          onClick={togglePlay}
          aria-label={isPlaying ? "Jeda musik" : "Putar musik ambient"}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 border ${
            isPlaying
              ? "bg-[#FF6B9E]/15 text-[#FF6B9E] border-[#FF6B9E]/40 shadow-[0_0_12px_rgba(255,107,158,0.2)]"
              : "bg-[#1C1923] text-[#B8B2C2] border-[rgba(255,107,158,0.2)] hover:text-[#F8FAFC] hover:border-[#FF6B9E]/40"
          }`}
        >
          {isPlaying ? (
            <>
              <Pause className="w-3.5 h-3.5 fill-current" />
              <span className="hidden sm:inline">Playing</span>
              {/* Sound wave visualizer */}
              <span className="flex items-end gap-0.5 h-3 ml-0.5">
                <span className="w-0.5 bg-[#FF6B9E] animate-[soundbar_0.8s_ease-in-out_infinite_alternate]" style={{ height: "60%" }} />
                <span className="w-0.5 bg-[#FF6B9E] animate-[soundbar_0.8s_ease-in-out_0.2s_infinite_alternate]" style={{ height: "100%" }} />
                <span className="w-0.5 bg-[#FF6B9E] animate-[soundbar_0.8s_ease-in-out_0.4s_infinite_alternate]" style={{ height: "40%" }} />
              </span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 fill-current" />
              <span className="hidden sm:inline">Play Melody</span>
            </>
          )}
        </button>
      </div>
    );
  }

  return (
    <aside
      aria-label="Pemutar musik latar belakang"
      className="relative flex items-center gap-3 bg-[#1C1923]/90 backdrop-blur-md px-3.5 py-2 rounded-full border border-[rgba(255,107,158,0.22)] shadow-[0_8px_24px_rgba(0,0,0,0.4)] text-xs transition-all duration-300 hover:border-[#FF6B9E]/40"
    >
      {hasCustomAudio && (
        <audio
          ref={audioRef}
          src={BIRTHDAY_CONFIG.music.customAudioSrc}
          loop
          preload="metadata"
        />
      )}

      {/* Play/Pause Button */}
      <button
        onClick={togglePlay}
        aria-label={isPlaying ? "Jeda musik" : "Putar musik ambient"}
        className={`w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200 ${
          isPlaying
            ? "bg-[#FF6B9E] text-[#131118] shadow-[0_0_12px_rgba(255,107,158,0.4)]"
            : "bg-[#282332] text-[#FF6B9E] hover:bg-[#FF6B9E] hover:text-[#131118]"
        }`}
      >
        {isPlaying ? (
          <Pause className="w-3.5 h-3.5 fill-current" />
        ) : (
          <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
        )}
      </button>

      {/* Track Info */}
      <div className="flex flex-col min-w-0 pr-1">
        <div className="flex items-center gap-1.5">
          <Music className={`w-3 h-3 ${isPlaying ? "text-[#FF6B9E]" : "text-[#7E778B]"}`} />
          <span className="font-medium text-[#F8FAFC] truncate max-w-[120px] sm:max-w-[140px]">
            {BIRTHDAY_CONFIG.music.title}
          </span>
        </div>
        <span className="text-[10px] text-[#B8B2C2] truncate max-w-[120px] sm:max-w-[140px]">
          {isPlaying ? (
            <span className="text-[#FF6B9E] flex items-center gap-1">
              <span>Playing acoustic lofi</span>
              <span className="inline-block w-1 h-1 rounded-full bg-[#FF6B9E] animate-ping" />
            </span>
          ) : (
            BIRTHDAY_CONFIG.music.artist
          )}
        </span>
      </div>

      {/* Volume / Mute Controls */}
      <div
        className="relative flex items-center"
        onMouseEnter={() => setShowVolumeSlider(true)}
        onMouseLeave={() => setShowVolumeSlider(false)}
      >
        <button
          onClick={toggleMute}
          aria-label={isMuted ? "Aktifkan suara" : "Bisukan suara"}
          className="text-[#B8B2C2] hover:text-[#F8FAFC] p-1 rounded-md transition-colors"
        >
          {isMuted || volume === 0 ? (
            <VolumeX className="w-3.5 h-3.5 text-[#7E778B]" />
          ) : (
            <Volume2 className="w-3.5 h-3.5" />
          )}
        </button>

        {showVolumeSlider && (
          <div className="absolute right-0 bottom-full mb-2 bg-[#1C1923] p-2 rounded-lg border border-[rgba(255,107,158,0.22)] shadow-xl flex items-center gap-2 z-50">
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={isMuted ? 0 : volume}
              onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
              className="w-20 h-1 bg-[#282332] accent-[#FF6B9E] cursor-pointer rounded-lg"
              aria-label="Kontrol volume"
            />
          </div>
        )}
      </div>
    </aside>
  );
};

