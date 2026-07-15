"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";

export const SafeImage = ({
  src,
  alt,
  className,
  type = "project",
  fallbackText = "image to be added",
  fallbackClassName = "",
  fill = true,
  zoom = false,
  sizes
}: {
  src: string;
  alt: string;
  className: string;
  type?: "person" | "project";
  fallbackText?: string;
  fallbackClassName?: string;
  fill?: boolean;
  zoom?: boolean;
  sizes?: string;
}) => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [zooming, setZooming] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0, pxX: 0, pxY: 0, width: 0, height: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const isSvg = typeof src === "string" && src.endsWith(".svg");

  if (isSvg) {
    return (
      <img
        src={src}
        alt={alt}
        className={className}
        style={
          fill
            ? {
                position: "absolute",
                height: "100%",
                width: "100%",
                inset: 0,
                objectFit: "cover",
              }
            : undefined
        }
      />
    );
  }

  useEffect(() => {
    setError(false);
    setLoading(true);
  }, [src]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    setCoords({
      x: (x / width) * 100,
      y: (y / height) * 100,
      pxX: x,
      pxY: y,
      width,
      height
    });
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!containerRef.current || e.touches.length === 0) return;
    const touch = e.touches[0];
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(width, touch.clientX - left));
    const y = Math.max(0, Math.min(height, touch.clientY - top));
    setCoords({
      x: (x / width) * 100,
      y: (y / height) * 100,
      pxX: x,
      pxY: y,
      width,
      height
    });
  };

  if (error) {
    if (type === "person") {
      return (
        <div className={`flex items-center justify-center bg-card border border-border/50 p-2 text-center select-none ${className} ${fallbackClassName}`}>
          <div className="w-2/3 h-2/3 max-w-[120px] aspect-square flex items-center justify-center opacity-85">
            <svg
              viewBox="0 0 100 100"
              className="w-full h-full text-accent"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {/* Le Corbusier style glasses + turtleneck architect icon */}
              <circle cx="50" cy="35" r="18" />
              <circle cx="44" cy="35" r="5" className="stroke-foreground" />
              <circle cx="56" cy="35" r="5" className="stroke-foreground" />
              <line x1="49" y1="35" x2="51" y2="35" className="stroke-foreground" />
              <path d="M25 80 C25 65 35 55 50 55 C65 55 75 65 75 80" />
              <path d="M44 55 H56 V62 H44 Z" className="fill-background" />
            </svg>
          </div>
        </div>
      );
    }

    return (
      <div className={`flex items-center justify-center bg-card border border-border/50 p-2 text-center select-none ${className} ${fallbackClassName} ${fill ? '' : 'w-full aspect-video'}`}>
        <span className="text-[9px] font-mono text-accent tracking-wider uppercase leading-tight">
          {fallbackText}
        </span>
      </div>
    );
  }

  if (fill) {
    return (
      <>
        {loading && <div className="absolute inset-0 bg-muted animate-pulse z-[2]" />}
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes || "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"}
          className={`${className} transition-opacity duration-350 ${loading ? 'opacity-0' : 'opacity-100'}`}
          onLoad={() => setLoading(false)}
          onError={() => {
            setError(true);
            setLoading(false);
          }}
        />
      </>
    );
  }

  if (zoom) {
    return (
      <div
        ref={containerRef}
        className="relative overflow-hidden cursor-crosshair w-full h-full select-none touch-none"
        onMouseEnter={() => setZooming(true)}
        onMouseLeave={() => setZooming(false)}
        onMouseMove={handleMouseMove}
        onTouchStart={(e) => {
          setZooming(true);
          handleTouchMove(e);
        }}
        onTouchEnd={() => setZooming(false)}
        onTouchMove={handleTouchMove}
      >
        {loading && <div className="w-full aspect-[4/3] bg-muted animate-pulse" />}
        <Image
          src={src}
          alt={alt}
          width={0}
          height={0}
          sizes="100vw"
          style={{
            width: '100%',
            height: 'auto',
            position: loading ? 'absolute' : 'relative',
            opacity: loading ? 0 : 1,
            top: 0,
            left: 0
          }}
          className={`${className} transition-opacity duration-350`}
          onLoad={() => setLoading(false)}
          onError={() => {
            setError(true);
            setLoading(false);
          }}
        />
        {zooming && !loading && (
          <div
            className="absolute pointer-events-none rounded-full border border-foreground shadow-2xl bg-no-repeat z-10"
            style={{
              width: "140px",
              height: "140px",
              left: `${coords.x}%`,
              top: `${coords.y}%`,
              transform: "translate(-50%, -50%)",
              backgroundImage: `url(${src})`,
              backgroundPosition: `${-(coords.pxX * 2.5 - 70)}px ${-(coords.pxY * 2.5 - 70)}px`,
              backgroundSize: `${coords.width * 2.5}px ${coords.height * 2.5}px`,
            }}
          />
        )}
      </div>
    );
  }

  return (
    <div className="relative w-full">
      {loading && <div className="w-full aspect-[4/3] bg-muted animate-pulse" />}
      <Image
        src={src}
        alt={alt}
        width={0}
        height={0}
        sizes="100vw"
        style={{
          width: '100%',
          height: 'auto',
          position: loading ? 'absolute' : 'relative',
          opacity: loading ? 0 : 1,
          top: 0,
          left: 0
        }}
        className={`${className} transition-opacity duration-350`}
        onLoad={() => setLoading(false)}
        onError={() => {
          setError(true);
          setLoading(false);
        }}
      />
    </div>
  );
};
