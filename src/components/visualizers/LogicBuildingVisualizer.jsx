import React, { useState, useEffect } from 'react';

const LogicBuildingVisualizer = () => {
  const [robotPos, setRobotPos] = useState(0);
  const [commands, setCommands] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [message, setMessage] = useState("Guide the robot to the flag! 🚩");

  const gridSize = 5;
  const goalPos = 4;

  const addCommand = (cmd) => {
    if (!isRunning && commands.length < 5) {
      setCommands([...commands, cmd]);
    }
  };

  const runCommands = async () => {
    if (commands.length === 0) return;
    setIsRunning(true);
    setRobotPos(0);
    setMessage("Running...");

    let currentPos = 0;
    
    for (let i = 0; i < commands.length; i++) {
      await new Promise(r => setTimeout(r, 800));
      
      if (commands[i] === 'MOVE') {
        if (currentPos < gridSize - 1) {
          currentPos++;
          setRobotPos(currentPos);
        }
      }
    }

    if (currentPos === goalPos) {
      setMessage("Success! You made it! 🎉");
    } else {
      setMessage("Try again! Not quite there.");
    }
    setIsRunning(false);
  };

  const reset = () => {
    setRobotPos(0);
    setCommands([]);
    setIsRunning(false);
    setMessage("Guide the robot to the flag! 🚩");
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 bg-slate-900 rounded-xl p-6 border border-slate-700 flex flex-col">
        
        {/* Grid Area */}
        <div className="flex-1 flex items-center justify-center mb-4 relative">
          <div className="flex gap-2 relative">
            {/* Background Grid */}
            {[...Array(gridSize)].map((_, i) => (
              <div key={i} className="w-10 h-10 sm:w-12 sm:h-12 bg-slate-800 rounded-lg border border-slate-700 flex items-center justify-center">
                {i === goalPos && <span className="text-2xl">🚩</span>}
              </div>
            ))}
            
            {/* Robot Character (Absolute Positioning for Smooth Movement) */}
            <div 
              className="absolute top-0 left-0 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center transition-all duration-500 ease-in-out z-10"
              style={{ transform: `translateX(${robotPos * (100 + 16)}%)` }} // 100% width + gap adjustment (approx)
            >
              <span className="text-3xl drop-shadow-lg">🤖</span>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="space-y-4">
          <div className="flex justify-center gap-2">
            <button 
              onClick={() => addCommand('MOVE')}
              disabled={isRunning || commands.length >= 5}
              className="px-3 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs font-bold rounded-lg transition-colors"
            >
              + Move Forward
            </button>
            <button 
              onClick={runCommands}
              disabled={isRunning || commands.length === 0}
              className="px-3 py-2 bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs font-bold rounded-lg transition-colors"
            >
              ▶ Run
            </button>
            <button 
              onClick={reset}
              disabled={isRunning}
              className="px-3 py-2 bg-slate-700 hover:bg-slate-600 disabled:opacity-50 text-white text-xs font-bold rounded-lg transition-colors"
            >
              ↺ Reset
            </button>
          </div>

          {/* Command List */}
          <div className="bg-slate-950 rounded-lg p-3 min-h-[60px]">
            <div className="text-[10px] text-slate-500 mb-2 uppercase tracking-wider font-bold">Program Sequence</div>
            <div className="flex gap-1 flex-wrap">
              {commands.map((cmd, i) => (
                <span key={i} className="px-2 py-1 bg-indigo-900/50 text-indigo-300 text-xs rounded border border-indigo-500/30">
                  {cmd}
                </span>
              ))}
              {commands.length === 0 && <span className="text-slate-600 text-xs italic">No commands yet...</span>}
            </div>
          </div>

          <div className="text-center text-xs font-medium text-indigo-400 min-h-[20px]">
            {message}
          </div>
        </div>

      </div>
    </div>
  );
};

export default LogicBuildingVisualizer;
