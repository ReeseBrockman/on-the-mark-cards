"use client";

import { useEffect, useState } from "react";

export default function GlitchBanner({ section }) {
  const [current, setCurrent] = useState(0);
  const [glitching, setGlitching] = useState(false);

  const banners = [
    `/banners/${section}-1.png`,
    `/banners/${section}-2.png`,
    `/banners/${section}-3.png`,
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitching(true);
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % banners.length);
        setGlitching(false);
      }, 400);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="relative w-full overflow-hidden bg-gray-900"
      style={{ height: "286px" }}
    >
      {/* Base image */}
      <div
        style={{
          backgroundImage: `url(${banners[current]})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "100%",
          height: "100%",
        }}
      />

      {/* VHS scan lines overlay - always visible, subtle */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)",
          zIndex: 2,
        }}
      />

      {/* Glitch layers - only during transition */}
      {glitching && (
        <>
          {/* RGB split - red channel */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${banners[current]})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              transform: "translate(-3px, 0)",
              mixBlendMode: "screen",
              opacity: 0.4,
              filter: "saturate(2) hue-rotate(0deg)",
              zIndex: 3,
            }}
          />
          {/* RGB split - blue channel */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${banners[current]})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              transform: "translate(3px, 0)",
              mixBlendMode: "screen",
              opacity: 0.4,
              filter: "saturate(2) hue-rotate(180deg)",
              zIndex: 3,
            }}
          />
          {/* Horizontal tear */}
          <div
            className="absolute w-full"
            style={{
              height: "4px",
              top: `${30 + Math.random() * 40}%`,
              background: "rgba(255,255,255,0.15)",
              transform: "translateX(-8px)",
              zIndex: 4,
            }}
          />
          {/* Static overlay */}
          <div
            className="absolute inset-0"
            style={{
              background: "rgba(255,255,255,0.04)",
              zIndex: 4,
            }}
          />
        </>
      )}
    </section>
  );
}
