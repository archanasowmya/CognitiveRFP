import { 
  Memory, 
  Guardrail, 
  PresetRequirement, 
  GenerationResult, 
  BaselineResponse,
  StrategicReflection,
  AnalyticsData 
} from './types';

const API_BASE = '/api';

export async function checkHealth() {
  const res = await fetch(`${API_BASE}/health`);
  if (!res.ok) throw new Error('Health check failed');
  return res.json();
}

export async function fetchPresets(): Promise<PresetRequirement[]> {
  const res = await fetch(`${API_BASE}/presets`);
  if (!res.ok) throw new Error('Failed to fetch presets');
  return res.json();
}

export async function fetchMemories(params?: { query?: string; industry?: string; type?: string; tag?: string }): Promise<Memory[]> {
  const searchParams = new URLSearchParams();
  if (params?.query) searchParams.append('query', params.query);
  if (params?.industry && params.industry !== 'All') searchParams.append('industry', params.industry);
  if (params?.type && params.type !== 'All') searchParams.append('type', params.type);
  if (params?.tag && params.tag !== 'All') searchParams.append('tag', params.tag);

  const res = await fetch(`${API_BASE}/memories?${searchParams.toString()}`);
  if (!res.ok) throw new Error('Failed to fetch memories');
  return res.json();
}

export async function retainMemory(memoryData: Partial<Memory>): Promise<Memory> {
  const res = await fetch(`${API_BASE}/memories`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(memoryData),
  });
  if (!res.ok) throw new Error('Failed to retain memory');
  return res.json();
}

export async function seedMemory(seedType: 'fintech' | 'healthcare' | 'saas' | 'support'): Promise<Memory> {
  const res = await fetch(`${API_BASE}/memories/seed`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ seedType }),
  });
  if (!res.ok) throw new Error('Failed to seed memory');
  return res.json();
}

export async function deleteMemory(id: string): Promise<boolean> {
  const res = await fetch(`${API_BASE}/memories/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete memory');
  return true;
}

export async function resetMemories(): Promise<Memory[]> {
  const res = await fetch(`${API_BASE}/memories/reset`, { method: 'POST' });
  if (!res.ok) throw new Error('Failed to reset memories');
  const data = await res.json();
  return data.memories;
}

export async function recallMemories(payload: { requirement: string; industry?: string; client?: string; limit?: number }): Promise<Memory[]> {
  const res = await fetch(`${API_BASE}/recall`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error('Failed to recall memories');
  return res.json();
}

export async function reflectOnMemories(payload: { requirement: string; industry?: string; client?: string; recalledMemories?: Memory[] }): Promise<StrategicReflection> {
  const res = await fetch(`${API_BASE}/reflect`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error('Failed to reflect on memories');
  return res.json();
}

export async function generateBaseline(payload: { requirement: string; industry?: string; client?: string }): Promise<BaselineResponse> {
  const res = await fetch(`${API_BASE}/generate/baseline`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error('Failed to generate baseline response');
  return res.json();
}

export async function generateAdaptive(payload: { requirement: string; industry?: string; client?: string; opportunitySize?: string }): Promise<GenerationResult> {
  const res = await fetch(`${API_BASE}/generate/adaptive`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error('Failed to generate adaptive response');
  return res.json();
}

export async function synthesizeStrategy(industry?: string) {
  const res = await fetch(`${API_BASE}/synthesize-strategy`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ industry }),
  });
  if (!res.ok) throw new Error('Failed to synthesize strategy');
  return res.json();
}

export async function fetchGuardrails(): Promise<Guardrail[]> {
  const res = await fetch(`${API_BASE}/guardrails`);
  if (!res.ok) throw new Error('Failed to fetch guardrails');
  return res.json();
}

export async function toggleGuardrail(id: string): Promise<Guardrail[]> {
  const res = await fetch(`${API_BASE}/guardrails/toggle`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id }),
  });
  if (!res.ok) throw new Error('Failed to toggle guardrail');
  return res.json();
}

export async function fetchAnalytics(): Promise<AnalyticsData> {
  const res = await fetch(`${API_BASE}/analytics`);
  if (!res.ok) throw new Error('Failed to fetch analytics');
  return res.json();
}
