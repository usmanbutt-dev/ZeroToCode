import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, HelpCircle } from 'lucide-react';

const MiniQuiz = ({ question, options, correctIndex, explanation, onComplete }) => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const handleSelect = (index) => {
    if (showResult) return;
    setSelectedIndex(index);
    setShowResult(true);
    
    // Auto-proceed after a delay if onComplete is provided
    if (onComplete) {
      setTimeout(() => onComplete(index === correctIndex), 2500);
    }
  };

  const isCorrect = selectedIndex === correctIndex;

  return (
    <div className="p-6 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-xl border border-indigo-200 dark:border-indigo-800">
      <div className="flex items-center gap-2 mb-4">
        <HelpCircle className="text-indigo-500" size={20} />
        <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wide">
          Quick Check
        </span>
      </div>

      <p className="text-lg font-semibold text-slate-800 dark:text-white mb-4">
        {question}
      </p>

      <div className="space-y-2">
        {options.map((option, index) => {
          let buttonStyle = 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-indigo-400';
          
          if (showResult) {
            if (index === correctIndex) {
              buttonStyle = 'bg-green-50 dark:bg-green-900/30 border-green-500 text-green-700 dark:text-green-300';
            } else if (index === selectedIndex && !isCorrect) {
              buttonStyle = 'bg-red-50 dark:bg-red-900/30 border-red-500 text-red-700 dark:text-red-300';
            } else {
              buttonStyle = 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 opacity-50';
            }
          }

          return (
            <motion.button
              key={index}
              whileHover={!showResult ? { scale: 1.01 } : {}}
              whileTap={!showResult ? { scale: 0.99 } : {}}
              onClick={() => handleSelect(index)}
              disabled={showResult}
              className={`w-full p-4 rounded-lg border-2 text-left transition-all flex items-center gap-3 ${buttonStyle}`}
            >
              <span className="w-6 h-6 rounded-full border-2 border-current flex items-center justify-center text-sm font-bold shrink-0">
                {String.fromCharCode(65 + index)}
              </span>
              <span className="flex-1">{option}</span>
              {showResult && index === correctIndex && (
                <CheckCircle className="text-green-500 shrink-0" size={20} />
              )}
              {showResult && index === selectedIndex && !isCorrect && (
                <XCircle className="text-red-500 shrink-0" size={20} />
              )}
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence>
        {showResult && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mt-4 p-4 rounded-lg ${
              isCorrect 
                ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200' 
                : 'bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-200'
            }`}
          >
            <p className="font-semibold mb-1">
              {isCorrect ? '🎉 Correct!' : '💡 Not quite!'}
            </p>
            <p className="text-sm">{explanation}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MiniQuiz;
