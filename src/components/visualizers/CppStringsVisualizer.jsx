import React, { useState } from 'react';

const CppStringsVisualizer = () => {
  const [word, setWord] = useState("CODE");
  const [inputChar, setInputChar] = useState("");

  const addChar = () => {
    if (inputChar && word.length < 8) {
      setWord(prev => prev + inputChar.toUpperCase());
      setInputChar("");
    }
  };

  const removeChar = () => {
    setWord(prev => prev.slice(0, -1));
  };

  const clearWord = () => {
    setWord("");
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 bg-slate-900 rounded-xl p-6 border border-slate-700 flex flex-col">
        <h3 className="text-white font-bold text-center mb-6">Word Builder 🔠</h3>

        {/* String Visualization */}
        <div className="flex-1 flex flex-col items-center justify-center mb-6">
          
          {/* Memory Cells */}
          <div className="flex gap-1 mb-2">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="text-[10px] font-mono text-slate-600 w-8 text-center">
                {i}
              </div>
            ))}
          </div>
          
          <div className="flex gap-1 p-2 bg-slate-800 rounded-xl border border-slate-700 shadow-inner">
            {/* Characters */}
            {word.split('').map((char, index) => (
              <div key={index} className="w-8 h-10 bg-white text-slate-900 rounded font-bold text-lg flex items-center justify-center shadow-sm animate-pop-in">
                {char}
              </div>
            ))}
            
            {/* Null Terminator */}
            <div className="w-8 h-10 bg-slate-700/50 text-slate-500 rounded font-mono text-xs flex items-center justify-center border border-dashed border-slate-600">
              \0
            </div>

            {/* Empty Slots */}
            {[...Array(8 - word.length)].map((_, i) => (
              <div key={i} className="w-8 h-10 bg-slate-800/30 rounded border border-slate-700/50"></div>
            ))}
          </div>

          <div className="mt-4 text-xs text-slate-400 font-mono">
            std::string s = "<span className="text-green-400">{word}</span>";
          </div>
        </div>

        {/* Controls */}
        <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
          <div className="flex gap-2 mb-3">
            <input 
              type="text" 
              maxLength="1"
              value={inputChar}
              onChange={(e) => setInputChar(e.target.value)}
              placeholder="A"
              className="w-12 text-center bg-slate-900 border border-slate-700 rounded px-2 py-2 text-white font-bold focus:border-red-500 outline-none uppercase"
              onKeyDown={(e) => e.key === 'Enter' && addChar()}
            />
            <button 
              onClick={addChar}
              disabled={!inputChar || word.length >= 8}
              className="flex-1 py-2 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white text-xs font-bold rounded-lg transition-colors shadow-lg shadow-red-500/20"
            >
              + Append
            </button>
          </div>
          
          <div className="flex gap-2">
            <button 
              onClick={removeChar}
              disabled={word.length === 0}
              className="flex-1 py-2 bg-slate-700 hover:bg-slate-600 disabled:opacity-50 text-white text-xs font-bold rounded-lg transition-colors"
            >
              Backspacce
            </button>
            <button 
              onClick={clearWord}
              className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white text-xs font-bold rounded-lg transition-colors"
            >
              Clear
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CppStringsVisualizer;
