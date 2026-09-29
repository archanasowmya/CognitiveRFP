import React, { useState } from 'react';
import { X, Settings, Cpu, Key, Sliders, Shield, Check } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (settings: any) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose, onSave }) => {
  const [model, setModel] = useState<string>('Groq Llama 3.3 70B');
  const [groqKey, setGroqKey] = useState<string>('');
  const [geminiKey, setGeminiKey] = useState<string>('');
  const [recallThreshold, setRecallThreshold] = useState<number>(75);
  const [maxMemories, setMaxMemories] = useState<number>(3);
  const [temperature, setTemperature] = useState<number>(0.2);

  if (!isOpen) return null;

  const handleSave = () => {
    onSave({
      model,
      groqKey,
      geminiKey,
      recallThreshold,
      maxMemories,
      temperature
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full flex flex-col shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
              <Settings className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-100">Cognitive Engine Configuration</h2>
              <p className="text-xs text-slate-400">LLM Inference & Retrieval Thresholds</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-5 space-y-4 text-xs">
          
          {/* Model Selection */}
          <div>
            <label className="block font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-emerald-400" />
              <span>Primary LLM Inference Engine</span>
            </label>
            <select
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-emerald-500"
            >
              <option value="Groq Llama 3.3 70B">Groq Llama 3.3 70B (High-Speed LPU - Recommended)</option>
              <option value="Google Gemini 2.0 Flash">Google Gemini 2.0 Flash / Pro</option>
              <option value="Anthropic Claude 3.5 Sonnet">Anthropic Claude 3.5 Sonnet</option>
              <option value="Local Cognitive Engine">Built-in Deterministic Cognitive Engine</option>
            </select>
          </div>

          {/* API Keys */}
          <div className="space-y-2">
            <div>
              <label className="block font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
                <Key className="w-3.5 h-3.5 text-slate-500" />
                <span>Groq API Key (Optional)</span>
              </label>
              <input
                type="password"
                value={groqKey}
                onChange={(e) => setGroqKey(e.target.value)}
                placeholder="gsk_..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-emerald-500 font-mono text-[11px]"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
                <Key className="w-3.5 h-3.5 text-slate-500" />
                <span>Gemini API Key (Optional)</span>
              </label>
              <input
                type="password"
                value={geminiKey}
                onChange={(e) => setGeminiKey(e.target.value)}
                placeholder="AIzaSy..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-emerald-500 font-mono text-[11px]"
              />
            </div>
            <p className="text-[10px] text-slate-500 italic">
              Keys remain stored locally in memory and never leave your environment.
            </p>
          </div>

          {/* Sliders */}
          <div className="space-y-3 pt-2 border-t border-slate-800">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold text-slate-300">Memory Relevance Threshold</span>
                <span className="font-mono text-emerald-400 font-bold">{recallThreshold}%</span>
              </div>
              <input
                type="range"
                min="50"
                max="95"
                step="5"
                value={recallThreshold}
                onChange={(e) => setRecallThreshold(Number(e.target.value))}
                className="w-full accent-emerald-500 bg-slate-800"
              />
              <span className="text-[10px] text-slate-500">Only memories scoring above this threshold are injected into prompt context.</span>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold text-slate-300">Max Memories Injected</span>
                <span className="font-mono text-emerald-400 font-bold">{maxMemories}</span>
              </div>
              <input
                type="range"
                min="1"
                max="6"
                value={maxMemories}
                onChange={(e) => setMaxMemories(Number(e.target.value))}
                className="w-full accent-emerald-500 bg-slate-800"
              />
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/60 flex items-center justify-end gap-2 text-xs">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-slate-400 hover:text-slate-200 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition-colors flex items-center gap-1.5"
          >
            <Check className="w-3.5 h-3.5" />
            <span>Apply Settings</span>
          </button>
        </div>

      </div>
    </div>
  );
};
