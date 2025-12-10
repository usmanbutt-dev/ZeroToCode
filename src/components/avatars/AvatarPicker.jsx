import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Sparkles } from 'lucide-react';
import GlassBot, { AVATAR_VARIANTS, AVATAR_INFO } from './GlassBot';

/**
 * Avatar Picker Modal
 * Allows users to select their avatar from the GlassBot variants
 */
const AvatarPicker = ({ isOpen, onClose, currentAvatar, onSelect }) => {
  const [selectedAvatar, setSelectedAvatar] = useState(currentAvatar || 'standard');
  const [hoveredAvatar, setHoveredAvatar] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSelect = async () => {
    setIsLoading(true);
    await onSelect(selectedAvatar);
    setIsLoading(false);
    onClose();
  };

  if (!isOpen) return null;

  // Display info for preview - show hovered if hovering, otherwise selected
  const displayAvatar = hoveredAvatar || selectedAvatar;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
        >
          {/* Gradient top strip */}
          <div className="h-1.5 bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-500" />
          
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-gradient-to-br from-violet-500 to-indigo-500 rounded-lg flex items-center justify-center shadow-lg shadow-violet-500/25">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                  Choose Your Avatar
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Pick a GlassBot that represents you!
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Avatar Preview - Compact */}
          <div className="p-4 bg-gradient-to-br from-slate-50 to-violet-50/50 dark:from-slate-800 dark:to-violet-900/20">
            <div className="flex items-center gap-4">
              {/* Avatar */}
              <motion.div 
                key={displayAvatar}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", damping: 15 }}
                className="relative flex-shrink-0"
              >
                <div className="w-24 h-24 bg-white dark:bg-slate-700 rounded-2xl p-2 shadow-lg border border-slate-200 dark:border-slate-600">
                  <GlassBot variant={displayAvatar} size={80} animated={true} />
                </div>
                
                {selectedAvatar === displayAvatar && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -bottom-1 -right-1 w-7 h-7 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-md border-2 border-white dark:border-slate-800"
                  >
                    <Check className="w-4 h-4 text-white" />
                  </motion.div>
                )}
              </motion.div>
              
              {/* Info */}
              <motion.div
                key={`info-${displayAvatar}`}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex-1 min-w-0"
              >
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{AVATAR_INFO[displayAvatar]?.emoji}</span>
                  <span className="text-lg font-bold text-slate-900 dark:text-white truncate">
                    {AVATAR_INFO[displayAvatar]?.name}
                  </span>
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                  {AVATAR_INFO[displayAvatar]?.description}
                </p>
              </motion.div>
            </div>
          </div>

          {/* Avatar Grid - Scrollable */}
          <div className="p-4 max-h-52 overflow-y-auto">
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">
              Select Your Bot
            </p>
            <div className="grid grid-cols-5 gap-2">
              {AVATAR_VARIANTS.map((variant) => (
                <motion.button
                  key={variant}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedAvatar(variant)}
                  onMouseEnter={() => setHoveredAvatar(variant)}
                  onMouseLeave={() => setHoveredAvatar(null)}
                  className={`
                    relative p-2 rounded-xl transition-all duration-150
                    ${selectedAvatar === variant
                      ? 'bg-violet-100 dark:bg-violet-900/40 ring-2 ring-violet-500'
                      : 'bg-slate-100 dark:bg-slate-700/50 hover:bg-slate-200 dark:hover:bg-slate-700 ring-1 ring-transparent hover:ring-violet-300 dark:hover:ring-violet-600/50'
                    }
                  `}
                  title={AVATAR_INFO[variant]?.name}
                >
                  <GlassBot variant={variant} size={44} animated={selectedAvatar === variant || hoveredAvatar === variant} />
                  
                  {selectedAvatar === variant && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-violet-500 rounded-full flex items-center justify-center">
                      <Check className="w-2.5 h-2.5 text-white" />
                    </div>
                  )}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="flex gap-3 p-4 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2.5 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-xl font-medium hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSelect}
              disabled={isLoading}
              className="flex-1 px-4 py-2.5 bg-gradient-to-r from-violet-500 to-indigo-500 hover:from-violet-400 hover:to-indigo-400 text-white rounded-xl font-semibold transition-all shadow-lg shadow-violet-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Saving...</span>
                </div>
              ) : (
                'Save Avatar'
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default AvatarPicker;
