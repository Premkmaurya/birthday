import React, { useEffect, useRef } from "react";
import gsap from "gsap";

interface DateLabelProps {
  month: string;
  day: number;
}

const DateLabel: React.FC<DateLabelProps> = ({ month, day }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    // Initial state
    gsap.set(ref.current, { opacity: 0, y: 15 });

    // Trigger animation when component enters viewport
    const ctx = gsap.context(() => {
      gsap.to(ref.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.1,
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className="mb-4 xs:mb-6 sm:mb-8 md:mb-12">
      <div
        className="text-xs xs:text-[0.8rem] sm:text-sm font-bricolage tracking-widest text-gray-500 uppercase"
        style={{
          letterSpacing: "0.1em",
          fontSize: "clamp(0.7rem, 1.5vw, 0.875rem)",
        }}
      >
        {month} {day}
      </div>
    </div>
  );
};

export default DateLabel;
