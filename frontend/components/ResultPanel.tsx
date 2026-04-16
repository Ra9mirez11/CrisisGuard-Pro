'use client';

import React, { useState, useEffect } from 'react';
import { AnalyzeResponse } from '../utils/api';

interface ResultPanelProps {
  result: AnalyzeResponse | null;
}

export default function ResultPanel({ result }: ResultPanelProps) {
  const [editableResponse, setEditableResponse] = useState('');
  const [copied, setCopied] = useState(false);
  const [showReasoning, setShowReasoning] = useState(false);

  useEffect(() => {
    if (result) {
      setEditableResponse(result.suggested_response);
    }
  }, [result]);

  if (!result) return null;

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'low': return 'text-emerald-500';
      case 'medium': return 'text-amber-500';
      case 'high': return 'text-rose-600';
      default: return 'text-slate-500';
    }
  };

  const getGaugeRotation = (level: string) => {
    switch (level) {
      case 'low': return 'rotate-[45deg]';
      case 'medium': return 'rotate-[90deg]';
      case 'high': return 'rotate-[135deg]';
      default: return 'rotate-0';
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
      
      {/* Risk Metrics Card */}
      <div className="glass-panel rounded-3xl p-8 relative overflow-hidden">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          
          {/* Urgency Gauge */}
          <div className="relative w-40 h-24 flex items-center justify-center overflow-hidden">
             <div className="absolute top-0 w-32 h-32 border-[12px] border-slate-100 dark:border-slate-800 rounded-full" />
             <div className={`absolute top-0 w-32 h-32 border-[12px] border-indigo-500 rounded-full border-b-transparent border-t-transparent border-l-transparent transition-all duration-1000 ease-out ${getGaugeRotation(result.risk_level)}`} />
             <div className="absolute bottom-0 text-center">
               <span className={`text-2xl font-black uppercase tracking-tighter ${getRiskColor(result.risk_level)}`}>
                 {result.risk_level}
               </span>
               <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Urgency</p>
             </div>
          </div>

          <div className="flex-1 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold tracking-tight">Vulnerability Report</h3>
              <div className="flex items-center gap-2 px-3 py-1 bg-indigo-50 dark:bg-indigo-900/30 rounded-full border border-indigo-100 dark:border-indigo-800/50">
                <div className="h-2 w-2 rounded-full bg-indigo-500 animate-pulse" />
                <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">
                  AI Confidence: {Math.round(result.confidence_score * 100)}%
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {result.reasons.map((reason, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800">
                  <div className="h-2 w-2 rounded-full bg-indigo-500" />
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300">{reason}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Suggested Action Console */}
      <div className="glass-panel rounded-3xl p-8 border-indigo-200/50 dark:border-indigo-500/20">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-100 dark:bg-indigo-900/50 rounded-lg">
              <svg className="h-5 w-5 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold">Suggested Intervention</h3>
          </div>
          
          <button
            onClick={() => {
              navigator.clipboard.writeText(editableResponse);
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            }}
            className={`px-6 py-2 rounded-xl text-sm font-black uppercase tracking-widest transition-all ${
              copied ? 'bg-emerald-500 text-white' : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/20'
            }`}
          >
            {copied ? 'Copied' : 'Copy Draft'}
          </button>
        </div>

        <textarea
          className="w-full px-6 py-6 bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all text-sm leading-relaxed mb-6"
          rows={5}
          value={editableResponse}
          onChange={(e) => setEditableResponse(e.target.value)}
        />

        {/* AI Insight Accordion */}
        <div className="border-t border-slate-100 dark:border-slate-800 pt-6">
          <button 
            onClick={() => setShowReasoning(!showReasoning)}
            className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-indigo-500 transition-colors"
          >
            {showReasoning ? '▼ Hide AI Reasoning' : '▶ Show AI Reasoning / Chain of Thought'}
          </button>
          
          {showReasoning && (
            <div className="mt-4 p-5 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800 animate-in slide-in-from-top-2 duration-300">
              <ul className="space-y-3">
                {result.reasoning_steps.map((step, i) => (
                  <li key={i} className="flex gap-3 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                    <span className="font-bold text-indigo-500">{i + 1}.</span>
                    {step}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Safety Compliance Badge */}
      <div className="flex justify-center">
        <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/50 rounded-full">
          <svg className="h-4 w-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-7.618 3.016L12 12l7.618-6.072z" />
          </svg>
          <span className="text-[10px] font-black uppercase tracking-widest text-emerald-700 dark:text-emerald-400">
            Gemma 4 Safety Architecture Verified
          </span>
        </div>
      </div>

    </div>
  );
}
