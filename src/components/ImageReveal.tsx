"use client";

import { motion } from "framer-motion";
import React from "react";

interface ImageRevealProps {
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: string;
  overlayColor?: string;
  objectFit?: "object-cover" | "object-contain";
}

export default function ImageReveal({
  src,
  alt,
  className = "",
  aspectRatio = "aspect-[16/9]",
  overlayColor = "bg-background",
  objectFit = "object-cover",
}: ImageRevealProps) {
  return (
    <div className={`relative overflow-hidden rounded-xl ${aspectRatio} ${className}`}>
      {/* Curtain Mask Overlay */}
      <motion.div
        initial={{ scaleY: 1 }}
        whileInView={{ scaleY: 0 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{
          duration: 0.8,
          ease: [0.16, 1, 0.3, 1], // easeOutExpo
        }}
        style={{ originY: 0 }}
        className={`absolute inset-0 z-10 pointer-events-none ${overlayColor}`}
      />
      {/* Image with subtle zoom reveal */}
      <motion.img
        initial={{ scale: 1.15 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{
          duration: 1.0,
          ease: [0.16, 1, 0.3, 1],
        }}
        src={src}
        alt={alt}
        className={`w-full h-full ${objectFit}`}
      />
    </div>
  );
}
