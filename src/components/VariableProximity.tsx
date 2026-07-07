"use client";

import React, { forwardRef, useRef, useEffect } from 'react';
import { motion } from 'motion/react';

function useAnimationFrame(callback: () => void) {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    let frameId: number;
    const loop = () => {
      callbackRef.current();
      frameId = requestAnimationFrame(loop);
    };
    frameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frameId);
  }, []);
}

let globalMousePosition = { x: 0, y: 0 };
let activeListenersCount = 0;

const handleGlobalMouseMove = (ev: MouseEvent) => {
  globalMousePosition = { x: ev.clientX, y: ev.clientY };
};

const handleGlobalTouchMove = (ev: TouchEvent) => {
  if (ev.touches.length === 0) return;
  const touch = ev.touches[0];
  globalMousePosition = { x: touch.clientX, y: touch.clientY };
};

function useGlobalMousePosition() {
  const positionRef = useRef(globalMousePosition);

  useEffect(() => {
    if (activeListenersCount === 0) {
      window.addEventListener('mousemove', handleGlobalMouseMove, { passive: true });
      window.addEventListener('touchmove', handleGlobalTouchMove, { passive: true });
    }
    activeListenersCount++;

    return () => {
      activeListenersCount--;
      if (activeListenersCount === 0) {
        window.removeEventListener('mousemove', handleGlobalMouseMove);
        window.removeEventListener('touchmove', handleGlobalTouchMove);
      }
    };
  }, []);

  const getLatestPosition = () => {
    positionRef.current = globalMousePosition;
    return positionRef.current;
  };

  return getLatestPosition;
}

export interface VariableProximityProps extends React.HTMLAttributes<HTMLSpanElement> {
  label: string;
  fromWeight?: number;
  toWeight?: number;
  containerRef?: React.RefObject<HTMLElement | null>; // Kept for interface backward compatibility
  radius?: number;
  falloff?: 'linear' | 'exponential' | 'gaussian';
  onClick?: (e: React.MouseEvent<HTMLSpanElement>) => void;
}

const VariableProximity = forwardRef<HTMLSpanElement, VariableProximityProps>((props, ref) => {
  const {
    label,
    fromWeight = 300,
    toWeight = 700,
    containerRef,
    radius = 160,
    falloff = 'linear',
    className = '',
    onClick,
    style,
    ...restProps
  } = props;

  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const letterPositions = useRef<{ x: number; y: number }[]>([]);
  const getMousePosition = useGlobalMousePosition();
  const lastPositionRef = useRef<{ x: number | null; y: number | null }>({ x: null, y: null });

  const calculateDistance = (x1: number, y1: number, x2: number, y2: number) => Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);

  const calculateFalloff = (distance: number) => {
    const norm = Math.min(Math.max(1 - distance / radius, 0), 1);
    switch (falloff) {
      case 'exponential':
        return norm ** 2;
      case 'gaussian':
        return Math.exp(-((distance / (radius / 2)) ** 2) / 2);
      case 'linear':
      default:
        return norm;
    }
  };

  // Cache layout positions on mount/resize to avoid layout reflows/thrashing inside frame loop
  useEffect(() => {
    const updatePositions = () => {
      letterPositions.current = letterRefs.current.map((letterRef) => {
        if (!letterRef) return { x: 0, y: 0 };
        const rect = letterRef.getBoundingClientRect();
        return {
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2
        };
      });
    };

    const handle = requestAnimationFrame(updatePositions);

    window.addEventListener('resize', updatePositions, { passive: true });
    return () => {
      cancelAnimationFrame(handle);
      window.removeEventListener('resize', updatePositions);
    };
  }, [label]);

  useAnimationFrame(() => {
    const { x, y } = getMousePosition();
    if (lastPositionRef.current.x === x && lastPositionRef.current.y === y) {
      return;
    }
    lastPositionRef.current = { x, y };

    letterRefs.current.forEach((letterRef, index) => {
      if (!letterRef) return;
      const pos = letterPositions.current[index];
      if (!pos) return;

      const distance = calculateDistance(x, y, pos.x, pos.y);

      if (distance >= radius) {
        letterRef.style.fontWeight = String(fromWeight);
        return;
      }

      const falloffValue = calculateFalloff(distance);
      const newWeight = Math.round(fromWeight + (toWeight - fromWeight) * falloffValue);
      letterRef.style.fontWeight = String(newWeight);
    });
  });

  const words = label.split(' ');
  let letterIndex = 0;

  return (
    <span
      ref={ref}
      className={`${className} select-none`}
      onClick={onClick}
      style={{ display: 'inline', ...style }}
      {...restProps}
    >
      {words.map((word, wordIndex) => (
        <span key={wordIndex} style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
          {word.split('').map(letter => {
            const currentLetterIndex = letterIndex++;
            return (
              <motion.span
                key={currentLetterIndex}
                ref={(el) => {
                  letterRefs.current[currentLetterIndex] = el as unknown as HTMLSpanElement;
                }}
                style={{
                  display: 'inline-block',
                  fontWeight: fromWeight
                }}
                aria-hidden="true"
              >
                {letter}
              </motion.span>
            );
          })}
          {wordIndex < words.length - 1 && <span style={{ display: 'inline-block' }}>&nbsp;</span>}
        </span>
      ))}
      <span className="sr-only">{label}</span>
    </span>
  );
});

VariableProximity.displayName = 'VariableProximity';
export default VariableProximity;
