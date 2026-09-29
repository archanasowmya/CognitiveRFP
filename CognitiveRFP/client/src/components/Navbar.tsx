import React, { useState } from 'react';
import { 
  Sparkles, 
  BrainCircuit, 
  Database, 
  BarChart3, 
  Network, 
  BookOpen, 
  Settings, 
  ChevronDown
} from 'lucide-react';

interface NavbarProps {
  activeTab: 'studio' | 'memory' | 'analytics' | 'architecture';
  setActiveTab: (tab: 'studio' | 'memory' | 'analytics' | 'architecture') => void;
  onOpenDocs: () => void;
  onOpenSettings: () => void;
  isLiveMode: boolean;
  setIsLiveMode: (live: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenDocs,
  onOpenSettings,
  isLiveMode,
  setIsLiveMode
}) => {
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-950/85 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Left: Brand & Connection Status */}
        <div className="flex items-center gap-4">
          <div 
            onClick={() => setActiveTab('studio')}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-400 via-emerald-600 to-indigo-600 p-[1px] shadow-lg shadow-emerald-500/20 group-hover:shadow-emerald-500/30 transition-all">
              <div className="w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center">
                <BrainCircuit className="w-5 h-5 text-emerald-400 group-hover:scale-105 transition-transform" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-lg text-slate-100 tracking-tight font-sans">
                  Cognitive<span className="text-emerald-400">RFP</span>
                </span>
                <span className="text-[10px] font-semibold tracking-wider uppercase px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  v2.4
                </span>
              </div>
            </div>
          </div>

          {/* Hindsight Connected Indicator */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 text-xs font-medium">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="tracking-wide">Hindsight Connected</span>
          </div>
        </div>

        {/* Center: Global Navigation Tabs */}
        <nav className="flex items-center space-x-1">
          <button
            onClick={() => setActiveTab('studio')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'studio'
                ? 'bg-slate-800/90 text-emerald-400 shadow-sm border border-slate-700'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Response Studio</span>
          </button>

          <button
            onClick={() => setActiveTab('memory')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'memory'
                ? 'bg-slate-800/90 text-emerald-400 shadow-sm border border-slate-700'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
            }`}
          >
            <Database className="w-4 h-4" />
            <span>Memory Bank</span>
          </button>

          <button
            onClick={() => setActiveTab('analytics')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'analytics'
                ? 'bg-slate-800/90 text-emerald-400 shadow-sm border border-slate-700'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Analytics</span>
          </button>

          <button
            onClick={() => setActiveTab('architecture')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'architecture'
                ? 'bg-slate-800/90 text-emerald-400 shadow-sm border border-slate-700'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
            }`}
          >
            <Network className="w-4 h-4" />
            <span>Architecture</span>
          </button>
        </nav>

        {/* Right: Environment, Docs, Settings, Profile */}
        <div className="flex items-center gap-3">
          {/* Live / Sandbox Badge */}
          <button
            onClick={() => setIsLiveMode(!isLiveMode)}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold border transition-all ${
              isLiveMode 
                ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-400 hover:bg-emerald-900/30'
                : 'bg-amber-950/40 border-amber-500/40 text-amber-300 hover:bg-amber-900/30'
            }`}
            title="Click to toggle between Enterprise Sandbox and Live Production Agent mode"
          >
            <span className={`w-1.5 h-1.5 rounded-full ${isLiveMode ? 'bg-emerald-400' : 'bg-amber-400'}`} />
            <span>{isLiveMode ? 'Live Model' : 'Sandbox (Demo)'}</span>
          </button>

          {/* Docs */}
          <button
            onClick={onOpenDocs}
            className="p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-900 rounded-lg transition-colors border border-transparent hover:border-slate-800"
            title="Documentation"
          >
            <BookOpen className="w-4 h-4" />
          </button>

          {/* Settings */}
          <button
            onClick={onOpenSettings}
            className="p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-900 rounded-lg transition-colors border border-transparent hover:border-slate-800"
            title="Engine Settings & Model Parameters"
          >
            <Settings className="w-4 h-4" />
          </button>

          {/* GitHub / Repo */}
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="hidden sm:block p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-900 rounded-lg transition-colors border border-transparent hover:border-slate-800"
            title="GitHub Repository"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
          </a>

          {/* User Profile */}
          <div className="relative">
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="flex items-center gap-2 pl-2 pr-1.5 py-1 rounded-full bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all text-xs"
            >
              <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-indigo-500 to-emerald-500 flex items-center justify-center font-bold text-white text-[10px]">
                MS
              </div>
              <span className="hidden md:inline font-medium text-slate-300">Presales Core</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
            </button>

            {userMenuOpen && (
              <div className="absolute right-0 mt-2 w-56 rounded-xl bg-slate-900 border border-slate-800 shadow-2xl py-2 z-50 text-xs">
                <div className="px-3 py-2 border-b border-slate-800">
                  <p className="font-semibold text-slate-200">Presales Operations</p>
                  <p className="text-slate-500 text-[11px]">Morgan Stanley Enterprise Team</p>
                </div>
                <div className="py-1">
                  <div className="px-3 py-1.5 flex items-center justify-between text-slate-400">
                    <span>Active Workspace</span>
                    <span className="text-emerald-400 font-medium">Enterprise Tier</span>
                  </div>
                  <div className="px-3 py-1.5 flex items-center justify-between text-slate-400">
                    <span>Hindsight Engine</span>
                    <span className="text-slate-200">v2.4 Active</span>
                  </div>
                </div>
                <div className="border-t border-slate-800 pt-1">
                  <button 
                    onClick={() => { onOpenSettings(); setUserMenuOpen(false); }}
                    className="w-full text-left px-3 py-1.5 text-slate-300 hover:bg-slate-800 transition-colors"
                  >
                    API Keys & Configuration
                  </button>
                  <button 
                    onClick={() => { onOpenDocs(); setUserMenuOpen(false); }}
                    className="w-full text-left px-3 py-1.5 text-slate-300 hover:bg-slate-800 transition-colors"
                  >
                    Memory Architecture Docs
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>

      </div>
    </header>
  );
};
