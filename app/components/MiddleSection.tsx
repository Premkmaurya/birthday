"use client";
import React from "react";
import DateLabel from "./MiddleSection/DateLabel";
import BirthdayHeading from "./MiddleSection/BirthdayHeading";
import AccentLine from "./MiddleSection/AccentLine";
import BirthdayMessage from "./MiddleSection/BirthdayMessage";
import CircularGallery from "./CircularGallery";
import { birthdayConfig } from "@/app/config/birthday";

const MiddleSection: React.FC = () => {
  const { name, date, heading, message, footerLabel } = birthdayConfig;

  // Gallery items from public photos
  const galleryItems = [
    { image: '/photos/first.jpg', text: 'Cherished Moment' },
    { image: '/photos/second.jpg', text: 'Sweet Memory' },
    { image: '/photos/third.jpg', text: 'Beautiful Moment' },
  ];

  return (
    <section
      className="min-h-screen flex items-center justify-center px-3 xs:px-4 sm:px-6 md:px-8 lg:px-0"
      style={{
        backgroundColor: "#F8F8F5",
      }}
    >
      <div className="w-full max-w-7xl mx-auto">
        {/* Desktop/Tablet: Two Column Layout */}
        <div className="hidden md:grid md:grid-cols-2 md:gap-12 lg:gap-20 items-center">
          {/* Left Section - Editorial Content */}
          <div className="py-12 lg:py-20">
            <DateLabel month={date.month} day={date.day} />

            <BirthdayHeading
              line1={heading.line1}
              line2={heading.line2}
              name={name}
            />

            <AccentLine />

            <BirthdayMessage message={message} />

            {/* Footer Label */}
            <div
              className="mt-16 lg:mt-24 text-xs tracking-widest text-black/70 uppercase"
              style={{
                letterSpacing: "0.15em",
                fontSize: "0.7rem",
              }}
            >
              {footerLabel}
            </div>
          </div>

          {/* Right Section - Visual Composition */}
          <div className="relative h-96 md:h-full md:min-h-screen flex items-center justify-center rounded-2xl overflow-hidden">
            <div style={{ height: '600px', position: 'relative', width: '100%' }}>
              <CircularGallery
                items={galleryItems}
                bend={3}
                textColor="#ffffff"
                borderRadius={0.05}
                scrollEase={0.02}
                font="bold 30px Figtree"
                fontUrl={undefined}
              />
            </div>
          </div>
        </div>

        {/* Mobile: Single Column Layout */}
        <div className="md:hidden flex flex-col gap-8 py-12">
          {/* Date */}
          <DateLabel month={date.month} day={date.day} />

          {/* Heading */}
          <BirthdayHeading
            line1={heading.line1}
            line2={heading.line2}
            name={name}
          />

          {/* Accent Line */}
          <AccentLine />

          {/* Message */}
          <BirthdayMessage message={message} />

          {/* Visual Section */}
          <div className="mt-8 relative h-72 rounded-2xl overflow-hidden">
            <div style={{ height: '100%', position: 'relative', width: '100%' }}>
              <CircularGallery
                items={galleryItems}
                bend={3}
                textColor="#ffffff"
                borderRadius={0.05}
                scrollEase={0.02}
                font="bold 30px Figtree"
                fontUrl={undefined}
              />
            </div>
          </div>

          {/* Footer Label */}
          <div
            className="mt-8 text-xs tracking-widest text-gray-400 uppercase"
            style={{
              letterSpacing: "0.15em",
              fontSize: "0.7rem",
            }}
          >
            {footerLabel}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MiddleSection;
