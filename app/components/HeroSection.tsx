"use client";
import { useState } from "react";
import CountUp from "./CountUp";
import MusicPlayerCard from "./MusicPlayerCard";
import gsap from "gsap";

const LandingPage = ({
  image,
  setImage,
}: {
  setImage: (show: boolean) => void;
  image: boolean;
}) => {
  const [celebration, setCelebration] = useState(false);

  const handleImage = () => {
    const tl = gsap.timeline();
    tl.to(".counter", {
      fontSize: "36rem",
      duration: 0.5,
      ease: "expo.inOut",
      onComplete: () => setImage(true),
    });
    setTimeout(() => {
      gsap.to(".image", {
        opacity: 1,
        duration: 0.5,
        ease: "power2.inOut",
      });
    }, 1000);
    tl.to(".image", {
      filter: "blur(10px)",
      duration: 1.5,
    })
      .call(() => setCelebration(true), null, "+=0.3")
      .to(".counter", {
        y: -60,
        duration: 1,
        ease: "power2.inOut",
      })
  };
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute z-12 counter-wrapper w-full h-full flex flex-col items-center justify-center">
        <CountUp
          from={0}
          to={25}
          separator=","
          direction="up"
          duration={1.7}
          className="counter text-[22rem] font-black"
          delay={0.2}
          onEnd={handleImage}
        />
      </div>
      {image && (
        <div className="absolute w-full h-full top-0 left-0 z-10">
          <img
            src="/download.jpg"
            className="image w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
      )}
      {celebration && (
        <>
          <div className="celebration-overlay absolute inset-0 z-20 pointer-events-none">
            <div className="balloon balloon-1" />
            <div className="balloon balloon-2" />
            <div className="balloon balloon-3" />
            <div className="balloon balloon-4" />
            <div className="balloon balloon-5" />
            <div className="balloon balloon-6" />
            <div className="balloon balloon-7" />
            <div className="balloon balloon-8" />
            <div className="balloon balloon-9" />
            <div className="balloon balloon-10" />

            <div className="ribbon ribbon-1" />
            <div className="ribbon ribbon-2" />
            <div className="ribbon ribbon-3" />
            <div className="ribbon ribbon-4" />
            <div className="ribbon ribbon-5" />
            <div className="ribbon ribbon-6" />
            <div className="ribbon ribbon-7" />
            <div className="ribbon ribbon-8" />

            <div className="spark spark-1" />
            <div className="spark spark-2" />
            <div className="spark spark-3" />
            <div className="spark spark-4" />
            <div className="spark spark-5" />
            <div className="spark spark-6" />
            <div className="spark spark-7" />
            <div className="spark spark-8" />
            <div className="spark spark-9" />
            <div className="spark spark-10" />
          </div>
          <MusicPlayerCard />
        </>
      )}
    </div>
  );
};

export default LandingPage;
