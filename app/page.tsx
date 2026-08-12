"use client";
import { useState } from "react";
import PreLoader from "./components/PreLoader";
import CountUp from "./components/CountUp";
import Celebration from "./components/Celebration";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Home() {
  const [showContent, setShowContent] = useState(false);
  const [celebrate, setCelebrate] = useState(false);
  gsap.registerPlugin(useGSAP);

  useGSAP(() => {
    const tl = gsap.timeline();
    tl.fromTo(
      ".counter",
      {
        scale: 15,
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
    <main className="min-h-screen text-white font-sans overflow-x-hidden selection:bg-pink-500 selection:text-white">
      <PreLoader setShowContent={setShowContent} showContent={showContent} />
      {showContent && (
        <div className="relative min-h-screen flex flex-col items-center justify-center p-6 overflow-hidden">
          {celebrate && <Celebration />}
          <div className="relative z-10 w-full h-full flex items-center justify-center">
            <CountUp
              from={0}
              to={25}
              separator=","
              direction="up"
              duration={1.7}
              className="counter text-[20rem] font-black"
              delay={0.2}
              onEnd={() => setCelebrate(true)}
            />
          </div>
        </div>
      )}
    </main>
  );
}
