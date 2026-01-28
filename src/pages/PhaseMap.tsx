import { useEffect, useState } from "react";
import { fetchRoute, PhaseData } from "@/lib/api";
import { LoadingState } from "@/components/ui/LoadingState";
import { ErrorState } from "@/components/ui/ErrorState";
import { cn } from "@/lib/utils";

const defaultPhases = [
  { id: 1, name: "Offer Building", description: "Clarify positioning and offer" },
  { id: 2, name: "Profile Optimization", description: "Convert attention into credibility" },
  { id: 3, name: "Content + Engagement", description: "Build relevance and warm the market" },
  { id: 4, name: "Engagement + Outbound", description: "Convert attention into conversations and calls" },
];

export default function PhaseMap() {
  const [data, setData] = useState<PhaseData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const phase = await fetchRoute<PhaseData>("phase");
      setData(phase);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loading) return <LoadingState />;
  if (error || !data) return <ErrorState message={error ?? undefined} onRetry={loadData} />;

  const phases = data.phases?.length ? data.phases : defaultPhases;
  const currentPhase = data.current;

  return (
    <div className="space-y-12 fade-in">
      {/* Header */}
      <header className="space-y-2">
        <h1 className="headline-calm text-foreground">Phase Map</h1>
        <p className="text-sm text-muted-foreground">Your governed 4-phase workflow</p>
      </header>

      {/* Phase Stepper */}
      <div className="space-y-0">
        {phases.map((phase, index) => {
          const isActive = phase.id === currentPhase;
          const isComplete = phase.id < currentPhase;

          return (
            <div key={phase.id} className="relative">
              {/* Connector line */}
              {index < phases.length - 1 && (
                <div
                  className={cn(
                    "absolute left-4 top-16 w-px h-8",
                    isComplete ? "bg-primary" : "bg-border"
                  )}
                />
              )}

              <div
                className={cn(
                  "p-8 border transition-all duration-300",
                  isActive
                    ? "bg-card border-primary/50"
                    : "bg-background border-border"
                )}
              >
                <div className="flex items-start gap-6">
                  {/* Phase number indicator */}
                  <div
                    className={cn(
                      "w-8 h-8 flex items-center justify-center text-sm font-medium border",
                      isActive
                        ? "border-primary bg-primary text-primary-foreground"
                        : isComplete
                        ? "border-primary/50 text-primary"
                        : "border-border text-muted-foreground"
                    )}
                  >
                    {phase.id}
                  </div>

                  {/* Phase content */}
                  <div className="flex-1 space-y-2">
                    <h3
                      className={cn(
                        "text-lg font-medium",
                        isActive ? "text-foreground" : "text-muted-foreground"
                      )}
                    >
                      {phase.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {phase.description}
                    </p>
                  </div>

                  {/* Status */}
                  {isActive && (
                    <span className="label-tracked text-primary">Current</span>
                  )}
                  {isComplete && (
                    <span className="label-tracked text-muted-foreground">Complete</span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
