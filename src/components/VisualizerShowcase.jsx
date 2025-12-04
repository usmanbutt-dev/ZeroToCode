import React, { useState } from 'react';
import BinaryBreaker from './minigames/BinaryBreaker';
import LogicLab from './minigames/LogicLab';

const VisualizerShowcase = () => {
  const [activeTab, setActiveTab] = useState('binary');

  return (
    <section className="py-20 bg-slate-900 overflow-hidden relative">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Interactive Learning <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Reimagined</span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Forget static text. Experience concepts with our interactive mini-games.
            Try them out right here!
          </p>
        </div>

        <div className="bg-slate-950 rounded-2xl border border-slate-800 shadow-2xl overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b border-slate-800">
            <button
              onClick={() => setActiveTab('binary')}
              className={`flex-1 py-4 text-sm font-medium transition-colors ${
                activeTab === 'binary'
                  ? 'bg-slate-900 text-white border-b-2 border-blue-500'
                  : 'text-slate-500 hover:text-slate-300 hover:bg-slate-900/50'
              }`}
            >
              🔢 Binary Breaker
            </button>
            <button
              onClick={() => setActiveTab('logic')}
              className={`flex-1 py-4 text-sm font-medium transition-colors ${
                activeTab === 'logic'
                  ? 'bg-slate-900 text-white border-b-2 border-purple-500'
                  : 'text-slate-500 hover:text-slate-300 hover:bg-slate-900/50'
              }`}
            >
              ⚡ Logic Lab
            </button>
          </div>

          {/* Visualizer Container */}
          <div className="p-4 md:p-8 h-[500px] bg-slate-900/50">
            {activeTab === 'binary' && (
              <div className="h-full w-full max-w-4xl mx-auto">
                 <BinaryBreaker />
              </div>
            )}
            {activeTab === 'logic' && (
              <div className="h-full w-full max-w-4xl mx-auto">
                <LogicLab />
              </div>
            )}
          </div>
          
          <div className="bg-slate-950 p-4 border-t border-slate-800 text-center">
            <p className="text-sm text-slate-500">
              These are just previews. <span className="text-white font-medium">Start the course</span> to access all 8 interactive modules!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisualizerShowcase;
