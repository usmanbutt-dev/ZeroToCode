import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward, RefreshCw, Lock, ArrowRight, Layers, Code, Zap, Gauge, AlertTriangle, Database, Box, Grid3X3, Target, GripVertical } from 'lucide-react';

// Color palette for pointer connections
const POINTER_COLORS = [
  { bg: 'bg-purple-100 dark:bg-purple-900/40', border: 'border-purple-500', text: 'text-purple-600 dark:text-purple-400', dot: 'bg-purple-500' },
  { bg: 'bg-blue-100 dark:bg-blue-900/40', border: 'border-blue-500', text: 'text-blue-600 dark:text-blue-400', dot: 'bg-blue-500' },
  { bg: 'bg-green-100 dark:bg-green-900/40', border: 'border-green-500', text: 'text-green-600 dark:text-green-400', dot: 'bg-green-500' },
  { bg: 'bg-orange-100 dark:bg-orange-900/40', border: 'border-orange-500', text: 'text-orange-600 dark:text-orange-400', dot: 'bg-orange-500' },
  { bg: 'bg-pink-100 dark:bg-pink-900/40', border: 'border-pink-500', text: 'text-pink-600 dark:text-pink-400', dot: 'bg-pink-500' },
];

const VisualizerEngine = ({ traceData, sourceCode = '' }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [stackFrames, setStackFrames] = useState([]);
  const [heapMemory, setHeapMemory] = useState({});
  const [activeLine, setActiveLine] = useState(null);
  const [addressMap, setAddressMap] = useState({});
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [previousValues, setPreviousValues] = useState({});
  const [stepExplanation, setStepExplanation] = useState('');
  const [memoryLeaks, setMemoryLeaks] = useState([]);
  const [pointerColors, setPointerColors] = useState({});
  const [highlightedTarget, setHighlightedTarget] = useState(null);
  
  // Resizable split state
  const [splitPosition, setSplitPosition] = useState(40); // 40% for code, 60% for visualizer
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  // Handle resize drag
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging || !containerRef.current) return;
      
      const containerRect = containerRef.current.getBoundingClientRect();
      const newSplit = ((e.clientX - containerRect.left) / containerRect.width) * 100;
      
      if (newSplit > 20 && newSplit < 80) {
        setSplitPosition(newSplit);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };

    if (isDragging) {
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  // Helper to normalize hex addresses
  const normalizeAddr = (addr) => {
    if (!addr || typeof addr !== 'string') return addr;
    return addr.toLowerCase().trim();
  };

  // Helper to add offset to hex address
  const addHexOffset = (baseHex, offsetBytes) => {
    if (!baseHex || !baseHex.startsWith('0x')) return baseHex;
    const baseVal = parseInt(baseHex, 16);
    const newVal = baseVal + offsetBytes;
    return '0x' + newVal.toString(16);
  };

  // Get display name for a pointer target
  const getTargetDisplayName = (addr, addressMap) => {
    const targetId = addressMap[addr];
    if (!targetId) return null;
    
    // Parse target ID like "var-numbers-2" or "heap-heapVar"
    if (targetId.startsWith('heap-')) {
      return targetId.replace('heap-', '') + ' (heap)';
    }
    if (targetId.startsWith('var-')) {
      const parts = targetId.replace('var-', '').split('-');
      if (parts.length === 2) {
        return `${parts[0]}[${parts[1]}]`;
      }
      return parts[0];
    }
    return targetId;
  };

  // Generate natural language explanation
  const generateExplanation = (step, prevVars) => {
    if (!step) return '';
    
    switch (step.type) {
      case 'func':
        return step.action === 'enter' 
          ? `📌 Entering function \`${step.name}()\``
          : `🏁 Exiting function \`${step.name}()\``;
      case 'var':
      case 'const':
        return `📦 Declared ${step.type === 'const' ? 'constant' : 'variable'} \`${step.name}\` = ${step.value}`;
      case 'assign':
        const oldVal = prevVars[step.name];
        return oldVal 
          ? `✏️ Updated \`${step.name}\`: ${oldVal} → ${step.value}`
          : `✏️ Assigned \`${step.name}\` = ${step.value}`;
      case 'pointer':
        return `🔗 Pointer \`${step.name}\` → ${step.deref}`;
      case 'array':
        return `📊 Array \`${step.name}[${step.size}]\` initialized`;
      case 'array2d':
        return `▦ 2D Array \`${step.name}[${step.rows}][${step.cols}]\` initialized`;
      case 'heap_alloc':
        return `🏗️ Heap: \`${step.name}\` = new (value: ${step.value})`;
      case 'heap_array':
        return `🏗️ Heap array: \`${step.name}\` = new[${step.size}]`;
      case 'heap_free':
        return `🗑️ Freed: \`delete ${step.name}\``;
      case 'struct':
        return `📦 Struct \`${step.structType} ${step.name}\` created`;
      case 'field':
        return `✏️ Field \`${step.struct}.${step.field}\` = ${step.value}`;
      case 'scope':
        return step.action === 'enter'
          ? `📥 Entering ${step.scopeType} block`
          : `📤 Exiting ${step.scopeType} block`;
      default:
        return '';
    }
  };

  // Replay logic
  useEffect(() => {
    if (!traceData || traceData.length === 0) return;

    let frames = [];
    const newAddrMap = {};
    const newHeap = {};
    let currentLine = null;
    const currentValues = {};
    const allocatedMemory = new Set();
    const newPointerColors = {};
    let colorIndex = 0;

    if (frames.length === 0) {
      frames.push({ name: 'global', variables: {} });
    }

    for (let i = 0; i <= currentStep && i < traceData.length; i++) {
      const step = traceData[i];
      if (!step) continue;

      currentLine = step.line;

      if (step.type === 'func') {
        if (step.action === 'enter') {
          frames.push({ name: step.name, variables: {} });
        } else if (step.action === 'exit') {
          if (frames.length > 1) frames.pop();
        }
        continue;
      }

      if (step.type === 'scope') continue;

      const currentFrame = frames[frames.length - 1];

      // Heap Allocation
      if (step.type === 'heap_alloc' || step.type === 'heap_array') {
        const addr = normalizeAddr(step.addr);
        newHeap[addr] = {
          name: step.name,
          value: step.value,
          size: step.size || 1,
          type: step.type === 'heap_array' ? 'array' : 'single',
          line: step.line,
          addr: addr
        };
        allocatedMemory.add(step.name);
        newAddrMap[addr] = `heap-${step.name}`;
        
        // Assign color to this pointer
        if (!newPointerColors[step.name]) {
          newPointerColors[step.name] = colorIndex % POINTER_COLORS.length;
          colorIndex++;
        }
        
        currentFrame.variables[step.name] = { 
          value: addr,
          deref: step.value, 
          type: 'pointer',
          isHeap: true,
          line: step.line,
          addr: addr,
          colorIndex: newPointerColors[step.name]
        };
        currentValues[step.name] = addr;
      }

      if (step.type === 'heap_free') {
        const addr = normalizeAddr(step.addr);
        if (newHeap[addr]) {
          newHeap[addr].freed = true;
        }
        allocatedMemory.delete(step.name);
        if (currentFrame.variables[step.name]) {
          currentFrame.variables[step.name].dangling = true;
        }
      }

      if (step.type === 'struct') {
        currentFrame.variables[step.name] = { 
          type: 'struct',
          structType: step.structType,
          fields: {},
          line: step.line,
          addr: normalizeAddr(step.addr)
        };
      }

      if (step.type === 'field') {
        if (currentFrame.variables[step.struct]) {
          currentFrame.variables[step.struct].fields[step.field] = {
            value: step.value,
            addr: normalizeAddr(step.addr)
          };
        }
      }

      if (step.type === 'array2d') {
        currentFrame.variables[step.name] = { 
          value: step.value, 
          rows: step.rows,
          cols: step.cols,
          type: 'array2d',
          line: step.line,
          addr: normalizeAddr(step.addr)
        };
      }

      if (step.type === 'array') {
        const baseAddr = normalizeAddr(step.addr);
        newAddrMap[baseAddr] = `var-${step.name}-0`;
        
        const size = step.size || 0;
        for (let j = 0; j < size; j++) {
          const elemAddr = normalizeAddr(addHexOffset(baseAddr, j * 4));
          newAddrMap[elemAddr] = `var-${step.name}-${j}`;
        }

        currentFrame.variables[step.name] = { 
          value: step.value, 
          size: step.size, 
          type: 'array',
          line: step.line,
          addr: baseAddr
        };
      }

      if (step.type === 'pointer') {
        const ptrAddr = normalizeAddr(step.addr);
        const targetAddr = normalizeAddr(step.value);
        
        // Assign color if new pointer
        if (!newPointerColors[step.name]) {
          newPointerColors[step.name] = colorIndex % POINTER_COLORS.length;
          colorIndex++;
        }
        
        currentFrame.variables[step.name] = { 
          value: targetAddr,
          deref: step.deref, 
          type: 'pointer',
          line: step.line,
          addr: ptrAddr,
          colorIndex: newPointerColors[step.name]
        };
        currentValues[step.name] = targetAddr;
      }

      if (step.type === 'var' || step.type === 'assign' || step.type === 'const' || step.type === 'reference') {
        const varAddr = normalizeAddr(step.addr);
        newAddrMap[varAddr] = `var-${step.name}`;
        
        currentFrame.variables[step.name] = { 
          value: step.value, 
          type: step.type === 'const' ? 'constant' : step.type === 'reference' ? 'reference' : 'variable',
          line: step.line,
          addr: varAddr
        };
        currentValues[step.name] = step.value;
      }
    }
    
    if (frames.length > 1 && frames[0].name === 'global' && Object.keys(frames[0].variables).length === 0) {
      frames.shift();
    }

    const leaks = Array.from(allocatedMemory);
    setMemoryLeaks(leaks);

    const currentStepData = traceData[currentStep];
    const explanation = generateExplanation(currentStepData, previousValues);
    setStepExplanation(explanation);
    setPreviousValues(currentValues);
    setStackFrames([...frames].reverse());
    setHeapMemory(newHeap);
    setAddressMap(newAddrMap);
    setActiveLine(currentLine);
    setPointerColors(newPointerColors);
  }, [currentStep, traceData]);

  // Auto-play
  useEffect(() => {
    let interval;
    if (isPlaying && currentStep < (traceData?.length || 0) - 1) {
      interval = setInterval(() => {
        setCurrentStep(prev => prev + 1);
      }, 1000 / playbackSpeed);
    } else if (currentStep >= (traceData?.length || 0) - 1) {
      setIsPlaying(false);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentStep, traceData, playbackSpeed]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      switch(e.key) {
        case 'ArrowRight':
          e.preventDefault();
          setCurrentStep(prev => Math.min((traceData?.length || 0) - 1, prev + 1));
          setIsPlaying(false);
          break;
        case 'ArrowLeft':
          e.preventDefault();
          setCurrentStep(prev => Math.max(0, prev - 1));
          setIsPlaying(false);
          break;
        case ' ':
          e.preventDefault();
          setIsPlaying(prev => !prev);
          break;
        case 'r':
        case 'R':
          e.preventDefault();
          setCurrentStep(0);
          setIsPlaying(false);
          break;
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [traceData]);

  if (!traceData || traceData.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-slate-400 p-8">
        <RefreshCw className="w-12 h-12 mb-4 opacity-30" />
        <p className="text-center text-lg">Run code to generate visualization</p>
        <p className="text-center text-sm mt-2">Shortcuts: ← → step, Space play, R reset</p>
      </div>
    );
  }

  const codeLines = sourceCode.split('\n');

  // Render 2D Array
  const render2DArray = (name, data) => {
    const values = data.value.replace(/^\[|\]$/g, '').split('],[');
    return (
      <div className="flex flex-col gap-1">
        {values.map((row, rowIdx) => (
          <div key={rowIdx} className="flex gap-1">
            {row.replace(/[\[\]]/g, '').split(',').map((val, colIdx) => (
              <div key={colIdx} className="w-8 h-8 flex items-center justify-center rounded border bg-slate-50 dark:bg-slate-700 border-slate-200 dark:border-slate-600 font-mono text-sm">
                {val.trim()}
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  };

  // Render Struct
  const renderStruct = (name, data) => (
    <div className="space-y-1">
      <div className="text-xs text-slate-500 font-mono">{data.structType}</div>
      {Object.entries(data.fields).map(([fieldName, fieldData]) => (
        <div key={fieldName} className="flex justify-between items-center bg-slate-50 dark:bg-slate-700 px-2 py-1 rounded">
          <span className="font-mono text-sm text-slate-600 dark:text-slate-300">.{fieldName}</span>
          <span className="font-mono font-bold text-slate-800 dark:text-slate-100">{fieldData.value}</span>
        </div>
      ))}
    </div>
  );

  // Check if an element is a pointer target
  const isPointerTarget = (varName, index = null) => {
    const targetId = index !== null ? `var-${varName}-${index}` : `var-${varName}`;
    return Object.entries(addressMap).some(([addr, id]) => {
      if (id !== targetId) return false;
      // Check if any pointer points to this address
      return stackFrames.some(frame => 
        Object.values(frame.variables).some(v => 
          v.type === 'pointer' && v.value === addr && !v.dangling
        )
      );
    });
  };

  // Get pointer color for a target
  const getTargetColor = (varName, index = null) => {
    const targetId = index !== null ? `var-${varName}-${index}` : `var-${varName}`;
    for (const [addr, id] of Object.entries(addressMap)) {
      if (id !== targetId) continue;
      for (const frame of stackFrames) {
        for (const [ptrName, v] of Object.entries(frame.variables)) {
          if (v.type === 'pointer' && v.value === addr && !v.dangling) {
            return POINTER_COLORS[v.colorIndex] || POINTER_COLORS[0];
          }
        }
      }
    }
    return null;
  };

  return (
    <div ref={containerRef} className="flex h-full bg-slate-50 dark:bg-[#1e1e1e] overflow-hidden">
      {/* Code Viewer */}
      <div 
        className="border-r border-slate-200 dark:border-slate-700 flex flex-col overflow-hidden"
        style={{ width: `${splitPosition}%` }}
      >
        <div className="bg-slate-100 dark:bg-slate-800 px-4 py-2 border-b border-slate-200 dark:border-slate-700 flex items-center gap-2">
          <Code className="w-4 h-4 text-slate-500" />
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Source Code</span>
        </div>
        <div className="flex-1 overflow-y-auto p-4 font-mono text-sm">
          {codeLines.map((line, idx) => (
            <div
              key={idx}
              className={`flex gap-2 px-2 py-0.5 rounded transition-colors ${
                idx + 1 === activeLine 
                  ? 'bg-blue-100 dark:bg-blue-900/30 border-l-4 border-blue-500' 
                  : 'hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <span className={`w-8 text-right select-none ${idx + 1 === activeLine ? 'text-blue-600 font-bold' : 'text-slate-400'}`}>
                {idx + 1}
              </span>
              <span className={idx + 1 === activeLine ? 'text-slate-900 dark:text-slate-100' : 'text-slate-600 dark:text-slate-400'}>
                {line || ' '}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Resizable Divider */}
      <div
        className="w-2 bg-slate-200 dark:bg-slate-700 hover:bg-blue-500 cursor-col-resize flex items-center justify-center transition-colors group"
        onMouseDown={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
      >
        <GripVertical className="w-3 h-3 text-slate-400 group-hover:text-white" />
      </div>

      {/* Visualizer Panel */}
      <div 
        className="flex flex-col overflow-hidden"
        style={{ width: `${100 - splitPosition - 0.5}%` }}
      >
        {/* Memory Leak Warning */}
        {memoryLeaks.length > 0 && currentStep === traceData.length - 1 && (
          <div className="bg-red-100 dark:bg-red-900/30 px-4 py-2 border-b border-red-200 dark:border-red-700">
            <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
              <AlertTriangle className="w-4 h-4" />
              <span className="text-sm font-bold">Memory Leak!</span>
              <span className="text-xs">Not freed: {memoryLeaks.join(', ')}</span>
            </div>
          </div>
        )}

        {/* Step Explanation */}
        {stepExplanation && (
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 px-4 py-3 border-b border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-blue-500" />
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{stepExplanation}</span>
            </div>
          </div>
        )}

        {/* Memory Visualization */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="flex flex-col gap-6 p-2">
            
            {/* HEAP */}
            {Object.keys(heapMemory).length > 0 && (
              <div className="bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-orange-900/20 dark:to-yellow-900/20 rounded-xl border-2 border-orange-300 dark:border-orange-700 p-4">
                <div className="flex items-center gap-2 mb-4 border-b border-orange-200 dark:border-orange-700 pb-2">
                  <Database className="w-4 h-4 text-orange-500" />
                  <span className="font-mono font-bold text-orange-700 dark:text-orange-300">HEAP</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {Object.entries(heapMemory).map(([addr, data]) => {
                    const color = POINTER_COLORS[pointerColors[data.name]] || POINTER_COLORS[0];
                    return (
                      <motion.div
                        key={addr}
                        className={`p-3 rounded-lg border-2 shadow-sm bg-white dark:bg-slate-800 ${color.border} ${
                          highlightedTarget === `heap-${data.name}` ? 'ring-4 ring-offset-2 ' + color.border : ''
                        } ${data.freed ? 'opacity-50' : ''}`}
                      >
                        <div className="flex justify-between items-center mb-2">
                          <div className="flex items-center gap-2">
                            <div className={`w-3 h-3 rounded-full ${color.dot}`} />
                            <span className="font-bold font-mono text-lg">{data.name}</span>
                          </div>
                          {data.freed && <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded">FREED</span>}
                        </div>
                        {data.type === 'array' ? (
                          <div className="flex gap-1">
                            {data.value.replace(/[\[\]]/g, '').split(',').map((val, idx) => (
                              <div key={idx} className={`w-8 h-8 flex items-center justify-center rounded border font-mono text-sm ${color.bg} ${color.border}`}>
                                {val.trim()}
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className={`font-mono text-xl font-bold ${color.text}`}>{data.value}</div>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* STACK */}
            <AnimatePresence>
              {stackFrames.map((frame, index) => (
                <motion.div
                  key={frame.name + index}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-slate-100 dark:bg-slate-900/50 rounded-xl border-2 border-slate-200 dark:border-slate-700 p-4"
                >
                  <div className="flex items-center gap-2 mb-4 border-b border-slate-200 dark:border-slate-700 pb-2">
                    <Layers className="w-4 h-4 text-slate-400" />
                    <span className="font-mono font-bold text-slate-600 dark:text-slate-300">{frame.name}()</span>
                    <span className="text-xs text-slate-400 ml-auto">Stack Frame</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {Object.entries(frame.variables).map(([name, data]) => {
                      const hasChanged = previousValues[name] !== undefined && previousValues[name] !== data.value;
                      const color = data.type === 'pointer' ? POINTER_COLORS[data.colorIndex] : null;
                      const targetColor = getTargetColor(name);
                      
                      return (
                        <motion.div
                          key={name}
                          layout
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: hasChanged ? [1, 1.05, 1] : 1 }}
                          transition={{ duration: 0.3 }}
                          onMouseEnter={() => data.type === 'pointer' && setHighlightedTarget(addressMap[data.value])}
                          onMouseLeave={() => setHighlightedTarget(null)}
                          className={`p-3 rounded-lg border-2 shadow-sm bg-white dark:bg-slate-800 relative ${
                            hasChanged ? 'ring-2 ring-yellow-400' : ''
                          } ${
                            data.type === 'pointer' && color ? color.border :
                            targetColor ? targetColor.border :
                            data.type === 'array' ? 'border-green-500' :
                            data.type === 'array2d' ? 'border-teal-500' :
                            data.type === 'struct' ? 'border-pink-500' :
                            data.type === 'constant' ? 'border-red-500' :
                            'border-blue-500'
                          } ${
                            highlightedTarget === `var-${name}` ? 'ring-4 ring-offset-2' : ''
                          }`}
                        >
                          <div className="flex justify-between items-center mb-2">
                            <div className="flex items-center gap-2">
                              {data.type === 'pointer' && color && <div className={`w-3 h-3 rounded-full ${color.dot}`} />}
                              {targetColor && <div className={`w-3 h-3 rounded-full ${targetColor.dot}`} />}
                              <span className="font-bold font-mono text-lg">{name}</span>
                              {data.type === 'constant' && <Lock className="w-3 h-3 text-red-500" />}
                            </div>
                            <span className="text-[10px] uppercase tracking-wider text-slate-400 bg-slate-50 dark:bg-slate-700 px-1.5 py-0.5 rounded">
                              {data.type}
                            </span>
                          </div>

                          {data.type === 'array' ? (
                            <div className="flex gap-1 overflow-x-auto pb-1">
                              {data.value.replace(/[\[\]]/g, '').split(',').map((val, idx) => {
                                const cellColor = getTargetColor(name, idx);
                                return (
                                  <div key={idx} className="flex flex-col items-center">
                                    <div className={`w-8 h-8 flex items-center justify-center rounded border font-mono text-sm ${
                                      cellColor ? `${cellColor.bg} ${cellColor.border} ring-2 ${cellColor.border}` : 'bg-slate-50 dark:bg-slate-700 border-slate-200'
                                    } ${highlightedTarget === `var-${name}-${idx}` ? 'ring-4 ring-offset-1' : ''}`}>
                                      {val.trim()}
                                    </div>
                                    <span className="text-[10px] text-slate-400 mt-0.5">{idx}</span>
                                  </div>
                                );
                              })}
                            </div>
                          ) : data.type === 'array2d' ? (
                            render2DArray(name, data)
                          ) : data.type === 'struct' ? (
                            renderStruct(name, data)
                          ) : data.type === 'pointer' ? (
                            <div className="flex flex-col gap-1">
                              {data.dangling ? (
                                <div className="flex items-center gap-2 text-red-500">
                                  <span className="text-lg">💀</span>
                                  <span className="text-xs font-bold">DANGLING (freed)</span>
                                </div>
                              ) : addressMap[data.value] ? (
                                <div className={`flex items-center gap-2 ${color?.text || 'text-purple-600'}`}>
                                  <Target className="w-4 h-4" />
                                  <span className="font-mono font-bold">
                                    → {getTargetDisplayName(data.value, addressMap)}
                                  </span>
                                  <span className="text-slate-400 text-sm">({data.deref})</span>
                                </div>
                              ) : data.value === '0x0' || data.value === '(nil)' ? (
                                <div className="flex items-center gap-2 text-gray-500">
                                  <span className="text-lg">∅</span>
                                  <span className="text-xs font-bold">NULL</span>
                                </div>
                              ) : (
                                <div className="flex items-center gap-2 text-orange-500">
                                  <span>⚠️</span>
                                  <span className="text-xs font-bold">INVALID</span>
                                </div>
                              )}
                            </div>
                          ) : (
                            <div className="font-mono text-xl font-bold text-slate-800 dark:text-slate-100">
                              {data.value}
                            </div>
                          )}
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white dark:bg-[#2d2d2d] p-3 rounded-t-xl shadow-lg border-t border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between mb-2">
            <div className="flex flex-col">
              <span className="text-xs font-bold text-slate-500 uppercase">Step {currentStep + 1} / {traceData.length}</span>
              {activeLine && <span className="text-xs text-blue-500 font-mono">Line {activeLine}</span>}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">{playbackSpeed}x</span>
              <input 
                type="range" min="0.25" max="4" step="0.25" value={playbackSpeed} 
                onChange={(e) => setPlaybackSpeed(parseFloat(e.target.value))}
                className="w-16 h-1 accent-blue-600"
              />
            </div>
            <div className="flex gap-1">
              <button onClick={() => setCurrentStep(0)} className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 rounded" title="Reset (R)">
                <RefreshCw className="w-4 h-4" />
              </button>
              <button onClick={() => setCurrentStep(Math.max(0, currentStep - 1))} className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 rounded" title="Previous (←)">
                <SkipBack className="w-4 h-4" />
              </button>
              <button onClick={() => setIsPlaying(!isPlaying)} className="p-1.5 bg-blue-600 text-white rounded" title="Play/Pause (Space)">
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>
              <button onClick={() => setCurrentStep(Math.min(traceData.length - 1, currentStep + 1))} className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 rounded" title="Next (→)">
                <SkipForward className="w-4 h-4" />
              </button>
            </div>
          </div>
          <input 
            type="range" min="0" max={Math.max(0, traceData.length - 1)} value={currentStep} 
            onChange={(e) => { setIsPlaying(false); setCurrentStep(parseInt(e.target.value)); }} 
            className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg accent-blue-600"
          />
        </div>
      </div>
    </div>
  );
};

export default VisualizerEngine;
