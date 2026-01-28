const BACKEND_URL = "https://script.google.com/macros/s/AKfycbyIZAnJOT83Zq6IOYBTKU2i58A8S0j29nnHUfDV8cg_g_EW2haJWno957p7iIKGD-iU/exec";

// Set to true to use mock data instead of live API
const USE_MOCK_DATA = true;

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

// Mock data for development
const mockData: Record<Route, unknown> = {
  home: {
    weekLabel: "Week of January 27, 2026",
    phase: 3,
    weeklyContentEngagementOverview: {
      postsMade: 4,
      impressions: 47820,
      engagementTouchpoints: 342,
    },
    pipelinePreview: {
      prospectsEngaged: 89,
      contacted: 54,
      accepted: 31,
      replied: 18,
      callsBooked: 7,
    },
  },
  pipeline: {
    current: {
      prospectsEngaged: 89,
      contacted: 54,
      accepted: 31,
      replied: 18,
      callsBooked: 7,
    },
    wowDelta: {
      prospectsEngaged: 12,
      contacted: 8,
      accepted: 5,
      replied: 3,
      callsBooked: 2,
    },
  },
  phase: {
    current: 3,
    phases: [
      { id: 1, name: "Offer Building", description: "Clarify positioning and offer" },
      { id: 2, name: "Profile Optimization", description: "Convert attention into credibility" },
      { id: 3, name: "Content + Engagement", description: "Build relevance and warm the market" },
      { id: 4, name: "Engagement + Outbound", description: "Convert attention into conversations and calls" },
    ],
  },
  weekly: {
    weeks: [
      {
        weekLabel: "Week of January 27, 2026",
        weeklyContentEngagementOverview: { postsMade: 4, impressions: 47820, engagementTouchpoints: 342 },
        pipelinePreview: { prospectsEngaged: 89, contacted: 54, accepted: 31, replied: 18, callsBooked: 7 },
      },
      {
        weekLabel: "Week of January 20, 2026",
        weeklyContentEngagementOverview: { postsMade: 5, impressions: 41200, engagementTouchpoints: 298 },
        pipelinePreview: { prospectsEngaged: 77, contacted: 46, accepted: 26, replied: 15, callsBooked: 5 },
      },
      {
        weekLabel: "Week of January 13, 2026",
        weeklyContentEngagementOverview: { postsMade: 3, impressions: 35600, engagementTouchpoints: 256 },
        pipelinePreview: { prospectsEngaged: 65, contacted: 38, accepted: 22, replied: 12, callsBooked: 4 },
      },
      {
        weekLabel: "Week of January 6, 2026",
        weeklyContentEngagementOverview: { postsMade: 4, impressions: 32100, engagementTouchpoints: 221 },
        pipelinePreview: { prospectsEngaged: 58, contacted: 34, accepted: 19, replied: 10, callsBooked: 3 },
      },
      {
        weekLabel: "Week of December 30, 2025",
        weeklyContentEngagementOverview: { postsMade: 2, impressions: 28400, engagementTouchpoints: 187 },
        pipelinePreview: { prospectsEngaged: 52, contacted: 29, accepted: 16, replied: 8, callsBooked: 2 },
      },
    ],
  },
};

export async function fetchRoute<T>(route: Route): Promise<T> {
  // Use mock data for development
  if (USE_MOCK_DATA) {
    await new Promise((resolve) => setTimeout(resolve, 300)); // Simulate network delay
    return mockData[route] as T;
  }

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
