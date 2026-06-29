"use client";

import { useState } from "react";
import Image from "next/image";

export const SafeImage = ({
  src,
  alt,
  className,
  type = "project",
  fallbackText = "image to be added",
  fallbackClassName = ""
}: {
  src: string;
  alt: string;
  className: string;
  type?: "person" | "project";
  fallbackText?: string;
  fallbackClassName?: string;
}) => {
  const [error, setError] = useState(false);

  if (error) {
    if (type === "person") {
      return (
        <div className={`flex items-center justify-center bg-[#0d0d0d] border border-[#2E4540]/50 p-2 text-center select-none ${className} ${fallbackClassName}`}>
          <div className="w-2/3 h-2/3 max-w-[120px] aspect-square flex items-center justify-center opacity-85">
            <svg
              viewBox="0 0 100 100"
              className="w-full h-full text-[#408175]"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {/* Le Corbusier style glasses + turtleneck architect icon */}
              <circle cx="50" cy="35" r="18" />
              <circle cx="44" cy="35" r="5" className="stroke-[#B5B9F0]" />
              <circle cx="56" cy="35" r="5" className="stroke-[#B5B9F0]" />
              <line x1="49" y1="35" x2="51" y2="35" className="stroke-[#B5B9F0]" />
              <path d="M25 80 C25 65 35 55 50 55 C65 55 75 65 75 80" />
              <path d="M44 55 H56 V62 H44 Z" className="fill-[#0B0909]" />
            </svg>
          </div>
        </div>
      );
    }

    return (
      <div className={`flex items-center justify-center bg-[#0d0d0d] border border-[#2E4540]/50 p-2 text-center select-none ${className} ${fallbackClassName}`}>
        <span className="text-[9px] font-mono text-[#408175] tracking-wider uppercase leading-tight">
          {fallbackText}
        </span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      className={className}
      onError={() => setError(true)}
    />
  );
};
