import React, { useState } from 'react';
import { motion, Reorder } from 'framer-motion';
import { Cpu, Maximize2, HardDrive, Save, Monitor } from 'lucide-react';

const COMPONENTS = [
  { id: 'cpu', name: 'CPU', icon: <Cpu />, description: 'The Brain', correctSlot: 'socket' },
  { id: 'ram', name: 'RAM', icon: <Maximize2 />, description: 'Short-term Memory', correctSlot: 'dimm' },
  { id: 'gpu', name: 'GPU', icon: <Monitor />, description: 'Graphics', correctSlot: 'pcie' },
  { id: 'storage', name: 'Storage', icon: <HardDrive />, description: 'Long-term Memory', correctSlot: 'sata' },
];

const HardwareBuilder = () => {
  const [placedItems, setPlacedItems] = useState({});
  const [message, setMessage] = useState("Drag components to their slots!");

  const handleDragEnd = (event, info, item) => {
    // Simple proximity check or just "drop" logic
    // For a robust implementation we'd use a drop zone, but for now we'll simulate success if dropped roughly in area
    // In this simplified version, we just click to place or drag to a generic "case" area.
    // Let's make it click-to-place for better accessibility and simplicity in this MVP, 
    // or a simple drag where we detect if it's over the board.
  };

  const handleSlotClick = (slotId) => {
    const item = COMPONENTS.find(c => c.correctSlot === slotId);
    if (!placedItems[slotId]) {
       // Find the component that matches this slot
       if (item) {
         setPlacedItems(prev => ({ ...prev, [slotId]: item }));
         setMessage(`Correct! Installed the ${item.name}.`);
       }
    }
  };

  const handleComponentClick = (item) => {
     if (Object.values(placedItems).some(placed => placed.id === item.id)) return;
     
     setPlacedItems(prev => ({ ...prev, [item.correctSlot]: item }));
     setMessage(`Installed ${item.name} into the ${item.correctSlot.toUpperCase()} slot.`);
  };

  const allPlaced = COMPONENTS.every(c => placedItems[c.correctSlot]);

  return (
    <div className="flex flex-col gap-6 p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700">
      <div className="text-center">
         <h3 className="text-lg font-bold text-slate-800 dark:text-white">PC Builder Challenge</h3>
         <p className="text-slate-600 dark:text-slate-400 text-sm">{allPlaced ? "System Complete! Booting up..." : message}</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8 items-start justify-center">
        {/* Components Repository */}
        <div className="grid grid-cols-2 md:grid-cols-1 gap-4 w-full md:w-1/3">
          {COMPONENTS.map((item) => {
            const isPlaced = Object.values(placedItems).some(p => p.id === item.id);
            return (
              <motion.button
                key={item.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleComponentClick(item)}
                disabled={isPlaced}
                className={`flex items-center gap-3 p-3 rounded-lg border-2 ${
                  isPlaced 
                    ? 'border-green-500 bg-green-50 dark:bg-green-900/20 opacity-50 cursor-default' 
                    : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-blue-500 cursor-pointer'
                }`}
              >
                <div className={`p-2 rounded-md ${isPlaced ? 'text-green-600' : 'text-blue-500 bg-blue-50 dark:bg-blue-900/20'}`}>
                  {item.icon}
                </div>
                <div className="text-left">
                  <div className="font-bold text-slate-900 dark:text-white text-sm">{item.name}</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">{item.description}</div>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Motherboard / Case View */}
        <div className="relative w-full md:w-2/3 aspect-[4/3] bg-slate-800 rounded-xl border-4 border-slate-600 shadow-inner p-6 overflow-hidden">
            {/* Decorative circuits */}
            <div className="absolute inset-0 opacity-10 pointer-events-none" 
                style={{backgroundImage: 'radial-gradient(circle at 2px 2px, slate-400 1px, transparent 0)', backgroundSize: '20px 20px'}}>
            </div>

            {/* Slots */}
            <div className="relative h-full w-full grid grid-cols-2 grid-rows-2 gap-4">
                
                {/* CPU Socket */}
                <div 
                    className={`relative border-2 border-dashed rounded-lg flex items-center justify-center transition-colors ${placedItems['socket'] ? 'border-green-500 bg-green-900/10' : 'border-slate-500 hover:bg-slate-700/50'}`}
                >
                    {placedItems['socket'] ? (
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex flex-col items-center text-green-400">
                            <Cpu size={40} />
                            <span className="text-xs font-mono mt-1">CPU INSTALLED</span>
                        </motion.div>
                    ) : (
                        <span className="text-xs text-slate-500 font-mono">CPU SOCKET</span>
                    )}
                </div>

                {/* RAM Slots */}
                <div 
                    className={`relative border-2 border-dashed rounded-lg flex items-center justify-center transition-colors ${placedItems['dimm'] ? 'border-green-500 bg-green-900/10' : 'border-slate-500 hover:bg-slate-700/50'}`}
                >
                     {placedItems['dimm'] ? (
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex flex-col items-center text-green-400">
                            <Maximize2 size={40} />
                            <span className="text-xs font-mono mt-1">RAM INSTALLED</span>
                        </motion.div>
                    ) : (
                        <span className="text-xs text-slate-500 font-mono">DIMM SLOTS</span>
                    )}
                </div>

                {/* PCIe Slots */}
                <div 
                    className={`relative border-2 border-dashed rounded-lg flex items-center justify-center transition-colors ${placedItems['pcie'] ? 'border-green-500 bg-green-900/10' : 'border-slate-500 hover:bg-slate-700/50'}`}
                >
                     {placedItems['pcie'] ? (
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex flex-col items-center text-green-400">
                            <Monitor size={40} />
                            <span className="text-xs font-mono mt-1">GPU INSTALLED</span>
                        </motion.div>
                    ) : (
                        <span className="text-xs text-slate-500 font-mono">PCIe SLOT</span>
                    )}
                </div>

                 {/* Storage Slots */}
                 <div 
                    className={`relative border-2 border-dashed rounded-lg flex items-center justify-center transition-colors ${placedItems['sata'] ? 'border-green-500 bg-green-900/10' : 'border-slate-500 hover:bg-slate-700/50'}`}
                >
                     {placedItems['sata'] ? (
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex flex-col items-center text-green-400">
                            <HardDrive size={40} />
                            <span className="text-xs font-mono mt-1">STORAGE INSTALLED</span>
                        </motion.div>
                    ) : (
                        <span className="text-xs text-slate-500 font-mono">SATA PORTS</span>
                    )}
                </div>
            </div>
        </div>
      </div>
      
      {allPlaced && (
          <motion.div 
            initial={{opacity: 0, y: 10}}
            animate={{opacity: 1, y: 0}}
            className="p-4 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 rounded-lg text-center"
          >
              <p>🎉 Excellent! You've assembled the core components. The CPU processes, RAM holds active work, Storage keeps files safe, and the GPU handles display.</p>
          </motion.div>
      )}
    </div>
  );
};

export default HardwareBuilder;
