"use client";

import React, { useEffect, useRef } from "react";
import { animate, stagger } from "animejs";

interface TextRevealProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "div" | "span";
  mutedStartsWith?: string;
  delay?: number;
  highlightText?: string;
  highlightClass?: string;
  muted?: boolean;
}

export default function TextReveal({
  text = "",
  className = "",
  as = "div",
  mutedStartsWith,
  delay = 0,
  highlightText,
  highlightClass = "text-blue-500",
  muted = false,
}: TextRevealProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const words = text.split(" ").filter(Boolean);

  let mutedIndex = -1;
  if (mutedStartsWith) {
    const textLower = text.toLowerCase();
    const mutedLower = mutedStartsWith.toLowerCase();
    const charIndex = textLower.indexOf(mutedLower);
    if (charIndex !== -1) {
      mutedIndex = text.substring(0, charIndex).split(" ").filter(Boolean).length;
    }
  }

  const cleanWord = (w: string) => w.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "").toLowerCase();

  // Find the exact consecutive indices of words matching highlightText phrase
  const highlightIndices = React.useMemo(() => {
    const indices = new Set<number>();
    if (!highlightText) return indices;

    const highlightWords = highlightText.split(" ").filter(Boolean).map(cleanWord);
    if (highlightWords.length === 0) return indices;

    const cleanedWords = text.split(" ").filter(Boolean).map(cleanWord);

    for (let i = 0; i <= cleanedWords.length - highlightWords.length; i++) {
      let match = true;
      for (let j = 0; j < highlightWords.length; j++) {
        if (cleanedWords[i + j] !== highlightWords[j]) {
          match = false;
          break;
        }
      }
      if (match) {
        for (let j = 0; j < highlightWords.length; j++) {
          indices.add(i + j);
        }
      }
    }
    return indices;
  }, [text, highlightText]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animate(container.querySelectorAll(".reveal-word-inner"), {
              translateY: ["110%", "0%"],
              opacity: [0, 1],
              duration: 750,
              delay: stagger(25, { start: delay * 1000 }),
              ease: "outCubic",
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "-10% 0px" }
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, [delay, text]); // Re-observe if text changes

  const Component = as;

  return (
    <Component className={`${className} overflow-hidden py-1`}>
      <span
        ref={containerRef}
        className="inline-flex flex-wrap w-full"
      >
        {words.map((word, idx) => {
          const isMuted = muted || (mutedIndex !== -1 && idx >= mutedIndex);
          const isHighlighted = highlightIndices.has(idx);
          
          return (
            <span
              key={idx}
              className="inline-block overflow-hidden mr-[0.22em] py-[0.005em] leading-[1.04]"
            >
              <span
                className={`reveal-word-inner inline-block opacity-0 ${
                  isHighlighted ? highlightClass : isMuted ? "text-secondary" : "text-foreground"
                }`}
                style={{ transform: "translateY(110%)" }}
              >
                {word}
              </span>
            </span>
          );
        })}
      </span>
    </Component>
  );
}
