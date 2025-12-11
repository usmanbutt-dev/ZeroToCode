import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight, RotateCcw, Play } from 'lucide-react';

const RobotInstructionSim = () => {
  const [instructions, setInstructions] = useState([]);
  const [robotPos, setRobotPos] = useState({ x: 1, y: 1 });
  const [isRunning, setIsRunning] = useState(false);
  const [executionIndex, setExecutionIndex] = useState(-1);
  
  const gridSize = 3;
  const goalPos = { x: 2, y: 0 };

  const addInstruction = (dir) => {
    if (instructions.length < 6 && !isRunning) {
      setInstructions([...instructions, dir]);
    }
  };

  const removeInstruction = (index) => {
    if (!isRunning) {
      setInstructions(instructions.filter((_, i) => i !== index));
    }
  };

  const reset = () => {
    setInstructions([]);
    setRobotPos({ x: 1, y: 1 });
    setIsRunning(false);
    setExecutionIndex(-1);
  };

  const runInstructions = async () => {
    if (instructions.length === 0) return;
    setIsRunning(true);
    setRobotPos({ x: 1, y: 1 });

    for (let i = 0; i < instructions.length; i++) {
      setExecutionIndex(i);
      await new Promise(r => setTimeout(r, 600));
      
      const dir = instructions[i];
      setRobotPos(prev => {
        let newX = prev.x;
        let newY = prev.y;
        if (dir === 'up' && prev.y > 0) newY--;
        if (dir === 'down' && prev.y < gridSize - 1) newY++;
        if (dir === 'left' && prev.x > 0) newX--;
        if (dir === 'right' && prev.x < gridSize - 1) newX++;
        return { x: newX, y: newY };
      });
    }

    await new Promise(r => setTimeout(r, 300));
    setIsRunning(false);
    setExecutionIndex(-1);
  };

  const reachedGoal = robotPos.x === goalPos.x && robotPos.y === goalPos.y;

  const dirButtons = [
    { dir: 'up', icon: ArrowUp, label: '↑' },
    { dir: 'down', icon: ArrowDown, label: '↓' },
    { dir: 'left', icon: ArrowLeft, label: '←' },
    { dir: 'right', icon: ArrowRight, label: '→' },
  ];

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-xl border border-slate-700 overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-slate-700/50">
        <h3 className="text-lg font-bold text-white">🤖 Robot Instructions</h3>
        <p className="text-sm text-slate-400 mt-1">Guide the robot to the flag!</p>
      </div>

      {/* Grid */}
      <div className="flex-1 p-4 flex items-center justify-center">
        <div className="grid grid-cols-3 gap-1 bg-slate-700 p-1 rounded-lg">
          {Array.from({ length: gridSize * gridSize }).map((_, i) => {
            const x = i % gridSize;
            const y = Math.floor(i / gridSize);
            const isRobot = robotPos.x === x && robotPos.y === y;
            const isGoal = goalPos.x === x && goalPos.y === y;
            
            return (
              <div
                key={i}
                className={`w-16 h-16 rounded flex items-center justify-center text-2xl ${
                  isGoal ? 'bg-emerald-800' : 'bg-slate-800'
                }`}
              >
                {isRobot && (
                  <motion.div
                    layout
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                    className="text-3xl"
                  >
                    🤖
                  </motion.div>
                )}
                {isGoal && !isRobot && '🚩'}
                {isGoal && isRobot && (
                  <motion.div
                    initial={{ scale: 1 }}
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 0.5 }}
                  >
                    🎉
                  </motion.div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Instruction Queue */}
      <div className="px-4 pb-2">
        <p className="text-xs text-slate-500 mb-2">Your Instructions ({instructions.length}/6):</p>
        <div className="flex gap-1 min-h-[32px] flex-wrap">
          {instructions.length === 0 ? (
            <span className="text-slate-600 text-sm">Add instructions below...</span>
          ) : (
            instructions.map((dir, i) => (
              <motion.button
                key={i}
                initial={{ scale: 0 }}
                animate={{ scale: 1, opacity: executionIndex === i ? 0.5 : 1 }}
                onClick={() => removeInstruction(i)}
                disabled={isRunning}
                className={`px-2 py-1 rounded text-sm font-mono ${
                  executionIndex === i
                    ? 'bg-yellow-500 text-black'
                    : 'bg-slate-700 text-white hover:bg-red-500/50'
                }`}
              >
                {dir === 'up' ? '↑' : dir === 'down' ? '↓' : dir === 'left' ? '←' : '→'}
              </motion.button>
            ))
          )}
        </div>
      </div>

      {/* Controls */}
      <div className="p-4 border-t border-slate-700/50 bg-slate-900/50 space-y-3">
        <div className="flex justify-center gap-2">
          {dirButtons.map(({ dir, icon: Icon }) => (
            <motion.button
              key={dir}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => addInstruction(dir)}
              disabled={isRunning || instructions.length >= 6}
              className="w-10 h-10 bg-slate-700 hover:bg-slate-600 disabled:opacity-50 rounded-lg flex items-center justify-center text-white transition-colors"
            >
              <Icon size={18} />
            </motion.button>
          ))}
        </div>
        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={runInstructions}
            disabled={isRunning || instructions.length === 0}
            className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white rounded-lg font-semibold flex items-center justify-center gap-2"
          >
            <Play size={16} />
            Run
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={reset}
            className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg"
          >
            <RotateCcw size={16} />
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default RobotInstructionSim;
