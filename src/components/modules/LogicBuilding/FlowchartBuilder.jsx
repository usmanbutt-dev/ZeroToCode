import React from 'react';
import { motion } from 'framer-motion';

const FlowchartBuilder = () => {
  // Simple static flowchart showing a decision flow
  const nodeVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (i) => ({
      opacity: 1,
      scale: 1,
      transition: { delay: i * 0.2, type: 'spring', stiffness: 200 }
    })
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-xl border border-slate-700 overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-slate-700/50">
        <h3 className="text-lg font-bold text-white">Flowchart: Making Tea</h3>
        <p className="text-sm text-slate-400 mt-1">Visual representation of logic flow</p>
      </div>

      {/* Flowchart */}
      <div className="flex-1 p-6 flex items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          {/* START */}
          <motion.div
            custom={0}
            initial="hidden"
            animate="visible"
            variants={nodeVariants}
            className="w-24 h-10 rounded-full bg-green-600 flex items-center justify-center text-white font-semibold text-sm"
          >
            START
          </motion.div>

          <Arrow delay={0.2} />

          {/* Step 1 */}
          <motion.div
            custom={1}
            initial="hidden"
            animate="visible"
            variants={nodeVariants}
            className="px-4 py-2 bg-blue-600 rounded-lg text-white text-sm text-center"
          >
            Boil Water
          </motion.div>

          <Arrow delay={0.4} />

          {/* Decision */}
          <motion.div
            custom={2}
            initial="hidden"
            animate="visible"
            variants={nodeVariants}
            className="relative"
          >
            <div className="w-32 h-16 bg-amber-500 rotate-45 rounded-lg" />
            <div className="absolute inset-0 flex items-center justify-center text-white text-sm font-semibold">
              Water Boiled?
            </div>
          </motion.div>

          {/* Branches */}
          <div className="flex gap-8 mt-2">
            {/* No Branch */}
            <div className="flex flex-col items-center">
              <motion.span
                custom={3}
                initial="hidden"
                animate="visible"
                variants={nodeVariants}
                className="text-red-400 text-xs font-bold mb-1"
              >
                NO
              </motion.span>
              <motion.div
                custom={3}
                initial="hidden"
                animate="visible"
                variants={nodeVariants}
                className="px-3 py-2 bg-slate-700 rounded-lg text-slate-300 text-xs text-center"
              >
                Wait...
              </motion.div>
              <Arrow delay={0.6} up />
            </div>

            {/* Yes Branch */}
            <div className="flex flex-col items-center">
              <motion.span
                custom={3}
                initial="hidden"
                animate="visible"
                variants={nodeVariants}
                className="text-green-400 text-xs font-bold mb-1"
              >
                YES
              </motion.span>
              <motion.div
                custom={3}
                initial="hidden"
                animate="visible"
                variants={nodeVariants}
                className="px-3 py-2 bg-blue-600 rounded-lg text-white text-xs text-center"
              >
                Add Tea Bag
              </motion.div>
            </div>
          </div>

          <Arrow delay={0.8} />

          {/* Step 3 */}
          <motion.div
            custom={4}
            initial="hidden"
            animate="visible"
            variants={nodeVariants}
            className="px-4 py-2 bg-blue-600 rounded-lg text-white text-sm text-center"
          >
            Pour into Cup
          </motion.div>

          <Arrow delay={1} />

          {/* END */}
          <motion.div
            custom={5}
            initial="hidden"
            animate="visible"
            variants={nodeVariants}
            className="w-24 h-10 rounded-full bg-red-600 flex items-center justify-center text-white font-semibold text-sm"
          >
            END
          </motion.div>
        </div>
      </div>

      {/* Legend */}
      <div className="p-4 border-t border-slate-700/50 bg-slate-900/50">
        <div className="flex flex-wrap gap-4 justify-center text-xs">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-green-600" />
            <span className="text-slate-400">Start/End</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-600 rounded" />
            <span className="text-slate-400">Process</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-amber-500 rotate-45 rounded-sm" />
            <span className="text-slate-400">Decision</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Arrow component
const Arrow = ({ delay = 0, up = false }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay }}
    className={`flex flex-col items-center ${up ? 'rotate-180' : ''}`}
  >
    <div className="w-0.5 h-4 bg-slate-500" />
    <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] border-transparent border-t-slate-500" />
  </motion.div>
);

export default FlowchartBuilder;
