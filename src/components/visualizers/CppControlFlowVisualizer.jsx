import React, { useState } from 'react';

const CppControlFlowVisualizer = () => {
  const [lightColor, setLightColor] = useState('red');
  const [carPosition, setCarPosition] = useState(0); // 0 = start, 1 = stop line, 2 = passed
  const [message, setMessage] = useState("Waiting at the light...");

  const cycleLight = () => {
    if (lightColor === 'red') setLightColor('green');
    else if (lightColor === 'green') setLightColor('yellow');
    else setLightColor('red');
  };

  const driveCar = async () => {
    if (lightColor === 'red') {
      setCarPosition(1); // Stop at line
      setMessage("STOP! The light is Red.");
    } else if (lightColor === 'yellow') {
      setCarPosition(1);
      setMessage("CAUTION! Prepare to stop.");
    } else {
      setCarPosition(2); // Drive through
      setMessage("GO! The light is Green.");
      setTimeout(() => {
        setCarPosition(0); // Reset after driving off
        setMessage("Car reset. Try again!");
      }, 2000);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 bg-slate-900 rounded-xl p-6 border border-slate-700 flex flex-col relative overflow-hidden">
        <h3 className="text-white font-bold text-center mb-6 relative z-10">Traffic Control Logic 🚦</h3>

        {/* Scene */}
        <div className="flex-1 flex flex-col items-center justify-center relative z-10">
          
          {/* Traffic Light */}
          <div 
            onClick={cycleLight}
            className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex gap-3 mb-8 cursor-pointer hover:scale-105 transition-transform shadow-2xl"
          >
            <div className={`w-8 h-8 rounded-full transition-all duration-300 ${lightColor === 'red' ? 'bg-red-500 shadow-[0_0_20px_rgba(239,68,68,0.8)]' : 'bg-red-950'}`}></div>
            <div className={`w-8 h-8 rounded-full transition-all duration-300 ${lightColor === 'yellow' ? 'bg-yellow-400 shadow-[0_0_20px_rgba(250,204,21,0.8)]' : 'bg-yellow-950'}`}></div>
            <div className={`w-8 h-8 rounded-full transition-all duration-300 ${lightColor === 'green' ? 'bg-green-500 shadow-[0_0_20px_rgba(34,197,94,0.8)]' : 'bg-green-950'}`}></div>
          </div>

          {/* Road & Car */}
          <div className="w-full h-24 bg-slate-800 relative overflow-hidden border-y-2 border-slate-600 flex items-center">
            {/* Road Markings */}
            <div className="absolute inset-0 flex items-center justify-center gap-8 opacity-30">
              <div className="w-12 h-2 bg-white"></div>
              <div className="w-12 h-2 bg-white"></div>
              <div className="w-12 h-2 bg-white"></div>
            </div>
            
            {/* Stop Line */}
            <div className="absolute left-1/2 w-2 h-full bg-white opacity-50"></div>

            {/* Car */}
            <div 
              className="absolute text-4xl transition-all duration-1000 ease-in-out"
              style={{ 
                left: carPosition === 0 ? '10%' : carPosition === 1 ? '40%' : '120%',
                transform: 'scaleX(-1)' // Face right
              }}
            >
              🏎️
            </div>
          </div>

        </div>

        {/* Controls */}
        <div className="mt-6 space-y-3 relative z-10">
          <div className="text-center text-sm font-bold text-white min-h-[20px]">{message}</div>
          
          <div className="grid grid-cols-2 gap-3">
            <button 
              onClick={cycleLight}
              className="py-2 bg-slate-700 hover:bg-slate-600 text-white text-xs font-bold rounded-lg transition-colors"
            >
              Change Light
            </button>
            <button 
              onClick={driveCar}
              className="py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg transition-colors shadow-lg shadow-blue-500/20"
            >
              Drive Car
            </button>
          </div>

          {/* Code Snippet Overlay */}
          <div className="bg-slate-950 p-2 rounded border border-slate-800 font-mono text-[10px] text-slate-400">
            <div><span className="text-purple-400">if</span> (light == <span className="text-green-400">GREEN</span>) {'{'}</div>
            <div className="pl-2 text-blue-400">drive();</div>
            <div>{'}'} <span className="text-purple-400">else</span> {'{'}</div>
            <div className="pl-2 text-red-400">stop();</div>
            <div>{'}'}</div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CppControlFlowVisualizer;
