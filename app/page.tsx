"use client";

import { useState, useCallback } from "react";
import PreLoader from "./components/PreLoader";
import CountUp from "./components/CountUp";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Home() {
  const [showContent, setShowContent] = useState(false);
  const [image, setImage] = useState(false);

  gsap.registerPlugin(useGSAP);

  useGSAP(() => {
    if (showContent) {
      gsap.fromTo(
        ".counter",
        {
          scale: 12,
          opacity: 0,
        },
        {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          ease: "power2.inOut",
        },
      );
    }
  }, [showContent]);

  return (
    <main className="min-h-screen text-white font-sans overflow-x-hidden selection:bg-pink-500 selection:text-white bg-black">
      <PreLoader setShowContent={setShowContent} showContent={showContent} />

      {showContent && (
        <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
          <div className="absolute z-12 counter-wrapper w-full h-full flex flex-col items-center justify-center">
            <CountUp
              from={0}
              to={25}
              separator=","
              direction="up"
              duration={1.7}
              className="counter text-[12rem] font-black"
              delay={0.2}
              onEnd={() => {
                setImage(true);
              }}
            />
          </div>
          {image && (
            <div className="absolute w-full h-full top-0 left-0 z-10">
              <img src="/download.jpg" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/40" />
            </div>
          )}
        </div>
      )}
    </main>
  );
}
