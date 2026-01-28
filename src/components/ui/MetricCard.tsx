import { cn } from "@/lib/utils";

interface MetricCardProps {
  label: string;
  value: number | string;
  delta?: number;
  size?: "default" | "large";
  className?: string;
}

export function MetricCard({ label, value, delta, size = "default", className }: MetricCardProps) {
  const formatDelta = (d: number) => {
    if (d > 0) return `+${d}`;
    return d.toString();
  };

  return (
    <div className={cn("space-y-2", className)}>
      <p className="label-tracked">{label}</p>
      <div className="flex items-baseline gap-3">
        <span className={cn(
          "count-up",
          size === "large" ? "metric-number-lg" : "metric-number"
        )}>
          {typeof value === "number" ? value.toLocaleString() : value}
        </span>
        {delta !== undefined && delta !== 0 && (
          <span className={cn(
            "text-sm font-medium",
            delta > 0 ? "delta-positive" : "delta-negative"
          )}>
            {formatDelta(delta)}
          </span>
        )}
      </div>
    </div>
  );
}
