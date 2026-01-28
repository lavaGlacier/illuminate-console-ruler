import { useEffect, useState } from "react";
import { fetchRoute, WeeklyData, WeekData } from "@/lib/api";
import { LoadingState } from "@/components/ui/LoadingState";
import { ErrorState } from "@/components/ui/ErrorState";
import { cn } from "@/lib/utils";

function WeekCard({ week, isExpanded, onToggle }: { week: WeekData; isExpanded: boolean; onToggle: () => void }) {
  const { weekLabel, weeklyContentEngagementOverview, pipelinePreview } = week;

  return (
    <div className="border border-border bg-card">
      {/* Header - always visible */}
      <button
        onClick={onToggle}
        className="w-full p-6 flex items-center justify-between text-left hover:bg-secondary/30 transition-colors"
      >
        <h3 className="text-lg font-medium text-foreground">{weekLabel}</h3>
        <span className="text-muted-foreground text-sm">
          {isExpanded ? "−" : "+"}
        </span>
      </button>

      {/* Expanded content */}
      <div
        className={cn(
          "overflow-hidden transition-all duration-300",
          isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="px-6 pb-6 space-y-6">
          {/* Content & Engagement */}
          <div className="space-y-3">
            <p className="label-tracked">Content & Engagement</p>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-2xl font-semibold text-foreground">{weeklyContentEngagementOverview.postsMade}</p>
                <p className="text-xs text-muted-foreground mt-1">Posts</p>
              </div>
              <div>
                <p className="text-2xl font-semibold text-foreground">{weeklyContentEngagementOverview.impressions.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground mt-1">Impressions</p>
              </div>
              <div>
                <p className="text-2xl font-semibold text-foreground">{weeklyContentEngagementOverview.engagementTouchpoints}</p>
                <p className="text-xs text-muted-foreground mt-1">Touchpoints</p>
              </div>
            </div>
          </div>

          <div className="h-px bg-border" />

          {/* Pipeline */}
          <div className="space-y-3">
            <p className="label-tracked">Pipeline</p>
            <div className="grid grid-cols-5 gap-4">
              <div>
                <p className="text-2xl font-semibold text-foreground">{pipelinePreview.prospectsEngaged}</p>
                <p className="text-xs text-muted-foreground mt-1">Engaged</p>
              </div>
              <div>
                <p className="text-2xl font-semibold text-foreground">{pipelinePreview.contacted}</p>
                <p className="text-xs text-muted-foreground mt-1">Contacted</p>
              </div>
              <div>
                <p className="text-2xl font-semibold text-foreground">{pipelinePreview.accepted}</p>
                <p className="text-xs text-muted-foreground mt-1">Accepted</p>
              </div>
              <div>
                <p className="text-2xl font-semibold text-foreground">{pipelinePreview.replied}</p>
                <p className="text-xs text-muted-foreground mt-1">Replied</p>
              </div>
              <div>
                <p className="text-2xl font-semibold text-foreground">{pipelinePreview.callsBooked}</p>
                <p className="text-xs text-muted-foreground mt-1">Calls</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function WeeklyCheckins() {
  const [data, setData] = useState<WeeklyData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const weekly = await fetchRoute<WeeklyData>("weekly");
      setData(weekly);
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

  const { weeks } = data;

  return (
    <div className="space-y-12 fade-in">
      {/* Header */}
      <header className="space-y-2">
        <h1 className="headline-calm text-foreground">Weekly Check-ins</h1>
        <p className="text-sm text-muted-foreground">Historical performance by week</p>
      </header>

      {/* Week cards */}
      <div className="space-y-2">
        {weeks.map((week, index) => (
          <WeekCard
            key={week.weekLabel}
            week={week}
            isExpanded={expandedIndex === index}
            onToggle={() => setExpandedIndex(expandedIndex === index ? null : index)}
          />
        ))}
      </div>
    </div>
  );
}
