import React from 'react';

const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="group p-8 bg-white dark:bg-slate-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-slate-100 dark:border-slate-700">
      <div className="w-14 h-14 bg-blue-50 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
        <div className="text-blue-600 dark:text-blue-400">
          {icon}
        </div>
      </div>
      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 font-heading">
        {title}
      </h3>
      <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
        {description}
      </p>
    </div>
  );
};

export default FeatureCard;
