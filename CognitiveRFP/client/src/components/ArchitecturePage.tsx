import React, { useState } from 'react';
import { 
  Network, 
  Layers, 
  Cpu, 
  Database, 
  Search, 
  Sparkles, 
  ShieldAlert, 
  ArrowDown, 
  ArrowRight,
  Code2, 
  Terminal, 
  CheckCircle2, 
  Info,
  Server,
  FileCode,
  Zap,
  Repeat
} from 'lucide-react';

interface PipelineNode {
  id: string;
  title: string;
  layer: 'Client Input' | 'Recall Layer' | 'Reflect Layer' | 'Generation Layer' | 'Feedback Loop';
  type: string;
  summary: string;
  icon: React.ComponentType<{ className?: string }>;
  details: {
    technology: string;
    latency: string;
    inputPayload: string;
    outputPayload: string;
    operationalRule: string;
  };
}

const NODES: PipelineNode[] = [
  {
    id: 'user_rfp',
    title: 'USER RFP / TENDER',
    layer: 'Client Input',
    type: 'External Ingestion',
    summary: 'Enterprise procurement document or questionnaire provided by prospective client.',
    icon: FileCode,
    details: {
      technology: 'Multi-format Parser (PDF, DOCX, Portal Textarea)',
      latency: '< 10ms',
      inputPayload: 'Raw RFP Questionnaire or Schedule of Requirements',
      outputPayload: 'Structured requirement items partitioned by section & category',
      operationalRule: 'Extracts industry, prospect name, deal size, and specific requirement clauses.'
    }
  },
  {
    id: 'rfp_requirement',
    title: 'RFP REQUIREMENT',
    layer: 'Client Input',
    type: 'Normalization',
    summary: 'Standardized query vector and thematic entity classification.',
    icon: Search,
    details: {
      technology: 'Entity Recognition & Semantic Tokenization',
      latency: '15ms',
      inputPayload: '{"industry": "FinTech", "client": "Morgan Stanley", "requirement": "99.9% uptime SLA..."}',
      outputPayload: 'Normalized requirement embedding tokens + domain taxonomy tags',
      operationalRule: 'Determines primary domain (SLA, Infosec, Pricing, Support, Implementation).'
    }
  },
  {
    id: 'hindsight_recall',
    title: 'HINDSIGHT RECALL',
    layer: 'Recall Layer',
    type: 'Vector & Semantic Retrieval',
    summary: 'High-dimensional similarity search combined with industry risk-scoring boosts.',
    icon: Database,
    details: {
      technology: 'Cosine Semantic Similarity + Industry Affinity Boost (1.25x - 1.5x)',
      latency: '45ms',
      inputPayload: 'Requirement query vector + domain filter parameters',
      outputPayload: 'Top K ranked memories with computed relevance scores (85%-99%)',
      operationalRule: 'Retrieves both won precedents (what worked) and lost proposals (what failed).'
    }
  },
  {
    id: 'relevant_experiences',
    title: 'RELEVANT EXPERIENCES',
    layer: 'Recall Layer',
    type: 'Context Extraction',
    summary: 'Historical won bids, lost RFPs, prospect objections, and evaluator redlines.',
    icon: Layers,
    details: {
      technology: 'Memory Context Window Optimizer',
      latency: '20ms',
      inputPayload: 'Array of candidate historical memory objects',
      outputPayload: 'Deduplicated, prioritized experience cards with explicit "Why Relevant" rationales',
      operationalRule: 'Filters memories with relevance score >= 75% to prevent context pollution.'
    }
  },
  {
    id: 'hindsight_reflect',
    title: 'HINDSIGHT REFLECT',
    layer: 'Reflect Layer',
    type: 'Cross-Memory Reasoning',
    summary: 'Synthesizes higher-order strategic doctrine from multiple independent memory signals.',
    icon: Sparkles,
    details: {
      technology: 'Cross-Memory Reflection Synthesizer',
      latency: '110ms',
      inputPayload: 'Top recalled memories across won/lost outcomes',
      outputPayload: 'Strategic reflection narrative + checklist of mandatory contractual actions',
      operationalRule: 'Detects systemic failure patterns (e.g. 99.9% rejection in FinTech) and forms active counter-measures.'
    }
  },
  {
    id: 'strategic_guardrails',
    title: 'STRATEGIC GUARDRAILS',
    layer: 'Reflect Layer',
    type: 'Policy Enforcement',
    summary: 'Immutable rules that override generic AI default answers with winning standards.',
    icon: ShieldAlert,
    details: {
      technology: 'Learned Organizational Guardrail Repository',
      latency: '10ms',
      inputPayload: 'Triggered guardrail IDs (e.g. guard-001, guard-002)',
      outputPayload: 'Contractual constraints (e.g. "Default to 99.99% monthly SLA + 10-50% credits")',
      operationalRule: 'Enforces hard organizational boundaries on SLAs, pricing locks, and BAA schedules.'
    }
  },
  {
    id: 'prompt_assembly',
    title: 'PROMPT ASSEMBLY',
    layer: 'Generation Layer',
    type: 'Contextual Injection',
    summary: 'Constructs the full cognitive context window with instructions, memories, and guardrails.',
    icon: Terminal,
    details: {
      technology: 'Structured Dynamic Template Engine',
      latency: '15ms',
      inputPayload: 'RFP requirement + Recalled Memories + Reflection Doctrine + Guardrails',
      outputPayload: 'Augmented System & User Prompts with counter-measure directives',
      operationalRule: 'Explicitly instructs LLM to preemptively address known failure modes.'
    }
  },
  {
    id: 'groq_llama',
    title: 'GROQ LLAMA 3.3 70B / GEMINI',
    layer: 'Generation Layer',
    type: 'Inference Engine',
    summary: 'Ultra-fast low-latency generative inference executing high-conviction proposal formulation.',
    icon: Cpu,
    details: {
      technology: 'Groq LPUs (LPU Inference Engine) / Google Gemini 2.0 Flash',
      latency: '350ms - 650ms',
      inputPayload: 'Contextual cognitive prompt (~2,400 tokens)',
      outputPayload: 'Authoritative, comprehensive enterprise RFP proposal section',
      operationalRule: 'Employs professional B2B tone with contractual tables, RPO/RTO metrics, and credit matrices.'
    }
  },
  {
    id: 'adaptive_proposal',
    title: 'ADAPTIVE PROPOSAL',
    layer: 'Generation Layer',
    type: 'Final Output',
    summary: 'Memory-enhanced proposal response with automated diff telemetry and risk mitigation.',
    icon: CheckCircle2,
    details: {
      technology: 'Proposal Post-Processor & Diff Highlight Engine',
      latency: '30ms',
      inputPayload: 'Raw LLM output',
      outputPayload: 'Formatted Markdown with highlighted improvements over baseline',
      operationalRule: 'Flags added commitments in green for presales review and approval.'
    }
  },
  {
    id: 'user_feedback',
    title: 'USER FEEDBACK (WIN/LOSS LOOP)',
    layer: 'Feedback Loop',
    type: 'Continuous Learning',
    summary: 'Real outcome telemetry fed back into the Retain layer to close the cognitive loop.',
    icon: Repeat,
    details: {
      technology: 'Automated Win/Loss Retain Endpoint',
      latency: 'Real-time asynchronous',
      inputPayload: 'Deal outcome (Won/Lost), evaluator notes, client redlines, pricing marks',
      outputPayload: 'New persistent memory vectors stored in Hindsight Memory Bank',
      operationalRule: '“Every proposal teaches the next proposal how to win.” The loop is closed.'
    }
  }
];

export const ArchitecturePage: React.FC = () => {
  const [selectedNodeId, setSelectedNodeId] = useState<string>('hindsight_recall');
  const selectedNode = NODES.find(n => n.id === selectedNodeId) || NODES[2];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <Network className="w-3.5 h-3.5" />
            <span>Architecture Specification</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-100 tracking-tight">
            The Three-Layer Cognitive Architecture
          </h1>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl leading-relaxed">
            Unlike stateless LLM wrappers that hallucinate or repeat past mistakes, CognitiveRFP employs an end-to-end memory loop: <strong className="text-emerald-400">RETAIN</strong> → <strong className="text-cyan-400">RECALL</strong> → <strong className="text-indigo-400">REFLECT</strong>.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-950 px-3 py-2 rounded-xl border border-slate-800 text-xs font-mono text-slate-400">
          <Server className="w-4 h-4 text-emerald-400" />
          <span>Pipeline Latency: ~680ms End-to-End</span>
        </div>
      </div>

      {/* Main Grid: Interactive Visual Pipeline & Node Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT: The Flow Diagram (7 Cols) */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl space-y-3">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-2">
            <h2 className="text-sm font-bold text-slate-100 uppercase tracking-wider">
              Interactive Execution Pipeline
            </h2>
            <span className="text-[11px] text-slate-500">
              Click any node to inspect telemetry & payloads
            </span>
          </div>

          <div className="space-y-2 relative">
            {NODES.map((node, idx) => {
              const Icon = node.icon;
              const isSelected = selectedNodeId === node.id;
              const isFeedbackLoop = node.id === 'user_feedback';

              return (
                <div key={node.id} className="relative">
                  <div
                    onClick={() => setSelectedNodeId(node.id)}
                    className={`p-3.5 rounded-xl border transition-all duration-200 cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'bg-slate-850 border-emerald-500 shadow-lg shadow-emerald-950/40 ring-1 ring-emerald-500/50'
                        : isFeedbackLoop
                        ? 'bg-gradient-to-r from-emerald-950/30 to-indigo-950/30 border-emerald-500/40 hover:border-emerald-500'
                        : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${
                          isSelected
                            ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/30'
                            : 'bg-slate-900 text-slate-400 border border-slate-800'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-slate-200 tracking-wide font-mono">
                            {node.title}
                          </span>
                          <span className={`text-[9px] uppercase px-1.5 py-0.5 rounded font-mono ${
                            node.layer === 'Recall Layer'
                              ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                              : node.layer === 'Reflect Layer'
                              ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20'
                              : node.layer === 'Feedback Loop'
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                              : 'bg-slate-800 text-slate-400'
                          }`}>
                            {node.layer}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">
                          {node.summary}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono text-slate-500 hidden sm:inline">
                        {node.details.latency}
                      </span>
                      <ArrowRight className={`w-3.5 h-3.5 transition-transform ${isSelected ? 'text-emerald-400 translate-x-1' : 'text-slate-600'}`} />
                    </div>
                  </div>

                  {/* Flow arrow connecting nodes */}
                  {idx < NODES.length - 1 && (
                    <div className="h-3 flex items-center justify-center">
                      <div className="w-[1px] h-full bg-slate-800" />
                    </div>
                  )}

                  {/* Loop back indicator */}
                  {isFeedbackLoop && (
                    <div className="mt-2 p-2 rounded-lg bg-emerald-950/20 border border-emerald-500/20 text-[11px] text-emerald-400 flex items-center justify-center gap-1.5">
                      <Repeat className="w-3.5 h-3.5" />
                      <span>Loop feeds back into RETAIN storage for continuous organizational learning</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT: Node Inspector Panel (5 Cols) */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
              <div className="flex items-center gap-2">
                <Code2 className="w-4 h-4 text-emerald-400" />
                <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider">
                  Stage Deep Inspector
                </h3>
              </div>
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                {selectedNode.type}
              </span>
            </div>

            {/* Inspector Details */}
            <div className="space-y-4 text-xs">
              <div>
                <h4 className="text-base font-bold text-slate-100 mb-1">
                  {selectedNode.title}
                </h4>
                <p className="text-slate-400 leading-relaxed text-xs">
                  {selectedNode.summary}
                </p>
              </div>

              {/* Specs Box */}
              <div className="grid grid-cols-2 gap-2 p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-mono">
                <div>
                  <span className="text-slate-500 block">Technology:</span>
                  <span className="text-slate-200 font-semibold">{selectedNode.details.technology}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Stage Latency:</span>
                  <span className="text-emerald-400 font-semibold">{selectedNode.details.latency}</span>
                </div>
              </div>

              {/* Operational Rule */}
              <div className="p-3 rounded-xl bg-slate-850/80 border border-slate-800">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 block mb-1">
                  Cognitive Operational Rule
                </span>
                <p className="text-slate-200 leading-relaxed text-xs font-sans">
                  {selectedNode.details.operationalRule}
                </p>
              </div>

              {/* Input Payload */}
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 block mb-1">
                  Input Contract
                </span>
                <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 font-mono text-[11px] text-slate-300 break-words">
                  {selectedNode.details.inputPayload}
                </div>
              </div>

              {/* Output Payload */}
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 block mb-1">
                  Output Contract
                </span>
                <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 font-mono text-[11px] text-emerald-400 break-words">
                  {selectedNode.details.outputPayload}
                </div>
              </div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/20 text-xs text-slate-400 flex items-center gap-2">
            <Info className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>Telemetry data recorded in real-time on every proposal generation.</span>
          </div>
        </div>

      </div>

      {/* Technical Specifications Summary Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl">
        <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider mb-3">
          Cognitive Engine Technical Specifications
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs font-mono">
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-slate-500 block text-[10px] uppercase">Memory Retention</span>
            <span className="text-slate-200 font-bold text-sm mt-1 block">Multi-Factor Semantic</span>
            <span className="text-slate-400 text-[11px] mt-0.5 block">N-gram TF-IDF + Industry Risk</span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-slate-500 block text-[10px] uppercase">Reflection Layer</span>
            <span className="text-indigo-400 font-bold text-sm mt-1 block">Cross-Memory Doctrine</span>
            <span className="text-slate-400 text-[11px] mt-0.5 block">Synthesizes recurring redlines</span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-slate-500 block text-[10px] uppercase">Guardrail Enforcement</span>
            <span className="text-emerald-400 font-bold text-sm mt-1 block">Deterministic Override</span>
            <span className="text-slate-400 text-[11px] mt-0.5 block">Prevents generic SLA/Pricing leaks</span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-slate-500 block text-[10px] uppercase">Model Compatibility</span>
            <span className="text-cyan-400 font-bold text-sm mt-1 block">Llama 3.3 / Gemini / Claude</span>
            <span className="text-slate-400 text-[11px] mt-0.5 block">Model-agnostic memory context</span>
          </div>
        </div>
      </div>

    </div>
  );
};
