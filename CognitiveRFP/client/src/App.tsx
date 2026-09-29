import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { ResponseStudio } from './components/ResponseStudio';
import { MemoryBank } from './components/MemoryBank';
import { AnalyticsDashboard } from './components/AnalyticsDashboard';
import { ArchitecturePage } from './components/ArchitecturePage';
import { DocsModal } from './components/DocsModal';
import { SettingsModal } from './components/SettingsModal';
import { ToastContainer, ToastMessage } from './components/Toast';
import { BrainCircuit, Heart, ShieldCheck, Sparkles } from 'lucide-react';

export function App() {
  const [activeTab, setActiveTab] = useState<'studio' | 'memory' | 'analytics' | 'architecture'>('studio');
  const [isDocsOpen, setIsDocsOpen] = useState<boolean>(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [isLiveMode, setIsLiveMode] = useState<boolean>(true);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Toast notification dispatcher
  const notify = (type: 'success' | 'error' | 'info', title: string, message?: string) => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    const newToast: ToastMessage = { id, type, title, message };
    setToasts((prev) => [...prev, newToast]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const handleDismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500/20 selection:text-emerald-300">
      
      {/* Persistent Global Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenDocs={() => setIsDocsOpen(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
        isLiveMode={isLiveMode}
        setIsLiveMode={setIsLiveMode}
      />

      {/* Main App Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'studio' && (
          <ResponseStudio
            onNotify={notify}
            onNavigateToMemoryBank={() => setActiveTab('memory')}
          />
        )}

        {activeTab === 'memory' && (
          <MemoryBank onNotify={notify} />
        )}

        {activeTab === 'analytics' && (
          <AnalyticsDashboard />
        )}

        {activeTab === 'architecture' && (
          <ArchitecturePage />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/80 py-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-400">CognitiveRFP</span>
            <span>—</span>
            <span>Adaptive Proposal & RFP Intelligence Platform</span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <button 
              onClick={() => setIsDocsOpen(true)}
              className="hover:text-slate-300 transition-colors"
            >
              Documentation
            </button>
            <span>•</span>
            <button 
              onClick={() => setActiveTab('architecture')}
              className="hover:text-slate-300 transition-colors"
            >
              Pipeline Specs
            </button>
            <span>•</span>
            <button 
              onClick={() => setIsSettingsOpen(true)}
              className="hover:text-slate-300 transition-colors"
            >
              Engine Config
            </button>
            <span>•</span>
            <span className="text-emerald-400 font-mono">Hindsight v2.4 Active</span>
          </div>
        </div>
      </footer>

      {/* Modals & Toasts */}
      <DocsModal
        isOpen={isDocsOpen}
        onClose={() => setIsDocsOpen(false)}
      />

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        onSave={(settings) => {
          notify('success', 'Configuration Updated', `Inference engine set to ${settings.model}`);
        }}
      />

      <ToastContainer
        toasts={toasts}
        onDismiss={handleDismissToast}
      />

    </div>
  );
}

export default App;
