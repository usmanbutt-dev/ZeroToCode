import React from 'react';

const CppStringsModule = () => {
  const topics = [
    {
      title: "C-style Strings",
      description: "Character arrays and null terminators.",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
        </svg>
      )
    },
    {
      title: "std::string Class",
      description: "Modern, safe string handling.",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    },
    {
      title: "Operations & Searching",
      description: "Append, find, substring, and more.",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
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
                Strings
              </h2>
              <span className="px-3 py-1 rounded-full text-xs font-semibold text-white bg-red-500">
                Module 7
              </span>
            </div>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Handle text in C++ using character arrays and std::string.
            </p>
          </div>

          {/* Topics List */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider">
              Topics
            </h3>
            <div className="grid gap-3">
              {topics.map((topic, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-700/50 border border-slate-100 dark:border-slate-700 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors group">
                  <div className="mt-0.5 text-slate-400 group-hover:text-red-500 transition-colors">
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

          <button className="w-full sm:w-auto px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-semibold transition-all shadow-lg shadow-red-500/30 hover:-translate-y-0.5">
            Start Module
          </button>
        </div>

        {/* Right Visualizer Pane */}
        <div className="lg:w-80 flex-shrink-0">
          <div className="h-full min-h-[300px] bg-slate-100 dark:bg-slate-900 rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-700 p-6 flex flex-col items-center justify-center text-center relative overflow-hidden group">
            
            {/* Background Decoration */}
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            
            <div className="relative z-10 space-y-4">
              <div className="w-20 h-20 mx-auto bg-white dark:bg-slate-800 rounded-full shadow-lg flex items-center justify-center text-red-500 mb-4">
                <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                </svg>
              </div>
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white mb-1">String Visualizer</h4>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  See how strings are stored in memory.
                </p>
              </div>
              <div className="pt-4">
                <span className="inline-flex items-center gap-1 text-xs font-medium text-red-600 dark:text-red-400">
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

export default CppStringsModule;
