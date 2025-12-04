import React from 'react';

const ModuleCard = ({ title, description, color, icon, progress = 0, onStart }) => {
  // Map color names to Tailwind classes
  const colorMap = {
    blue: 'bg-blue-500 text-blue-500',
    green: 'bg-emerald-500 text-emerald-500',
    orange: 'bg-orange-500 text-orange-500',
    red: 'bg-rose-500 text-rose-500',
    purple: 'bg-purple-500 text-purple-500',
    teal: 'bg-teal-500 text-teal-500',
    cyan: 'bg-cyan-500 text-cyan-500',
    amber: 'bg-amber-500 text-amber-500',
  };

  const themeClass = colorMap[color] || colorMap.blue;
  const bgClass = themeClass.split(' ')[0];
  const textClass = themeClass.split(' ')[1];

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-100 dark:border-slate-700 hover:shadow-xl transition-all hover:-translate-y-1 flex flex-col h-full group">
      
      {/* Header with Icon and Title */}
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 rounded-xl ${bgClass} bg-opacity-10 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform`}>
          {icon}
        </div>
        {/* Progress Badge */}
        <div className="px-2 py-1 rounded-md bg-slate-100 dark:bg-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-300">
          {progress}%
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 mb-6">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {title}
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
          {description}
        </p>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-100 dark:bg-slate-700 h-1.5 rounded-full mb-6 overflow-hidden">
        <div 
          className={`h-full ${bgClass} rounded-full transition-all duration-500`} 
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {/* Footer / Action */}
      <button 
        onClick={onStart}
        className={`w-full py-3 rounded-xl font-semibold text-white ${bgClass} hover:opacity-90 transition-opacity shadow-lg shadow-blue-500/20`}
      >
        Start Module
      </button>
    </div>
  );
};

export default ModuleCard;
