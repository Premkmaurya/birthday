"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const formatTime = (seconds: number) => {
  if (!seconds || Number.isNaN(seconds)) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

export default function MusicPlayerCard({
  src = "/Happy Birthday.mp3",
  cover = "/download.jpg",
  title = "Sweety Song",
  subtitle = "BIRTHDAY PLAYLIST",
}: {
  src?: string;
  cover?: string;
  title?: string;
  subtitle?: string;
}) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (!cardRef.current) return;
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 40, scale: 0.96 },
      { opacity: 1, y: 0, scale: 1, duration: 0.9, ease: "power2.out" }
    );
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onLoaded = () => {
      setDuration(audio.duration || 0);
    };

    const onTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);

    audio.addEventListener("loadedmetadata", onLoaded);
    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);

    return () => {
      audio.pause();
      audio.removeEventListener("loadedmetadata", onLoaded);
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
    };
  }, []);

  const togglePlayback = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (playing) {
      audio.pause();
    } else {
      audio.play().catch(() => {
        setPlaying(false);
      });
    }
  };

  const progress = duration > 0 ? Math.min(100, (currentTime / duration) * 100) : 0;

  return (
    <div
      ref={cardRef}
      className="music-card absolute left-1/2 bottom-4 xs:bottom-6 sm:bottom-8 z-30 w-[280px] xs:w-[320px] sm:w-[360px] md:w-[400px] max-w-[90vw] -translate-x-1/2 rounded-xl border border-white/10 bg-[#111111]/95 p-2 xs:p-2.5 sm:p-3 shadow-[0_24px_80px_rgba(0,0,0,0.3)] backdrop-blur-xl text-white"
    >
      <audio ref={audioRef} src={src} preload="auto" />
      <div className="flex items-center gap-2 xs:gap-3">
        <div className="relative h-12 w-12 xs:h-14 xs:w-14 sm:h-16 sm:w-16 flex-shrink-0 overflow-hidden rounded-[0.75rem] xs:rounded-[1rem] sm:rounded-[1.25rem] border border-white/10 shadow-lg shadow-black/40">
          <img src={cover} alt="Album cover" className="h-full w-full object-cover" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="text-xs xs:text-sm sm:text-base font-semibold text-white truncate">{title}</div>
          <div className="mt-0.5 xs:mt-1 text-[0.55rem] xs:text-[0.65rem] sm:text-[0.7rem] uppercase tracking-[0.15em] xs:tracking-[0.28em] text-white/60">{subtitle}</div>

          <div className="mt-2 xs:mt-2.5 sm:mt-3 h-1 xs:h-1.5 sm:h-[5px] overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-pink-500 via-[#8453FF] to-cyan-400 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="mt-1 xs:mt-1.5 sm:mt-2 flex items-center justify-between text-[0.55rem] xs:text-[0.65rem] sm:text-[0.7rem] text-white/60">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        <button
          type="button"
          onClick={togglePlayback}
          className="flex h-10 w-10 xs:h-11 xs:w-11 sm:h-12 sm:w-12 flex-shrink-0 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
          aria-label={playing ? "Pause song" : "Play song"}
        >
          {playing ? (
            <svg viewBox="0 0 24 24" className="h-4 w-4 xs:h-5 xs:w-5 sm:h-6 sm:w-6 fill-current">
              <rect x="6" y="5" width="4" height="14" rx="1" />
              <rect x="14" y="5" width="4" height="14" rx="1" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" className="h-4 w-4 xs:h-5 xs:w-5 sm:h-6 sm:w-6 fill-current">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}
