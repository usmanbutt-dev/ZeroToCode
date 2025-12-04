import React, { useState } from 'react';

const CppArraysVisualizer = () => {
  const [array, setArray] = useState([0, 0, 0, 0, 0]);
  const [activeIndex, setActiveIndex] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [targetIndex, setTargetIndex] = useState(0);

  const updateArray = () => {
    const idx = parseInt(targetIndex);
    const val = parseInt(inputValue) || 0;
    
    if (idx >= 0 && idx < 5) {
      setActiveIndex(idx);
      setTimeout(() => {
        const newArr = [...array];
        newArr[idx] = val;
        setArray(newArr);
        setActiveIndex(null);
      }, 500);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 bg-slate-900 rounded-xl p-6 border border-slate-700 flex flex-col">
        <h3 className="text-white font-bold text-center mb-6">The Locker Row 🔐</h3>

        {/* Array Visualization */}
        <div className="flex-1 flex items-center justify-center gap-2 mb-6">
          {array.map((val, index) => (
            <div key={index} className="flex flex-col items-center gap-1">
              <div 
                className={`
                  w-12 h-14 flex items-center justify-center bg-slate-800 border-2 rounded-lg text-xl font-bold transition-all duration-300
                  ${activeIndex === index ? 'border-blue-500 bg-blue-900/30 scale-110 shadow-[0_0_15px_rgba(59,130,246,0.5)]' : 'border-slate-600 text-slate-300'}
                `}
              >
                {val}
              </div>
              <div className="text-[10px] font-mono text-slate-500">[{index}]</div>
            </div>
          ))}
        </div>

        {/* Controls */}
        <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
          <div className="flex gap-2 mb-3">
            <div className="flex-1">
              <label className="text-[10px] text-slate-500 uppercase font-bold block mb-1">Index (0-4)</label>
              <input 
                type="number" 
                min="0" 
                max="4" 
                value={targetIndex}
                onChange={(e) => setTargetIndex(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-white text-sm focus:border-blue-500 outline-none"
              />
            </div>
            <div className="flex-1">
              <label className="text-[10px] text-slate-500 uppercase font-bold block mb-1">Value</label>
              <input 
                type="number" 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="10"
                className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-white text-sm focus:border-blue-500 outline-none"
              />
            </div>
          </div>
          
          <button 
            onClick={updateArray}
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors shadow-lg shadow-blue-500/20"
          >
            Update Array
          </button>
        </div>

        <div className="mt-4 font-mono text-[10px] text-slate-500 text-center">
          int arr[5] = {'{'}{array.join(', ')}{'}'};
        </div>

      </div>
    </div>
  );
};

export default CppArraysVisualizer;
