import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchRoute, HomeData, PhaseData } from "@/lib/api";
import { MetricCard } from "@/components/ui/MetricCard";
import { MetricGroup } from "@/components/ui/MetricGroup";
import { PhaseIndicator } from "@/components/ui/PhaseIndicator";
import { LoadingState } from "@/components/ui/LoadingState";
import { ErrorState } from "@/components/ui/ErrorState";

export default function WeeklyBrief() {
  const navigate = useNavigate();
  const [homeData, setHomeData] = useState<HomeData | null>(null);
  const [phaseData, setPhaseData] = useState<PhaseData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [home, phase] = await Promise.all([
        fetchRoute<HomeData>("home"),
        fetchRoute<PhaseData>("phase"),
      ]);
      setHomeData(home);
      setPhaseData(phase);
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
  if (error || !homeData) return <ErrorState message={error ?? undefined} onRetry={loadData} />;

  const { weekLabel, weeklyContentEngagementOverview, pipelinePreview } = homeData;
  const currentPhase = phaseData?.current ?? homeData.phase ?? 1;

  return (
    <div className="space-y-12 fade-in">
      {/* Header */}
      <header className="space-y-4">
        <h1 className="headline-calm text-foreground">{weekLabel}</h1>
        <PhaseIndicator current={currentPhase} />
      </header>

      {/* Weekly Content & Engagement Overview */}
      <MetricGroup title="Weekly Content & Engagement Overview">
        <MetricCard
          label="Posts Made"
          value={weeklyContentEngagementOverview.postsMade}
        />
        <MetricCard
          label="Impressions"
          value={weeklyContentEngagementOverview.impressions}
        />
        <MetricCard
          label="Engagement Touchpoints"
          value={weeklyContentEngagementOverview.engagementTouchpoints}
        />
      </MetricGroup>

      {/* Pipeline Preview */}
      <MetricGroup
        title="Pipeline Preview"
        clickable
        onClick={() => navigate("/pipeline")}
      >
        <MetricCard
          label="Prospects Engaged"
          value={pipelinePreview.prospectsEngaged}
        />
        <MetricCard
          label="Contacted"
          value={pipelinePreview.contacted}
        />
        <MetricCard
          label="Accepted"
          value={pipelinePreview.accepted}
        />
        <MetricCard
          label="Replied"
          value={pipelinePreview.replied}
        />
        <MetricCard
          label="Calls Booked"
          value={pipelinePreview.callsBooked}
        />
      </MetricGroup>
    </div>
  );
}
