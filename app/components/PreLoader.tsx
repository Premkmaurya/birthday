"use client";
import React from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";

const PreLoader = ({
  setShowContent,
  showContent,
}: {
  setShowContent: (show: boolean) => void;
  showContent: boolean;
}) => {
  gsap.registerPlugin(useGSAP);
  useGSAP(() => {
    const tl = gsap.timeline();
    const split1 = new SplitText(".text-1", { type: "lines, words, chars" });
    const split2 = new SplitText(".text-2", { type: "lines, words, chars" });

    tl.to(".img-container", {
      opacity: 1,
      duration: 0.8,
      ease: "power2.inOut",
    })
      .fromTo(
        split1.chars,
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.05,
          ease: "power2.inOut",
        },
      )
      .fromTo(
        split2.chars,
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.05,
          ease: "power2.inOut",
        },
      )
      .to(".text-container", {
        opacity: 0,
        y: 10,
        duration: 0.8,
        ease: "power2.inOut",
      })
      .to(".left-panel", {
        x: "-100%",
        duration: 1,
        ease: "power2.inOut",
      })
      .to(
        ".right-panel",
        {
          x: "100%",
          duration: 1,
          ease: "power2.inOut",
          onUpdate: function () {
            if (this.progress() >= 0.99) {
              setShowContent(true);
              this.kill();
            }
          },
        },
        "<",
      );
  }, {});

  return (
    <div
      className={`relative w-screen h-screen overflow-hidden bg-black flex items-center justify-center ${showContent && "hidden"}`}
    >
      <div className="absolute top-0 left-0 w-full h-full bg-transparent z-20 flex items-center justify-center">
        <div className="text-container w-2/3 h-2/3 text-white flex items-center justify-center gap-3 flex-col rounded-lg">
          <span className="text-1">
            <h1 className="text-[3rem] font-black text-shadow-md tracking-tight leading-none text-[#FFEBD3] text-shadow-black">
              NOW SHOWING
            </h1>
          </span>
          <span className="text-2">
            <h1 className="text-[2.7rem] font-black text-center tracking-tight leading-none text-shadow-md text-[#FFEA93] text-shadow-black">
              SOMETHING SPECIAL <br /> FOR YOU...
            </h1>
          </span>
        </div>
      </div>
      <div className="img-container absolute top-0 left-0 w-full h-full z-10 opacity-0">
        <div className="left-panel absolute top-0 left-0 z-14 w-1/2 h-full flex items-center justify-center shadow-lg shadow-black">
          <img
            src="/left-section.png"
            className="w-full h-full object-fill"
            alt=""
          />
        </div>
        <div className="right-panel absolute top-0 right-0 w-1/2 h-full flex items-center justify-center shadow-lg">
          <img
            src="/right-section.png"
            className="w-full h-full object-fill"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default PreLoader;
