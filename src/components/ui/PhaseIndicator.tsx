import { cn } from "@/lib/utils";

interface PhaseIndicatorProps {
  current: number;
  total?: number;
  className?: string;
}

const phaseLabels = [
  "Offer Building",
  "Profile Optimization", 
  "Content + Engagement",
  "Engagement + Outbound"
];

export function PhaseIndicator({ current, total = 4, className }: PhaseIndicatorProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} className="flex items-center gap-2">
          <div
            className={cn(
              "w-2 h-2 rounded-full transition-colors duration-300",
              i + 1 <= current ? "bg-primary" : "bg-phase-inactive"
            )}
          />
          {i < total - 1 && (
            <div
              className={cn(
                "w-8 h-px transition-colors duration-300",
                i + 1 < current ? "bg-primary" : "bg-phase-inactive"
              )}
            />
          )}
        </div>
      ))}
      <span className="ml-3 text-sm text-muted-foreground">
        Phase {current}: {phaseLabels[current - 1]}
      </span>
    </div>
  );
}
