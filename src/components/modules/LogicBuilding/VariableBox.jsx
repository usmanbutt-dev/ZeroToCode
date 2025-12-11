import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Box, Tag, ArrowRight } from 'lucide-react';

const VariableBox = () => {
  const [variableName, setVariableName] = useState('age');
  const [variableValue, setVariableValue] = useState(25);
  const [isAssigning, setIsAssigning] = useState(false);

  const handleAssign = (newValue) => {
    setIsAssigning(true);
    setTimeout(() => {
      setVariableValue(newValue);
      setIsAssigning(false);
    }, 600);
  };

  const presetValues = [10, 25, 42, 99];

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-xl border border-slate-700 overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-slate-700/50">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Box size={20} className="text-purple-400" />
          The Variable Box
        </h3>
        <p className="text-sm text-slate-400 mt-1">A variable is like a labeled box that holds a value.</p>
      </div>

      {/* Main Visualization */}
      <div className="flex-1 p-6 flex flex-col items-center justify-center gap-8">
        
        {/* The "Box" */}
        <div className="relative">
          {/* Label (variable name) */}
          <motion.div 
            className="absolute -top-4 left-1/2 -translate-x-1/2 px-3 py-1 bg-purple-600 rounded-t-lg text-white font-mono text-sm font-bold flex items-center gap-1"
            layout
          >
            <Tag size={14} />
            {variableName}
          </motion.div>

          {/* Box Container */}
          <motion.div
            className="w-40 h-32 bg-gradient-to-br from-slate-700 to-slate-800 rounded-xl border-4 border-purple-500 shadow-2xl shadow-purple-500/20 flex items-center justify-center relative overflow-hidden"
            animate={isAssigning ? { scale: [1, 1.05, 1], borderColor: ['#a855f7', '#22c55e', '#a855f7'] } : {}}
            transition={{ duration: 0.6 }}
          >
            {/* Value inside */}
            <AnimatePresence mode="wait">
              <motion.span
                key={variableValue}
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 50, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                className="text-5xl font-bold text-white font-mono"
              >
                {variableValue}
              </motion.span>
            </AnimatePresence>

            {/* Incoming value animation */}
            <AnimatePresence>
              {isAssigning && (
                <motion.div
                  initial={{ y: -100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-green-500/20 flex items-center justify-center"
                >
                  <ArrowRight size={32} className="text-green-400 animate-pulse" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Code Preview */}
        <div className="bg-slate-950 px-4 py-2 rounded-lg font-mono text-sm">
          <span className="text-purple-400">int</span>{' '}
          <span className="text-white">{variableName}</span>{' '}
          <span className="text-slate-400">=</span>{' '}
          <span className="text-green-400">{variableValue}</span>
          <span className="text-slate-400">;</span>
        </div>

        {/* Controls */}
        <div className="flex flex-col items-center gap-3">
          <p className="text-xs text-slate-400">Click to assign a new value:</p>
          <div className="flex gap-2">
            {presetValues.map((val) => (
              <motion.button
                key={val}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleAssign(val)}
                disabled={isAssigning || val === variableValue}
                className={`px-4 py-2 rounded-lg font-mono font-bold transition-colors ${
                  val === variableValue
                    ? 'bg-purple-600 text-white'
                    : 'bg-slate-700 text-slate-300 hover:bg-purple-500 hover:text-white'
                } disabled:opacity-50`}
              >
                {val}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-slate-700/50 bg-slate-900/50">
        <p className="text-xs text-slate-400 text-center">
          The label (<span className="text-purple-400 font-mono">{variableName}</span>) stays the same, but the value inside can change!
        </p>
      </div>
    </div>
  );
};

export default VariableBox;
