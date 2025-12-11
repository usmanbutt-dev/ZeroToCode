import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw } from 'lucide-react';

const LoopPatternBuilder = () => {
  const [action, setAction] = useState('jump');
  const [count, setCount] = useState(3);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIteration, setCurrentIteration] = useState(0);
  const [avatarState, setAvatarState] = useState('idle');

  const actions = [
    { id: 'jump', emoji: '🦘', label: 'Jump' },
    { id: 'spin', emoji: '🌀', label: 'Spin' },
    { id: 'wave', emoji: '👋', label: 'Wave' },
    { id: 'clap', emoji: '👏', label: 'Clap' },
  ];

  useEffect(() => {
    if (!isPlaying) return;
    if (currentIteration >= count) {
      setIsPlaying(false);
      setAvatarState('idle');
      return;
    }

    setAvatarState(action);
    const timer = setTimeout(() => {
      setAvatarState('idle');
      setTimeout(() => {
        setCurrentIteration(prev => prev + 1);
      }, 200);
    }, 600);

    return () => clearTimeout(timer);
  }, [isPlaying, currentIteration, count, action]);

  const handlePlay = () => {
    setCurrentIteration(0);
    setIsPlaying(true);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentIteration(0);
    setAvatarState('idle');
  };

  const getAvatarAnimation = () => {
    switch (avatarState) {
      case 'jump': return { y: -30, scale: 1.1 };
      case 'spin': return { rotate: 360 };
      case 'wave': return { rotate: [0, 20, -20, 20, 0] };
      case 'clap': return { scale: [1, 1.2, 1] };
      default: return { y: 0, rotate: 0, scale: 1 };
    }
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-xl border border-slate-700 overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-slate-700/50">
        <h3 className="text-lg font-bold text-white">Loop Pattern Builder</h3>
        <p className="text-sm text-slate-400 mt-1">Choose an action and how many times to repeat</p>
      </div>

      {/* Avatar Stage */}
      <div className="flex-1 flex items-center justify-center bg-gradient-to-b from-slate-800 to-slate-900">
        <div className="text-center">
          <motion.div
            animate={getAvatarAnimation()}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="text-7xl mb-4"
          >
            🧍
          </motion.div>
          <AnimatePresence>
            {avatarState !== 'idle' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-2xl"
              >
                {actions.find(a => a.id === avatarState)?.emoji}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Counter */}
      <div className="px-4 py-2 text-center">
        <span className="text-3xl font-bold font-mono text-white">{currentIteration}</span>
        <span className="text-slate-500 font-mono"> / {count}</span>
        <p className="text-xs text-slate-400 mt-1">iterations completed</p>
      </div>

      {/* Controls */}
      <div className="p-4 border-t border-slate-700/50 bg-slate-900/50 space-y-4">
        {/* Action Picker */}
        <div className="space-y-2">
          <p className="text-xs text-slate-500">Choose action:</p>
          <div className="flex gap-2">
            {actions.map(a => (
              <motion.button
                key={a.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => !isPlaying && setAction(a.id)}
                disabled={isPlaying}
                className={`flex-1 py-2 rounded-lg text-center transition-colors ${
                  action === a.id
                    ? 'bg-purple-600 text-white'
                    : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                } disabled:opacity-50`}
              >
                <span className="text-lg">{a.emoji}</span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Count Picker */}
        <div className="space-y-2">
          <p className="text-xs text-slate-500">How many times?</p>
          <div className="flex gap-2">
            {[2, 3, 4, 5].map(n => (
              <motion.button
                key={n}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => !isPlaying && setCount(n)}
                disabled={isPlaying}
                className={`flex-1 py-2 rounded-lg font-mono font-bold transition-colors ${
                  count === n
                    ? 'bg-cyan-600 text-white'
                    : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                } disabled:opacity-50`}
              >
                {n}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Play Controls */}
        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={isPlaying ? () => setIsPlaying(false) : handlePlay}
            className={`flex-1 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 ${
              isPlaying
                ? 'bg-amber-500 text-white'
                : 'bg-emerald-600 hover:bg-emerald-700 text-white'
            }`}
          >
            {isPlaying ? <Pause size={18} /> : <Play size={18} />}
            {isPlaying ? 'Pause' : 'Play Loop'}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleReset}
            className="px-4 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg"
          >
            <RotateCcw size={18} />
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default LoopPatternBuilder;
