import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, LightbulbOff } from 'lucide-react';

const SingleBit = () => {
  const [isOn, setIsOn] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 h-full">
        <h3 className="text-2xl font-bold mb-2 text-slate-800 dark:text-white">The Atomic Unit: A Bit</h3>
        <p className="text-slate-500 dark:text-slate-400 mb-12 text-center max-w-md">
            At the smallest level, a computer is just millions of tiny switches.
        </p>

        <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOn(!isOn)}
            className={`relative w-40 h-64 rounded-2xl border-4 transition-all duration-300 shadow-xl ${
                isOn 
                ? 'bg-yellow-100 border-yellow-400 shadow-yellow-500/50' 
                : 'bg-slate-200 border-slate-400 shadow-slate-900/20'
            }`}
        >
            {/* Switch Toggle */}
            <motion.div 
                layout
                className={`absolute inset-x-4 h-24 rounded-xl shadow-sm border-2 flex items-center justify-center ${
                    isOn
                    ? 'top-4 bg-white border-yellow-200'
                    : 'bottom-4 bg-slate-300 border-slate-400'
                }`}
            >
                <div className="w-8 h-1 rounded-full bg-slate-300 dark:bg-slate-400" />
            </motion.div>

            {/* Icon Overlay */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                 {isOn ? (
                     <Lightbulb size={64} className="text-yellow-500 drop-shadow-md" />
                 ) : (
                     <LightbulbOff size={64} className="text-slate-400" />
                 )}
            </div>
        </motion.button>

        <div className="mt-12 flex gap-12 text-center">
            <div>
                <div className="text-sm font-semibold text-slate-500 uppercase">State</div>
                <div className={`text-4xl font-bold font-mono ${isOn ? 'text-yellow-600' : 'text-slate-700 dark:text-slate-300'}`}>
                    {isOn ? "ON" : "OFF"}
                </div>
            </div>
            <div>
                <div className="text-sm font-semibold text-slate-500 uppercase">Binary</div>
                <div className={`text-4xl font-bold font-mono ${isOn ? 'text-blue-600' : 'text-slate-700 dark:text-slate-300'}`}>
                    {isOn ? "1" : "0"}
                </div>
            </div>
        </div>
    </div>
  );
};

export default SingleBit;
