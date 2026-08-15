"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { FaHeart, FaExpand, FaXmark } from "react-icons/fa6";

interface PolaroidItem {
  id: string;
  src: string;
  caption: string;
  emoji?: string;
  initialX: number;
  initialY: number;
  rotation: number;
  memoryText?: string;
}

const INITIAL_IMAGES: PolaroidItem[] = [
  {
    id: "img-1",
    src: "/photos/first.jpg",
    caption: "My Love",
    initialX: 20,
    initialY: 40,
    rotation: -7,
    memoryText: "You bring so much warmth, comfort, and joy into my life every single day. Forever thankful for you! 💖",
  },
  {
    id: "img-2",
    src: "/photos/second.jpg",
    caption: "Dream Girl",
    emoji: "💫",
    initialX: 160,
    initialY: 140,
    rotation: 5,
    memoryText: "Every glance and smile feels like a dream come true. You are my favorite place to be.",
  },
  {
    id: "img-3",
    src: "/photos/third.jpg",
    caption: "Book",
    initialX: 320,
    initialY: 50,
    rotation: -4,
    memoryText: "Lost in pages, but always thinking of you. Cozy afternoons reading and sharing quiet moments.",
  },
  {
    id: "img-4",
    src: "/photos/fourth.png",
    caption: "Queen",
    emoji: "👑",
    initialX: 470,
    initialY: 20,
    rotation: 6,
    memoryText: "Graceful, bright, and endlessly inspiring. You rule my heart with love!",
  },
  {
    id: "img-5",
    src: "/photos/fifth.png",
    caption: "Sunshine",
    emoji: "🌼",
    initialX: 370,
    initialY: 220,
    rotation: -5,
    memoryText: "Golden hour light on a serene evening. You shine brighter than the setting sun.",
  },
  {
    id: "img-6",
    src: "/photos/sixth.png",
    caption: "Beautiful",
    emoji: "🌸",
    initialX: 580,
    initialY: 180,
    rotation: 4,
    memoryText: "Blooming like spring flowers in the garden. Your happiness is infectious!",
  },
];

interface Butterfly {
  id: number;
  color: string;
  size: number;
  behind: boolean;
  startX: number;
  startY: number;
  duration: number;
}

const BUTTERFLY_COLORS = [
  { wingMain: "#A78BFA", wingDetail: "#C4B5FD", body: "#4C1D95" }, // Purple
  { wingMain: "#F472B6", wingDetail: "#FBCFE8", body: "#831843" }, // Pink
  { wingMain: "#60A5FA", wingDetail: "#BFDBFE", body: "#1E3A8A" }, // Blue
  { wingMain: "#FBBF24", wingDetail: "#FDE68A", body: "#78350F" }, // Gold/Orange
  { wingMain: "#34D399", wingDetail: "#A7F3D0", body: "#064E3B" }, // Emerald
];

export default function LastSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [items] = useState<PolaroidItem[]>(INITIAL_IMAGES);
  const [activeZIndex, setActiveZIndex] = useState<Record<string, number>>({
    "img-1": 10,
    "img-2": 11,
    "img-3": 12,
    "img-4": 13,
    "img-5": 14,
    "img-6": 15,
  });
  const [maxZ, setMaxZ] = useState(20);
  const [selectedPhoto, setSelectedPhoto] = useState<PolaroidItem | null>(null);

  const getButterFlySize = () => {
    if (typeof window === "undefined") return 24;
    if (window.innerWidth < 640) return 16 + Math.random() * 8;
    if (window.innerWidth < 1024) return 20 + Math.random() * 8;
    return 24 + Math.random() * 12;
  };

  const buildButterflies = (): Butterfly[] =>
    Array.from({ length: 9 }).map((_, i) => ({
      id: i,
      color: BUTTERFLY_COLORS[i % BUTTERFLY_COLORS.length].wingMain,
      size: getButterFlySize(),
      behind: i % 2 === 0,
      startX: Math.random() * 75,
      startY: Math.random() * 75,
      duration: 12 + (i % 4) * 4,
    }));

  const [butterflies, setButterflies] = useState<Butterfly[]>(() => buildButterflies());

  useEffect(() => {
    const handleResize = () => {
      setButterflies((prev) =>
        prev.map((b) => ({
          ...b,
          size: getButterFlySize(),
        }))
      );
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const bringToFront = (id: string) => {
    const newZ = maxZ + 1;
    setMaxZ(newZ);
    setActiveZIndex((prev) => ({ ...prev, [id]: newZ }));
  };

  return (
    <section className="relative min-h-screen w-full bg-[#F6F0E6] text-[#4A3E3D] overflow-hidden py-12 px-4 sm:px-8 border-t border-[#E8DFC8]">
      {/* Subtle Background Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-60 pointer-events-none" />

      {/* Background Soft Glow Effects */}
      <div className="absolute top-1/4 left-1/6 w-48 h-48 sm:w-72 sm:h-72 md:w-96 md:h-96 bg-[#FDE8E8] rounded-full blur-3xl opacity-50 pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/6 w-48 h-48 sm:w-72 sm:h-72 md:w-96 md:h-96 bg-[#FEF3C7] rounded-full blur-3xl opacity-50 pointer-events-none" />


      {/* Main Canvas Area */}
      <div
        ref={containerRef}
        className="relative z-10 max-w-6xl mx-auto h-[900px] xs:h-[850px] sm:h-[700px] md:h-[680px] lg:h-[720px] rounded-2xl sm:rounded-3xl border-2 border-dashed border-[#DECFC0] bg-[#FAF5EE]/70 backdrop-blur-xs shadow-inner overflow-hidden"
      >
        {/* Layer 1: Background Flying Butterflies (behind polaroids) */}
        {butterflies
          .filter((b) => b.behind)
          .map((b) => (
            <FlyingButterfly key={`bg-bf-${b.id}`} butterfly={b} />
          ))}

        {/* Polaroid Cards Grid / Canvas */}
        <div className="absolute inset-0 p-2 xs:p-3 sm:p-4 md:p-6 lg:p-8">
          {items.map((item, idx) => (
            <motion.div
              key={item.id}
              drag
              dragConstraints={containerRef}
              dragElastic={0.05}
              dragMomentum={false}
              onDragStart={() => bringToFront(item.id)}
              onClick={() => bringToFront(item.id)}
              onDoubleClick={() => setSelectedPhoto(item)}
              initial={{
                opacity: 0,
                scale: 0.8,
                x: item.initialX,
                y: item.initialY,
                rotate: item.rotation,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                rotate: item.rotation,
              }}
              whileHover={{ scale: 1.05, rotate: 0 }}
              whileTap={{ scale: 1.08, cursor: "grabbing" }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              style={{
                zIndex: activeZIndex[item.id] || 10,
                position: "absolute",
              }}
              className="cursor-grab active:cursor-grabbing select-none group touch-none"
            >
              {/* Polaroid White Card Container */}
              <div className="relative w-36 xs:w-40 sm:w-48 md:w-56 lg:w-64 bg-white p-2 xs:p-2.5 sm:p-3 md:p-3 pt-2 xs:pt-2.5 sm:pt-3 pb-3 xs:pb-3.5 sm:pb-4 rounded-xs shadow-xl border border-gray-200/80 transition-shadow group-hover:shadow-2xl">
                {/* Red Heart Sticker Top-Right */}
                <div className="absolute -top-3 -right-3 z-30 w-8 h-8 rounded-full bg-red-500 flex items-center justify-center shadow-md border-2 border-white transform rotate-12 group-hover:scale-110 transition-transform">
                  <FaHeart className="w-4 h-4 text-white fill-current" />
                </div>

                {/* Photo Container */}
                <div className="relative w-full h-32 xs:h-36 sm:h-44 md:h-48 lg:h-56 bg-gray-100 rounded-2xs overflow-hidden border border-gray-100">
                  <Image
                    src={item.src}
                    alt={item.caption}
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="pointer-events-none object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />

                  {/* Quick Expand Button on Hover */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedPhoto(item);
                    }}
                    className="absolute bottom-2 right-2 p-1.5 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70 cursor-pointer"
                    title="View memory note"
                  >
                    <FaExpand className="w-3 h-3" />
                  </button>
                </div>

                {/* Handwritten Polaroid Caption Area */}
                <div className="mt-1.5 xs:mt-2 sm:mt-2.5 md:mt-3 text-center px-0.5 xs:px-1">
                  <span className="font-handwriting text-lg xs:text-xl sm:text-2xl md:text-3xl text-[#2B2323] tracking-wide block leading-none">
                    {item.caption} {item.emoji && <span className="inline-block text-xl ml-1">{item.emoji}</span>}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Layer 2: Foreground Flying Butterflies (in front of polaroids) */}
        {butterflies
          .filter((b) => !b.behind)
          .map((b) => (
            <FlyingButterfly key={`fg-bf-${b.id}`} butterfly={b} />
          ))}

        {/* Subtle Bottom Watermark in Canvas */}
        <div className="absolute bottom-2 xs:bottom-2.5 sm:bottom-3 md:bottom-4 left-0 right-0 text-center pointer-events-none z-10">
          <p className="font-handwriting text-xs xs:text-sm sm:text-lg md:text-xl text-[#7C6A67] flex items-center justify-center gap-1">
            <span className="text-red-500">♥</span> Made with love, just for you <span className="text-red-500">♥</span>
          </p>
        </div>
      </div>

      {/* Lightbox / Memory Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.85, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.85, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-sm xs:max-w-md w-full bg-white p-3 xs:p-4 sm:p-5 pt-3 xs:pt-3 sm:pt-4 pb-4 xs:pb-5 sm:pb-6 rounded-md shadow-2xl border border-gray-100 mx-2 xs:mx-0"
            >
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-gray-900 text-white flex items-center justify-center hover:bg-gray-700 transition-colors shadow-md cursor-pointer z-10"
              >
                <FaXmark className="w-4 h-4" />
              </button>

              <div className="relative w-full h-48 xs:h-56 sm:h-64 md:h-72 rounded-xs overflow-hidden mb-3 xs:mb-4 bg-gray-100">
                <Image src={selectedPhoto.src} alt={selectedPhoto.caption} fill sizes="(max-width: 640px) 100vw, 40vw" className="object-cover" />
                <div className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full shadow-md">
                  <FaHeart className="w-4 h-4 fill-current" />
                </div>
              </div>

              <div className="text-center px-2 xs:px-3 sm:px-4">
                <h3 className="font-handwriting text-2xl xs:text-3xl sm:text-4xl text-[#3B2F2E] mb-1.5 xs:mb-2">
                  {selectedPhoto.caption} {selectedPhoto.emoji}
                </h3>
                <p className="font-sans text-xs xs:text-sm text-gray-600 italic leading-relaxed">
                  {"“"}
                  {selectedPhoto.memoryText || "A priceless memory to cherish forever."}
                  {"”"}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

{/* Flying Butterfly Component */}
function FlyingButterfly({ butterfly }: { butterfly: Butterfly }) {
  const [coords] = useState({
    // Constrain movements to stay within 70% of bounds to prevent going off-screen
    x: [
      butterfly.startX + "%",
      Math.min(butterfly.startX + 20, 70) + "%",
      Math.max(butterfly.startX - 15, 0) + "%",
      butterfly.startX + "%",
    ],
    y: [
      butterfly.startY + "%",
      Math.min(butterfly.startY + 25, 70) + "%",
      Math.max(butterfly.startY - 10, 0) + "%",
      butterfly.startY + "%",
    ],
    rotate: [0, 25, -20, 15, 0],
  });

  return (
    <motion.div
      animate={{
        x: coords.x,
        y: coords.y,
        rotate: coords.rotate,
      }}
      transition={{
        duration: butterfly.duration,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      style={{
        position: "absolute",
        left: butterfly.startX + "%",
        top: butterfly.startY + "%",
        zIndex: butterfly.behind ? 1 : 40,
        pointerEvents: "none",
      }}
      className="filter drop-shadow-md"
    >
      <motion.svg
        width={butterfly.size}
        height={butterfly.size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        animate={{ scaleX: [1, 0.3, 1] }}
        transition={{
          duration: 0.4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {/* Left Wings */}
        <path
          d="M 50 50 C 20 10, 0 30, 10 55 C 20 70, 45 60, 50 50 Z"
          fill={butterfly.color}
          opacity="0.9"
        />
        <path
          d="M 50 50 C 25 55, 10 75, 25 88 C 40 95, 48 65, 50 50 Z"
          fill={butterfly.color}
          opacity="0.75"
        />

        {/* Right Wings */}
        <path
          d="M 50 50 C 80 10, 100 30, 90 55 C 80 70, 55 60, 50 50 Z"
          fill={butterfly.color}
          opacity="0.9"
        />
        <path
          d="M 50 50 C 75 55, 90 75, 75 88 C 60 95, 52 65, 50 50 Z"
          fill={butterfly.color}
          opacity="0.75"
        />

        {/* Butterfly Body & Antennae */}
        <ellipse cx="50" cy="52" rx="3" ry="18" fill="#2D1810" />
        <path d="M 50 36 C 45 28, 40 24, 38 22" stroke="#2D1810" strokeWidth="2" strokeLinecap="round" />
        <path d="M 50 36 C 55 28, 60 24, 62 22" stroke="#2D1810" strokeWidth="2" strokeLinecap="round" />
      </motion.svg>
    </motion.div>
  );
}
