import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Cpu, Zap } from 'lucide-react';

const CPUClockVisualizer = () => {
  const [speed, setSpeed] = useState(2.0); // GHz
  const [pulseCount, setPulseCount] = useState(0);

  // Pulse animation based on speed
  useEffect(() => {
    const interval = setInterval(() => {
      setPulseCount(prev => prev + 1);
    }, 1000 / speed); // Faster speed = more frequent pulses

    return () => clearInterval(interval);
  }, [speed]);

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-xl border border-slate-700 overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-slate-700/50">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Cpu size={20} className="text-cyan-400" />
          CPU Clock Speed
        </h3>
        <p className="text-sm text-slate-400 mt-1">See how fast the CPU "ticks"</p>
      </div>

      {/* Visualization */}
      <div className="flex-1 p-6 flex flex-col items-center justify-center gap-6">
        {/* CPU Chip */}
        <div className="relative">
          <motion.div
            key={pulseCount}
            initial={{ boxShadow: '0 0 0 0 rgba(34, 211, 238, 0.7)' }}
            animate={{ boxShadow: '0 0 0 20px rgba(34, 211, 238, 0)' }}
            transition={{ duration: 0.5 }}
            className="w-32 h-32 bg-gradient-to-br from-slate-700 to-slate-800 rounded-xl border-4 border-cyan-500 flex items-center justify-center"
          >
            <div className="text-center">
              <Zap size={32} className="text-cyan-400 mx-auto mb-1" />
              <span className="text-2xl font-bold text-white font-mono">{speed.toFixed(1)}</span>
              <span className="text-sm text-cyan-400 block">GHz</span>
            </div>
          </motion.div>

          {/* Pulse Ring */}
          <motion.div
            key={`ring-${pulseCount}`}
            initial={{ scale: 1, opacity: 0.8 }}
            animate={{ scale: 1.5, opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 border-4 border-cyan-400 rounded-xl pointer-events-none"
          />
        </div>

        {/* Tick Counter */}
        <div className="text-center">
          <p className="text-slate-400 text-sm">At {speed.toFixed(1)} GHz, the CPU ticks</p>
          <p className="text-3xl font-bold text-cyan-400 font-mono">
            {(speed * 1000000000).toLocaleString()}
          </p>
          <p className="text-slate-400 text-sm">times per second!</p>
        </div>

        {/* Speed Slider */}
        <div className="w-full max-w-xs space-y-2">
          <div className="flex justify-between text-xs text-slate-400">
            <span>1.0 GHz (Slow)</span>
            <span>4.0 GHz (Fast)</span>
          </div>
          <input
            type="range"
            min="1.0"
            max="4.0"
            step="0.1"
            value={speed}
            onChange={(e) => setSpeed(parseFloat(e.target.value))}
            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
          />
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-slate-700/50 bg-slate-900/50">
        <p className="text-xs text-slate-400 text-center">
          Drag the slider to change CPU speed. Watch the pulse rate change!
        </p>
      </div>
    </div>
  );
};

export default CPUClockVisualizer;
