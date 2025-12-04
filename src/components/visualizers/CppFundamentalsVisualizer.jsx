import React, { useState } from 'react';

const CppFundamentalsVisualizer = () => {
  const [code, setCode] = useState({
    operator: '>>',
    semicolon: false
  });
  const [output, setOutput] = useState("");

  const runCode = () => {
    if (code.operator === '<<' && code.semicolon) {
      setOutput("Hello World!");
    } else {
      setOutput("Error: Syntax Error! Check operator and semicolon.");
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 bg-slate-900 rounded-xl p-6 border border-slate-700 flex flex-col">
        <h3 className="text-white font-bold text-center mb-4">Syntax Fixer 🧩</h3>
        
        {/* Code Editor Area */}
        <div className="bg-slate-950 p-4 rounded-lg font-mono text-sm mb-4 border border-slate-800 relative">
          <div className="text-slate-500 mb-2">// Fix the code to print "Hello World!"</div>
          
          <div className="flex items-center gap-2 flex-wrap text-slate-300">
            <span className="text-blue-400">cout</span>
            
            {/* Operator Toggle */}
            <button 
              onClick={() => setCode(prev => ({ ...prev, operator: prev.operator === '>>' ? '<<' : '>>' }))}
              className={`px-2 py-0.5 rounded ${code.operator === '<<' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'} border border-current transition-colors`}
            >
              {code.operator}
            </button>
            
            <span className="text-orange-300">"Hello World!"</span>
            
            {/* Semicolon Toggle */}
            <button 
              onClick={() => setCode(prev => ({ ...prev, semicolon: !prev.semicolon }))}
              className={`w-6 h-6 flex items-center justify-center rounded border transition-colors ${code.semicolon ? 'bg-slate-800 border-slate-600 text-white' : 'bg-yellow-500/20 border-yellow-500/50 text-yellow-500 animate-pulse'}`}
            >
              {code.semicolon ? ';' : '?'}
            </button>
          </div>
        </div>

        {/* Run Button */}
        <button 
          onClick={runCode}
          className="w-full py-2 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-lg transition-colors mb-4 shadow-lg shadow-orange-500/20"
        >
          Compile & Run
        </button>

        {/* Terminal Output */}
        <div className="flex-1 bg-black rounded-lg p-3 font-mono text-xs border border-slate-800">
          <div className="text-slate-500 border-b border-slate-800 pb-1 mb-2">Terminal</div>
          {output ? (
            <div className={output.startsWith("Error") ? "text-red-400" : "text-green-400"}>
              {output}
            </div>
          ) : (
            <div className="text-slate-600 italic">Waiting for execution...</div>
          )}
        </div>

      </div>
    </div>
  );
};

export default CppFundamentalsVisualizer;
