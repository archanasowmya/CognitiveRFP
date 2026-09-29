import React, { useState } from 'react';
import { 
  History, 
  Tag, 
  Building2, 
  Calendar, 
  CheckCircle, 
  AlertTriangle, 
  Sparkles,
  ChevronDown,
  ChevronUp,
  Award,
  Layers,
  ArrowUpRight
} from 'lucide-react';
import { Memory } from '../types';

interface MemoryRecallPanelProps {
  memories: Memory[];
  onSelectMemory?: (memory: Memory) => void;
}

export const MemoryRecallPanel: React.FC<MemoryRecallPanelProps> = ({
  memories,
  onSelectMemory
}) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  if (!memories || memories.length === 0) {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center">
        <History className="w-8 h-8 text-slate-600 mx-auto mb-2" />
        <p className="text-sm font-medium text-slate-300">No Historical Memories Recalled Yet</p>
        <p className="text-xs text-slate-500 mt-1">Enter an RFP requirement and generate with Hindsight Memory to recall relevant experiences.</p>
      </div>
    );
  }

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const getBadgeColor = (type: string) => {
    switch (type) {
      case 'Won Bid':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'Lost Bid':
        return 'bg-red-500/10 text-red-400 border-red-500/20';
      case 'Pricing Redline':
      case 'Prospect Objection':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      case 'Security Redline':
      case 'Compliance Feedback':
        return 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20';
      default:
        return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20';
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
            <History className="w-4 h-4 text-emerald-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-semibold text-slate-100">Recalled Historical Experiences</h3>
              <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono font-medium">
                {memories.length} relevant
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Ranked by semantic vector similarity and industry risk weighting
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-950/40 px-3 py-1 rounded-full border border-emerald-500/30">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Context Window Active</span>
        </div>
      </div>

      {/* Grid of Recalled Memories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {memories.map((mem) => {
          const isExpanded = expandedId === mem.id;
          const score = mem.relevanceScore || 85;

          return (
            <div
              key={mem.id}
              className={`rounded-xl border transition-all duration-200 flex flex-col justify-between ${
                mem.usedInResponse
                  ? 'bg-slate-850/80 border-slate-700/80 hover:border-emerald-500/50 shadow-md'
                  : 'bg-slate-950/50 border-slate-800/60 hover:border-slate-700'
              }`}
            >
              <div className="p-4">
                {/* Top header row */}
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded border ${getBadgeColor(mem.experienceType)}`}>
                      {mem.experienceType}
                    </span>
                    {mem.usedInResponse && (
                      <span className="flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded bg-emerald-950/50 text-emerald-300 border border-emerald-500/40">
                        <CheckCircle className="w-3 h-3 text-emerald-400" />
                        Used in Response
                      </span>
                    )}
                  </div>

                  {/* Relevance Score Badge */}
                  <div className="flex items-center gap-1 bg-slate-900 px-2 py-1 rounded-md border border-slate-700/80 font-mono">
                    <span className="text-[10px] text-slate-400 uppercase">Match</span>
                    <span className={`text-xs font-bold ${
                      score >= 90 ? 'text-emerald-400' : score >= 80 ? 'text-cyan-400' : 'text-amber-400'
                    }`}>
                      {score}%
                    </span>
                  </div>
                </div>

                {/* Memory Title */}
                <h4 className="text-sm font-semibold text-slate-100 leading-snug hover:text-emerald-300 transition-colors">
                  {mem.title}
                </h4>

                {/* Client & Industry */}
                <div className="flex items-center gap-3 text-xs text-slate-400 mt-1 mb-2.5">
                  {mem.client && (
                    <span className="flex items-center gap-1 font-medium text-slate-300">
                      <Building2 className="w-3.5 h-3.5 text-slate-500" />
                      {mem.client}
                    </span>
                  )}
                  {mem.opportunitySize && (
                    <span className="text-slate-500 font-mono text-[11px]">
                      {mem.opportunitySize}
                    </span>
                  )}
                </div>

                {/* Why Relevant Callout */}
                {mem.whyRelevant && (
                  <div className="mb-2.5 p-2 rounded-lg bg-slate-900/90 border border-slate-800 text-[11px] text-emerald-300/90 flex items-start gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>{mem.whyRelevant}</span>
                  </div>
                )}

                {/* Content / Experience Excerpt */}
                <p className={`text-xs text-slate-300 leading-relaxed ${isExpanded ? '' : 'line-clamp-3'}`}>
                  "{mem.experience}"
                </p>

                {/* Lesson learned when expanded */}
                {isExpanded && mem.lessonLearned && (
                  <div className="mt-3 p-2.5 rounded-lg bg-emerald-950/20 border border-emerald-500/20 text-xs">
                    <span className="font-semibold text-emerald-400 block mb-1">Learned Guardrail:</span>
                    <span className="text-slate-200">{mem.lessonLearned}</span>
                  </div>
                )}
              </div>

              {/* Card Footer: Tags & Toggle */}
              <div className="px-4 py-2.5 bg-slate-900/60 border-t border-slate-800/80 rounded-b-xl flex items-center justify-between text-xs">
                <div className="flex flex-wrap gap-1">
                  {(mem.tags || []).slice(0, 2).map((tag) => (
                    <span key={tag} className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700/50">
                      #{tag}
                    </span>
                  ))}
                  {(mem.tags || []).length > 2 && (
                    <span className="text-[10px] text-slate-500">
                      +{(mem.tags || []).length - 2}
                    </span>
                  )}
                </div>

                <button
                  onClick={() => toggleExpand(mem.id)}
                  className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-slate-200 transition-colors ml-2"
                >
                  <span>{isExpanded ? 'Less' : 'Details'}</span>
                  {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
