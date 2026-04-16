'use client';

import React, { useState } from 'react';
import AnalyzeForm from '../components/AnalyzeForm';
import ResultPanel from '../components/ResultPanel';
import TechnicalCard from '../components/TechnicalCard';
import { analyzeText, AnalyzeResponse } from '../utils/api';

export default function Home() {
  const [result, setResult] = useState<AnalyzeResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showSpecs, setShowSpecs] = useState(false);

  const handleAnalyze = async (text: string, language: string) => {
    setIsLoading(true);
    const data = await analyzeText(text, language);
    setResult(data);
    setIsLoading(false);
  };

  return (
    <main className="min-h-screen">
      {/* Dynamic Background Mesh is handled in globals.css */}
      
      {/* Navigation */}
      <nav className="border-b border-white/5 dark:border-white/5 bg-white/50 dark:bg-slate-950/20 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-gradient-to-br from-indigo-500 to-rose-500 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-7.618 3.016L12 12l7.618-6.072z" />
              </svg>
            </div>
            <span className="font-black text-2xl tracking-tighter">CrisisGuard <span className="text-indigo-500">Pro</span></span>
          </div>
          <div className="hidden md:flex items-center gap-8">
             <button 
               onClick={() => setShowSpecs(true)}
               className="text-xs font-black uppercase tracking-widest text-slate-500 hover:text-indigo-500 transition-colors"
             >
               Model Specs
             </button>
             <div className="h-4 w-[1px] bg-slate-200 dark:bg-slate-800" />
             <span className="px-4 py-1.5 bg-indigo-500 text-white text-[10px] font-black rounded-full uppercase tracking-widest">
               Submission Ready
             </span>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Hero Content (L-Column) */}
          <div className="lg:col-span-5 space-y-12">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-100 dark:border-indigo-800/50">
                 <span className="flex h-2 w-2 rounded-full bg-indigo-500 animate-pulse" />
                 <span className="text-[10px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-[0.2em]">Safety & Trust Architecture</span>
              </div>
              
              <h1 className="text-6xl md:text-7xl font-black tracking-tighter leading-[0.9] text-gradient">
                CrisisGuard
              </h1>
              
              <h2 className="text-3xl font-bold tracking-tight text-slate-800 dark:text-slate-100">
                Compassionate AI for Critical Community Care.
              </h2>
              
              <p className="text-lg text-slate-500 dark:text-slate-400 leading-relaxed max-w-md">
                Leveraging the advanced reasoning of **Gemma 4** to detect early signals of psychological distress and empower moderators with safe, empathetic interventions.
              </p>
            </div>

            {/* Value Props */}
            <div className="grid grid-cols-1 gap-6">
              {[
                { title: 'Zero Diagnosis', desc: 'Maintains strict ethical boundaries.' },
                { title: 'Chain of Thought', desc: 'Transparent AI reasoning for every alert.' },
                { title: 'Global Protection', desc: 'Optimized for cross-platform community safety.' }
              ].map((prop, i) => (
                <div key={i} className="flex gap-4">
                  <div className="h-6 w-6 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0">
                    <svg className="h-3 w-3 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold">{prop.title}</h4>
                    <p className="text-xs text-slate-500">{prop.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-8 glass-panel rounded-3xl space-y-4">
               <h3 className="font-bold text-sm uppercase tracking-widest text-indigo-500">The Mission</h3>
               <p className="text-sm italic text-slate-600 dark:text-slate-400 leading-relaxed">
                 "Our goal is to reduce moderator burnout while ensuring no cry for help goes unheard in the digital age. Powered by Gemma 4."
               </p>
            </div>
          </div>

          {/* Interactive Console (R-Column) */}
          <div className="lg:col-span-7 space-y-8">
            <AnalyzeForm onAnalyze={handleAnalyze} isLoading={isLoading} />
            <ResultPanel result={result} />
          </div>

        </div>
        <footer className="mt-32 pt-16 border-t border-slate-100 dark:border-slate-800 text-center space-y-8">
          <div className="max-w-3xl mx-auto space-y-4">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Legal & Ethical Disclaimer</p>
            <p className="text-xs text-slate-500 dark:text-slate-500 leading-relaxed">
              CrisisGuard is an experimental AI safety tool. It is not a medical or therapeutic service and does not provide clinical diagnosis or treatment. In clinical crisis situations, always seek professional medical help immediately.
            </p>
          </div>
          <div className="text-[9px] font-black uppercase tracking-[0.4em] text-indigo-500/50">
            Hackathon Submission © 2026 • Built with Gemma 4
          </div>
        </footer>
      </div>

      {showSpecs && <TechnicalCard onClose={() => setShowSpecs(false)} />}
    </main>
  );
}
