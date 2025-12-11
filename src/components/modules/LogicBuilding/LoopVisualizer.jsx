import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, RotateCcw } from 'lucide-react';

const LoopVisualizer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIteration, setCurrentIteration] = useState(0);
  const [maxIterations] = useState(5);
  const [boxes, setBoxes] = useState([]);

  useEffect(() => {
    if (!isPlaying) return;
    if (currentIteration >= maxIterations) {
      setIsPlaying(false);
      return;
    }

    const timer = setTimeout(() => {
      setBoxes(prev => [...prev, currentIteration]);
      setCurrentIteration(prev => prev + 1);
    }, 800);

    return () => clearTimeout(timer);
  }, [isPlaying, currentIteration, maxIterations]);

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentIteration(0);
    setBoxes([]);
  };

  const handlePlayPause = () => {
    if (currentIteration >= maxIterations) {
      handleReset();
      setTimeout(() => setIsPlaying(true), 100);
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-xl border border-slate-700 overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-slate-700/50">
        <h3 className="text-lg font-bold text-white">Loop Visualizer</h3>
        <p className="text-sm text-slate-400 mt-1">Watch a loop repeat 5 times</p>
      </div>

      {/* Code Preview */}
      <div className="mx-4 mt-4 bg-slate-950 rounded-lg p-4 font-mono text-sm">
        <div className="text-slate-400">
          <span className="text-blue-400">for</span>
          (<span className="text-purple-400">int</span> i = <span className="text-green-400">0</span>; 
          i {'<'} <span className="text-green-400">{maxIterations}</span>; 
          i++) {'{'}
        </div>
        <div className={`pl-4 transition-colors ${isPlaying ? 'text-yellow-300' : 'text-slate-500'}`}>
          print("Box " + i);
        </div>
        <div className="text-slate-400">{'}'}</div>
      </div>

      {/* Iteration Counter */}
      <div className="p-4 flex items-center justify-center gap-4">
        <div className="text-center">
          <div className="text-4xl font-bold font-mono text-white">
            {currentIteration}
            <span className="text-slate-500">/{maxIterations}</span>
          </div>
          <div className="text-xs text-slate-400 mt-1">iterations completed</div>
        </div>
      </div>

      {/* Visual Output */}
      <div className="flex-1 p-4 flex items-center justify-center">
        <div className="flex flex-wrap gap-3 justify-center max-w-xs">
          {boxes.map((index) => (
            <motion.div
              key={index}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold shadow-lg shadow-cyan-500/30"
            >
              {index}
            </motion.div>
          ))}
          {boxes.length === 0 && (
            <div className="text-slate-500 text-sm">Press play to start the loop</div>
          )}
        </div>
      </div>

      {/* Controls */}
      <div className="p-4 border-t border-slate-700/50 bg-slate-900/50 flex items-center justify-center gap-3">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handlePlayPause}
          className={`px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-colors ${
            isPlaying
              ? 'bg-amber-500 text-white'
              : 'bg-cyan-500 text-white'
          }`}
        >
          {isPlaying ? <Pause size={18} /> : <Play size={18} />}
          {isPlaying ? 'Pause' : currentIteration >= maxIterations ? 'Replay' : 'Play'}
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleReset}
          className="px-4 py-3 rounded-lg bg-slate-700 text-slate-300 hover:bg-slate-600 transition-colors"
        >
          <RotateCcw size={18} />
        </motion.button>
      </div>
    </div>
  );
};

export default LoopVisualizer;
