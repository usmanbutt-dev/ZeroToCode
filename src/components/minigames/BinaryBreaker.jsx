import React, { useState, useEffect } from 'react';

const BinaryBreaker = () => {
  const [target, setTarget] = useState(0);
  const [bits, setBits] = useState(Array(8).fill(0));
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState('');

  const generateTarget = () => {
    setTarget(Math.floor(Math.random() * 255) + 1);
    setBits(Array(8).fill(0));
    setMessage('');
  };

  useEffect(() => {
    generateTarget();
  }, []);

  const toggleBit = (index) => {
    const newBits = [...bits];
    newBits[index] = newBits[index] === 0 ? 1 : 0;
    setBits(newBits);

    const currentValue = newBits.reduce((acc, bit, i) => acc + bit * Math.pow(2, 7 - i), 0);
    
    if (currentValue === target) {
      setMessage('CORRECT! 🎉');
      setScore(s => s + 1);
      setTimeout(generateTarget, 1500);
    }
  };

  const currentVal = bits.reduce((acc, bit, i) => acc + bit * Math.pow(2, 7 - i), 0);

  return (
    <div className="flex flex-col items-center justify-center h-full p-6 bg-slate-900 text-white rounded-xl">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold mb-2 text-blue-400">Binary Breaker</h3>
        <p className="text-slate-400 text-sm">Match the target number by toggling bits!</p>
      </div>

      <div className="flex gap-8 items-center mb-12">
        <div className="text-center">
          <div className="text-xs text-slate-500 mb-1">TARGET</div>
          <div className="text-5xl font-mono font-bold text-white">{target}</div>
        </div>
        <div className="text-2xl text-slate-600">=</div>
        <div className="text-center">
          <div className="text-xs text-slate-500 mb-1">CURRENT</div>
          <div className={`text-5xl font-mono font-bold transition-colors ${currentVal === target ? 'text-green-400' : 'text-orange-400'}`}>
            {currentVal}
          </div>
        </div>
      </div>

      <div className="flex gap-2 sm:gap-3 mb-8">
        {bits.map((bit, index) => (
          <div key={index} className="flex flex-col items-center gap-2">
            <button
              onClick={() => toggleBit(index)}
              className={`
                w-10 h-14 sm:w-12 sm:h-16 rounded-lg font-mono text-2xl font-bold transition-all duration-200 border-b-4 active:border-b-0 active:translate-y-1
                ${bit === 1 
                  ? 'bg-blue-500 border-blue-700 text-white shadow-[0_0_15px_rgba(59,130,246,0.5)]' 
                  : 'bg-slate-700 border-slate-800 text-slate-400 hover:bg-slate-600'}
              `}
            >
              {bit}
            </button>
            <span className="text-[10px] text-slate-500 font-mono">{Math.pow(2, 7 - index)}</span>
          </div>
        ))}
      </div>

      <div className="h-8 text-xl font-bold text-green-400 animate-bounce">
        {message}
      </div>

      <div className="absolute top-4 right-4 bg-slate-800 px-3 py-1 rounded-full text-xs font-mono text-slate-300 border border-slate-700">
        Score: {score}
      </div>
    </div>
  );
};

export default BinaryBreaker;
