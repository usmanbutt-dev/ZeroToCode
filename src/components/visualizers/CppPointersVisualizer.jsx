import React, { useState } from 'react';

const CppPointersVisualizer = () => {
  const [targetIndex, setTargetIndex] = useState(null); // Index of the memory block we are pointing to
  
  const memory = [
    { address: '0x1A', value: 10, label: 'x' },
    { address: '0x1B', value: 20, label: 'y' },
    { address: '0x1C', value: 30, label: 'z' }
  ];

  const ptrAddress = targetIndex !== null ? memory[targetIndex].address : null;

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 bg-slate-900 rounded-xl p-6 border border-slate-700 flex flex-col relative overflow-hidden">
        <h3 className="text-white font-bold text-center mb-12">Pointer Drone 🛸</h3>

        <div className="flex-1 flex flex-col items-center relative">
          
          {/* Memory Blocks (Fixed) */}
          <div className="flex gap-6 mt-auto mb-8 relative z-10">
            {memory.map((cell, index) => (
              <div 
                key={cell.address}
                onClick={() => setTargetIndex(index)}
                className={`
                  w-20 h-24 bg-slate-800 rounded-lg border-2 cursor-pointer transition-colors duration-300 flex flex-col items-center justify-between py-2
                  ${targetIndex === index 
                    ? 'border-orange-500 bg-slate-800' 
                    : 'border-slate-600 hover:border-slate-500 hover:bg-slate-700/50'}
                `}
              >
                <div className="text-[10px] font-mono text-slate-500">{cell.address}</div>
                <div className="text-2xl font-bold text-white">{cell.value}</div>
                <div className="text-xs font-mono text-blue-400 font-bold">{cell.label}</div>
              </div>
            ))}
          </div>

          {/* The Pointer Drone (Absolute Moving) */}
          <div 
            className="absolute top-0 transition-all duration-500 ease-in-out z-20"
            style={{ 
              left: targetIndex !== null ? `calc(50% + ${(targetIndex - 1) * 104}px)` : '50%', // 104px = w-20 (80px) + gap-6 (24px)
              transform: 'translateX(-50%)',
              opacity: targetIndex !== null ? 1 : 0.5,
              filter: targetIndex === null ? 'grayscale(1)' : 'none'
            }}
          >
            <div className="flex flex-col items-center">
              {/* Drone Body */}
              <div className="bg-orange-600 px-3 py-1 rounded-full text-white font-mono text-xs font-bold shadow-[0_0_15px_rgba(249,115,22,0.6)] border border-orange-400 mb-1 relative">
                <div className="absolute -top-2 -left-2 w-4 h-1 bg-slate-400 animate-spin"></div>
                <div className="absolute -top-2 -right-2 w-4 h-1 bg-slate-400 animate-spin"></div>
                int* ptr
              </div>
              
              {/* Address Display */}
              <div className="bg-slate-950 text-orange-400 font-mono text-[10px] px-2 py-0.5 rounded border border-orange-900/50 mb-1">
                {ptrAddress || "nullptr"}
              </div>

              {/* Laser Beam */}
              <div 
                className={`w-1 bg-gradient-to-b from-orange-500 to-transparent transition-all duration-300 ${targetIndex !== null ? 'h-16 opacity-100' : 'h-0 opacity-0'}`}
              ></div>
              
              {/* Target Highlight Ring */}
              <div 
                className={`w-24 h-6 border-2 border-orange-500 rounded-[50%] absolute top-28 transition-all duration-300 ${targetIndex !== null ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}
                style={{ boxShadow: '0 0 10px rgba(249,115,22,0.5), inset 0 0 10px rgba(249,115,22,0.5)' }}
              ></div>
            </div>
          </div>

        </div>

        {/* Info Panel */}
        <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 mt-4 relative z-30">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs text-slate-500 font-mono">Status:</span>
            <button 
              onClick={() => setTargetIndex(null)}
              className="text-[10px] bg-slate-800 px-2 py-1 rounded text-slate-400 hover:text-white transition-colors"
            >
              Reset (nullptr)
            </button>
          </div>
          
          <div className="font-mono text-sm space-y-1">
            <div className="text-slate-400">
              ptr = <span className="text-orange-400">{ptrAddress || "nullptr"}</span>;
            </div>
            <div className="text-slate-400">
              *ptr = <span className="text-white font-bold">{targetIndex !== null ? memory[targetIndex].value : <span className="text-red-500">CRASH! 💥</span>}</span>;
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CppPointersVisualizer;
