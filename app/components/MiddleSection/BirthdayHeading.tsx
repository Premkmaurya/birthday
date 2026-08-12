import React, { useEffect, useRef } from "react";
import gsap from "gsap";

interface BirthdayHeadingProps {
  line1: string;
  line2: string;
  name: string;
}

const BirthdayHeading: React.FC<BirthdayHeadingProps> = ({
  line1,
  line2,
  name,
}) => {
  const lineRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      lineRefs.current.forEach((line, index) => {
        if (!line) return;

        gsap.set(line, { opacity: 0, y: 50 });

        gsap.to(line, {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "expo.out",
          delay: 0.2 + index * 0.15,
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="mb-6 md:mb-8">
      <div
        ref={(el) => {
          lineRefs.current[0] = el;
        }}
        className="font-bricolage font-bold text-black"
        style={{
          fontSize: "clamp(3.5rem, 8vw, 7rem)",
          lineHeight: "0.9",
          letterSpacing: "-0.02em",
        }}
      >
        {line1}
      </div>

      <div
        ref={(el) => {
          lineRefs.current[1] = el;
        }}
        className="font-bricolage font-bold text-black"
        style={{
          fontSize: "clamp(3.5rem, 8vw, 7rem)",
          lineHeight: "0.9",
          letterSpacing: "-0.02em",
        }}
      >
        {line2}
      </div>

      <div
        ref={(el) => {
          lineRefs.current[2] = el;
        }}
        className="font-bricolage font-bold"
        style={{
          fontSize: "clamp(3.5rem, 8vw, 7rem)",
          lineHeight: "0.9",
          letterSpacing: "-0.02em",
          color: "#FF9900",
        }}
      >
        {name}
      </div>
    </div>
  );
};

export default BirthdayHeading;
