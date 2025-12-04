import React, { useState } from 'react';

const CppFunctionsVisualizer = () => {
  const [stack, setStack] = useState(['main()']);
  
  const pushFunction = (name) => {
    if (stack.length < 5) {
      setStack(prev => [...prev, name]);
    }
  };

  const popFunction = () => {
    if (stack.length > 1) {
      setStack(prev => prev.slice(0, -1));
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 bg-slate-900 rounded-xl p-6 border border-slate-700 flex flex-col">
        <h3 className="text-white font-bold text-center mb-6">The Pancake Stack 🥞</h3>

        {/* Stack Area */}
        <div className="flex-1 flex flex-col-reverse items-center justify-start gap-2 mb-6 min-h-[160px]">
          {stack.map((func, index) => (
            <div 
              key={index}
              className={`
                w-40 py-2 text-center font-mono text-sm font-bold rounded-lg shadow-lg transition-all animate-fade-in-up
                ${index === 0 ? 'bg-blue-900 text-blue-200 border-2 border-blue-700' : 'bg-green-600 text-white border-2 border-green-500'}
              `}
            >
              {func}
            </div>
          ))}
          <div className="w-48 h-2 bg-slate-700 rounded-full mt-1"></div>
        </div>

        {/* Controls */}
        <div className="grid grid-cols-2 gap-3">
          <button 
            onClick={() => pushFunction(`func_${stack.length}()`)}
            disabled={stack.length >= 5}
            className="py-2 bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white text-xs font-bold rounded-lg transition-colors"
          >
            + Call Function
          </button>
          <button 
            onClick={popFunction}
            disabled={stack.length <= 1}
            className="py-2 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white text-xs font-bold rounded-lg transition-colors"
          >
            - Return
          </button>
        </div>

        <div className="mt-4 text-center text-[10px] text-slate-500">
          Last In, First Out (LIFO)
        </div>

      </div>
    </div>
  );
};

export default CppFunctionsVisualizer;
