import React from 'react';
import { Globe } from 'lucide-react';

const RealWorld = ({ children }) => {
  return (
    <div className="my-4 flex items-start gap-3 p-4 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 border border-emerald-200 dark:border-emerald-800 rounded-lg">
      <div className="shrink-0 w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-800 flex items-center justify-center">
        <Globe size={16} className="text-emerald-600 dark:text-emerald-300" />
      </div>
      <div>
        <div className="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wide mb-1">
          Real-World Connection
        </div>
        <div className="text-sm text-emerald-800 dark:text-emerald-200">
          {children}
        </div>
      </div>
    </div>
  );
};

export default RealWorld;
