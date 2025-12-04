import React from 'react';
import { Link } from 'react-router-dom';

const modules = [
  { id: 1, title: 'Computer Basics', desc: 'How computers actually work.', icon: '🖥️', color: 'blue' },
  { id: 2, title: 'Logic Building', desc: 'Think like a programmer.', icon: '🧠', color: 'purple' },
  { id: 3, title: 'C++ Fundamentals', desc: 'Your first lines of code.', icon: '⚡', color: 'green' },
  { id: 4, title: 'Control Flow', desc: 'Making decisions with code.', icon: '🔀', color: 'yellow' },
  { id: 5, title: 'Functions', desc: 'Reusable blocks of logic.', icon: '📦', color: 'pink' },
  { id: 6, title: 'Arrays', desc: 'Storing data collections.', icon: '📚', color: 'indigo' },
  { id: 7, title: 'Strings', desc: 'Working with text.', icon: '📝', color: 'teal' },
  { id: 8, title: 'Pointers', desc: 'Direct memory access.', icon: '🎯', color: 'orange' },
];

const CurriculumPreview = () => {
  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Complete Curriculum
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            From hardware basics to advanced memory management, we cover it all.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {modules.map((module) => (
            <Link 
              key={module.id} 
              to="/learn"
              className="group bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-500 shadow-sm hover:shadow-md transition-all hover:-translate-y-1"
            >
              <div className={`w-12 h-12 rounded-lg bg-${module.color}-100 dark:bg-${module.color}-900/30 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform`}>
                {module.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {module.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                {module.desc}
              </p>
            </Link>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Link 
            to="/learn"
            className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold hover:gap-3 transition-all"
          >
            View Full Syllabus <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CurriculumPreview;
