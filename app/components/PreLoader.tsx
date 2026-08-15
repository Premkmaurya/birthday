"use client";

import { useEffect, useState } from "react";

export const criticalImages = [
  "/left-section.png",
  "/right-section.png",
  "/download.jpg",
  "/photos/first.jpg",
  "/photos/second.jpg",
  "/photos/third.jpg",
];

const criticalAudio = ["/Happy Birthday.mp3"];

export const preloadImage = (src: string): Promise<void> =>
  new Promise((resolve) => {
    const img = new Image();

    img.onload = () => resolve();
    img.onerror = () => {
      console.warn(`Asset preloader: image failed to load (${src})`);
      resolve();
    };

    img.src = src;
  });

export const preloadAudio = (src: string): Promise<void> =>
  new Promise((resolve) => {
    const audio = new Audio();
    let settled = false;
    const timeoutMs = 8000;

    const finish = () => {
      if (settled) return;
      settled = true;
      clearTimeout(timeoutId);
      audio.removeEventListener("canplaythrough", onReady);
      audio.removeEventListener("error", onError);
      resolve();
    };

    const onReady = () => finish();
    const onError = () => {
      console.warn(`Asset preloader: audio failed to load (${src})`);
      finish();
    };

    const timeoutId = window.setTimeout(() => {
      console.warn(`Asset preloader: audio timed out after ${timeoutMs}ms (${src})`);
      finish();
    }, timeoutMs);

    audio.preload = "auto";
    audio.src = src;
    audio.addEventListener("canplaythrough", onReady, { once: true });
    audio.addEventListener("error", onError, { once: true });
    audio.load();

    if (audio.readyState >= 3) {
      finish();
    }
  });

const PreLoader = ({
  setShowContent,
  showContent,
}: {
  setShowContent: (show: boolean) => void;
  showContent: boolean;
}) => {
  const [isReady, setIsReady] = useState(false);
  const [loadedAssets, setLoadedAssets] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let cancelled = false;
    const totalAssets = criticalImages.length + criticalAudio.length;

    const loadCriticalAssets = async () => {
      const tasks = [
        ...criticalImages.map((src) => () => preloadImage(src)),
        ...criticalAudio.map((src) => () => preloadAudio(src)),
      ];

      let completed = 0;

      await Promise.all(
        tasks.map(async (task) => {
          try {
            await task();
          } catch (error) {
            console.warn("Asset preloader: failed to resolve a critical asset.", error);
          } finally {
            if (cancelled) return;

            completed += 1;
            setLoadedAssets(completed);
            setProgress(Math.round((completed / totalAssets) * 100));
          }
        }),
      );

      if (cancelled) return;

      setIsReady(true);
    };

    loadCriticalAssets();

    return () => {
      cancelled = true;
    };
  }, [setShowContent]);

  useEffect(() => {
    if (!isReady) return;

    const timer = window.setTimeout(() => {
      setShowContent(true);
    }, 400);

    return () => window.clearTimeout(timer);
  }, [isReady, setShowContent]);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-[#10090D] text-white transition-opacity duration-500 ease-out ${
        showContent ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      aria-live="polite"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,126,163,0.35),_transparent_45%),radial-gradient(circle_at_bottom,_rgba(255,215,85,0.18),_transparent_40%)]" />

      <div className="relative z-10 w-full max-w-xl px-6 text-center">
        <p className="mb-4 text-[0.65rem] font-medium uppercase tracking-[0.5em] text-pink-200/80">
          Preparing something special...
        </p>

        <h1 className="mb-8 text-3xl font-black tracking-tight text-[#FFE7A9] sm:text-5xl">
          Loading your memories...
        </h1>

        <div className="mb-3 h-2.5 overflow-hidden rounded-full border border-white/10 bg-white/5">
          <div
            className="h-full rounded-full bg-gradient-to-r from-pink-400 via-fuchsia-400 to-yellow-300 transition-[width] duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex items-center justify-between text-[0.7rem] font-medium uppercase tracking-[0.32em] text-white/70">
          <span>{progress}%</span>
          <span>
            {loadedAssets}/{criticalImages.length + criticalAudio.length}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PreLoader;
