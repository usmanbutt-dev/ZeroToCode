import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, CheckCircle } from 'lucide-react';
import ProgressBar from './ProgressBar';

const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 50 : -50,
    opacity: 0
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1
  },
  exit: (direction) => ({
    zIndex: 0,
    x: direction < 0 ? 50 : -50,
    opacity: 0
  })
};

const TopicViewer = ({ topics, onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const currentTopic = topics[currentIndex];
  const isLastStep = currentIndex === topics.length - 1;

  const handleNext = useCallback(() => {
    if (isLastStep) {
      if (onComplete) onComplete();
    } else {
      setDirection(1);
      setCurrentIndex(prev => prev + 1);
    }
  }, [isLastStep, onComplete]);

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      setDirection(-1);
      setCurrentIndex(prev => prev - 1);
    }
  }, [currentIndex]);

  // Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev]);

  return (
    <div className="flex flex-col gap-6">
      {/* Progress Bar */}
      <ProgressBar 
        currentStep={currentIndex}
        totalSteps={topics.length}
        title={currentTopic.title}
        readTime={currentTopic.readTime}
      />

      <div className="grid lg:grid-cols-2 gap-8 overflow-hidden">
        {/* Content Pane */}
        <div className="space-y-6 flex flex-col relative min-h-[400px]">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              className="space-y-4 flex-1"
            >
              {/* Learning Objective */}
              {currentTopic.objective && (
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-lg">
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    <span className="font-semibold">🎯 Goal:</span> {currentTopic.objective}
                  </p>
                </div>
              )}

              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                {currentTopic.title}
              </h2>
              
              <div className="prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-300 leading-relaxed">
                {currentTopic.content}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons (Fixed at bottom) */}
          <div className="flex items-center gap-4 pt-4 mt-auto border-t border-slate-100 dark:border-slate-700 z-10 bg-white dark:bg-slate-800">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className={`flex items-center gap-1 px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 transition-colors ${
                currentIndex === 0 
                  ? 'opacity-50 cursor-not-allowed text-slate-400' 
                  : 'hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300'
              }`}
            >
              <ChevronLeft size={18} />
              <span className="hidden sm:inline">Back</span>
            </button>
            
            <button
              onClick={handleNext}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-all shadow-lg shadow-blue-500/30 hover:-translate-y-0.5"
            >
              {isLastStep ? (
                <>Complete Module <CheckCircle size={18} /></>
              ) : (
                <>Continue <ChevronRight size={18} /></>
              )}
            </button>
          </div>

          {/* Keyboard Hint */}
          <p className="text-center text-xs text-slate-400 dark:text-slate-500 z-10">
            Tip: Use <kbd className="px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 rounded text-xs">←</kbd> <kbd className="px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 rounded text-xs">→</kbd> arrow keys to navigate
          </p>
        </div>

        {/* Visualizer Pane */}
        <div className="lg:h-auto min-h-[400px] relative">
           <AnimatePresence mode="wait" custom={direction}>
             <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 }
                }}
                className="h-full w-full"
             >
               {currentTopic.visualizer ? (
                   currentTopic.visualizer
               ) : (
                   <div className="h-full flex items-center justify-center bg-slate-50 dark:bg-slate-900 rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-700 p-8 text-center text-slate-400">
                       <p>Take a moment to read and understand the content on the left. ✨</p>
                   </div>
               )}
             </motion.div>
           </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default TopicViewer;
