import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CloudRain, Sun, Umbrella, Smile } from 'lucide-react';

const ConditionalBuilder = () => {
  const [isRaining, setIsRaining] = useState(null);
  const [step, setStep] = useState(0); // 0: ask, 1: show result

  const handleChoice = (raining) => {
    setIsRaining(raining);
    setStep(1);
  };

  const handleReset = () => {
    setIsRaining(null);
    setStep(0);
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-xl border border-slate-700 overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-slate-700/50">
        <h3 className="text-lg font-bold text-white">If / Else Decision</h3>
        <p className="text-sm text-slate-400 mt-1">Make a choice and see the outcome</p>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 flex flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          {step === 0 ? (
            <motion.div
              key="question"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center space-y-6"
            >
              <div className="text-6xl">🤔</div>
              <p className="text-xl text-white font-semibold">Is it raining outside?</p>
              <div className="flex gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleChoice(true)}
                  className="px-6 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold flex items-center gap-2 shadow-lg"
                >
                  <CloudRain size={20} />
                  Yes, it's raining
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleChoice(false)}
                  className="px-6 py-4 bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-semibold flex items-center gap-2 shadow-lg"
                >
                  <Sun size={20} />
                  No, it's sunny
                </motion.button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="text-center space-y-6"
            >
              {/* Result Icon */}
              <motion.div
                initial={{ y: -50 }}
                animate={{ y: 0 }}
                transition={{ type: 'spring', stiffness: 200 }}
                className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto ${
                  isRaining ? 'bg-blue-600' : 'bg-amber-500'
                }`}
              >
                {isRaining ? (
                  <Umbrella size={48} className="text-white" />
                ) : (
                  <Smile size={48} className="text-white" />
                )}
              </motion.div>

              {/* Result Text */}
              <div>
                <p className="text-xl text-white font-semibold">
                  {isRaining ? 'Take an umbrella! ☔' : 'Enjoy the sunshine! 🌞'}
                </p>
                <p className="text-slate-400 mt-2 text-sm">
                  The condition <code className="bg-slate-700 px-2 py-1 rounded">isRaining == {isRaining ? 'true' : 'false'}</code> was evaluated.
                </p>
              </div>

              {/* Code Block */}
              <div className="bg-slate-950 rounded-lg p-4 font-mono text-sm text-left max-w-sm mx-auto">
                <div><span className="text-blue-400">if</span> (isRaining) {'{'}</div>
                <div className={`pl-4 ${isRaining ? 'text-green-400' : 'text-slate-600'}`}>
                  takeUmbrella();{isRaining && ' ✓'}
                </div>
                <div>{'}'} <span className="text-blue-400">else</span> {'{'}</div>
                <div className={`pl-4 ${!isRaining ? 'text-green-400' : 'text-slate-600'}`}>
                  enjoySunshine();{!isRaining && ' ✓'}
                </div>
                <div>{'}'}</div>
              </div>

              {/* Reset */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleReset}
                className="px-6 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-sm"
              >
                Try Again
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ConditionalBuilder;
