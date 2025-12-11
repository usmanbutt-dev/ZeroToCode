import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, ArrowRight, Zap, Clock } from 'lucide-react';

const RamVsStorage = () => {
    const [step, setStep] = useState(0); // 0: idle, 1: loading, 2: active, 3: saving
    const [isPlaying, setIsPlaying] = useState(true);

    useEffect(() => {
        if (!isPlaying) return;
        const timer = setInterval(() => {
            setStep(current => (current + 1) % 4);
        }, 2500);
        return () => clearInterval(timer);
    }, [isPlaying]);

    const stepLabels = [
        { text: "File resting in Storage (permanent, but slow to access)", color: "text-slate-500" },
        { text: "Loading file into RAM...", color: "text-blue-500 font-semibold" },
        { text: "File is in RAM! Lightning-fast access for the CPU", color: "text-green-500 font-semibold" },
        { text: "Saving changes back to permanent storage...", color: "text-amber-500" },
    ];

    return (
        <div className="flex flex-col h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-xl border border-slate-700 overflow-hidden">
            {/* Header */}
            <div className="p-4 border-b border-slate-700/50 flex items-center justify-between">
                <h3 className="text-lg font-bold text-white">RAM vs Storage</h3>
                <button 
                    onClick={() => setIsPlaying(!isPlaying)}
                    className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
                        isPlaying 
                            ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                            : 'bg-slate-700 text-slate-400 border border-slate-600'
                    }`}
                >
                    {isPlaying ? '● Playing' : '○ Paused'}
                </button>
            </div>

            {/* Main Visualization */}
            <div className="flex-1 p-6 flex items-center justify-center">
                <div className="relative flex items-center gap-6 w-full max-w-2xl">

                    {/* STORAGE - The Warehouse */}
                    <motion.div 
                        className={`relative flex-1 rounded-2xl p-6 transition-all duration-500 ${
                            step === 0 || step === 3
                                ? 'bg-gradient-to-br from-amber-900/40 to-orange-900/40 border-2 border-amber-500/50 shadow-lg shadow-amber-500/10'
                                : 'bg-slate-800/50 border-2 border-slate-700'
                        }`}
                    >
                        {/* Warehouse Icon */}
                        <div className="flex flex-col items-center gap-3">
                            <div className="relative">
                                {/* Building shape */}
                                <div className="w-20 h-16 bg-gradient-to-b from-amber-700 to-amber-900 rounded-t-lg relative">
                                    {/* Roof */}
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[44px] border-r-[44px] border-b-[12px] border-transparent border-b-amber-600"></div>
                                    {/* Door */}
                                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-8 bg-amber-950 rounded-t-sm"></div>
                                    {/* Windows */}
                                    <div className="absolute top-3 left-2 w-4 h-3 bg-amber-400/50 rounded-sm"></div>
                                    <div className="absolute top-3 right-2 w-4 h-3 bg-amber-400/50 rounded-sm"></div>
                                </div>
                            </div>
                            <div className="text-center">
                                <p className="font-bold text-white text-lg">Storage</p>
                                <p className="text-amber-400 text-sm">The Warehouse</p>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-slate-400">
                                <Clock size={12} />
                                <span>Slow but Permanent</span>
                            </div>
                        </div>

                        {/* File inside storage */}
                        <AnimatePresence>
                            {(step === 0 || step === 3) && (
                                <motion.div
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0, opacity: 0 }}
                                    className="absolute top-4 right-4"
                                >
                                    <div className="p-2 bg-amber-500/20 rounded-lg border border-amber-500/30">
                                        <FileText size={24} className="text-amber-400" />
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>

                    {/* Arrow / Transfer Animation */}
                    <div className="relative w-24 flex flex-col items-center justify-center">
                        <AnimatePresence>
                            {step === 1 && (
                                <motion.div
                                    initial={{ x: -40, opacity: 0 }}
                                    animate={{ x: 40, opacity: [0, 1, 1, 0] }}
                                    transition={{ duration: 1.5, ease: "easeInOut" }}
                                    className="absolute"
                                >
                                    <div className="p-2 bg-blue-500 rounded-lg shadow-lg shadow-blue-500/50">
                                        <FileText size={20} className="text-white" />
                                    </div>
                                </motion.div>
                            )}
                            {step === 3 && (
                                <motion.div
                                    initial={{ x: 40, opacity: 0 }}
                                    animate={{ x: -40, opacity: [0, 1, 1, 0] }}
                                    transition={{ duration: 1.5, ease: "easeInOut" }}
                                    className="absolute"
                                >
                                    <div className="p-2 bg-amber-500 rounded-lg shadow-lg shadow-amber-500/50">
                                        <FileText size={20} className="text-white" />
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                        
                        {/* Static arrows */}
                        <div className="flex flex-col gap-1 text-slate-600">
                            <ArrowRight size={20} />
                            <ArrowRight size={20} className="rotate-180" />
                        </div>
                    </div>

                    {/* RAM - The Desk */}
                    <motion.div 
                        className={`relative flex-1 rounded-2xl p-6 transition-all duration-500 ${
                            step === 2
                                ? 'bg-gradient-to-br from-emerald-900/40 to-teal-900/40 border-2 border-emerald-500/50 shadow-lg shadow-emerald-500/10'
                                : step === 1
                                ? 'bg-gradient-to-br from-blue-900/40 to-cyan-900/40 border-2 border-blue-500/50'
                                : 'bg-slate-800/50 border-2 border-slate-700'
                        }`}
                    >
                        {/* Desk Icon */}
                        <div className="flex flex-col items-center gap-3">
                            <div className="relative">
                                {/* Desk shape */}
                                <div className="w-20 h-12 bg-gradient-to-b from-cyan-700 to-cyan-900 rounded-t-lg relative">
                                    {/* Desktop surface highlight */}
                                    <div className="absolute top-0 left-0 right-0 h-2 bg-cyan-500/30 rounded-t-lg"></div>
                                    {/* Monitor on desk */}
                                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-10 h-7 bg-slate-900 rounded-sm border-2 border-cyan-600">
                                        <div className="w-full h-full bg-gradient-to-br from-cyan-400/20 to-transparent"></div>
                                    </div>
                                </div>
                                {/* Legs */}
                                <div className="flex justify-between px-2">
                                    <div className="w-2 h-4 bg-cyan-900"></div>
                                    <div className="w-2 h-4 bg-cyan-900"></div>
                                </div>
                            </div>
                            <div className="text-center">
                                <p className="font-bold text-white text-lg">RAM</p>
                                <p className="text-cyan-400 text-sm">The Workbench</p>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-slate-400">
                                <Zap size={12} className="text-yellow-400" />
                                <span>Fast but Temporary</span>
                            </div>
                        </div>

                        {/* File on desk (active) */}
                        <AnimatePresence>
                            {step === 2 && (
                                <motion.div
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0, opacity: 0 }}
                                    className="absolute top-4 right-4"
                                >
                                    <motion.div 
                                        animate={{ rotate: [0, 5, -5, 0] }}
                                        transition={{ repeat: Infinity, duration: 1.5 }}
                                        className="p-2 bg-emerald-500/20 rounded-lg border border-emerald-500/30"
                                    >
                                        <FileText size={24} className="text-emerald-400" />
                                    </motion.div>
                                    <motion.div 
                                        animate={{ scale: [1, 1.2, 1] }}
                                        transition={{ repeat: Infinity, duration: 0.8 }}
                                        className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full"
                                    />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </div>

            {/* Status Bar */}
            <div className="p-4 border-t border-slate-700/50 bg-slate-900/50">
                <div className="flex items-center gap-3">
                    {/* Step indicators */}
                    <div className="flex gap-1">
                        {[0, 1, 2, 3].map(i => (
                            <motion.div
                                key={i}
                                className={`w-2 h-2 rounded-full transition-colors ${
                                    i === step ? 'bg-blue-500' : 'bg-slate-600'
                                }`}
                                animate={i === step ? { scale: [1, 1.3, 1] } : {}}
                                transition={{ duration: 0.5 }}
                            />
                        ))}
                    </div>
                    {/* Status text */}
                    <p className={`text-sm flex-1 ${stepLabels[step].color}`}>
                        {stepLabels[step].text}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RamVsStorage;
