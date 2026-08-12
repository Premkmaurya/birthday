import React, { useEffect, useRef } from "react";
import gsap from "gsap";

interface BirthdayMessageProps {
  message: string;
}

const BirthdayMessage: React.FC<BirthdayMessageProps> = ({ message }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    gsap.set(ref.current, { opacity: 0, y: 20 });

    const ctx = gsap.context(() => {
      gsap.to(ref.current, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: "power3.out",
        delay: 0.9,
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className="mt-6 md:mt-10 max-w-sm">
      <p
        className="font-bricolage font-light text-gray-600"
        style={{
          fontSize: "clamp(0.95rem, 2.2vw, 1.15rem)",
          lineHeight: "1.6",
          fontWeight: 400,
          color: "#555555",
        }}
      >
        {message}
      </p>
    </div>
  );
};

export default BirthdayMessage;
