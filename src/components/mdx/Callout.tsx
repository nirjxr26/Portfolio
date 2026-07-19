import type { ReactNode } from "react";

type CalloutType = "note" | "warning";

const styles: Record<CalloutType, { border: string; bg: string; label: string; text: string }> = {
  note: {
    border: "border-l-accent/40",
    bg: "bg-accent/[0.03]",
    label: "text-accent",
    text: "text-foreground/80",
  },
  warning: {
    border: "border-l-amber-500/50",
    bg: "bg-amber-500/[0.03]",
    label: "text-amber-400",
    text: "text-foreground/80",
  },
};

export default function Callout({
  type = "note",
  children,
}: {
  type?: CalloutType;
  children: ReactNode;
}) {
  const s = styles[type];
  return (
    <div className={`${s.border} ${s.bg} border-l-2 pl-5 pr-4 py-4 my-8 rounded-r`}>
      <p className={`${s.label} font-mono text-xs uppercase tracking-widest mb-2`}>{type}</p>
      <div className={`${s.text} text-sm leading-[1.75] [&>p]:mb-0`}>{children}</div>
    </div>
  );
}
