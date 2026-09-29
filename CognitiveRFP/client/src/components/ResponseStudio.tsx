import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  AlertTriangle, 
  CheckCircle, 
  Copy, 
  Clock, 
  Cpu, 
  Building2, 
  DollarSign, 
  Zap, 
  Eye, 
  Layers, 
  Check, 
  HelpCircle,
  RefreshCw,
  SlidersHorizontal,
  BookmarkPlus,
  Compass
} from 'lucide-react';
import { 
  Industry, 
  PresetRequirement, 
  BaselineResponse, 
  AdaptiveResponse, 
  Memory, 
  StrategicReflection,
  GenerationResult 
} from '../types';
import { 
  fetchPresets, 
  generateBaseline, 
  generateAdaptive 
} from '../api';
import { PipelineVisualizer } from './PipelineVisualizer';
import { MemoryRecallPanel } from './MemoryRecallPanel';
import { StrategicReflectionPanel } from './StrategicReflectionPanel';

interface ResponseStudioProps {
  onNotify: (type: 'success' | 'error' | 'info', title: string, message?: string) => void;
  onNavigateToMemoryBank: () => void;
}

const INDUSTRIES: Industry[] = [
  'FinTech & Investment Banking',
  'Healthcare & Life Sciences',
  'Enterprise SaaS & Cloud Infrastructure',
  'Manufacturing',
  'Government & Public Sector',
  'Retail & E-commerce'
];

export const ResponseStudio: React.FC<ResponseStudioProps> = ({ onNotify, onNavigateToMemoryBank }) => {
  // Form State
  const [industry, setIndustry] = useState<Industry>('FinTech & Investment Banking');
  const [client, setClient] = useState<string>('Morgan Stanley Digital');
  const [opportunitySize, setOpportunitySize] = useState<string>('$2.4M');
  const [requirement, setRequirement] = useState<string>(
    'Describe your service level agreements (SLAs), guaranteed uptime availability percentages, definition of service downtime, scheduled maintenance windows, and the financial remedies or service credits offered in the event of an unscheduled breach. Detail your Disaster Recovery (DR) architecture, including RPO and RTO commitments, multi-region failover protocols, and recent audit certifications.'
  );

  // Presets
  const [presets, setPresets] = useState<PresetRequirement[]>([]);
  const [selectedPresetId, setSelectedPresetId] = useState<string>('preset-sla');

  // Generation Output State
  const [baseline, setBaseline] = useState<BaselineResponse | null>(null);
  const [adaptive, setAdaptive] = useState<AdaptiveResponse | null>(null);
  const [recalledMemories, setRecalledMemories] = useState<Memory[]>([]);
  const [reflection, setReflection] = useState<StrategicReflection | null>(null);

  // UI Flow State
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [activePipelineStep, setActivePipelineStep] = useState<number>(0);
  const [generationType, setGenerationType] = useState<'both' | 'baseline' | 'adaptive'>('both');
  const [highlightDiff, setHighlightDiff] = useState<boolean>(true);
  const [copiedBaseline, setCopiedBaseline] = useState<boolean>(false);
  const [copiedAdaptive, setCopiedAdaptive] = useState<boolean>(false);

  // Load Presets on Mount
  useEffect(() => {
    fetchPresets()
      .then(data => {
        setPresets(data);
      })
      .catch(err => {
        console.error('Failed to load presets:', err);
      });
  }, []);

  // Preset Selection Handler
  const handleSelectPreset = (preset: PresetRequirement) => {
    setSelectedPresetId(preset.id);
    setIndustry(preset.industry);
    setClient(preset.client);
    setOpportunitySize(preset.opportunitySize);
    setRequirement(preset.requirement);
    onNotify('info', `Loaded Preset: ${preset.title}`, `Populated realistic RFP requirements for ${preset.client}`);
  };

  // Run Animated Pipeline Simulation during generation
  const runPipelineAnimation = async () => {
    for (let step = 0; step < 7; step++) {
      setActivePipelineStep(step);
      await new Promise(resolve => setTimeout(resolve, 140));
    }
  };

  // Generate Baseline Handler
  const handleGenerateBaseline = async () => {
    if (!requirement.trim()) {
      onNotify('error', 'Requirement is empty', 'Please input an RFP requirement before generating.');
      return;
    }

    setIsGenerating(true);
    setGenerationType('baseline');
    try {
      await runPipelineAnimation();
      const res = await generateBaseline({ requirement, industry, client });
      setBaseline(res);
      onNotify('info', 'Stateless Baseline Generated', 'Notice the generic commitments and highlighted risk factors.');
    } catch (error: any) {
      onNotify('error', 'Generation Failed', error.message);
    } finally {
      setIsGenerating(false);
    }
  };

  // Generate Adaptive (Cognitive Memory) Handler
  const handleGenerateAdaptive = async () => {
    if (!requirement.trim()) {
      onNotify('error', 'Requirement is empty', 'Please input an RFP requirement before generating.');
      return;
    }

    setIsGenerating(true);
    setGenerationType('adaptive');
    try {
      await runPipelineAnimation();
      const res: GenerationResult = await generateAdaptive({
        requirement,
        industry,
        client,
        opportunitySize
      });

      if (res.adaptive) setAdaptive(res.adaptive);
      if (res.baseline) setBaseline(res.baseline);
      setRecalledMemories(res.recalledMemories || []);
      setReflection(res.reflection || null);

      onNotify('success', 'Hindsight Memory Applied!', `Recalled ${res.recalledMemories.length} experiences and synthesized proposal doctrine.`);
    } catch (error: any) {
      onNotify('error', 'Generation Failed', error.message);
    } finally {
      setIsGenerating(false);
    }
  };

  // Generate Both for Direct Contrast
  const handleGenerateBoth = async () => {
    if (!requirement.trim()) {
      onNotify('error', 'Requirement is empty', 'Please input an RFP requirement.');
      return;
    }

    setIsGenerating(true);
    setGenerationType('both');
    try {
      await runPipelineAnimation();
      const res: GenerationResult = await generateAdaptive({
        requirement,
        industry,
        client,
        opportunitySize
      });

      if (res.adaptive) setAdaptive(res.adaptive);
      if (res.baseline) setBaseline(res.baseline);
      setRecalledMemories(res.recalledMemories || []);
      setReflection(res.reflection || null);

      onNotify('success', 'Benchmark Comparison Complete', 'Side-by-side contrast ready for evaluation.');
    } catch (error: any) {
      onNotify('error', 'Generation Failed', error.message);
    } finally {
      setIsGenerating(false);
    }
  };

  // Copy helpers
  const handleCopy = (text: string, type: 'baseline' | 'adaptive') => {
    navigator.clipboard.writeText(text);
    if (type === 'baseline') {
      setCopiedBaseline(true);
      setTimeout(() => setCopiedBaseline(false), 2000);
    } else {
      setCopiedAdaptive(true);
      setTimeout(() => setCopiedAdaptive(false), 2000);
    }
    onNotify('success', 'Copied to Clipboard', `${type === 'adaptive' ? 'Adaptive' : 'Baseline'} response copied.`);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner: Core Value Proposition */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-emerald-950/30 border border-slate-800 p-5 sm:p-6 shadow-xl">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Adaptive Proposal Intelligence</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-100 tracking-tight">
              “Every proposal teaches the next proposal how to win.”
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 leading-relaxed">
              Standard AI repeats costly past mistakes. CognitiveRFP recalls historical redlines, evaluator feedback, and winning arguments to generate high-conviction proposals.
            </p>
          </div>

          {/* Quick Stats or CTA */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={handleGenerateBoth}
              disabled={isGenerating}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-500 via-emerald-600 to-indigo-600 hover:from-emerald-400 hover:to-indigo-500 text-white font-semibold text-sm shadow-lg shadow-emerald-500/25 transition-all disabled:opacity-50"
            >
              <Zap className="w-4 h-4 text-emerald-200" />
              <span>Run Contrast Benchmark (Both)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Proposal Workspace Input & Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT PANEL: Proposal Workspace (5 Cols) */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl flex flex-col justify-between space-y-5">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                  <SlidersHorizontal className="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-slate-100 uppercase tracking-wider">
                    Proposal Workspace
                  </h2>
                  <p className="text-[11px] text-slate-400">Specify opportunity profile and RFP scope</p>
                </div>
              </div>

              <span className="text-[11px] text-slate-500 font-mono">
                Step 1 of 3
              </span>
            </div>

            {/* Form Fields */}
            <div className="space-y-4 text-xs">
              
              {/* Industry Dropdown */}
              <div>
                <label className="block font-semibold text-slate-300 mb-1.5 flex items-center justify-between">
                  <span>Client Industry</span>
                  <span className="text-[11px] text-emerald-400/80 font-normal">Weights memory recall</span>
                </label>
                <select
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value as Industry)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-slate-200 focus:outline-none focus:border-emerald-500 transition-colors"
                >
                  {INDUSTRIES.map((ind) => (
                    <option key={ind} value={ind} className="bg-slate-900 text-slate-200">
                      {ind}
                    </option>
                  ))}
                </select>
              </div>

              {/* Client & Opportunity Size Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1.5 flex items-center gap-1">
                    <Building2 className="w-3.5 h-3.5 text-slate-500" />
                    <span>Prospective Client</span>
                  </label>
                  <input
                    type="text"
                    value={client}
                    onChange={(e) => setClient(e.target.value)}
                    placeholder="e.g. Morgan Stanley Digital"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-emerald-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1.5 flex items-center gap-1">
                    <DollarSign className="w-3.5 h-3.5 text-slate-500" />
                    <span>Opportunity Size</span>
                  </label>
                  <input
                    type="text"
                    value={opportunitySize}
                    onChange={(e) => setOpportunitySize(e.target.value)}
                    placeholder="e.g. $2.4M"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-emerald-500 transition-colors"
                  />
                </div>
              </div>

              {/* Quick Preset Buttons */}
              <div>
                <label className="block font-semibold text-slate-300 mb-1.5 flex items-center justify-between">
                  <span>Quick RFP Requirement Presets</span>
                  <span className="text-[11px] text-slate-500">Click to autofill</span>
                </label>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                  {presets.map((p) => {
                    const isSelected = selectedPresetId === p.id;
                    return (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => handleSelectPreset(p)}
                        className={`text-left p-2 rounded-lg border text-[11px] leading-tight transition-all truncate ${
                          isSelected
                            ? 'bg-emerald-950/40 border-emerald-500/60 text-emerald-300 font-semibold'
                            : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                        }`}
                        title={p.title}
                      >
                        {p.title}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* RFP Requirement Textarea */}
              <div>
                <label className="block font-semibold text-slate-300 mb-1.5 flex items-center justify-between">
                  <span>RFP Requirement Statement</span>
                  <span className="text-[11px] text-slate-500">{requirement.length} characters</span>
                </label>
                <textarea
                  rows={5}
                  value={requirement}
                  onChange={(e) => setRequirement(e.target.value)}
                  placeholder="Paste or enter the RFP requirement text from the prospect..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-emerald-500 transition-colors font-sans leading-relaxed text-xs resize-y"
                />
              </div>

            </div>
          </div>

          {/* GENERATION CONTROLS (Two Distinct Actions) */}
          <div className="pt-4 border-t border-slate-800 space-y-3">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block mb-1">
              Select Generation Pipeline
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              
              {/* Button 1: Stateless Baseline */}
              <button
                type="button"
                onClick={handleGenerateBaseline}
                disabled={isGenerating}
                className="group flex flex-col items-start p-3.5 rounded-xl border border-amber-500/30 bg-amber-950/20 hover:bg-amber-950/40 hover:border-amber-500/60 text-left transition-all disabled:opacity-50"
              >
                <div className="flex items-center justify-between w-full mb-1">
                  <span className="text-xs font-bold text-amber-400 group-hover:text-amber-300">
                    Generate Stateless Baseline
                  </span>
                  <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300">
                    Naive AI
                  </span>
                </div>
                <span className="text-[11px] text-slate-400 leading-snug">
                  “Generate without historical memory”
                </span>
              </button>

              {/* Button 2: Hindsight Memory Applied */}
              <button
                type="button"
                onClick={handleGenerateAdaptive}
                disabled={isGenerating}
                className="group flex flex-col items-start p-3.5 rounded-xl border border-emerald-500/40 bg-gradient-to-br from-emerald-950/40 via-slate-900 to-indigo-950/40 hover:border-emerald-500/80 shadow-lg shadow-emerald-950/30 text-left transition-all disabled:opacity-50"
              >
                <div className="flex items-center justify-between w-full mb-1">
                  <span className="text-xs font-bold text-emerald-400 group-hover:text-emerald-300 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Generate with Hindsight</span>
                  </span>
                  <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
                    Adaptive
                  </span>
                </div>
                <span className="text-[11px] text-slate-400 leading-snug">
                  “Recall + Reflect + Generate”
                </span>
              </button>

            </div>
          </div>
        </div>

        {/* RIGHT PANEL: Pipeline Visualizer + Status (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col space-y-4">
          <PipelineVisualizer
            isGenerating={isGenerating}
            currentStepIndex={activePipelineStep}
            totalTimeMs={adaptive?.generationTimeMs || 680}
            recalledCount={recalledMemories.length || 5}
          />

          {/* Quick Contrast Guide Callout */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 text-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-slate-300 uppercase tracking-wider text-[11px]">
                The Cognitive Difference at a Glance
              </span>
              <button
                onClick={() => setHighlightDiff(!highlightDiff)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-medium border transition-colors ${
                  highlightDiff
                    ? 'bg-emerald-950/50 border-emerald-500/40 text-emerald-300'
                    : 'bg-slate-800 border-slate-700 text-slate-400'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>{highlightDiff ? 'Diff Highlights ON' : 'Diff Highlights OFF'}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px]">
              <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-500/30 text-slate-300">
                <span className="font-bold text-amber-400 block mb-1">
                  Generic AI → Remembers Nothing → Repeats Mistakes
                </span>
                <p className="text-slate-400">
                  Outputs standard 99.9% SLAs without credits, omits pre-executed BAAs, and offers rigid list pricing that gets disqualified in procurement.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/30 text-slate-300">
                <span className="font-bold text-emerald-400 block mb-1">
                  CognitiveRFP → Recalls Precedents → Reasons → Wins
                </span>
                <p className="text-slate-400">
                  Synthesizes past lost deals, injects 99.99% availability, 10-50% service credits, SOC 2 bridge letters, and price locks.
                </p>
              </div>
            </div>
          </div>

          {/* If reflection exists, render it right above outputs */}
          {reflection && <StrategicReflectionPanel reflection={reflection} />}
        </div>

      </div>

      {/* OUTPUT AREA: Side-by-Side Response Comparison */}
      {(baseline || adaptive) && (
        <div className="space-y-6 pt-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-slate-100 tracking-tight">
                Proposal Comparison & Evaluation
              </h2>
              <span className="text-xs text-slate-500 font-mono">
                {industry} • {client}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setHighlightDiff(!highlightDiff)}
                className="text-xs text-slate-400 hover:text-emerald-400 flex items-center gap-1 transition-colors"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>{highlightDiff ? 'Visual Diff Enabled' : 'Enable Visual Diff'}</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* BASELINE CARD (Stateless AI) */}
            <div className="bg-slate-900 border border-amber-500/30 rounded-2xl p-5 shadow-xl flex flex-col justify-between">
              <div>
                {/* Header */}
                <div className="flex items-start justify-between pb-3 border-b border-slate-800 mb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-slate-100">Stateless Baseline</h3>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-amber-500/10 text-amber-400 border border-amber-500/30">
                        BASELINE — NO MEMORY
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-0.5">Generic standard LLM output</p>
                  </div>

                  {baseline && (
                    <button
                      onClick={() => handleCopy(baseline.content, 'baseline')}
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors flex items-center gap-1 text-xs"
                      title="Copy Baseline Response"
                    >
                      {copiedBaseline ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span className="text-[10px]">{copiedBaseline ? 'Copied' : 'Copy'}</span>
                    </button>
                  )}
                </div>

                {/* Telemetry info */}
                {baseline && (
                  <div className="flex items-center gap-3 text-[11px] text-slate-500 mb-3 font-mono">
                    <span>Tokens: <strong className="text-slate-300">{baseline.tokenCount}</strong></span>
                    <span>•</span>
                    <span>Latency: <strong className="text-slate-300">{baseline.generationTimeMs}ms</strong></span>
                    <span>•</span>
                    <span>Model: <strong className="text-slate-300">Base Zero-Memory</strong></span>
                  </div>
                )}

                {/* Content */}
                {baseline ? (
                  <div className="prose prose-invert max-w-none text-xs text-slate-300 leading-relaxed font-sans whitespace-pre-line p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
                    {baseline.content}
                  </div>
                ) : (
                  <div className="p-8 text-center text-xs text-slate-500">
                    Click "Generate Stateless Baseline" to evaluate standard AI performance.
                  </div>
                )}

                {/* Potential Known Risks Warning Section */}
                {baseline && baseline.risks && baseline.risks.length > 0 && (
                  <div className="mt-4 p-3.5 rounded-xl bg-amber-950/20 border border-amber-500/30">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="w-4 h-4 text-amber-400" />
                      <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                        Potential Known Deal Risks (Identified by Memory Bank)
                      </h4>
                    </div>
                    <ul className="space-y-1.5 text-[11px] text-slate-300">
                      {baseline.risks.map((risk, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-amber-400 font-bold">•</span>
                          <span>{risk}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* ADAPTIVE CARD (Hindsight Memory Applied) */}
            <div className="bg-slate-900 border border-emerald-500/40 rounded-2xl p-5 shadow-2xl shadow-emerald-950/20 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

              <div>
                {/* Header */}
                <div className="flex items-start justify-between pb-3 border-b border-slate-800 mb-3 relative z-10">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-slate-100 flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4 text-emerald-400" />
                        <span>Adaptive Response</span>
                      </h3>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                        HINDSIGHT MEMORY APPLIED
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-0.5">Augmented with past won/lost intelligence</p>
                  </div>

                  {adaptive && (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleCopy(adaptive.content, 'adaptive')}
                        className="p-1.5 rounded-lg bg-emerald-950/60 border border-emerald-500/30 hover:bg-emerald-900/60 text-emerald-300 transition-colors flex items-center gap-1 text-xs"
                        title="Copy Adaptive Response"
                      >
                        {copiedAdaptive ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
                        <span className="text-[10px]">{copiedAdaptive ? 'Copied' : 'Copy'}</span>
                      </button>
                    </div>
                  )}
                </div>

                {/* Telemetry info */}
                {adaptive && (
                  <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-400 mb-3 font-mono">
                    <span>Tokens: <strong className="text-emerald-400">{adaptive.tokenCount}</strong></span>
                    <span>•</span>
                    <span>Latency: <strong className="text-slate-300">{adaptive.generationTimeMs}ms</strong></span>
                    <span>•</span>
                    <span>Confidence: <strong className="text-emerald-400">{adaptive.confidenceScore}%</strong></span>
                    <span>•</span>
                    <span>Model: <strong className="text-indigo-300">Llama 3.3 70B (Cognitive)</strong></span>
                  </div>
                )}

                {/* Content with optional diff highlight styling */}
                {adaptive ? (
                  <div className={`prose prose-invert max-w-none text-xs text-slate-200 leading-relaxed font-sans whitespace-pre-line p-3.5 rounded-xl bg-slate-950/90 border ${
                    highlightDiff ? 'border-emerald-500/40 shadow-inner' : 'border-slate-800'
                  }`}>
                    {adaptive.content}
                  </div>
                ) : (
                  <div className="p-8 text-center text-xs text-slate-500">
                    Click "Generate with Hindsight" to synthesize memory-backed proposal.
                  </div>
                )}

                {/* Highlighted Improvements Summary */}
                {adaptive && adaptive.diffHighlights && adaptive.diffHighlights.length > 0 && (
                  <div className="mt-4 p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/30">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="w-4 h-4 text-emerald-400" />
                      <h4 className="text-xs font-bold text-emerald-300 uppercase tracking-wider">
                        Active Strategic Advancements over Baseline
                      </h4>
                    </div>
                    <ul className="space-y-1.5 text-[11px] text-slate-200">
                      {adaptive.diffHighlights.map((diff, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-emerald-400 font-bold">✓</span>
                          <span>{diff}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

          </div>

          {/* Recalled Experiences Panel */}
          {recalledMemories.length > 0 && (
            <div className="pt-2">
              <MemoryRecallPanel memories={recalledMemories} />
            </div>
          )}

        </div>
      )}

    </div>
  );
};
