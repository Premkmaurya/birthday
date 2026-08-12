"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const BALLOON_COLORS = ["#ff4d6d", "#ff85a1", "#ffd166", "#7bdff2", "#b8f2e6", "#cdb4db"];

export default function Celebration() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const balloons = gsap.utils.toArray<HTMLElement>(".birthday-balloon");
      const ribbons = gsap.utils.toArray<HTMLElement>(".birthday-ribbon");

      gsap.fromTo(
        balloons,
        { y: "110vh", opacity: 0, scale: 0.65, rotation: -8 },
        {
          y: () => gsap.utils.random(-30, 40),
          opacity: 1,
          scale: () => gsap.utils.random(0.85, 1.1),
          rotation: () => gsap.utils.random(-12, 12),
          duration: 2.2,
          stagger: 0.08,
          ease: "back.out(1.2)",
        },
      );

      gsap.fromTo(
        ribbons,
        { y: -100, opacity: 0, scale: 0.7, rotation: -20 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          rotation: () => gsap.utils.random(-8, 8),
          duration: 1.4,
          stagger: 0.05,
          ease: "back.out(1.7)",
        },
      );

      balloons.forEach((balloon, index) => {
        gsap.to(balloon, {
          y: `+=${gsap.utils.random(-20, 25)}`,
          x: `+=${gsap.utils.random(-15, 15)}`,
          rotation: `+=${gsap.utils.random(-6, 6)}`,
          duration: gsap.utils.random(2.2, 3.5),
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: index * 0.05,
        });
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="pointer-events-none fixed inset-0 z-30 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-x-0 top-0 flex justify-around px-3">
        {Array.from({ length: 9 }).map((_, index) => (
          <span
            key={`ribbon-${index}`}
            className="birthday-ribbon mt-[-18px] h-28 w-2 rounded-full bg-gradient-to-b from-pink-300 via-pink-500 to-purple-500 shadow-lg"
            style={{ transform: `rotate(${index % 2 ? 7 : -7}deg)` }}
          />
        ))}
      </div>

      {Array.from({ length: 16 }).map((_, index) => {
        const color = BALLOON_COLORS[index % BALLOON_COLORS.length];
        return (
          <div
            key={`balloon-${index}`}
            className="birthday-balloon absolute bottom-[-15vh]"
            style={{
              left: `${3 + (index * 6.3) % 94}%`,
            }}
          >
            <div
              className="h-16 w-12 rounded-[50%] shadow-xl sm:h-20 sm:w-14"
              style={{ background: `radial-gradient(circle at 30% 25%, #fff8 0 7%, transparent 8%), ${color}` }}
            />
            <div
              className="mx-auto h-4 w-3"
              style={{ backgroundColor: color, clipPath: "polygon(0 0, 100% 0, 50% 100%)" }}
            />
            <div className="mx-auto h-24 w-px bg-white/50" />
          </div>
        );
      })}
    </div>
  );
}
