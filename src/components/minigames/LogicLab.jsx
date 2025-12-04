import React, { useState } from 'react';

const LogicLab = () => {
  const [inputs, setInputs] = useState({ a: 0, b: 0 });
  const [gateType, setGateType] = useState('AND');

  const toggleInput = (key) => {
    setInputs(prev => ({ ...prev, [key]: prev[key] === 0 ? 1 : 0 }));
  };

  const getOutput = () => {
    switch (gateType) {
      case 'AND': return inputs.a && inputs.b;
      case 'OR': return inputs.a || inputs.b;
      case 'NOT': return !inputs.a ? 1 : 0; // NOT only uses input A
      case 'XOR': return inputs.a !== inputs.b ? 1 : 0;
      default: return 0;
    }
  };

  const output = getOutput();

  return (
    <div className="flex flex-col items-center justify-center h-full p-6 bg-slate-900 text-white rounded-xl relative overflow-hidden">
      <div className="text-center mb-8 relative z-10">
        <h3 className="text-2xl font-bold mb-2 text-purple-400">Logic Lab</h3>
        <p className="text-slate-400 text-sm">Experiment with digital logic gates!</p>
      </div>

      {/* Circuit Board Background Effect */}
      <div className="absolute inset-0 opacity-5 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#a855f7 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
      </div>

      <div className="flex items-center gap-4 mb-8 relative z-10">
        {['AND', 'OR', 'XOR', 'NOT'].map(gate => (
          <button
            key={gate}
            onClick={() => setGateType(gate)}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
              gateType === gate 
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/30' 
                : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
            }`}
          >
            {gate}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-8 sm:gap-16 relative z-10">
        {/* Inputs */}
        <div className="flex flex-col gap-8">
          <div className="flex items-center gap-3">
            <button
              onClick={() => toggleInput('a')}
              className={`w-16 h-16 rounded-xl text-2xl font-bold border-4 transition-all ${
                inputs.a 
                  ? 'bg-green-500 border-green-600 text-white shadow-[0_0_20px_rgba(34,197,94,0.4)]' 
                  : 'bg-slate-800 border-slate-700 text-slate-500'
              }`}
            >
              {inputs.a}
            </button>
            <span className="text-xs font-mono text-slate-500">INPUT A</span>
          </div>

          {gateType !== 'NOT' && (
            <div className="flex items-center gap-3">
              <button
                onClick={() => toggleInput('b')}
                className={`w-16 h-16 rounded-xl text-2xl font-bold border-4 transition-all ${
                  inputs.b 
                    ? 'bg-green-500 border-green-600 text-white shadow-[0_0_20px_rgba(34,197,94,0.4)]' 
                    : 'bg-slate-800 border-slate-700 text-slate-500'
                }`}
              >
                {inputs.b}
              </button>
              <span className="text-xs font-mono text-slate-500">INPUT B</span>
            </div>
          )}
        </div>

        {/* Gate Visual */}
        <div className="flex flex-col items-center">
          <div className="w-32 h-32 bg-slate-800 rounded-2xl border-2 border-purple-500/50 flex items-center justify-center relative shadow-[0_0_30px_rgba(168,85,247,0.2)]">
            <div className="text-3xl font-bold text-purple-400">{gateType}</div>
            
            {/* Wires */}
            <div className="absolute -left-8 top-1/3 w-8 h-1 bg-slate-600"></div>
            {gateType !== 'NOT' && <div className="absolute -left-8 bottom-1/3 w-8 h-1 bg-slate-600"></div>}
            <div className={`absolute -right-8 top-1/2 w-8 h-1 transition-colors ${output ? 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.8)]' : 'bg-slate-600'}`}></div>
          </div>
        </div>

        {/* Output */}
        <div className="flex flex-col items-center gap-2">
          <div className={`
            w-20 h-20 rounded-full border-4 flex items-center justify-center text-3xl font-bold transition-all duration-300
            ${output 
              ? 'bg-green-500 border-green-400 text-white shadow-[0_0_40px_rgba(34,197,94,0.6)] scale-110' 
              : 'bg-slate-900 border-slate-700 text-slate-600'}
          `}>
            {output}
          </div>
          <span className="text-xs font-mono text-slate-500">OUTPUT</span>
        </div>
      </div>
    </div>
  );
};

export default LogicLab;
