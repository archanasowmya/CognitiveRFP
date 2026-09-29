import React from 'react';
import { X, BookOpen, Brain, Sparkles, Database, CheckCircle2, ShieldCheck, ArrowRight, ExternalLink } from 'lucide-react';

interface DocsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DocsModal: React.FC<DocsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-3xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-100">CognitiveRFP Technical Documentation</h2>
              <p className="text-xs text-slate-400">Architecture, Memory Retrieval & Proposal Optimization</p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs text-slate-300 leading-relaxed font-sans">
          
          {/* Section 1: Overview */}
          <div>
            <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Brain className="w-4 h-4 text-emerald-400" />
              <span>1. Overview & Core Philosophy</span>
            </h3>
            <p className="text-slate-300 mb-2">
              <strong>“Every proposal teaches the next proposal how to win.”</strong>
            </p>
            <p className="text-slate-400">
              Stateless AI proposal generators generate answers in isolation. When an enterprise evaluator rejects an answer (e.g., standard 99.9% availability without credits, or missing HIPAA BAA schedule), stateless AI remembers nothing and repeats the exact same blunder on the next billion-dollar RFP.
            </p>
            <p className="text-slate-400 mt-2">
              CognitiveRFP solves this through persistent organizational memory, retrieving past experiences, synthesizing cross-deal strategy, and augmenting prompts before LLM generation.
            </p>
          </div>

          {/* Section 2: Three-Layer Architecture */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
            <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
              2. The Three-Layer Cognitive Memory Loop
            </h3>
            
            <div className="space-y-2">
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                <span className="font-bold text-slate-200 block mb-0.5 text-xs">
                  Layer 1: RETAIN (Organizational Memory Bank)
                </span>
                <p className="text-[11px] text-slate-400">
                  Stores historical proposal outcomes, won bids, lost RFPs, evaluator comments, pricing redlines, and compliance objections across industries.
                </p>
              </div>

              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                <span className="font-bold text-cyan-400 block mb-0.5 text-xs">
                  Layer 2: RECALL (Multi-Factor Semantic Retrieval)
                </span>
                <p className="text-[11px] text-slate-400">
                  When a new RFP requirement is entered, the engine runs semantic vector scoring weighted by industry affinity (1.25x-1.5x) and client matching to pull the highest-signal precedents.
                </p>
              </div>

              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                <span className="font-bold text-indigo-400 block mb-0.5 text-xs">
                  Layer 3: REFLECT (Cross-Memory Strategic Synthesis)
                </span>
                <p className="text-[11px] text-slate-400">
                  Combines multiple individual memory signals into an executive doctrine (e.g. “Enterprise FinTech accounts expect 99.99% availability + 10-50% financial service credits”).
                </p>
              </div>
            </div>
          </div>

          {/* Section 3: Guardrail Enforcement */}
          <div>
            <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-indigo-400" />
              <span>3. Learned Guardrail Rules</span>
            </h3>
            <p className="text-slate-400 mb-2">
              Guardrails are active policy constraints enforced during generation:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-300 text-[11px]">
              <li><strong>Enterprise FinTech SLA:</strong> Default to 99.99% uptime with 10%-50% service credits.</li>
              <li><strong>Healthcare Compliance:</strong> Pre-attach executed BAA, guarantee HIPAA Omnibus, and 7-year audit retention.</li>
              <li><strong>Enterprise SaaS Pricing:</strong> Include 15-25% tiered volume discounting and 36-month price-lock.</li>
              <li><strong>Enterprise Support:</strong> Mandate Named Technical Account Manager (TAM) and 15-min P1 escalation.</li>
            </ul>
          </div>

          {/* Section 4: Telemetry & Impact */}
          <div>
            <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>4. Measurable Presales Lift</span>
            </h3>
            <div className="grid grid-cols-2 gap-3 text-[11px]">
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-slate-500 block">Win Rate Improvement:</span>
                <span className="text-emerald-400 font-bold text-sm">+18.4%</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-slate-500 block">RFP Turnaround Time:</span>
                <span className="text-cyan-400 font-bold text-sm">-75% reduction</span>
              </div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/60 flex items-center justify-between text-xs text-slate-500">
          <span>CognitiveRFP Enterprise Platform v2.4</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
          >
            Close Documentation
          </button>
        </div>

      </div>
    </div>
  );
};
