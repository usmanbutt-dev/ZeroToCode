import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Term = ({ word, definition, children }) => {
  const [isVisible, setIsVisible] = React.useState(false);

  return (
    <span className="relative inline-block">
      <span
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        onClick={() => setIsVisible(!isVisible)}
        className="border-b-2 border-dotted border-blue-400 dark:border-blue-500 text-blue-600 dark:text-blue-400 cursor-help font-medium"
      >
        {children || word}
      </span>
      
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 5, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 bg-slate-900 dark:bg-slate-700 text-white text-sm rounded-lg shadow-xl pointer-events-none"
          >
            <div className="font-bold text-blue-300 mb-1">{word}</div>
            <div className="text-slate-200 text-xs leading-relaxed">{definition}</div>
            {/* Arrow */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-slate-900 dark:border-t-slate-700" />
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
};

export default Term;
