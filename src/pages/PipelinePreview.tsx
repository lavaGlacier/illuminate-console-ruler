import { useEffect, useState } from "react";
import { fetchRoute, PipelineData } from "@/lib/api";
import { MetricCard } from "@/components/ui/MetricCard";
import { LoadingState } from "@/components/ui/LoadingState";
import { ErrorState } from "@/components/ui/ErrorState";

export default function PipelinePreview() {
  const [data, setData] = useState<PipelineData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const pipeline = await fetchRoute<PipelineData>("pipeline");
      setData(pipeline);
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

  const { current, wowDelta } = data;

  const metrics = [
    { label: "Prospects Engaged", key: "prospectsEngaged" as const },
    { label: "Contacted", key: "contacted" as const },
    { label: "Accepted", key: "accepted" as const },
    { label: "Replied", key: "replied" as const },
    { label: "Calls Booked", key: "callsBooked" as const },
  ];

  return (
    <div className="space-y-12 fade-in">
      {/* Header */}
      <header className="space-y-2">
        <h1 className="headline-calm text-foreground">Pipeline Preview</h1>
        <p className="text-sm text-muted-foreground">Governed progression through your outreach funnel</p>
      </header>

      {/* Metrics as progression blocks */}
      <div className="space-y-1">
        {metrics.map((metric, index) => (
          <div
            key={metric.key}
            className="p-8 bg-card border border-border flex items-center justify-between"
          >
            <div className="flex items-center gap-6">
              <span className="w-8 h-8 flex items-center justify-center text-sm text-muted-foreground border border-border">
                {index + 1}
              </span>
              <span className="label-tracked">{metric.label}</span>
            </div>
            <div className="flex items-baseline gap-4">
              <span className="metric-number-lg">{current[metric.key].toLocaleString()}</span>
              {wowDelta[metric.key] !== 0 && (
                <span className={wowDelta[metric.key] > 0 ? "delta-positive text-sm" : "delta-negative text-sm"}>
                  {wowDelta[metric.key] > 0 ? "+" : ""}{wowDelta[metric.key]}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
