import React from 'react';
import { motion } from 'framer-motion';

const IPODiagram = () => {
  const boxVariants = {
    initial: { scale: 0.9, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
  };

  const arrowVariants = {
    initial: { pathLength: 0, opacity: 0 },
    animate: { pathLength: 1, opacity: 1 },
  };

  return (
    <div className="flex items-center justify-center p-8 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 h-full">
      <svg viewBox="0 0 400 120" className="w-full max-w-lg">
        {/* Input Box */}
        <motion.g
          initial="initial"
          animate="animate"
          variants={boxVariants}
          transition={{ delay: 0 }}
        >
          <rect x="10" y="35" width="80" height="50" rx="8" fill="#3B82F6" />
          <text x="50" y="65" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">
            INPUT
          </text>
          <text x="50" y="100" textAnchor="middle" fill="#64748B" fontSize="10">
            Keyboard, Mouse
          </text>
        </motion.g>

        {/* Arrow 1 */}
        <motion.path
          d="M 95 60 L 130 60"
          stroke="#94A3B8"
          strokeWidth="3"
          fill="none"
          markerEnd="url(#arrowhead)"
          initial="initial"
          animate="animate"
          variants={arrowVariants}
          transition={{ delay: 0.3, duration: 0.4 }}
        />

        {/* Process Box */}
        <motion.g
          initial="initial"
          animate="animate"
          variants={boxVariants}
          transition={{ delay: 0.5 }}
        >
          <rect x="135" y="35" width="80" height="50" rx="8" fill="#8B5CF6" />
          <text x="175" y="65" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">
            PROCESS
          </text>
          <text x="175" y="100" textAnchor="middle" fill="#64748B" fontSize="10">
            CPU (The Brain)
          </text>
        </motion.g>

        {/* Arrow 2 */}
        <motion.path
          d="M 220 60 L 255 60"
          stroke="#94A3B8"
          strokeWidth="3"
          fill="none"
          markerEnd="url(#arrowhead)"
          initial="initial"
          animate="animate"
          variants={arrowVariants}
          transition={{ delay: 0.8, duration: 0.4 }}
        />

        {/* Output Box */}
        <motion.g
          initial="initial"
          animate="animate"
          variants={boxVariants}
          transition={{ delay: 1 }}
        >
          <rect x="260" y="35" width="80" height="50" rx="8" fill="#10B981" />
          <text x="300" y="65" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">
            OUTPUT
          </text>
          <text x="300" y="100" textAnchor="middle" fill="#64748B" fontSize="10">
            Screen, Audio
          </text>
        </motion.g>

        {/* Storage Box (Below) */}
        <motion.g
          initial="initial"
          animate="animate"
          variants={boxVariants}
          transition={{ delay: 1.2 }}
        >
          <rect x="350" y="35" width="40" height="50" rx="8" fill="#F59E0B" />
          <text x="370" y="60" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">
            STORE
          </text>
          <text x="370" y="73" textAnchor="middle" fill="white" fontSize="8">
            📁
          </text>
        </motion.g>

        {/* Arrow 3 to Storage */}
        <motion.path
          d="M 340 60 L 345 60"
          stroke="#94A3B8"
          strokeWidth="3"
          fill="none"
          markerEnd="url(#arrowhead)"
          initial="initial"
          animate="animate"
          variants={arrowVariants}
          transition={{ delay: 1.1, duration: 0.3 }}
        />

        {/* Arrowhead definition */}
        <defs>
          <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#94A3B8" />
          </marker>
        </defs>
      </svg>
    </div>
  );
};

export default IPODiagram;
