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
  src, alt, className = "",
  aspectRatio = "aspect-[16/9]",
  objectFit = "object-cover",
}: ImageRevealProps) {
  return (
    <div className={`relative overflow-hidden rounded-xl ${aspectRatio} ${className}`}>
      <img
        src={src}
        alt={alt}
        className={`w-full h-full ${objectFit}`}
      />
    </div>
  );
}
