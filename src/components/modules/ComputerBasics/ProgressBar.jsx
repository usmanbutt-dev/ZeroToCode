import React from 'react';
import { motion } from 'framer-motion';

const ProgressBar = ({ currentStep, totalSteps, title, readTime }) => {
  const progress = ((currentStep + 1) / totalSteps) * 100;

  return (
    <div className="mb-6 space-y-3">
      {/* Step Info */}
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-2">
          <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-md font-mono font-bold">
            {currentStep + 1}/{totalSteps}
          </span>
          <span className="text-slate-600 dark:text-slate-400 font-medium truncate max-w-[200px] sm:max-w-none">
            {title}
          </span>
        </div>
        {readTime && (
          <span className="text-slate-400 dark:text-slate-500 text-xs flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {readTime}
          </span>
        )}
      </div>

      {/* Progress Bar */}
      <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        />
      </div>

      {/* Step Dots (Optional - Visual Indicator) */}
      <div className="flex justify-between px-1">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-colors ${
              index < currentStep
                ? 'bg-blue-500'
                : index === currentStep
                ? 'bg-blue-600 ring-2 ring-blue-300 dark:ring-blue-700'
                : 'bg-slate-300 dark:bg-slate-600'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;
