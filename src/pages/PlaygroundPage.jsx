import React from 'react';

const PlaygroundPage = () => {
  return (
    <div className="pt-20 h-screen flex flex-col bg-slate-50 dark:bg-slate-900">
      {/* Toolbar */}
      <div className="h-12 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 flex items-center px-4 justify-between">
        <div className="flex items-center gap-4">
          <span className="font-mono text-sm text-slate-500">main.cpp</span>
          <button className="text-green-600 hover:text-green-700 font-semibold text-sm flex items-center gap-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" /></svg>
            Run
          </button>
        </div>
        <div className="text-xs text-slate-400">Auto-saved</div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Code Editor Placeholder */}
        <div className="flex-1 bg-slate-950 p-4 border-r border-slate-800 overflow-auto">
          <pre className="font-mono text-sm text-slate-300">
            <code>
              <span className="text-purple-400">#include</span> <span className="text-green-400">&lt;iostream&gt;</span>{'\n\n'}
              <span className="text-blue-400">int</span> <span className="text-yellow-400">main</span>() {'{'}{'\n'}
              {'  '}<span className="text-slate-500">// Write your code here</span>{'\n'}
              {'  '}std::cout &lt;&lt; <span className="text-green-400">"Hello, World!"</span> &lt;&lt; std::endl;{'\n'}
              {'  '}<span className="text-purple-400">return</span> <span className="text-orange-400">0</span>;{'\n'}
              {'}'}
            </code>
          </pre>
        </div>

        {/* Visualizer Placeholder */}
        <div className="flex-1 bg-white dark:bg-slate-900 p-4 flex flex-col">
          <div className="flex-1 flex items-center justify-center border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl mb-4">
            <div className="text-center">
              <svg className="w-12 h-12 text-slate-300 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <p className="text-slate-500">Visualization will appear here</p>
            </div>
          </div>
          
          {/* Output Console */}
          <div className="h-32 bg-slate-100 dark:bg-slate-800 rounded-xl p-3 font-mono text-sm text-slate-700 dark:text-slate-300 overflow-auto">
            <div className="text-xs text-slate-400 mb-2 border-b border-slate-200 dark:border-slate-700 pb-1">Output</div>
            &gt; Hello, World!
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaygroundPage;
