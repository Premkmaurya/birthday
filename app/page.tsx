"use client";
import { useState } from "react";
import PreLoader from "./components/PreLoader";
import HeroSection from "./components/HeroSection";
import MiddleSection from "./components/MiddleSection";
import LastSection from "./components/LastSection";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Home() {
  const [showContent, setShowContent] = useState(false);
  const [image, setImage] = useState(false);

  gsap.registerPlugin(useGSAP);

  useGSAP(() => {
    if (!showContent) return;

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
  }, [showContent]);

  return (
    <main className="min-h-screen text-white font-sans overflow-x-hidden selection:bg-pink-500 selection:text-white bg-black">
      <PreLoader setShowContent={setShowContent} showContent={showContent} />

      <div
        className={`transition-opacity duration-500 ease-out ${
          showContent ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!showContent}
      >
        <HeroSection image={image} setImage={setImage} />
        <MiddleSection />
        <LastSection />
      </div>
    </main>
  );
}
