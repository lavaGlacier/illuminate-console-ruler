const BACKEND_URL = "https://script.google.com/macros/s/AKfycbyIZAnJOT83Zq6IOYBTKU2i58A8S0j29nnHUfDV8cg_g_EW2haJWno957p7iIKGD-iU/exec";

export type Route = "home" | "pipeline" | "phase" | "weekly";

export interface HomeData {
  weekLabel: string;
  phase?: number;
  weeklyContentEngagementOverview: {
    postsMade: number;
    impressions: number;
    engagementTouchpoints: number;
  };
  pipelinePreview: {
    prospectsEngaged: number;
    contacted: number;
    accepted: number;
    replied: number;
    callsBooked: number;
  };
}

export interface PipelineData {
  current: {
    prospectsEngaged: number;
    contacted: number;
    accepted: number;
    replied: number;
    callsBooked: number;
  };
  wowDelta: {
    prospectsEngaged: number;
    contacted: number;
    accepted: number;
    replied: number;
    callsBooked: number;
  };
}

export interface PhaseData {
  current: number;
  phases: Array<{
    id: number;
    name: string;
    description: string;
  }>;
}

export interface WeekData {
  weekLabel: string;
  weeklyContentEngagementOverview: {
    postsMade: number;
    impressions: number;
    engagementTouchpoints: number;
  };
  pipelinePreview: {
    prospectsEngaged: number;
    contacted: number;
    accepted: number;
    replied: number;
    callsBooked: number;
  };
}

export interface WeeklyData {
  weeks: WeekData[];
}

export async function fetchRoute<T>(route: Route): Promise<T> {
  const response = await fetch(`${BACKEND_URL}?route=${route}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch ${route}: ${response.statusText}`);
  }

  const data = await response.json();
  return data as T;
}
