"use client";

import { motion } from "framer-motion";
import React, { ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  duration?: number;
  distance?: number;
  once?: boolean;
  className?: string;
}

export default function ScrollReveal({
  children,
  delay = 0,
  direction = "up",
  duration = 0.8,
  distance = 30,
  once = true,
  className = "",
}: ScrollRevealProps) {
  const directions = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance },
  };

  const initialOffset = directions[direction] || { y: distance };

  return (
    <motion.div
      initial={{
        opacity: 0,
        ...initialOffset,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
      }}
      viewport={{ once, margin: "-10% 0px" }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1], // easeOutExpo
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
