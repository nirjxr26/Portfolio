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
  const hasBreak = breakAt !== undefined;
  const firstGroup = hasBreak ? words.slice(0, breakAt) : words;
  const secondGroup = hasBreak ? words.slice(breakAt) : [];

  const renderGroup = (group: string[]) => (
    <>
      {group.map((word, idx) => (
        <span key={idx} className="inline-block mr-[0.22em]">
          {word}
        </span>
      ))}
    </>
  );

  return (
    <Tag className={className}>
      <span className={`inline-flex flex-wrap w-full ${isCentered ? "justify-center" : ""}`}>
        <span className={`inline-block ${hasBreak ? "whitespace-nowrap" : ""}`}>{renderGroup(firstGroup)}</span>
        {hasBreak && (
          <>
            <span aria-hidden="true" className={`w-full basis-full h-0 ${breakClassName}`} />
            <span className="inline-block whitespace-nowrap">{renderGroup(secondGroup)}</span>
          </>
        )}
      </span>
    </Tag>
  );
}
