import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Chrome, Gamepad2, Music, MemoryStick } from 'lucide-react';

const TaskManagerMini = () => {
  const [apps, setApps] = useState([
    { id: 1, name: 'Chrome', icon: Chrome, ram: 35, color: 'text-yellow-400' },
    { id: 2, name: 'Game', icon: Gamepad2, ram: 45, color: 'text-purple-400' },
    { id: 3, name: 'Music', icon: Music, ram: 10, color: 'text-green-400' },
  ]);

  const totalRAM = 100;
  const usedRAM = apps.reduce((sum, app) => sum + app.ram, 0);
  const freeRAM = totalRAM - usedRAM;

  const closeApp = (id) => {
    setApps(apps.filter(app => app.id !== id));
  };

  const reopenApp = (app) => {
    if (!apps.find(a => a.name === app.name)) {
      setApps([...apps, { ...app, id: Date.now() }]);
    }
  };

  const allApps = [
    { name: 'Chrome', icon: Chrome, ram: 35, color: 'text-yellow-400' },
    { name: 'Game', icon: Gamepad2, ram: 45, color: 'text-purple-400' },
    { name: 'Music', icon: Music, ram: 10, color: 'text-green-400' },
  ];

  const closedApps = allApps.filter(app => !apps.find(a => a.name === app.name));

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-xl border border-slate-700 overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-slate-700/50">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <MemoryStick size={20} className="text-emerald-400" />
          Task Manager
        </h3>
        <p className="text-sm text-slate-400 mt-1">See how apps use RAM</p>
      </div>

      {/* RAM Bar */}
      <div className="p-4 border-b border-slate-700/50">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-slate-400">RAM Usage</span>
          <span className="text-white font-mono">{usedRAM}% / {totalRAM}%</span>
        </div>
        <div className="h-6 bg-slate-700 rounded-full overflow-hidden flex">
          {apps.map((app, index) => (
            <motion.div
              key={app.id}
              layout
              initial={{ width: 0 }}
              animate={{ width: `${app.ram}%` }}
              exit={{ width: 0 }}
              className={`h-full ${
                index === 0 ? 'bg-yellow-500' :
                index === 1 ? 'bg-purple-500' : 'bg-green-500'
              }`}
              title={`${app.name}: ${app.ram}%`}
            />
          ))}
        </div>
        <div className="flex justify-between text-xs mt-1">
          <span className={usedRAM > 80 ? 'text-red-400' : 'text-emerald-400'}>
            {usedRAM > 80 ? '⚠️ High usage!' : `${freeRAM}% free`}
          </span>
        </div>
      </div>

      {/* Running Apps */}
      <div className="flex-1 p-4 space-y-2 overflow-auto">
        <p className="text-xs text-slate-500 uppercase tracking-wide mb-2">Running Apps</p>
        {apps.length === 0 ? (
          <p className="text-slate-500 text-sm text-center py-4">No apps running. RAM is free!</p>
        ) : (
          apps.map((app) => (
            <motion.div
              key={app.id}
              layout
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg border border-slate-700"
            >
              <div className="flex items-center gap-3">
                <app.icon size={20} className={app.color} />
                <span className="text-white text-sm">{app.name}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-slate-400 text-xs font-mono">{app.ram}%</span>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => closeApp(app.id)}
                  className="p-1 bg-red-500/20 hover:bg-red-500/40 rounded text-red-400 transition-colors"
                >
                  <X size={14} />
                </motion.button>
              </div>
            </motion.div>
          ))
        )}

        {/* Closed Apps - Reopen */}
        {closedApps.length > 0 && (
          <>
            <p className="text-xs text-slate-500 uppercase tracking-wide mt-4 mb-2">Open an App</p>
            <div className="flex gap-2">
              {closedApps.map((app) => (
                <motion.button
                  key={app.name}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => reopenApp(app)}
                  className="flex-1 p-2 bg-slate-800/50 hover:bg-slate-700/50 rounded-lg border border-dashed border-slate-600 text-center transition-colors"
                >
                  <app.icon size={20} className={`${app.color} mx-auto mb-1`} />
                  <span className="text-xs text-slate-400">{app.name}</span>
                </motion.button>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-slate-700/50 bg-slate-900/50">
        <p className="text-xs text-slate-400 text-center">
          Close apps to free up RAM. More RAM = faster computer!
        </p>
      </div>
    </div>
  );
};

export default TaskManagerMini;
