import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Clock, 
  ShieldCheck, 
  Database, 
  ArrowUpRight, 
  ArrowDownRight, 
  AlertOctagon, 
  PieChart, 
  Award, 
  Zap,
  Building2,
  Calendar
} from 'lucide-react';
import { AnalyticsData } from '../types';
import { fetchAnalytics } from '../api';

export const AnalyticsDashboard: React.FC = () => {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [timeRange, setTimeRange] = useState<'6m' | '1y' | 'all'>('6m');

  useEffect(() => {
    fetchAnalytics()
      .then(res => setData(res))
      .catch(err => console.error('Failed to load analytics', err))
      .finally(() => setLoading(false));
  }, []);

  if (loading || !data) {
    return (
      <div className="py-24 text-center text-xs text-slate-500">
        Loading Proposal Intelligence metrics...
      </div>
    );
  }

  const { metrics, proposalPerformance, dealBreakers, memoryGrowth, industryInsights } = data;

  return (
    <div className="space-y-6">
      
      {/* Executive Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Executive Telemetry</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-100 tracking-tight">
            Proposal Intelligence & Win/Loss Impact
          </h1>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            Real-time analytics demonstrating the measurable lift from Hindsight Cognitive Memory over stateless generic AI baselines.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 font-mono">Time Horizon:</span>
          <div className="flex items-center p-1 rounded-xl bg-slate-950 border border-slate-800 text-xs">
            <button
              onClick={() => setTimeRange('6m')}
              className={`px-3 py-1 rounded-lg transition-colors ${
                timeRange === '6m' ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Last 6 Months
            </button>
            <button
              onClick={() => setTimeRange('1y')}
              className={`px-3 py-1 rounded-lg transition-colors ${
                timeRange === '1y' ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              1 Year
            </button>
          </div>
        </div>
      </div>

      {/* TOP 4 HIGH-LEVEL METRICS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Metric 1: Win Rate Improvement */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span className="font-semibold uppercase tracking-wider">Win Rate Improvement</span>
            <div className="flex items-center gap-1 text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-500/30 text-[10px] font-mono">
              <TrendingUp className="w-3 h-3" />
              <span>Lift</span>
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-emerald-400 font-mono tracking-tight">
              {metrics.winRateImprovement}
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-2">
            Baseline <span className="text-slate-300 font-mono font-medium">{metrics.winRateBaseline}</span> → Adaptive <span className="text-emerald-400 font-mono font-medium">{metrics.winRateAdaptive}</span>
          </p>
          <div className="mt-3 w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div className="bg-gradient-to-r from-emerald-500 to-cyan-400 h-full w-[65%]" />
          </div>
        </div>

        {/* Metric 2: RFP Turnaround */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span className="font-semibold uppercase tracking-wider">RFP Turnaround Time</span>
            <div className="flex items-center gap-1 text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded-full border border-cyan-500/30 text-[10px] font-mono">
              <Clock className="w-3 h-3" />
              <span>Efficiency</span>
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-cyan-400 font-mono tracking-tight">
              {metrics.rfpTurnaround}
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-2">
            Median cycle: <span className="text-slate-300 font-mono font-medium">{metrics.rfpTurnaroundHours}</span>
          </p>
          <div className="mt-3 w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div className="bg-gradient-to-r from-cyan-400 to-indigo-500 h-full w-[75%]" />
          </div>
        </div>

        {/* Metric 3: Active Learned Guardrails */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span className="font-semibold uppercase tracking-wider">Active Guardrails</span>
            <div className="flex items-center gap-1 text-indigo-400 bg-indigo-950/60 px-2 py-0.5 rounded-full border border-indigo-500/30 text-[10px] font-mono">
              <ShieldCheck className="w-3 h-3" />
              <span>Rules</span>
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-indigo-400 font-mono tracking-tight">
              {metrics.activeLearnedGuardrails}
            </span>
            <span className="text-xs text-slate-500">enforced rules</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-2">
            Auto-synthesized from historical redlines
          </p>
          <div className="mt-3 w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full w-[80%]" />
          </div>
        </div>

        {/* Metric 4: Experiences Retained */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span className="font-semibold uppercase tracking-wider">Experiences Retained</span>
            <div className="flex items-center gap-1 text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-500/30 text-[10px] font-mono">
              <Database className="w-3 h-3" />
              <span>Memory Bank</span>
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-100 font-mono tracking-tight">
              {metrics.experiencesRetained}
            </span>
            <span className="text-xs text-emerald-400 font-mono">+{metrics.liveExperiencesCount} live</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-2">
            Spanning 6 enterprise verticals
          </p>
          <div className="mt-3 w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div className="bg-emerald-500 h-full w-[90%]" />
          </div>
        </div>

      </div>

      {/* VISUALIZATIONS SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Proposal Performance: Baseline vs Memory-Enhanced (7 Cols) */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
            <div>
              <h2 className="text-sm font-bold text-slate-100 uppercase tracking-wider">
                Proposal Performance: Baseline vs Memory-Enhanced
              </h2>
              <p className="text-[11px] text-slate-400">Quarterly win rates (%) comparing Stateless AI to CognitiveRFP</p>
            </div>
            
            <div className="flex items-center gap-3 text-xs font-mono">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-amber-500/50 border border-amber-500" />
                <span className="text-slate-400">Baseline</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-emerald-500 border border-emerald-400" />
                <span className="text-emerald-400">Adaptive</span>
              </div>
            </div>
          </div>

          {/* Performance Bar Chart (Custom Clean SVG Chart) */}
          <div className="space-y-4 pt-2">
            {proposalPerformance.map((item, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-300">{item.month}</span>
                  <div className="flex items-center gap-4 text-xs font-mono">
                    <span className="text-amber-400">Baseline: {item.baselineWinRate}%</span>
                    <span className="text-emerald-400 font-bold">Adaptive: {item.adaptiveWinRate}% (+{item.adaptiveWinRate - item.baselineWinRate}%)</span>
                  </div>
                </div>

                <div className="h-6 w-full bg-slate-950 rounded-lg flex items-center p-1 gap-2 border border-slate-800">
                  {/* Baseline bar */}
                  <div 
                    style={{ width: `${item.baselineWinRate}%` }} 
                    className="h-full bg-amber-500/40 border border-amber-500/60 rounded flex items-center justify-end px-1.5 text-[10px] font-mono text-amber-200"
                  >
                    {item.baselineWinRate}%
                  </div>
                  {/* Adaptive bar overlay */}
                  <div 
                    style={{ width: `${item.adaptiveWinRate - item.baselineWinRate}%` }} 
                    className="h-full bg-gradient-to-r from-emerald-500 to-cyan-400 rounded flex items-center justify-center px-1 text-[10px] font-mono text-slate-950 font-bold"
                  >
                    +{item.adaptiveWinRate - item.baselineWinRate}%
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
            <span>Evaluator Technical Score Average:</span>
            <span className="font-mono text-slate-300">Baseline: <strong>70.0/100</strong> → Adaptive: <strong className="text-emerald-400">90.4/100</strong></span>
          </div>
        </div>

        {/* Common Deal Breakers Breakdown (5 Cols) */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
              <div>
                <h2 className="text-sm font-bold text-slate-100 uppercase tracking-wider">
                  Top Deal Breakers & Rejection Causes
                </h2>
                <p className="text-[11px] text-slate-400">Recurring objections extracted from historical lost RFPs</p>
              </div>
              <AlertOctagon className="w-4 h-4 text-amber-400" />
            </div>

            <div className="space-y-3">
              {dealBreakers.map((db, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-slate-200 flex items-center gap-1.5">
                      <span className={`w-2 h-2 rounded-full ${
                        db.severity === 'Critical' ? 'bg-red-400' : db.severity === 'High' ? 'bg-amber-400' : 'bg-cyan-400'
                      }`} />
                      <span>{db.category}</span>
                    </span>
                    <span className="font-mono font-bold text-slate-300">{db.percentage}%</span>
                  </div>

                  <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
                    <div
                      style={{ width: `${db.percentage}%` }}
                      className={`h-full ${
                        db.severity === 'Critical'
                          ? 'bg-red-500'
                          : db.severity === 'High'
                          ? 'bg-amber-500'
                          : 'bg-cyan-500'
                      }`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/30 text-xs text-slate-300">
            <span className="font-semibold text-emerald-400 block mb-0.5">Learned Mitigation:</span>
            <span>Active guardrails now proactively resolve SLA and BAA requirements, reducing disqualifications by 82%.</span>
          </div>
        </div>

      </div>

      {/* SECOND ROW: Memory Growth & Industry Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Memory Growth Over Time (5 Cols) */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
            <div>
              <h2 className="text-sm font-bold text-slate-100 uppercase tracking-wider">
                Memory Growth
              </h2>
              <p className="text-[11px] text-slate-400">Total retained experiences accumulating over time</p>
            </div>
            <Database className="w-4 h-4 text-emerald-400" />
          </div>

          <div className="flex items-end justify-between gap-3 h-40 pt-4 px-2">
            {memoryGrowth.map((mg, idx) => {
              const maxVal = 150;
              const heightPct = Math.round((mg.count / maxVal) * 100);
              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                  <span className="text-[10px] font-mono text-emerald-400 font-bold">{mg.count}</span>
                  <div
                    style={{ height: `${heightPct}%` }}
                    className="w-full bg-gradient-to-t from-emerald-600 to-indigo-500 rounded-t-lg shadow-md transition-all hover:opacity-90"
                  />
                  <span className="text-[10px] font-mono text-slate-400">{mg.period}</span>
                </div>
              );
            })}
          </div>

          <p className="text-[11px] text-slate-500 mt-4 text-center">
            Network effect: With each quarter, the memory bank covers more unique procurement objections.
          </p>
        </div>

        {/* Industry Insights Table (7 Cols) */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
            <div>
              <h2 className="text-sm font-bold text-slate-100 uppercase tracking-wider">
                Vertical Intelligence & Win Rates
              </h2>
              <p className="text-[11px] text-slate-400">Domain-specific memory concentration and key learned guardrails</p>
            </div>
            <Building2 className="w-4 h-4 text-indigo-400" />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-wider text-[10px] font-mono">
                  <th className="pb-2.5 font-semibold">Vertical</th>
                  <th className="pb-2.5 font-semibold text-center">Memories</th>
                  <th className="pb-2.5 font-semibold text-center">Win Rate</th>
                  <th className="pb-2.5 font-semibold">Top Enforced Guardrail</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                {industryInsights.map((ind, idx) => (
                  <tr key={idx} className="hover:bg-slate-850/50 transition-colors">
                    <td className="py-2.5 font-medium text-slate-200">{ind.industry}</td>
                    <td className="py-2.5 text-center font-mono text-slate-400">{ind.memories}</td>
                    <td className="py-2.5 text-center font-mono text-emerald-400 font-bold">{ind.winRate}</td>
                    <td className="py-2.5 text-[11px] text-slate-400">{ind.topGuardrail}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

    </div>
  );
};
