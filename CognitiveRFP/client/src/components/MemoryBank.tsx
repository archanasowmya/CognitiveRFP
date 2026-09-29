import React, { useState, useEffect } from 'react';
import { 
  Database, 
  PlusCircle, 
  Search, 
  Filter, 
  Tag as TagIcon, 
  Building2, 
  Sparkles, 
  Trash2, 
  RefreshCw, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle,
  Zap,
  Layers,
  ChevronDown,
  ChevronUp,
  Brain,
  Sliders,
  DollarSign
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Memory, ExperienceType, Industry, Guardrail } from '../types';
import { 
  fetchMemories, 
  retainMemory, 
  seedMemory, 
  deleteMemory, 
  resetMemories, 
  synthesizeStrategy, 
  fetchGuardrails, 
  toggleGuardrail 
} from '../api';

interface MemoryBankProps {
  onNotify: (type: 'success' | 'error' | 'info', title: string, message?: string) => void;
}

const EXPERIENCE_TYPES: ExperienceType[] = [
  'Won Bid',
  'Lost Bid',
  'Prospect Objection',
  'Pricing Redline',
  'Security Redline',
  'Compliance Feedback',
  'Evaluator Feedback',
  'Client Preference'
];

const INDUSTRIES: Industry[] = [
  'FinTech & Investment Banking',
  'Healthcare & Life Sciences',
  'Enterprise SaaS & Cloud Infrastructure',
  'Manufacturing',
  'Government & Public Sector',
  'Retail & E-commerce'
];

const AVAILABLE_TAGS = [
  'pricing-objection',
  'compliance-redline',
  'sla-rejection',
  'security-audit',
  'procurement',
  'implementation',
  'support',
  'pricing',
  'legal'
];

export const MemoryBank: React.FC<MemoryBankProps> = ({ onNotify }) => {
  // Memories & Guardrails list
  const [memories, setMemories] = useState<Memory[]>([]);
  const [guardrails, setGuardrails] = useState<Guardrail[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedIndustry, setSelectedIndustry] = useState<string>('All');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [selectedTag, setSelectedTag] = useState<string>('All');

  // Retain Experience Form State
  const [formType, setFormType] = useState<ExperienceType>('Lost Bid');
  const [formIndustry, setFormIndustry] = useState<Industry>('FinTech & Investment Banking');
  const [formClient, setFormClient] = useState<string>('');
  const [formOpportunitySize, setFormOpportunitySize] = useState<string>('');
  const [formTitle, setFormTitle] = useState<string>('');
  const [formTags, setFormTags] = useState<string[]>(['sla-rejection', 'procurement']);
  const [formExperience, setFormExperience] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Synthesis State
  const [isSynthesizing, setIsSynthesizing] = useState<boolean>(false);
  const [synthesizedInsights, setSynthesizedInsights] = useState<any[] | null>(null);

  // Load Memories and Guardrails
  const loadData = async () => {
    setIsLoading(true);
    try {
      const [mems, guards] = await Promise.all([
        fetchMemories({
          query: searchQuery,
          industry: selectedIndustry,
          type: selectedType,
          tag: selectedTag
        }),
        fetchGuardrails()
      ]);
      setMemories(mems);
      setGuardrails(guards);
    } catch (err: any) {
      onNotify('error', 'Error loading memory bank', err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [searchQuery, selectedIndustry, selectedType, selectedTag]);

  // Tag toggle helper
  const handleTagToggle = (tag: string) => {
    if (formTags.includes(tag)) {
      setFormTags(formTags.filter(t => t !== tag));
    } else {
      setFormTags([...formTags, tag]);
    }
  };

  // Submit New Experience Handler
  const handleRetainSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formExperience.trim()) {
      onNotify('error', 'Experience description is required');
      return;
    }

    setIsSubmitting(true);
    try {
      const created = await retainMemory({
        title: formTitle.trim() || `${formType} — ${formClient || formIndustry}`,
        experienceType: formType,
        industry: formIndustry,
        client: formClient.trim() || 'Confidential Client',
        opportunitySize: formOpportunitySize.trim() || '$2.0M',
        tags: formTags,
        experience: formExperience
      });

      onNotify('success', 'Experience Retained Successfully', `Added to organizational memory with ${formTags.length} tags.`);
      setFormExperience('');
      setFormClient('');
      setFormTitle('');
      setFormOpportunitySize('');
      loadData();
    } catch (err: any) {
      onNotify('error', 'Failed to retain experience', err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Quick Seeds Handler
  const handleSeed = async (seedType: 'fintech' | 'healthcare' | 'saas' | 'support') => {
    try {
      await seedMemory(seedType);
      onNotify('success', 'Experience Retained Successfully', `Quick learning trigger [${seedType.toUpperCase()}] injected.`);
      loadData();
    } catch (err: any) {
      onNotify('error', 'Failed to seed experience', err.message);
    }
  };

  // Reset to Defaults
  const handleReset = async () => {
    if (window.confirm('Reset Memory Bank to default enterprise experiences?')) {
      try {
        await resetMemories();
        onNotify('info', 'Memory Bank Reset', 'Restored 10 verified multi-industry proposal memories.');
        loadData();
      } catch (err: any) {
        onNotify('error', 'Reset failed', err.message);
      }
    }
  };

  // Delete Memory
  const handleDelete = async (id: string, title: string) => {
    try {
      await deleteMemory(id);
      onNotify('info', 'Experience Removed', `Memory "${title}" was deleted.`);
      loadData();
    } catch (err: any) {
      onNotify('error', 'Failed to delete', err.message);
    }
  };

  // Synthesize Strategy Handler
  const handleSynthesize = async () => {
    setIsSynthesizing(true);
    try {
      const res = await synthesizeStrategy(selectedIndustry === 'All' ? undefined : selectedIndustry);
      setSynthesizedInsights(res.insights);
      
      // Fire celebration confetti
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });

      onNotify('success', 'Strategy Synthesized Successfully', `Extracted ${res.insights.length} learned guardrails from ${res.totalAnalyzed} historical proposal outcomes.`);
      const guards = await fetchGuardrails();
      setGuardrails(guards);
    } catch (err: any) {
      onNotify('error', 'Synthesis failed', err.message);
    } finally {
      setIsSynthesizing(false);
    }
  };

  // Toggle Guardrail Handler
  const handleToggleGuardrail = async (id: string) => {
    try {
      const updated = await toggleGuardrail(id);
      setGuardrails(updated);
      onNotify('info', 'Guardrail Updated', 'Rules will reflect in future proposal generations.');
    } catch (err: any) {
      onNotify('error', 'Failed to update guardrail', err.message);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-2">
              <Database className="w-3.5 h-3.5" />
              <span>Hindsight Memory Bank</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-100 tracking-tight">
              Your organization's proposal experience becomes reusable intelligence.
            </h1>
            <p className="text-sm text-slate-400 mt-1 max-w-3xl leading-relaxed">
              Every won deal, lost RFP, prospect objection, and legal redline is stored in persistent cognitive memory to prevent recurring errors and enforce winning proposal patterns.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleSynthesize}
              disabled={isSynthesizing}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-indigo-600 hover:from-emerald-400 hover:to-indigo-500 text-white font-semibold text-xs shadow-lg shadow-emerald-500/20 transition-all disabled:opacity-50"
            >
              <Sparkles className="w-4 h-4 text-emerald-200" />
              <span>{isSynthesizing ? 'Synthesizing...' : 'Synthesize Strategy'}</span>
            </button>

            <button
              onClick={handleReset}
              className="p-2.5 text-slate-400 hover:text-slate-200 bg-slate-800/80 hover:bg-slate-800 rounded-xl transition-colors border border-slate-700/60"
              title="Reset Default Memories"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Quick Learning Triggers (Seeds) */}
        <div className="mt-5 pt-4 border-t border-slate-800/80">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-emerald-400" />
              <span>Quick Learning Triggers (Instant Seeds)</span>
            </span>
            <span className="text-[11px] text-slate-500">Inject realistic past experiences with 1 click</span>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleSeed('fintech')}
              className="px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-xs text-slate-300 hover:text-emerald-400 transition-colors flex items-center gap-1.5"
            >
              <span className="w-2 h-2 rounded-full bg-red-400" />
              <span>Seed Lost FinTech Bid (SLA Rejection)</span>
            </button>

            <button
              onClick={() => handleSeed('healthcare')}
              className="px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-xs text-slate-300 hover:text-indigo-400 transition-colors flex items-center gap-1.5"
            >
              <span className="w-2 h-2 rounded-full bg-indigo-400" />
              <span>Seed Lost Healthcare Bid (BAA / HIPAA)</span>
            </button>

            <button
              onClick={() => handleSeed('saas')}
              className="px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-xs text-slate-300 hover:text-amber-400 transition-colors flex items-center gap-1.5"
            >
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span>Seed SaaS Pricing Redline (Volume Tiers)</span>
            </button>

            <button
              onClick={() => handleSeed('support')}
              className="px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-xs text-slate-300 hover:text-cyan-400 transition-colors flex items-center gap-1.5"
            >
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              <span>Seed Evaluator Feedback (P1 TAM SLA)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Two Column Layout: Retain Experience Form & Synthesized Guardrails */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* RETAIN EXPERIENCE FORM (5 Cols) */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-800 mb-4">
            <PlusCircle className="w-4 h-4 text-emerald-400" />
            <h2 className="text-sm font-bold text-slate-100 uppercase tracking-wider">
              Retain Experience
            </h2>
          </div>

          <form onSubmit={handleRetainSubmit} className="space-y-4 text-xs">
            {/* Experience Type Dropdown */}
            <div>
              <label className="block font-semibold text-slate-300 mb-1">
                Experience Type *
              </label>
              <select
                value={formType}
                onChange={(e) => setFormType(e.target.value as ExperienceType)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-emerald-500"
              >
                {EXPERIENCE_TYPES.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            {/* Industry Dropdown */}
            <div>
              <label className="block font-semibold text-slate-300 mb-1">
                Industry Vertical *
              </label>
              <select
                value={formIndustry}
                onChange={(e) => setFormIndustry(e.target.value as Industry)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-emerald-500"
              >
                {INDUSTRIES.map((ind) => (
                  <option key={ind} value={ind}>{ind}</option>
                ))}
              </select>
            </div>

            {/* Client & Opportunity Size */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">
                  Client / Account (Optional)
                </label>
                <input
                  type="text"
                  value={formClient}
                  onChange={(e) => setFormClient(e.target.value)}
                  placeholder="e.g. JPMorgan Chase"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">
                  Deal Size (Optional)
                </label>
                <input
                  type="text"
                  value={formOpportunitySize}
                  onChange={(e) => setFormOpportunitySize(e.target.value)}
                  placeholder="e.g. $3.5M"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            {/* Title / Summary */}
            <div>
              <label className="block font-semibold text-slate-300 mb-1">
                Descriptive Title
              </label>
              <input
                type="text"
                value={formTitle}
                onChange={(e) => setFormTitle(e.target.value)}
                placeholder="e.g. Lost FinTech Deal — Rejected standard 99.9% uptime"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-emerald-500"
              />
            </div>

            {/* Tags Multi-Select */}
            <div>
              <label className="block font-semibold text-slate-300 mb-1.5 flex items-center justify-between">
                <span>Tags & Classifications</span>
                <span className="text-[11px] text-slate-500">{formTags.length} selected</span>
              </label>
              <div className="flex flex-wrap gap-1.5">
                {AVAILABLE_TAGS.map((tag) => {
                  const isSelected = formTags.includes(tag);
                  return (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => handleTagToggle(tag)}
                      className={`px-2 py-1 rounded-md text-[11px] font-mono transition-colors border ${
                        isSelected
                          ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      #{tag}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Large Experience Textarea */}
            <div>
              <label className="block font-semibold text-slate-300 mb-1">
                Experience Narrative & Outcome Details *
              </label>
              <textarea
                rows={4}
                value={formExperience}
                onChange={(e) => setFormExperience(e.target.value)}
                placeholder="Describe what happened, what the prospect objected to, what worked, what failed, and what should be done differently next time."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-emerald-500 leading-relaxed resize-y"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs shadow-md shadow-emerald-600/30 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <PlusCircle className="w-4 h-4" />
              <span>{isSubmitting ? 'Retaining...' : 'Retain Experience'}</span>
            </button>
          </form>
        </div>

        {/* STRATEGY SYNTHESIS & GUARDRAILS (7 Cols) */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <h2 className="text-sm font-bold text-slate-100 uppercase tracking-wider">
                  Active Learned Guardrails
                </h2>
              </div>
              <span className="text-[11px] text-slate-400">
                {guardrails.filter(g => g.isActive).length} of {guardrails.length} Active
              </span>
            </div>

            {/* Guardrail Rules List */}
            <div className="space-y-3 max-h-[480px] overflow-y-auto pr-1">
              {guardrails.map((g) => (
                <div
                  key={g.id}
                  className={`p-3.5 rounded-xl border transition-all ${
                    g.isActive
                      ? 'bg-slate-850/80 border-slate-700/80'
                      : 'bg-slate-950/40 border-slate-800/60 opacity-60'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-1.5">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 mr-2">
                        {g.category}
                      </span>
                      <span className="text-xs font-bold text-slate-200">
                        {g.title}
                      </span>
                    </div>

                    {/* Toggle Switch */}
                    <button
                      type="button"
                      onClick={() => handleToggleGuardrail(g.id)}
                      className={`relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                        g.isActive ? 'bg-emerald-500' : 'bg-slate-700'
                      }`}
                      title={g.isActive ? 'Active Guardrail' : 'Disabled'}
                    >
                      <span
                        className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                          g.isActive ? 'translate-x-4' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed mt-1">
                    “{g.rule}”
                  </p>

                  <div className="flex items-center justify-between text-[11px] text-slate-500 mt-2 pt-2 border-t border-slate-800">
                    <span>Industry: <strong className="text-slate-400">{g.industry}</strong></span>
                    <span>Created: {g.createdAt}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Synthesis CTA Footer */}
          <div className="pt-4 border-t border-slate-800/80 mt-4 flex items-center justify-between">
            <span className="text-[11px] text-slate-400">
              Need fresh insights? Run reflective synthesis across all retained memories.
            </span>
            <button
              onClick={handleSynthesize}
              disabled={isSynthesizing}
              className="px-3.5 py-1.5 rounded-lg bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-900/40 text-xs font-semibold transition-colors flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>Synthesize Strategy</span>
            </button>
          </div>
        </div>

      </div>

      {/* MEMORY EXPLORER & SEARCHABLE DATABASE */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Search className="w-4 h-4 text-emerald-400" />
            <h2 className="text-sm font-bold text-slate-100 uppercase tracking-wider">
              Memory Explorer ({memories.length})
            </h2>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-80">
            <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search organizational memory..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="text-slate-500 flex items-center gap-1 text-[11px]">
            <Filter className="w-3 h-3" /> Filters:
          </span>

          {/* Industry Filter */}
          <select
            value={selectedIndustry}
            onChange={(e) => setSelectedIndustry(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-slate-300 text-[11px]"
          >
            <option value="All">All Industries</option>
            {INDUSTRIES.map(i => <option key={i} value={i}>{i}</option>)}
          </select>

          {/* Type Filter */}
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-slate-300 text-[11px]"
          >
            <option value="All">All Experience Types</option>
            {EXPERIENCE_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
          </select>

          {/* Tag Filter */}
          <select
            value={selectedTag}
            onChange={(e) => setSelectedTag(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-slate-300 text-[11px]"
          >
            <option value="All">All Tags</option>
            {AVAILABLE_TAGS.map(t => <option key={t} value={t}>#{t}</option>)}
          </select>
        </div>

        {/* Memories Grid */}
        {isLoading ? (
          <div className="py-12 text-center text-xs text-slate-500">
            Loading organizational memories...
          </div>
        ) : memories.length === 0 ? (
          <div className="py-12 text-center text-xs text-slate-500">
            No memories matching filter criteria.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {memories.map((mem) => (
              <div
                key={mem.id}
                className="bg-slate-850/70 border border-slate-800 rounded-xl p-4 flex flex-col justify-between hover:border-slate-700 transition-colors"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                      {mem.experienceType}
                    </span>
                    <button
                      onClick={() => handleDelete(mem.id, mem.title)}
                      className="text-slate-500 hover:text-red-400 p-1 transition-colors"
                      title="Delete Memory"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <h4 className="text-xs font-bold text-slate-100 mb-1">
                    {mem.title}
                  </h4>

                  <div className="flex items-center gap-2 text-[11px] text-slate-400 mb-2">
                    <span>{mem.client}</span>
                    <span>•</span>
                    <span className="font-mono text-emerald-400">{mem.opportunitySize || '$2M'}</span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed line-clamp-3 mb-2">
                    "{mem.experience}"
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-500">
                  <div className="flex flex-wrap gap-1">
                    {(mem.tags || []).slice(0, 2).map((t) => (
                      <span key={t} className="text-[9px] font-mono px-1 py-0.5 rounded bg-slate-900 text-slate-400">
                        #{t}
                      </span>
                    ))}
                  </div>
                  <span>{mem.date}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};
