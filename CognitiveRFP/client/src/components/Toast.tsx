import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  title: string;
  message?: string;
}

interface ToastContainerProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onDismiss }) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col space-y-3 max-w-md w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl border shadow-xl backdrop-blur-md transition-all duration-300 transform translate-y-0 ${
            toast.type === 'success'
              ? 'bg-slate-900/95 border-emerald-500/40 text-emerald-300 shadow-emerald-950/40'
              : toast.type === 'error'
              ? 'bg-slate-900/95 border-red-500/40 text-red-300 shadow-red-950/40'
              : 'bg-slate-900/95 border-cyan-500/40 text-cyan-300 shadow-cyan-950/40'
          }`}
        >
          <div className="mt-0.5 flex-shrink-0">
            {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
            {toast.type === 'error' && <AlertCircle className="w-5 h-5 text-red-400" />}
            {toast.type === 'info' && <Info className="w-5 h-5 text-cyan-400" />}
          </div>
          <div className="flex-1 text-sm">
            <h4 className="font-semibold text-slate-100">{toast.title}</h4>
            {toast.message && <p className="text-slate-400 mt-0.5 text-xs">{toast.message}</p>}
          </div>
          <button
            onClick={() => onDismiss(toast.id)}
            className="text-slate-500 hover:text-slate-300 transition-colors p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};
