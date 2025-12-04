import React from 'react';

const LogicBuildingModule = () => {
  const topics = [
    {
      title: "Sequences & Order",
      description: "Understanding how the order of instructions affects the outcome.",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      )
    },
    {
      title: "Conditionals (If/Else)",
      description: "Making decisions in code based on true or false conditions.",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: "Loops (For/While)",
      description: "Repeating actions multiple times without rewriting code.",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      )
    },
    {
      title: "Flowcharts & Pseudocode",
      description: "Visualizing and planning logic before writing actual code.",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
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
                Logic Building
              </h2>
              <span className="px-3 py-1 rounded-full text-xs font-semibold text-white bg-indigo-500">
                Module 2
              </span>
            </div>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Learn fundamental logical thinking and flow control concepts to build problem-solving skills.
            </p>
          </div>

          {/* Topics List */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider">
              Key Concepts
            </h3>
            <div className="grid gap-3">
              {topics.map((topic, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-700/50 border border-slate-100 dark:border-slate-700 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors group">
                  <div className="mt-0.5 text-slate-400 group-hover:text-indigo-500 transition-colors">
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

          <button className="w-full sm:w-auto px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold transition-all shadow-lg shadow-indigo-500/30 hover:-translate-y-0.5">
            Start Module
          </button>
        </div>

        {/* Right Visualizer Pane */}
        <div className="lg:w-80 flex-shrink-0">
          <div className="h-full min-h-[300px] bg-slate-100 dark:bg-slate-900 rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-700 p-6 flex flex-col items-center justify-center text-center relative overflow-hidden group">
            
            {/* Background Decoration */}
            <div className="absolute inset-0 bg-gradient-to-bl from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            
            <div className="relative z-10 space-y-4">
              <div className="w-20 h-20 mx-auto bg-white dark:bg-slate-800 rounded-full shadow-lg flex items-center justify-center text-indigo-500 mb-4">
                <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
                </svg>
              </div>
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white mb-1">Logic Visualizer</h4>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Build and test flowcharts to see your logic in action.
                </p>
              </div>
              <div className="pt-4">
                <span className="inline-flex items-center gap-1 text-xs font-medium text-indigo-600 dark:text-indigo-400">
                  Preview available
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default LogicBuildingModule;
