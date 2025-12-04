import React from 'react';

const AboutPage = () => {
  return (
    <div className="pt-24 pb-20 min-h-screen bg-slate-50 dark:bg-slate-900 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6">
            About ZeroToCode
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            We believe that understanding how computers think shouldn't be reserved for computer scientists. 
            Our mission is to make logic building and programming accessible to everyone, starting from absolute zero.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 md:p-12 shadow-xl border border-slate-100 dark:border-slate-700 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 space-y-6">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Why we started</h2>
            <p className="text-slate-600 dark:text-slate-400">
              Traditional coding tutorials often jump straight into syntax without explaining the underlying logic. 
              We created ZeroToCode to bridge that gap, providing a visual and interactive way to learn the fundamentals.
            </p>
            <div className="flex gap-4 pt-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">10k+</div>
                <div className="text-sm text-slate-500">Students</div>
              </div>
              <div className="w-px bg-slate-200 dark:bg-slate-700"></div>
              <div className="text-center">
                <div className="text-3xl font-bold text-indigo-600">50+</div>
                <div className="text-sm text-slate-500">Modules</div>
              </div>
            </div>
          </div>
          
          {/* Illustration Placeholder */}
          <div className="flex-1 w-full aspect-video bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-2xl flex items-center justify-center">
            <span className="text-blue-500/50 font-bold text-xl">Mission Illustration</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
