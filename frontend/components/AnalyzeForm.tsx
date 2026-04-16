'use client';

import React, { useState } from 'react';
import { demoSamples } from '../utils/demoSamples';

interface AnalyzeFormProps {
  onAnalyze: (text: string, language: string) => void;
  isLoading: boolean;
}

export default function AnalyzeForm({ onAnalyze, isLoading }: AnalyzeFormProps) {
  const [text, setText] = useState('');
  const [language, setLanguage] = useState('en');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAnalyze(text, language);
    }
  };

  const loadSample = (sampleText: string, sampleLang: string) => {
    setText(sampleText);
    setLanguage(sampleLang);
  };

  return (
    <div className="bg-white dark:bg-slate-900 backdrop-blur-xl border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xl">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="text" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Message or Post Content
          </label>
          <textarea
            id="text"
            rows={6}
            className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all dark:text-white resize-none"
            placeholder="Paste the message you want to analyze here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>

        <div className="flex flex-col md:flex-row gap-4 items-center">
          <button
            type="submit"
            disabled={isLoading || !text.trim()}
            className={`w-full px-8 py-3 rounded-xl font-semibold text-white transition-all shadow-lg ${
              isLoading || !text.trim()
                ? 'bg-slate-400 cursor-not-allowed'
                : 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-indigo-500/25 active:scale-95'
            }`}
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" width="20" height="20" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Analyzing...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <svg className="h-5 w-5" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-7.714 2.143L11 21l-2.286-6.857L1 12l7.714-2.143L11 3z" />
                </svg>
                Analyze Risk
              </span>
            )}
          </button>
        </div>
      </form>

      <div className="mt-8">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Demo Scenarios</p>
        <div className="flex flex-wrap gap-2">
          {demoSamples.map((sample) => (
            <button
              key={sample.id}
              onClick={() => loadSample(sample.text, sample.language)}
              className="px-3 py-1.5 text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors border border-slate-200 dark:border-slate-700"
            >
              {sample.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
