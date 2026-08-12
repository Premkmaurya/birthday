"use client";
import { useState, useCallback } from "react";
import PreLoader from "./components/PreLoader";
import HeroSection from "./components/HeroSection";
import MiddleSection from "./components/MiddleSection";

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
        <>
          <HeroSection image={image} setImage={setImage} />
          <MiddleSection />
        </>
      )}
    </main>
  );
}
