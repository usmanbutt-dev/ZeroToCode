import React, { useState } from 'react';

const ComputerBasicsVisualizer = () => {
  const [installed, setInstalled] = useState({
    cpu: false,
    ram: false,
    storage: false,
    gpu: false
  });

  const components = [
    { id: 'cpu', name: 'CPU', icon: '🧠', desc: 'The Brain', color: 'bg-blue-500' },
    { id: 'ram', name: 'RAM', icon: '⚡', desc: 'Short-term Memory', color: 'bg-green-500' },
    { id: 'storage', name: 'SSD', icon: '💾', desc: 'Long-term Storage', color: 'bg-orange-500' },
    { id: 'gpu', name: 'GPU', icon: '🎮', desc: 'Graphics Power', color: 'bg-purple-500' }
  ];

  const toggleInstall = (id) => {
    setInstalled(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const allInstalled = Object.values(installed).every(Boolean);

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 bg-slate-900 rounded-xl p-6 relative overflow-hidden border border-slate-700">
        {/* Motherboard Background */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="w-full h-full grid grid-cols-6 grid-rows-6 gap-1">
            {[...Array(36)].map((_, i) => (
              <div key={i} className="border border-slate-500 rounded-sm"></div>
            ))}
          </div>
        </div>

        <h3 className="text-white font-bold text-center mb-6 relative z-10">Build Your PC</h3>

        {/* Motherboard Slots */}
        <div className="relative z-10 grid grid-cols-2 gap-4 mb-8">
          {components.map((comp) => (
            <div 
              key={comp.id}
              onClick={() => toggleInstall(comp.id)}
              className={`
                h-24 rounded-lg border-2 border-dashed transition-all cursor-pointer flex flex-col items-center justify-center
                ${installed[comp.id] 
                  ? `${comp.color} border-transparent shadow-lg scale-100` 
                  : 'border-slate-600 bg-slate-800/50 hover:bg-slate-800 hover:border-slate-500'
                }
              `}
            >
              <div className="text-2xl mb-1">{comp.icon}</div>
              <div className={`text-xs font-bold ${installed[comp.id] ? 'text-white' : 'text-slate-400'}`}>
                {comp.name}
              </div>
              {installed[comp.id] && (
                <div className="text-[10px] text-white/80">{comp.desc}</div>
              )}
            </div>
          ))}
        </div>

        {/* Status */}
        <div className={`text-center transition-all duration-500 ${allInstalled ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'}`}>
          <div className="inline-block px-4 py-2 bg-green-500 text-white rounded-full font-bold shadow-lg animate-bounce">
            System Ready! 🚀
          </div>
        </div>
      </div>
      
      <p className="text-center text-xs text-slate-500 mt-3">
        Click slots to install components
      </p>
    </div>
  );
};

export default ComputerBasicsVisualizer;
