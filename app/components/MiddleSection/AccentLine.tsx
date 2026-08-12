import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const AccentLine: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    gsap.set(ref.current, { scaleX: 0, transformOrigin: "left" });

    const ctx = gsap.context(() => {
      gsap.to(ref.current, {
        scaleX: 1,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.65,
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className="mb-5 xs:mb-6 sm:mb-8 md:mb-10">
      <div
        className="h-0.5 xs:h-0.5 sm:h-0.5 md:h-1"
        style={{
          backgroundColor: "#FF9900",
          width: "clamp(50px, 15vw, 80px)",
        }}
      />
    </div>
  );
};

export default AccentLine;
