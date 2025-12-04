import React from 'react';
import CppFunctionsVisualizer from './visualizers/CppFunctionsVisualizer';

const CppFunctionsModule = () => {
  const topics = [
    {
      title: "What is a Function?",
      description: "Reusable blocks of code.",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      )
    },
    {
      title: "Parameters & Return Values",
      description: "Inputs and outputs of functions.",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
        </svg>
      )
    },
    {
      title: "Scope & Overloading",
      description: "Variable visibility and function naming.",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
      )
    }
  ];

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-700 overflow-hidden transition-all hover:shadow-xl">
      <div className="p-6 md:p-8 flex flex-col lg:flex-row gap-8">
        
        {/* Left Content */}
        <div className="flex-1 space-y-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                Functions
              </h2>
              <span className="px-3 py-1 rounded-full text-xs font-semibold text-white bg-green-500">
                Module 5
              </span>
            </div>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Learn to create reusable code blocks using parameters, return values, and scope rules.
            </p>
          </div>

          {/* Topics List */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider">
              Topics
            </h3>
            <div className="grid gap-3">
              {topics.map((topic, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-700/50 border border-slate-100 dark:border-slate-700 hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors group">
                  <div className="mt-0.5 text-slate-400 group-hover:text-green-500 transition-colors">
                    {topic.icon}
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-900 dark:text-white">
                      {topic.title}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      {topic.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button className="w-full sm:w-auto px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl font-semibold transition-all shadow-lg shadow-green-500/30 hover:-translate-y-0.5">
            Start Module
          </button>
        </div>

        {/* Right Visualizer Pane */}
        <div className="lg:w-80 flex-shrink-0">
          <CppFunctionsVisualizer />
        </div>

      </div>
    </div>
  );
};

export default CppFunctionsModule;
