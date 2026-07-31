interface TextRevealProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "div" | "span";
  breakAt?: number;
  breakClassName?: string;
}

export default function TextReveal({
  text = "",
  className = "",
  as = "div",
  breakAt,
  breakClassName = "",
}: TextRevealProps) {
  const words = text.split(" ").filter(Boolean);
  const Tag = as;
  const isCentered = className.includes("text-center");

  return (
    <Tag className={className}>
      <span className={`inline-flex flex-wrap w-full ${isCentered ? "justify-center" : ""}`}>
        {words.map((word, idx) => (
          <span key={idx}>
            {idx === breakAt && (
              <span aria-hidden="true" className={`w-full basis-full h-0 ${breakClassName}`} />
            )}
            <span className="inline-block mr-[0.22em]">
              <span className="inline-block text-foreground">{word}</span>
            </span>
          </span>
        ))}
      </span>
    </Tag>
  );
}
