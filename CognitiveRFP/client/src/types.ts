export type ExperienceType = 
  | 'Won Bid'
  | 'Lost Bid'
  | 'Prospect Objection'
  | 'Pricing Redline'
  | 'Security Redline'
  | 'Compliance Feedback'
  | 'Evaluator Feedback'
  | 'Client Preference';

export type Industry = 
  | 'FinTech & Investment Banking'
  | 'Healthcare & Life Sciences'
  | 'Enterprise SaaS & Cloud Infrastructure'
  | 'Manufacturing'
  | 'Government & Public Sector'
  | 'Retail & E-commerce';

export interface Memory {
  id: string;
  title: string;
  experienceType: ExperienceType;
  industry: Industry;
  client?: string;
  tags: string[];
  opportunitySize?: string;
  experience: string;
  lessonLearned?: string;
  relevanceKeywords?: string[];
  relevanceScore?: number;
  whyRelevant?: string;
  usedInResponse?: boolean;
  date: string;
  impactScore?: number;
}

export interface Guardrail {
  id: string;
  title: string;
  rule: string;
  industry: string;
  category: string;
  isActive: boolean;
  derivedFromMemories?: string[];
  createdAt: string;
}

export interface PresetRequirement {
  id: string;
  title: string;
  industry: Industry;
  client: string;
  opportunitySize: string;
  requirement: string;
}

export interface BaselineResponse {
  content: string;
  tokenCount: number;
  generationTimeMs: number;
  risks: string[];
  modelUsed: string;
}

export interface AdaptiveResponse {
  content: string;
  tokenCount: number;
  generationTimeMs: number;
  diffHighlights: string[];
  modelUsed: string;
  confidenceScore: number;
}

export interface StrategicReflection {
  strategicSummary: string;
  recommendedActions: string[];
  triggeredGuardrails: Guardrail[];
  recalledCount: number;
  topMemoryTitle: string;
}

export interface GenerationResult {
  adaptive?: AdaptiveResponse;
  baseline?: BaselineResponse;
  recalledMemories: Memory[];
  reflection: StrategicReflection;
  pipelineTrace: {
    recalledCount: number;
    memoriesUsed: string[];
    guardrailsApplied: string[];
    totalTimeMs: number;
  };
}

export interface AnalyticsData {
  metrics: {
    winRateImprovement: string;
    winRateBaseline: string;
    winRateAdaptive: string;
    rfpTurnaround: string;
    rfpTurnaroundHours: string;
    activeLearnedGuardrails: number;
    totalGuardrails: number;
    experiencesRetained: number;
    liveExperiencesCount: number;
  };
  proposalPerformance: {
    month: string;
    baselineWinRate: number;
    adaptiveWinRate: number;
    evaluationsScoreBaseline: number;
    evaluationsScoreAdaptive: number;
  }[];
  dealBreakers: {
    category: string;
    percentage: number;
    count: number;
    severity: string;
  }[];
  memoryGrowth: {
    period: string;
    count: number;
  }[];
  industryInsights: {
    industry: string;
    memories: number;
    winRate: string;
    topGuardrail: string;
  }[];
}
