import React, { useState } from 'react';
import { motion } from 'framer-motion';

const BinaryVisualizer = () => {
    // 8 bits, initialized to 01000001 (65 -> 'A')
    const [bits, setBits] = useState([0, 1, 0, 0, 0, 0, 0, 1]);

    const toggleBit = (index) => {
        const newBits = [...bits];
        newBits[index] = newBits[index] === 0 ? 1 : 0;
        setBits(newBits);
    };

    const decimalValue = parseInt(bits.join(''), 2);
    const asciiChar = String.fromCharCode(decimalValue);
    const isPrintable = decimalValue >= 32 && decimalValue <= 126;

    return (
        <div className="flex flex-col gap-8 p-6 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700">
            <div className="text-center space-y-2">
                <h3 className="text-xl font-bold text-slate-800 dark:text-white">Binary Translator</h3>
                <p className="text-slate-600 dark:text-slate-400">
                    Computers only understand ON (1) and OFF (0). Toggle the bits below to see how they represent numbers and text.
                </p>
            </div>

            {/* Bits Display */}
            <div className="flex justify-center gap-2 sm:gap-4">
                {bits.map((bit, index) => (
                    <div key={index} className="flex flex-col items-center gap-2">
                        <div className="text-xs font-mono text-slate-400 mb-1">
                            {Math.pow(2, 7 - index)}
                        </div>
                        <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={() => toggleBit(index)}
                            className={`w-10 h-14 sm:w-12 sm:h-16 rounded-lg font-mono text-xl sm:text-2xl font-bold flex items-center justify-center transition-all shadow-sm ${
                                bit === 1 
                                ? 'bg-blue-500 text-white shadow-blue-500/50 ring-2 ring-blue-400 ring-offset-2 ring-offset-slate-50 dark:ring-offset-slate-900' 
                                : 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-600 hover:bg-slate-300 dark:hover:bg-slate-700'
                            }`}
                        >
                            {bit}
                        </motion.button>
                    </div>
                ))}
            </div>

            {/* Output Display */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-6 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center">
                    <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">Decimal Value</span>
                    <span className="text-5xl font-bold text-slate-800 dark:text-white font-mono">
                        {decimalValue}
                    </span>
                </div>

                <div className="p-6 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center">
                    <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">ASCII Character</span>
                    <div className="h-16 flex items-center text-center">
                         {isPrintable ? (
                            <span className="text-6xl font-bold text-blue-500 font-mono">
                                {asciiChar}
                            </span>
                        ) : (
                            <span className="text-sm text-slate-400 italic">
                                (Non-printable)
                            </span>
                        )}
                    </div>
                </div>
            </div>

            <div className="text-center text-xs text-slate-400">
                Try making the letter 'a' (97) or '!' (33).
            </div>
        </div>
    );
};

export default BinaryVisualizer;
