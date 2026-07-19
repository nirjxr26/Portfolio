export default function MetricCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="inline-flex items-baseline gap-2 bg-white/[0.03] border border-white/[0.06] rounded-lg px-4 py-3">
      <span className="text-2xl font-mono font-bold text-accent">{value}</span>
      <span className="text-xs text-secondary font-mono uppercase tracking-wider">{label}</span>
    </div>
  );
}
