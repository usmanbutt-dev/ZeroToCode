import React from 'react';
import { Sparkles } from 'lucide-react';

const FunFact = ({ children }) => {
  return (
    <div className="my-4 flex items-start gap-3 p-4 bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
      <div className="shrink-0 w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-800 flex items-center justify-center">
        <Sparkles size={16} className="text-amber-600 dark:text-amber-300" />
      </div>
      <div>
        <div className="text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wide mb-1">
          Did You Know?
        </div>
        <div className="text-sm text-amber-800 dark:text-amber-200">
          {children}
        </div>
      </div>
    </div>
  );
};

export default FunFact;
