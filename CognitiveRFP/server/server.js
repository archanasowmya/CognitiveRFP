import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { MemoryStore } from './storage.js';
import { CognitiveEngine } from './cognitive-engine.js';
import { PRESET_REQUIREMENTS } from './default-data.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Health Check
app.get('/api/health', (req, res) => {
  const memories = MemoryStore.getMemories();
  const guardrails = MemoryStore.getGuardrails();
  res.json({
    status: 'online',
    hindsightConnected: true,
    totalMemories: memories.length,
    activeGuardrails: guardrails.filter(g => g.isActive).length,
    version: '2.4.0-enterprise',
    defaultModel: 'Groq Llama 3.3 70B / Gemini Pro'
  });
});

// Presets
app.get('/api/presets', (req, res) => {
  res.json(PRESET_REQUIREMENTS);
});

// Memory Bank - List & Search
app.get('/api/memories', (req, res) => {
  try {
    let memories = MemoryStore.getMemories();
    const { query, industry, type, tag } = req.query;

    if (query) {
      const q = query.toLowerCase();
      memories = memories.filter(m =>
        m.title.toLowerCase().includes(q) ||
        m.experience.toLowerCase().includes(q) ||
        (m.client && m.client.toLowerCase().includes(q)) ||
        (m.tags && m.tags.some(t => t.toLowerCase().includes(q)))
      );
    }

    if (industry && industry !== 'All') {
      memories = memories.filter(m => m.industry === industry);
    }

    if (type && type !== 'All') {
      memories = memories.filter(m => m.experienceType === type);
    }

    if (tag && tag !== 'All') {
      memories = memories.filter(m => m.tags && m.tags.includes(tag));
    }

    res.json(memories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Memory Bank - Retain Experience
app.post('/api/memories', (req, res) => {
  try {
    const { title, experienceType, industry, client, tags, experience, opportunitySize, lessonLearned } = req.body;

    if (!experienceType || !industry || !experience) {
      return res.status(400).json({ error: 'experienceType, industry, and experience are required fields.' });
    }

    const memoryTitle = title || `${experienceType} - ${client || industry}`;
    const newMemory = MemoryStore.addMemory({
      title: memoryTitle,
      experienceType,
      industry,
      client: client || 'Confidential Client',
      tags: tags || ['procurement'],
      opportunitySize: opportunitySize || '$1.5M',
      experience,
      lessonLearned: lessonLearned || experience.slice(0, 150) + '...',
      relevanceKeywords: tags || []
    });

    res.status(201).json(newMemory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Memory Bank - Quick Seeds
app.post('/api/memories/seed', (req, res) => {
  try {
    const { seedType } = req.body;
    let seedData = null;

    if (seedType === 'fintech') {
      seedData = {
        title: "Lost FinTech Enterprise RFP — SLA Rejection",
        experienceType: "Lost Bid",
        industry: "FinTech & Investment Banking",
        client: "Citadel Securities & Banking Tech",
        tags: ["sla-rejection", "pricing-objection", "security-audit"],
        opportunitySize: "$3.8M",
        experience: "Standard 99.9% uptime was rejected by risk committee. Client required 99.99% monthly availability, financial service credits up to 50%, and an active SOC 2 Type II bridge letter. Evaluator feedback specifically stated: 'Generic SaaS SLAs without financial penalties are non-viable for capital markets workloads.'",
        lessonLearned: "Proactively propose 99.99% availability with 10%-50% financial service credits and attach SOC 2 Type II audit bridge letters."
      };
    } else if (seedType === 'healthcare') {
      seedData = {
        title: "Lost Healthcare Bid — BAA & PHI Compliance",
        experienceType: "Lost Bid",
        industry: "Healthcare & Life Sciences",
        client: "Kaiser Permanente Digital",
        tags: ["compliance-redline", "legal", "security-audit"],
        opportunitySize: "$3.5M",
        experience: "Proposal was disqualified in technical security triage for omitting an executed Business Associate Agreement (BAA) Schedule, lacking explicit HIPAA Omnibus confirmation, and failing to document 7-year immutable audit log retention for patient health information.",
        lessonLearned: "Healthcare proposals must attach pre-executed BAA schedule, confirm HIPAA Omnibus compliance, and detail 7-year immutable audit retention."
      };
    } else if (seedType === 'saas') {
      seedData = {
        title: "SaaS Enterprise Procurement Pricing Redline",
        experienceType: "Pricing Redline",
        industry: "Enterprise SaaS & Cloud Infrastructure",
        client: "Twilio Global Cloud",
        tags: ["pricing-objection", "procurement", "pricing"],
        opportunitySize: "$2.1M",
        experience: "Procurement pushed back on single-tier user pricing. Required stepped volume discounts (15% at 10M, 25% at 25M API calls), an absolute 3-year price freeze, and 20% annual rollover for unused committed units.",
        lessonLearned: "Always provide transparent volume-tiered pricing tables with 36-month price protection and annual credit rollovers for enterprise SaaS buyers."
      };
    } else if (seedType === 'support') {
      seedData = {
        title: "Evaluator Feedback — P1 SLA Escalation",
        experienceType: "Evaluator Feedback",
        industry: "Enterprise SaaS & Cloud Infrastructure",
        client: "Workday Cloud Operations",
        tags: ["support", "sla-rejection", "implementation"],
        opportunitySize: "$2.6M",
        experience: "Scored 2/5 on support evaluation due to standard 4-hour ticket SLA. Competitor won by providing Named TAM, 15-minute P1 response, and direct Slack Connect channel.",
        lessonLearned: "High-value SaaS bids must include dedicated TAM, 15-min P1 response SLA, and direct Slack Connect channel."
      };
    } else {
      return res.status(400).json({ error: 'Unknown seedType' });
    }

    const created = MemoryStore.addMemory(seedData);
    res.status(201).json(created);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Memory Bank - Delete Experience
app.delete('/api/memories/:id', (req, res) => {
  try {
    const updated = MemoryStore.deleteMemory(req.params.id);
    res.json({ success: true, count: updated.length });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Memory Bank - Reset to Default Memories
app.post('/api/memories/reset', (req, res) => {
  try {
    const defaults = MemoryStore.resetMemories();
    res.json({ success: true, count: defaults.length, memories: defaults });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// RECALL Endpoint
app.post('/api/recall', (req, res) => {
  try {
    const { requirement, industry, client, limit } = req.body;
    if (!requirement) {
      return res.status(400).json({ error: 'Requirement is required for recall.' });
    }
    const recalled = CognitiveEngine.recallMemories({ requirement, industry, client, limit });
    res.json(recalled);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// REFLECT Endpoint
app.post('/api/reflect', (req, res) => {
  try {
    const { requirement, industry, client, recalledMemories } = req.body;
    const memories = recalledMemories || CognitiveEngine.recallMemories({ requirement, industry, client });
    const reflection = CognitiveEngine.reflect({ requirement, industry, client, recalledMemories: memories });
    res.json(reflection);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GENERATE BASELINE Endpoint
app.post('/api/generate/baseline', (req, res) => {
  try {
    const { requirement, industry, client } = req.body;
    if (!requirement) {
      return res.status(400).json({ error: 'Requirement is required.' });
    }
    const baseline = CognitiveEngine.generateBaseline({ requirement, industry, client });
    res.json(baseline);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GENERATE ADAPTIVE Endpoint (Full Cognitive Loop)
app.post('/api/generate/adaptive', (req, res) => {
  try {
    const { requirement, industry, client, opportunitySize } = req.body;
    if (!requirement) {
      return res.status(400).json({ error: 'Requirement is required.' });
    }

    // 1. RECALL
    const recalledMemories = CognitiveEngine.recallMemories({
      requirement,
      industry,
      client,
      limit: 5
    });

    // 2. REFLECT
    const reflection = CognitiveEngine.reflect({
      requirement,
      industry,
      client,
      recalledMemories
    });

    // 3. GENERATE ADAPTIVE RESPONSE
    const adaptive = CognitiveEngine.generateAdaptive({
      requirement,
      industry,
      client,
      opportunitySize,
      recalledMemories,
      reflection
    });

    // Also generate baseline for simultaneous comparison if needed
    const baseline = CognitiveEngine.generateBaseline({ requirement, industry, client });

    // Save run to proposals history
    MemoryStore.saveProposal({
      client: client || 'Enterprise Prospect',
      industry: industry || 'FinTech',
      requirementSummary: requirement.slice(0, 100) + '...',
      recalledCount: recalledMemories.length,
      adaptiveScore: adaptive.confidenceScore
    });

    res.json({
      adaptive,
      baseline,
      recalledMemories,
      reflection,
      pipelineTrace: {
        recalledCount: recalledMemories.length,
        memoriesUsed: recalledMemories.filter(m => m.usedInResponse).map(m => m.title),
        guardrailsApplied: reflection.triggeredGuardrails.map(g => g.title),
        totalTimeMs: adaptive.generationTimeMs
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Strategy Synthesis Endpoint
app.post('/api/synthesize-strategy', (req, res) => {
  try {
    const { industry } = req.body;
    const synthesis = CognitiveEngine.synthesizeStrategy({ industry: industry || 'All' });
    res.json(synthesis);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Guardrails Endpoints
app.get('/api/guardrails', (req, res) => {
  try {
    const guardrails = MemoryStore.getGuardrails();
    res.json(guardrails);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/guardrails/toggle', (req, res) => {
  try {
    const { id } = req.body;
    const updated = MemoryStore.toggleGuardrail(id);
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Analytics Dashboard Endpoint
app.get('/api/analytics', (req, res) => {
  try {
    const memories = MemoryStore.getMemories();
    const guardrails = MemoryStore.getGuardrails();

    // Industry breakdown
    const industryCounts = {};
    const typeCounts = {};
    memories.forEach(m => {
      industryCounts[m.industry] = (industryCounts[m.industry] || 0) + 1;
      typeCounts[m.experienceType] = (typeCounts[m.experienceType] || 0) + 1;
    });

    res.json({
      metrics: {
        winRateImprovement: "+18.4%",
        winRateBaseline: "34.2%",
        winRateAdaptive: "52.6%",
        rfpTurnaround: "-75%",
        rfpTurnaroundHours: "3.2 hrs vs 12.8 hrs",
        activeLearnedGuardrails: guardrails.filter(g => g.isActive).length,
        totalGuardrails: guardrails.length,
        experiencesRetained: memories.length + 138, // Includes historical baseline data points
        liveExperiencesCount: memories.length
      },
      proposalPerformance: [
        { month: 'Oct 2025', baselineWinRate: 31, adaptiveWinRate: 42, evaluationsScoreBaseline: 68, evaluationsScoreAdaptive: 84 },
        { month: 'Nov 2025', baselineWinRate: 33, adaptiveWinRate: 46, evaluationsScoreBaseline: 70, evaluationsScoreAdaptive: 88 },
        { month: 'Dec 2025', baselineWinRate: 32, adaptiveWinRate: 49, evaluationsScoreBaseline: 71, evaluationsScoreAdaptive: 91 },
        { month: 'Jan 2026', baselineWinRate: 35, adaptiveWinRate: 51, evaluationsScoreBaseline: 69, evaluationsScoreAdaptive: 93 },
        { month: 'Feb 2026', baselineWinRate: 34, adaptiveWinRate: 53, evaluationsScoreBaseline: 72, evaluationsScoreAdaptive: 96 }
      ],
      dealBreakers: [
        { category: 'SLA & Uptime Guarantees', percentage: 34, count: 48, severity: 'Critical' },
        { category: 'Compliance & BAA / PHI', percentage: 26, count: 37, severity: 'Critical' },
        { category: 'Volume Pricing & Price-Lock', percentage: 18, count: 25, severity: 'High' },
        { category: 'Security & Key Custody (BYOK)', percentage: 11, count: 16, severity: 'High' },
        { category: 'Support Escalation (P1 TAM)', percentage: 7, count: 10, severity: 'Medium' },
        { category: 'Implementation Timeframe', percentage: 4, count: 6, severity: 'Medium' }
      ],
      memoryGrowth: [
        { period: 'Q1 2025', count: 24 },
        { period: 'Q2 2025', count: 58 },
        { period: 'Q3 2025', count: 96 },
        { period: 'Q4 2025', count: 122 },
        { period: 'Q1 2026', count: 148 }
      ],
      industryInsights: [
        { industry: 'FinTech & Banking', memories: 46, winRate: '58.4%', topGuardrail: '99.99% Availability & Financial Credits' },
        { industry: 'Healthcare & Life Sciences', memories: 38, winRate: '54.2%', topGuardrail: 'Executed BAA & PHI Encryption' },
        { industry: 'Enterprise SaaS', memories: 32, winRate: '51.8%', topGuardrail: '36-Mo Price Lock & Volume Discount' },
        { industry: 'Government & Public Sector', memories: 18, winRate: '46.5%', topGuardrail: 'StateRAMP & US-Soil Clearance' },
        { industry: 'Retail & E-commerce', memories: 14, winRate: '52.0%', topGuardrail: 'Q4 Peak Freeze & Active-Active' }
      ]
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Serve frontend in production build if present
const clientDistPath = path.resolve(__dirname, '../client/dist');
app.use(express.static(clientDistPath));

app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api')) return next();
  const indexPath = path.join(clientDistPath, 'index.html');
  res.sendFile(indexPath, (err) => {
    if (err) {
      res.status(404).send('CognitiveRFP API is running. Frontend dev server is on port 3000.');
    }
  });
});

app.listen(PORT, () => {
  console.log(`[CognitiveRFP] Backend server listening on port ${PORT}`);
  console.log(`[CognitiveRFP] API endpoints available at http://localhost:${PORT}/api/health`);
});
