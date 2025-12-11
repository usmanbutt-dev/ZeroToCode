import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp, ArrowDown, CheckCircle, XCircle, RotateCcw } from 'lucide-react';

const SequenceReorderGame = () => {
  const correctOrder = ['Wake up', 'Brush teeth', 'Get dressed', 'Eat breakfast', 'Go to school'];
  
  const [items, setItems] = useState(() => {
    // Shuffle for initial state
    return [...correctOrder].sort(() => Math.random() - 0.5);
  });
  
  const [submitted, setSubmitted] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  
  const isCorrect = submitted && items.every((item, i) => item === correctOrder[i]);

  const moveItem = (fromIndex, direction) => {
    const toIndex = fromIndex + direction;
    if (toIndex < 0 || toIndex >= items.length) return;
    
    const newItems = [...items];
    [newItems[fromIndex], newItems[toIndex]] = [newItems[toIndex], newItems[fromIndex]];
    setItems(newItems);
  };
  
  const handleSubmit = () => {
    setSubmitted(true);
    setSelectedIndex(null);
  };
  
  const handleReset = () => {
    setItems([...correctOrder].sort(() => Math.random() - 0.5));
    setSubmitted(false);
    setSelectedIndex(null);
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-xl border border-slate-700 overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-slate-700/50">
        <h3 className="text-lg font-bold text-white">Sequence Game</h3>
        <p className="text-sm text-slate-400 mt-1">Use arrows to reorder steps</p>
      </div>

      {/* Instructions */}
      <div className="px-4 pt-4">
        <p className="text-sm text-amber-400 bg-amber-500/10 p-2 rounded-lg border border-amber-500/30">
          🌅 Put the morning routine in the right order!
        </p>
      </div>

      {/* Reorderable List */}
      <div className="flex-1 p-4 overflow-auto">
        <div className="space-y-2">
          <AnimatePresence>
            {items.map((item, index) => (
              <motion.div
                key={item}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                className={`flex items-center gap-2 p-3 rounded-lg border transition-all ${
                  submitted
                    ? item === correctOrder[index]
                      ? 'bg-green-500/20 border-green-500'
                      : 'bg-red-500/20 border-red-500'
                    : selectedIndex === index
                    ? 'bg-blue-500/20 border-blue-500'
                    : 'bg-slate-800/50 border-slate-700 hover:border-slate-500'
                }`}
              >
                {/* Move Buttons */}
                {!submitted && (
                  <div className="flex flex-col gap-0.5">
                    <button
                      onClick={() => moveItem(index, -1)}
                      disabled={index === 0}
                      className="p-1 rounded hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    >
                      <ArrowUp size={14} className="text-slate-400" />
                    </button>
                    <button
                      onClick={() => moveItem(index, 1)}
                      disabled={index === items.length - 1}
                      className="p-1 rounded hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    >
                      <ArrowDown size={14} className="text-slate-400" />
                    </button>
                  </div>
                )}

                {/* Number Badge */}
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                  submitted
                    ? item === correctOrder[index]
                      ? 'bg-green-600 text-white'
                      : 'bg-red-600 text-white'
                    : 'bg-slate-700 text-slate-300'
                }`}>
                  {index + 1}
                </span>

                {/* Item Text */}
                <span className="text-white flex-1">{item}</span>

                {/* Result Icon */}
                {submitted && (
                  item === correctOrder[index]
                    ? <CheckCircle size={18} className="text-green-400 shrink-0" />
                    : <XCircle size={18} className="text-red-400 shrink-0" />
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Result */}
      {submitted && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mx-4 mb-4 p-3 rounded-lg text-center ${
            isCorrect 
              ? 'bg-green-500/20 text-green-300 border border-green-500/30' 
              : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
          }`}
        >
          {isCorrect ? '🎉 Perfect! You got the order right!' : '🤔 Not quite! Some steps are out of place.'}
        </motion.div>
      )}

      {/* Buttons */}
      <div className="p-4 border-t border-slate-700/50 bg-slate-900/50 flex gap-2">
        {!submitted ? (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSubmit}
            className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold transition-colors"
          >
            Check Order
          </motion.button>
        ) : (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleReset}
            className="flex-1 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
          >
            <RotateCcw size={18} />
            Try Again
          </motion.button>
        )}
      </div>
    </div>
  );
};

export default SequenceReorderGame;
