"use client";

import { motion } from "framer-motion";
import React, { ReactNode } from "react";

interface StaggerContainerProps {
  children: ReactNode;
  delay?: number;
  staggerStep?: number;
  className?: string;
}

export function StaggerContainer({
  children,
  delay = 0,
  staggerStep = 0.1,
  className = "",
}: StaggerContainerProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10% 0px" }}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: staggerStep,
            delayChildren: delay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface StaggerItemProps {
  children: ReactNode;
  className?: string;
}

export function StaggerItem({ children, className = "" }: StaggerItemProps) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        show: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.65,
            ease: [0.16, 1, 0.3, 1] as const, // easeOutExpo
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
