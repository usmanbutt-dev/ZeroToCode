import React from 'react';

const ComputerBasicsModule = () => {
  const topics = [
    {
      title: "What is a computer?",
      description: "An electronic device that manipulates information, or data.",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      title: "Hardware Components",
      description: "Physical parts like CPU, RAM, storage, and peripherals.",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      )
    },
    {
      title: "Software Basics",
      description: "Operating systems and applications that tell hardware what to do.",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      )
    },
    {
      title: "Files & Folders",
      description: "How data is organized and stored on your computer.",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
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
                Computer Basics
              </h2>
              <span className="px-3 py-1 rounded-full text-xs font-semibold text-white bg-blue-500">
                Module 1
              </span>
            </div>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Introduction to computers for absolute beginners. Learn the essential concepts of hardware, software, and basic operations.
            </p>
          </div>

          {/* Topics List */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider">
              Topics Covered
            </h3>
            <div className="grid gap-3">
              {topics.map((topic, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-700/50 border border-slate-100 dark:border-slate-700 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors group">
                  <div className="mt-0.5 text-slate-400 group-hover:text-blue-500 transition-colors">
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

          <button className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-all shadow-lg shadow-blue-500/30 hover:-translate-y-0.5">
            Start Module
          </button>
        </div>

        {/* Right Visualizer Pane */}
        <div className="lg:w-80 flex-shrink-0">
          <div className="h-full min-h-[300px] bg-slate-100 dark:bg-slate-900 rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-700 p-6 flex flex-col items-center justify-center text-center relative overflow-hidden group">
            
            {/* Background Decoration */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            
            <div className="relative z-10 space-y-4">
              <div className="w-20 h-20 mx-auto bg-white dark:bg-slate-800 rounded-full shadow-lg flex items-center justify-center text-blue-500 mb-4">
                <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white mb-1">Interactive Diagram</h4>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Visual exploration of computer components and data flow.
                </p>
              </div>
              <div className="pt-4">
                <span className="inline-flex items-center gap-1 text-xs font-medium text-blue-600 dark:text-blue-400">
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

export default ComputerBasicsModule;
