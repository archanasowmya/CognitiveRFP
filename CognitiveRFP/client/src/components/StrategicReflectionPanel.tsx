import React, { useState } from 'react';
import { 
  Sparkles, 
  ShieldCheck, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  Zap, 
  Lightbulb, 
  ArrowRight,
  Compass
} from 'lucide-react';
import { StrategicReflection } from '../types';

interface StrategicReflectionPanelProps {
  reflection: StrategicReflection;
}

export const StrategicReflectionPanel: React.FC<StrategicReflectionPanelProps> = ({ reflection }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  if (!reflection || !reflection.strategicSummary) return null;

  return (
    <div className="bg-slate-900 border border-emerald-500/30 rounded-2xl shadow-xl overflow-hidden">
      {/* Header bar */}
      <div 
        onClick={() => setIsExpanded(!isExpanded)}
        className="px-5 py-4 bg-gradient-to-r from-emerald-950/40 via-slate-900 to-indigo-950/40 flex items-center justify-between cursor-pointer border-b border-slate-800/80 hover:bg-slate-850/60 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-500 to-indigo-600 flex items-center justify-center shadow-md shadow-emerald-500/20">
            <Compass className="w-4 h-4 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-semibold text-slate-100">
                Strategic Reflection Layer
              </h3>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Cross-Memory Synthesis
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Higher-order executive doctrine synthesized from {reflection.recalledCount} historical experiences
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden sm:inline text-xs text-emerald-400/90 font-medium">
            {reflection.recommendedActions.length} Guardrails Active
          </span>
          <button className="text-slate-400 hover:text-slate-200 p-1">
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Body */}
      {isExpanded && (
        <div className="p-5 space-y-4">
          {/* Main Strategic Reflection Narrative */}
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />
            <div className="flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-semibold text-emerald-300 uppercase tracking-wider block mb-1">
                  Synthesized Proposal Doctrine
                </span>
                <p className="text-sm text-slate-200 leading-relaxed italic">
                  "{reflection.strategicSummary}"
                </p>
              </div>
            </div>
          </div>

          {/* Recommended Actions Checklist */}
          {reflection.recommendedActions && reflection.recommendedActions.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2.5 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Recommended Contractual Actions (Injected into Prompt)</span>
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {reflection.recommendedActions.map((action, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2.5 p-2.5 rounded-lg bg-slate-850/60 border border-slate-800 text-xs text-slate-300"
                  >
                    <span className="w-4 h-4 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center flex-shrink-0 text-[10px] font-mono text-emerald-400 mt-0.5">
                      ✓
                    </span>
                    <span className="leading-snug">{action}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Triggered Guardrails */}
          {reflection.triggeredGuardrails && reflection.triggeredGuardrails.length > 0 && (
            <div className="pt-2 border-t border-slate-800/80">
              <div className="flex items-center gap-2 mb-2">
                <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Active Organizational Guardrails Enforced:
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {reflection.triggeredGuardrails.map((g) => (
                  <div
                    key={g.id}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-indigo-950/40 border border-indigo-500/30 text-indigo-300 text-xs"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                    <span className="font-medium">{g.title}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
