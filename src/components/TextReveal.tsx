import React from "react";

interface TextRevealProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "div" | "span";
  delay?: number;
  highlightText?: string;
  highlightClass?: string;
  muted?: boolean;
}

export default function TextReveal({
  text = "",
  className = "",
  as = "div",
  delay = 0,
  highlightText,
  highlightClass = "text-blue-500",
  muted = false,
}: TextRevealProps) {
  const words = text.split(" ").filter(Boolean);

  const cleanWord = (w: string) => w.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "").toLowerCase();

  const highlightIndices = React.useMemo(() => {
    const indices = new Set<number>();
    if (!highlightText) return indices;
    const highlightWords = highlightText.split(" ").filter(Boolean).map(cleanWord);
    if (highlightWords.length === 0) return indices;
    const cleanedWords = text.split(" ").filter(Boolean).map(cleanWord);
    for (let i = 0; i <= cleanedWords.length - highlightWords.length; i++) {
      let match = true;
      for (let j = 0; j < highlightWords.length; j++) {
        if (cleanedWords[i + j] !== highlightWords[j]) { match = false; break; }
      }
      if (match) {
        for (let j = 0; j < highlightWords.length; j++) indices.add(i + j);
      }
    }
    return indices;
  }, [text, highlightText]);

  const Tag = as;

  const isCentered = className.includes("text-center");

  return (
    <Tag className={`${className}`}>
      <span className={`inline-flex flex-wrap w-full ${isCentered ? "justify-center" : ""}`}>
        {words.map((word, idx) => {
          const isHighlighted = highlightIndices.has(idx);
          return (
            <span key={idx} className="inline-block mr-[0.22em]">
              <span className={`inline-block ${isHighlighted ? highlightClass : muted ? "text-secondary" : "text-foreground"}`}>
                {word}
              </span>
            </span>
          );
        })}
      </span>
    </Tag>
  );
}
