'use client';

import React from 'react';

interface TechnicalCardProps {
  onClose: () => void;
}

export default function TechnicalCard({ onClose }: TechnicalCardProps) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="glass-panel max-w-2xl w-full rounded-3xl p-8 shadow-2xl animate-in zoom-in-95 duration-300">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-500 rounded-lg">
              <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-black tracking-tight">Technical Model Card</h3>
              <p className="text-[10px] uppercase tracking-widest text-indigo-500 font-bold">Gemma 4 Architecture</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
          >
            <svg className="h-6 w-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="space-y-4">
            <h4 className="text-xs font-black uppercase tracking-widest text-slate-400">Model Specifications</h4>
            <div className="space-y-3">
              <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                <span className="text-sm text-slate-500">Core Engine</span>
                <span className="text-sm font-bold">Gemma-4-31B-IT</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                <span className="text-sm text-slate-500">Temperature</span>
                <span className="text-sm font-bold">0.1 (Precision Mode)</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                <span className="text-sm text-slate-500">Top-P</span>
                <span className="text-sm font-bold">0.95</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                <span className="text-sm text-slate-500">Max Tokens</span>
                <span className="text-sm font-bold">2048</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-xs font-black uppercase tracking-widest text-slate-400">Ethical Guardrails</h4>
            <div className="space-y-2">
              {[
                "Strict Non-Diagnostic Framework",
                "Chain of Thought Transparency",
                "Automated Crisis Resource Injection",
                "Language-Specific Harm Mitigation"
              ].map((g, i) => (
                <div key={i} className="flex items-center gap-2 text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 px-3 py-2 rounded-lg border border-emerald-100 dark:border-emerald-900/50">
                  <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {g}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="p-6 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800">
           <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-3">System Instruction Snapshot</h4>
           <code className="text-[10px] leading-relaxed text-slate-600 dark:text-slate-400 block max-h-32 overflow-y-auto font-mono">
             "You are CrisisGuard Pro, an advanced AI safety architect... NO DIAGNOSIS... MANDATORY HELP... If risk is HIGH, provide crisis line numbers... You must provide internal reasoning (Chain of Thought)."
           </code>
        </div>

        <div className="mt-8 flex justify-end">
          <button 
            onClick={onClose}
            className="px-8 py-3 bg-indigo-600 text-white font-black uppercase tracking-widest text-xs rounded-xl shadow-lg shadow-indigo-500/20 hover:bg-indigo-700 transition-all"
          >
            Acknowledge Specs
          </button>
        </div>
      </div>
    </div>
  );
}
