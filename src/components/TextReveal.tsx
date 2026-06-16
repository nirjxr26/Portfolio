"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

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
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10% 0px" });
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

  const Component = as === "h1"
    ? motion.h1
    : as === "h2"
    ? motion.h2
    : as === "h3"
    ? motion.h3
    : as === "p"
    ? motion.p
    : as === "span"
    ? motion.span
    : motion.div;

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.02,
        delayChildren: delay,
      },
    },
  };

  const wordVariants = {
    hidden: {
      y: "110%",
      opacity: 0,
    },
    visible: {
      y: "0%",
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1] as const, // easeOutExpo
      },
    },
  };

  return (
    <Component
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={containerRef as React.Ref<any>}
      className={`${className} overflow-hidden py-1`}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <span className="inline-flex flex-wrap w-full">
        {words.map((word, idx) => {
          const isMuted = muted || (mutedIndex !== -1 && idx >= mutedIndex);
          const isHighlighted = highlightIndices.has(idx);

          return (
            <span
              key={idx}
              className="inline-block overflow-hidden mr-[0.22em] pt-[0.1em] pb-[0.15em] -mt-[0.1em] -mb-[0.15em] leading-[1.1]"
            >
              <motion.span
                variants={wordVariants}
                className={`inline-block will-change-transform ${
                  isHighlighted ? highlightClass : isMuted ? "text-secondary" : "text-foreground"
                }`}
              >
                {word}
              </motion.span>
            </span>
          );
        })}
      </span>
    </Component>
  );
}
