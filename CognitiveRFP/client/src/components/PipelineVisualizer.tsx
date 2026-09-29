import React from 'react';
import { 
  FileText, 
  Search, 
  Database, 
  Sparkles, 
  Cpu, 
  Layers, 
  CheckCircle2, 
  Clock,
  ArrowRight
} from 'lucide-react';

export interface PipelineStep {
  id: string;
  name: string;
  shortLabel: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}

const PIPELINE_STEPS: PipelineStep[] = [
  { id: 'input', name: 'RFP Input', shortLabel: 'Input', icon: FileText, description: 'Client requirement & industry parsing' },
  { id: 'recall', name: 'Hindsight Recall', shortLabel: 'Recall', icon: Search, description: 'Historical vector search & semantic scoring' },
  { id: 'memories', name: 'Relevant Memories', shortLabel: 'Memories', icon: Database, description: 'Past won/lost precedents & redlines' },
  { id: 'reflection', name: 'Strategic Reflection', shortLabel: 'Reflect', icon: Sparkles, description: 'Cross-memory synthesis & guardrails' },
  { id: 'assembly', name: 'Prompt Assembly', shortLabel: 'Assembly', icon: Layers, description: 'Contextual prompt formulation with guardrails' },
  { id: 'llm', name: 'LLM Generation', shortLabel: 'Generation', icon: Cpu, description: 'Llama 3.3 70B / Gemini inference' },
  { id: 'response', name: 'Proposal Response', shortLabel: 'Output', icon: CheckCircle2, description: 'Adaptive proposal with diff telemetry' }
];

interface PipelineVisualizerProps {
  isGenerating: boolean;
  currentStepIndex: number;
  totalTimeMs?: number;
  recalledCount?: number;
}

export const PipelineVisualizer: React.FC<PipelineVisualizerProps> = ({
  isGenerating,
  currentStepIndex,
  totalTimeMs = 680,
  recalledCount = 5
}) => {
  return (
    <div className="w-full bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xl backdrop-blur-sm">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800/80">
        <div className="flex items-center gap-2.5">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-300">
            Cognitive Memory Pipeline
          </h3>
          <span className="text-[11px] text-slate-500 hidden sm:inline">
            Three-Layer Cognitive Architecture (Retain → Recall → Reflect)
          </span>
        </div>

        {totalTimeMs > 0 && (
          <div className="flex items-center gap-1.5 text-xs text-slate-400 bg-slate-950/60 px-2.5 py-1 rounded-md border border-slate-800">
            <Clock className="w-3.5 h-3.5 text-emerald-400" />
            <span>Pipeline Latency: <strong className="text-slate-200">{totalTimeMs}ms</strong></span>
          </div>
        )}
      </div>

      {/* Steps Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 sm:gap-3">
        {PIPELINE_STEPS.map((step, idx) => {
          const Icon = step.icon;
          const isDone = isGenerating ? idx < currentStepIndex : true;
          const isCurrent = isGenerating && idx === currentStepIndex;

          return (
            <div
              key={step.id}
              className={`relative flex flex-col p-3 rounded-xl border transition-all duration-300 ${
                isCurrent
                  ? 'bg-emerald-950/40 border-emerald-500/70 shadow-lg shadow-emerald-950/60 scale-[1.02]'
                  : isDone
                  ? 'bg-slate-850/60 border-slate-800 hover:border-slate-700'
                  : 'bg-slate-950/40 border-slate-900 opacity-50'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${
                    isCurrent
                      ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/30 animate-pulse'
                      : isDone
                      ? 'bg-slate-800 text-emerald-400'
                      : 'bg-slate-900 text-slate-600'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-mono text-slate-500">
                  0{idx + 1}
                </span>
              </div>

              <span className={`text-xs font-semibold leading-tight ${isCurrent ? 'text-emerald-300' : 'text-slate-200'}`}>
                {step.name}
              </span>
              
              <span className="text-[10px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                {step.id === 'memories' && recalledCount ? `${recalledCount} memories identified` : step.description}
              </span>

              {/* Progress indicator */}
              <div className="mt-2 w-full bg-slate-800 h-1 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ${
                    isCurrent
                      ? 'w-2/3 bg-emerald-400 animate-pulse'
                      : isDone
                      ? 'w-full bg-emerald-500/70'
                      : 'w-0 bg-transparent'
                  }`}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
