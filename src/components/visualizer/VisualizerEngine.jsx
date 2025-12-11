import React, { useState, useEffect, useRef, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward, RefreshCw, Lock, ArrowRight, Layers, Code, Zap, Gauge, AlertTriangle, Database, Box, Grid3X3, Target, GripVertical, Maximize2, X, Minimize2, ZoomIn, ZoomOut } from 'lucide-react';
import Editor from '@monaco-editor/react';

// Color palette for pointer connections (expanded from 5 to 12)
const POINTER_COLORS = [
  { bg: 'bg-purple-100 dark:bg-purple-900/40', border: 'border-purple-500', text: 'text-purple-600 dark:text-purple-400', dot: 'bg-purple-500' },
  { bg: 'bg-blue-100 dark:bg-blue-900/40', border: 'border-blue-500', text: 'text-blue-600 dark:text-blue-400', dot: 'bg-blue-500' },
  { bg: 'bg-green-100 dark:bg-green-900/40', border: 'border-green-500', text: 'text-green-600 dark:text-green-400', dot: 'bg-green-500' },
  { bg: 'bg-orange-100 dark:bg-orange-900/40', border: 'border-orange-500', text: 'text-orange-600 dark:text-orange-400', dot: 'bg-orange-500' },
  { bg: 'bg-pink-100 dark:bg-pink-900/40', border: 'border-pink-500', text: 'text-pink-600 dark:text-pink-400', dot: 'bg-pink-500' },
  { bg: 'bg-cyan-100 dark:bg-cyan-900/40', border: 'border-cyan-500', text: 'text-cyan-600 dark:text-cyan-400', dot: 'bg-cyan-500' },
  { bg: 'bg-rose-100 dark:bg-rose-900/40', border: 'border-rose-500', text: 'text-rose-600 dark:text-rose-400', dot: 'bg-rose-500' },
  { bg: 'bg-amber-100 dark:bg-amber-900/40', border: 'border-amber-500', text: 'text-amber-600 dark:text-amber-400', dot: 'bg-amber-500' },
  { bg: 'bg-teal-100 dark:bg-teal-900/40', border: 'border-teal-500', text: 'text-teal-600 dark:text-teal-400', dot: 'bg-teal-500' },
  { bg: 'bg-indigo-100 dark:bg-indigo-900/40', border: 'border-indigo-500', text: 'text-indigo-600 dark:text-indigo-400', dot: 'bg-indigo-500' },
  { bg: 'bg-lime-100 dark:bg-lime-900/40', border: 'border-lime-500', text: 'text-lime-600 dark:text-lime-400', dot: 'bg-lime-500' },
  { bg: 'bg-fuchsia-100 dark:bg-fuchsia-900/40', border: 'border-fuchsia-500', text: 'text-fuchsia-600 dark:text-fuchsia-400', dot: 'bg-fuchsia-500' },
];

const VisualizerEngine = ({ 
  traceData, 
  sourceCode = '', 
  consoleOutput = '', 
  isWaitingForInput, 
  onInputSubmit, 
  inputValue, 
  onInputChange 
}) => {
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
  
  // Auto-scaling refs
  const visualizerContainerRef = useRef(null);
  const visualizerContentRef = useRef(null);
  const [scaleFactor, setScaleFactor] = useState(1);
  
  // Zoom control for memory visualization
  const [zoomLevel, setZoomLevel] = useState(100);
  
  // Monaco editor refs
  const monacoEditorRef = useRef(null);
  const monacoRef = useRef(null);
  const decorationsRef = useRef([]);
  
  // Fullscreen modal state
  const [isFullscreen, setIsFullscreen] = useState(false);
  const fullscreenContainerRef = useRef(null);
  const fullscreenContentRef = useRef(null);
  
  // Console output panel state
  const [showConsole, setShowConsole] = useState(true);
  
  // Compute progressive output based on current step
  // Shows only cout outputs that have occurred up to currentStep
  const visibleOutput = React.useMemo(() => {
    if (!consoleOutput || !traceData || traceData.length === 0) return '';
    
    // Find the last cout trace at or before currentStep
    let lastCoutIndex = -1;
    for (let i = 0; i <= currentStep && i < traceData.length; i++) {
      if (traceData[i].type === 'cout') {
        lastCoutIndex = i;
      }
    }
    
    // If no cout traces yet, show nothing
    if (lastCoutIndex === -1) return '';
    
    // If we're at the end of the trace (or trace is complete), show full output
    if (currentStep >= traceData.length - 1) {
      return consoleOutput.trim();
    }
    
    // Find the next cout trace AFTER currentStep
    let nextCoutStartIndex = consoleOutput.length;
    let foundNext = false;
    
    for (let i = currentStep + 1; i < traceData.length; i++) {
        if (traceData[i].type === 'cout' && traceData[i].outputStartIndex !== undefined) {
            nextCoutStartIndex = traceData[i].outputStartIndex;
            foundNext = true;
            break;
        }
    }
    
    // If we didn't find a "next" cout, it means we are safe to show everything remaining
    if (!foundNext) {
        return consoleOutput.trim();
    }
    
    return consoleOutput.slice(0, nextCoutStartIndex).trim();
  }, [consoleOutput, traceData, currentStep]);
  
  // Handle Monaco Editor mount
  const handleEditorDidMount = (editor, monaco) => {
    monacoEditorRef.current = editor;
    monacoRef.current = monaco;
    editor.updateOptions({
      readOnly: true,
      domReadOnly: true,
      lineNumbers: 'on',
      minimap: { enabled: false },
      scrollBeyondLastLine: false,
      fontSize: 13,
      fontFamily: 'JetBrains Mono, Fira Code, Consolas, monospace',
      lineDecorationsWidth: 10,
      renderLineHighlight: 'none',
      padding: { top: 8, bottom: 8 },
    });
  };
  
  // Highlight active line in Monaco
  useEffect(() => {
    if (!monacoEditorRef.current || !monacoRef.current || !activeLine) return;
    
    const editor = monacoEditorRef.current;
    const monaco = monacoRef.current;
    
    // Clear previous decorations
    decorationsRef.current = editor.deltaDecorations(decorationsRef.current, []);
    
    // Add new decoration for active line
    decorationsRef.current = editor.deltaDecorations([], [
      {
        range: new monaco.Range(activeLine, 1, activeLine, 1),
        options: {
          isWholeLine: true,
          className: 'active-line-highlight',
          linesDecorationsClassName: 'active-line-gutter',
        }
      }
    ]);
    
    // Scroll to active line
    editor.revealLineInCenter(activeLine);
  }, [activeLine]);

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

      // Handle array element updates (arr[i] = value)
      if (step.type === 'array_set') {
        // Parse array name and index from name like "arr[2]"
        const match = step.name.match(/^(\w+)\[(\d+)\]$/);
        if (match) {
          const arrName = match[1];
          const idx = parseInt(match[2]);
          if (currentFrame.variables[arrName] && currentFrame.variables[arrName].type === 'array') {
            // Update the array value string
            const arr = currentFrame.variables[arrName];
            const values = arr.value.replace(/[\[\]]/g, '').split(',').map(v => v.trim());
            values[idx] = step.value;
            arr.value = '[' + values.join(',') + ']';
            currentValues[step.name] = step.value;
          }
        }
      }

      if (step.type === 'var' || step.type === 'assign' || step.type === 'const' || step.type === 'reference') {
        const varAddr = normalizeAddr(step.addr);
        newAddrMap[varAddr] = `var-${step.name}`;
        
        currentFrame.variables[step.name] = { 
          value: step.value, 
          type: step.type === 'const' ? 'constant' : step.type === 'reference' ? 'reference' : 'variable',
          line: step.line,
          addr: varAddr,
          dataType: step.dataType || '',
          expr: step.expr || ''
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

  // Auto-scaling with ResizeObserver
  useEffect(() => {
    const container = visualizerContainerRef.current;
    const content = visualizerContentRef.current;
    if (!container || !content) return;

    const calculateScale = () => {
      // Reset scale to measure natural size
      content.style.transform = 'scale(1)';
      
      const containerHeight = container.clientHeight - 32; // Account for padding
      const containerWidth = container.clientWidth - 32;
      const contentHeight = content.scrollHeight;
      const contentWidth = content.scrollWidth;
      
      if (contentHeight === 0 || contentWidth === 0) return;

      // Calculate scale to fit both dimensions
      const scaleY = contentHeight > containerHeight ? containerHeight / contentHeight : 1;
      const scaleX = contentWidth > containerWidth ? containerWidth / contentWidth : 1;
      let newScale = Math.min(scaleX, scaleY, 1); // Never scale up, only down
      newScale = Math.max(0.4, newScale); // Minimum 40% scale for readability
      
      content.style.transform = `scale(${newScale})`;
      setScaleFactor(newScale);
    };

    // Initial calculation
    const timeoutId = setTimeout(calculateScale, 50);

    // Watch for container resize
    const resizeObserver = new ResizeObserver(() => {
      calculateScale();
    });
    resizeObserver.observe(container);

    return () => {
      clearTimeout(timeoutId);
      resizeObserver.disconnect();
    };
  }, [stackFrames, heapMemory, splitPosition]);

  // Auto-scaling for fullscreen view
  useEffect(() => {
    if (!isFullscreen) return;
    
    const container = fullscreenContainerRef.current;
    const content = fullscreenContentRef.current;
    if (!container || !content) return;

    const calculateFullscreenScale = () => {
      // Reset scale to measure natural size
      content.style.transform = 'scale(1)';
      
      const containerHeight = container.clientHeight - 48; // Account for padding
      const containerWidth = container.clientWidth - 48;
      const contentHeight = content.scrollHeight;
      const contentWidth = content.scrollWidth;
      
      if (contentHeight === 0 || contentWidth === 0) return;

      // Calculate scale to fit both dimensions
      const scaleY = contentHeight > containerHeight ? containerHeight / contentHeight : 1;
      const scaleX = contentWidth > containerWidth ? containerWidth / contentWidth : 1;
      let newScale = Math.min(scaleX, scaleY, 1); // Never scale up, only down
      newScale = Math.max(0.5, newScale); // Minimum 50% scale for fullscreen
      
      content.style.transform = `scale(${newScale})`;
    };

    // Initial calculation with delay for DOM to render
    const timeoutId = setTimeout(calculateFullscreenScale, 100);

    // Watch for container resize
    const resizeObserver = new ResizeObserver(() => {
      calculateFullscreenScale();
    });
    resizeObserver.observe(container);

    return () => {
      clearTimeout(timeoutId);
      resizeObserver.disconnect();
    };
  }, [isFullscreen, stackFrames, heapMemory]);

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
        case 'Escape':
          e.preventDefault();
          setIsFullscreen(false);
          break;
        case 'f':
        case 'F':
          e.preventDefault();
          setIsFullscreen(prev => !prev);
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
      {/* Code Viewer with Monaco Editor */}
      <div 
        className="border-r border-slate-200 dark:border-slate-700 flex flex-col overflow-hidden"
        style={{ width: `${splitPosition}%` }}
      >
        <div className="bg-slate-100 dark:bg-slate-800 px-4 py-2 border-b border-slate-200 dark:border-slate-700 flex items-center gap-2">
          <Code className="w-4 h-4 text-slate-500" />
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Source Code</span>
          {activeLine && (
            <span className="ml-auto text-xs bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded-full">
              Line {activeLine}
            </span>
          )}
        </div>
        <div className="flex-1 overflow-hidden">
          <style>{`
            .active-line-highlight {
              background-color: rgba(59, 130, 246, 0.15) !important;
              border-left: 3px solid #3b82f6 !important;
            }
            .active-line-gutter {
              background-color: #3b82f6;
              width: 3px !important;
              margin-left: 3px;
            }
          `}</style>
          <Editor
            height="100%"
            defaultLanguage="cpp"
            theme={document.documentElement.classList.contains('dark') ? 'vs-dark' : 'light'}
            value={sourceCode}
            onMount={handleEditorDidMount}
            options={{
              readOnly: true,
              domReadOnly: true,
              lineNumbers: 'on',
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
              fontSize: 13,
              fontFamily: 'JetBrains Mono, Fira Code, Consolas, monospace',
              lineDecorationsWidth: 8,
              renderLineHighlight: 'none',
              padding: { top: 8, bottom: 8 },
              wordWrap: 'off',
              folding: false,
              glyphMargin: false,
              lineNumbersMinChars: 3,
              scrollbar: {
                verticalSliderSize: 6,
                horizontalSliderSize: 6,
              },
            }}
          />
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

        {/* Visualizer Header with Zoom Controls and Expand Button */}
        <div className="bg-slate-100 dark:bg-slate-800 px-4 py-2 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-slate-500" />
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Memory Visualization</span>
          </div>
          
          {/* Zoom Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setZoomLevel(prev => Math.max(50, prev - 10))}
              className="p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded transition-colors disabled:opacity-40"
              disabled={zoomLevel <= 50}
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4 text-slate-500" />
            </button>
            <div className="flex items-center gap-1.5 bg-slate-200 dark:bg-slate-700 px-2 py-0.5 rounded">
              <input
                type="range"
                min="50"
                max="150"
                step="10"
                value={zoomLevel}
                onChange={(e) => setZoomLevel(parseInt(e.target.value))}
                className="w-16 h-1 accent-blue-600 cursor-pointer"
              />
              <span className="text-xs font-mono text-slate-600 dark:text-slate-400 w-8">
                {zoomLevel}%
              </span>
            </div>
            <button
              onClick={() => setZoomLevel(prev => Math.min(150, prev + 10))}
              className="p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded transition-colors disabled:opacity-40"
              disabled={zoomLevel >= 150}
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4 text-slate-500" />
            </button>
            
            <div className="w-px h-4 bg-slate-300 dark:bg-slate-600 mx-1" />
            
            <button
              onClick={() => setIsFullscreen(true)}
              className="p-1.5 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors"
              title="Expand to Fullscreen (F)"
            >
              <Maximize2 className="w-4 h-4 text-slate-500" />
            </button>
          </div>
        </div>

        {/* Step Explanation */}
        {stepExplanation && (
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 px-4 py-3 border-b border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-blue-500" />
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{stepExplanation}</span>
            </div>
          </div>
        )}

        {/* Memory Visualization - Zoomable container */}
        <div ref={visualizerContainerRef} className="flex-1 overflow-auto p-4 relative">
          <div 
            ref={visualizerContentRef}
            className="flex flex-col gap-4 origin-top-left transition-transform duration-150"
            style={{ transform: `scale(${zoomLevel / 100})` }}
          >
            
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
                            <div className="flex items-center gap-1.5">
                              {data.dataType && (
                                <span className="text-[10px] font-mono text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-1.5 py-0.5 rounded">
                                  {data.dataType}
                                </span>
                              )}
                              <span className="text-[10px] uppercase tracking-wider text-slate-400 bg-slate-50 dark:bg-slate-700 px-1.5 py-0.5 rounded">
                                {data.type}
                              </span>
                            </div>
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
                            <div className="flex flex-col gap-1">
                              <div className="font-mono text-xl font-bold text-slate-800 dark:text-slate-100">
                                {data.value}
                              </div>
                              {data.expr && (
                                <div className="flex items-center gap-1 text-xs text-slate-400 truncate" title={data.expr}>
                                  <span>←</span>
                                  <code className="font-mono bg-slate-100 dark:bg-slate-700 px-1 py-0.5 rounded text-slate-500 dark:text-slate-400 truncate max-w-[150px]">
                                    {data.expr}
                                  </code>
                                </div>
                              )}
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

        {/* Console Output Panel */}
        {consoleOutput && (
          <div className="border-t border-slate-200 dark:border-slate-700">
            <button 
              onClick={() => setShowConsole(!showConsole)}
              className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 flex items-center justify-between hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
            >
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider">Console Output</span>
              </div>
              <svg className={`w-4 h-4 text-slate-400 transition-transform ${showConsole ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {showConsole && (
              <div className="max-h-32 overflow-auto bg-slate-900 px-4 py-2">
                <pre className="font-mono text-sm text-green-400 whitespace-pre-wrap">
                  {visibleOutput || (!isWaitingForInput && <span className="text-slate-500 italic">Output will appear as you step through cout statements...</span>)}
                  {/* Integrated Terminal Input in Visualizer */}
                  {isWaitingForInput && (
                    <form onSubmit={onInputSubmit} className="inline-block align-baseline ml-1">
                      <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => onInputChange(e.target.value)}
                        className="bg-transparent border-none outline-none text-green-400 font-mono p-0 m-0 w-32 min-w-[20px] focus:ring-0"
                        autoFocus
                        ref={(input) => input && input.focus()}
                      />
                    </form>
                  )}
                </pre>
              </div>
            )}
          </div>
        )}

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

      {/* Fullscreen Modal Overlay - Rendered via Portal to be above navbar */}
      {isFullscreen && ReactDOM.createPortal(
        <AnimatePresence>
          <motion.div
            key="fullscreen-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/95 flex items-center justify-center p-4"
            style={{ zIndex: 99999 }}
            onClick={(e) => e.target === e.currentTarget && setIsFullscreen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="w-full h-full max-w-[98vw] max-h-[98vh] bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-slate-200 dark:border-white/10"
            >
              {/* Fullscreen Header */}
              <div className="bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 px-8 py-5 flex items-center justify-between shadow-lg">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                    <Layers className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <span className="text-xl font-bold text-white">Memory Visualization</span>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-sm text-purple-200 bg-white/10 px-3 py-0.5 rounded-full">Step {currentStep + 1} / {traceData?.length || 0}</span>
                      {activeLine && <span className="text-sm text-purple-200">Line {activeLine}</span>}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsFullscreen(false)}
                    className="p-2.5 bg-white/10 hover:bg-white/20 rounded-xl transition-all text-white backdrop-blur-sm"
                    title="Minimize"
                  >
                    <Minimize2 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setIsFullscreen(false)}
                    className="p-2.5 bg-red-500/80 hover:bg-red-500 rounded-xl transition-all text-white"
                    title="Close (Esc)"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Memory Leak Warning in Fullscreen */}
              {memoryLeaks.length > 0 && currentStep === (traceData?.length || 0) - 1 && (
                <div className="bg-gradient-to-r from-red-500/20 to-orange-500/20 px-8 py-4 border-b border-red-500/30">
                  <div className="flex items-center gap-3 text-red-400">
                    <div className="p-2 bg-red-500/20 rounded-lg">
                      <AlertTriangle className="w-5 h-5" />
                    </div>
                    <span className="font-bold text-lg">Memory Leak Detected!</span>
                    <span className="text-red-300 bg-red-500/20 px-3 py-1 rounded-full text-sm">Not freed: {memoryLeaks.join(', ')}</span>
                  </div>
                </div>
              )}

              {/* Step Explanation in Fullscreen */}
              {stepExplanation && (
                <div className="bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-500/10 dark:to-blue-500/10 px-8 py-4 border-b border-cyan-200 dark:border-cyan-500/20">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-cyan-100 dark:bg-cyan-500/20 rounded-lg">
                      <Zap className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                    </div>
                    <span className="text-base font-medium text-slate-700 dark:text-slate-200">{stepExplanation}</span>
                  </div>
                </div>
              )}

              {/* Fullscreen Memory Visualization */}
              <div ref={fullscreenContainerRef} className="flex-1 overflow-hidden p-8 bg-gradient-to-br from-slate-100 to-slate-50 dark:from-slate-800/50 dark:to-slate-900/50">
                <div ref={fullscreenContentRef} className="flex flex-col gap-8 origin-top-left transition-transform duration-150">
                  {/* HEAP in Fullscreen */}
                  {Object.keys(heapMemory).length > 0 && (
                    <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-500/10 dark:to-orange-500/10 rounded-3xl border border-amber-200 dark:border-amber-500/30 p-8">
                      <div className="flex items-center gap-3 mb-6 border-b border-amber-200 dark:border-amber-500/20 pb-4">
                        <div className="p-2 bg-amber-100 dark:bg-amber-500/20 rounded-xl">
                          <Database className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                        </div>
                        <span className="font-mono font-bold text-xl text-amber-700 dark:text-amber-300">HEAP MEMORY</span>
                        <span className="text-sm text-amber-600 dark:text-amber-400/60 bg-amber-100 dark:bg-amber-500/10 px-3 py-1 rounded-full ml-auto">{Object.keys(heapMemory).length} allocations</span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {Object.entries(heapMemory).map(([addr, data]) => {
                          const color = POINTER_COLORS[pointerColors[data.name]] || POINTER_COLORS[0];
                          return (
                            <div
                              key={addr}
                              className={`p-5 rounded-2xl border-2 shadow-xl bg-white dark:bg-slate-800/80 ${color.border} ${data.freed ? 'opacity-40 grayscale' : ''}`}
                            >
                              <div className="flex justify-between items-center mb-4">
                                <div className="flex items-center gap-3">
                                  <div className={`w-4 h-4 rounded-full ${color.dot} shadow-lg`} />
                                  <span className="font-bold font-mono text-2xl text-slate-800 dark:text-white">{data.name}</span>
                                </div>
                                {data.freed && <span className="text-sm bg-red-100 dark:bg-red-500/30 text-red-600 dark:text-red-300 px-3 py-1 rounded-full">FREED</span>}
                              </div>
                              {data.type === 'array' ? (
                                <div className="flex gap-3 flex-wrap">
                                  {data.value.replace(/[\[\]]/g, '').split(',').map((val, idx) => (
                                    <div key={idx} className={`w-14 h-14 flex items-center justify-center rounded-xl border-2 font-mono text-lg font-bold ${color.bg} ${color.border} shadow-lg`}>
                                      {val.trim()}
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                <div className={`font-mono text-3xl font-bold ${color.text}`}>{data.value}</div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* STACK in Fullscreen */}
                  {stackFrames.map((frame, index) => (
                    <div
                      key={frame.name + index}
                      className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-500/10 dark:to-purple-500/10 rounded-3xl border border-indigo-200 dark:border-indigo-500/30 p-8"
                    >
                      <div className="flex items-center gap-3 mb-6 border-b border-indigo-200 dark:border-indigo-500/20 pb-4">
                        <div className="p-2 bg-indigo-100 dark:bg-indigo-500/20 rounded-xl">
                          <Layers className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                        </div>
                        <span className="font-mono font-bold text-xl text-indigo-700 dark:text-indigo-300">{frame.name}()</span>
                        <span className="text-sm text-indigo-600 dark:text-indigo-400/60 bg-indigo-100 dark:bg-indigo-500/10 px-3 py-1 rounded-full ml-auto">Stack Frame</span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                        {Object.entries(frame.variables).map(([name, data]) => {
                          const hasChanged = previousValues[name] !== undefined && previousValues[name] !== data.value;
                          const color = data.type === 'pointer' ? POINTER_COLORS[data.colorIndex] : null;
                          const targetColor = getTargetColor(name);
                          
                          const getBorderColor = () => {
                            if (data.type === 'pointer' && color) return color.border;
                            if (targetColor) return targetColor.border;
                            if (data.type === 'array') return 'border-emerald-500';
                            if (data.type === 'array2d') return 'border-teal-500';
                            if (data.type === 'struct') return 'border-pink-500';
                            if (data.type === 'constant') return 'border-rose-500';
                            return 'border-sky-500';
                          };
                          
                          return (
                            <div
                              key={name}
                              className={`p-5 rounded-2xl border-2 shadow-xl bg-white dark:bg-slate-800/80 transition-all ${hasChanged ? 'ring-2 ring-yellow-400 ring-offset-2 ring-offset-white dark:ring-offset-slate-900' : ''} ${getBorderColor()}`}
                            >
                              <div className="flex justify-between items-center mb-4">
                                <div className="flex items-center gap-3">
                                  {data.type === 'pointer' && color && <div className={`w-4 h-4 rounded-full ${color.dot} shadow-lg`} />}
                                  {targetColor && <div className={`w-4 h-4 rounded-full ${targetColor.dot} shadow-lg`} />}
                                  <span className="font-bold font-mono text-xl text-slate-800 dark:text-white">{name}</span>
                                  {data.type === 'constant' && <Lock className="w-4 h-4 text-rose-500 dark:text-rose-400" />}
                                </div>
                                <span className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-700/50 px-2.5 py-1 rounded-full">
                                  {data.type}
                                </span>
                              </div>

                              {data.type === 'array' ? (
                                <div className="flex gap-2 flex-wrap">
                                  {data.value.replace(/[\[\]]/g, '').split(',').map((val, idx) => {
                                    const cellColor = getTargetColor(name, idx);
                                    return (
                                      <div key={idx} className="flex flex-col items-center">
                                        <div className={`w-12 h-12 flex items-center justify-center rounded-lg border-2 font-mono text-lg ${
                                          cellColor ? `${cellColor.bg} ${cellColor.border}` : 'bg-slate-100 dark:bg-slate-700 border-slate-300'
                                        }`}>
                                          {val.trim()}
                                        </div>
                                        <span className="text-xs text-slate-400 mt-1">{idx}</span>
                                      </div>
                                    );
                                  })}
                                </div>
                              ) : data.type === 'array2d' ? (
                                render2DArray(name, data)
                              ) : data.type === 'struct' ? (
                                renderStruct(name, data)
                              ) : data.type === 'pointer' ? (
                                <div className="flex flex-col gap-2">
                                  {data.dangling ? (
                                    <div className="flex items-center gap-2 text-red-500">
                                      <span className="text-2xl">💀</span>
                                      <span className="font-bold">DANGLING (freed)</span>
                                    </div>
                                  ) : addressMap[data.value] ? (
                                    <div className={`flex items-center gap-2 ${color?.text || 'text-purple-600'}`}>
                                      <Target className="w-5 h-5" />
                                      <span className="font-mono font-bold text-lg">
                                        → {getTargetDisplayName(data.value, addressMap)}
                                      </span>
                                      <span className="text-slate-400">({data.deref})</span>
                                    </div>
                                  ) : data.value === '0x0' || data.value === '(nil)' ? (
                                    <div className="flex items-center gap-2 text-gray-500">
                                      <span className="text-2xl">∅</span>
                                      <span className="font-bold">NULL</span>
                                    </div>
                                  ) : (
                                    <div className="flex items-center gap-2 text-orange-500">
                                      <span className="text-2xl">⚠️</span>
                                      <span className="font-bold">INVALID</span>
                                    </div>
                                  )}
                                </div>
                              ) : (
                                <div className="font-mono text-2xl font-bold text-slate-800 dark:text-slate-100">
                                  {data.value}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Fullscreen Controls */}
              <div className="bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 p-5 border-t border-slate-200 dark:border-white/10">
                <div className="flex items-center justify-center gap-6 mb-4">
                  <div className="flex items-center gap-3 bg-white dark:bg-slate-700/50 px-4 py-2 rounded-xl shadow-sm">
                    <Gauge className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                    <span className="text-sm text-slate-700 dark:text-slate-300">{playbackSpeed}x</span>
                    <input 
                      type="range" min="0.25" max="4" step="0.25" value={playbackSpeed} 
                      onChange={(e) => setPlaybackSpeed(parseFloat(e.target.value))}
                      className="w-24 h-2 accent-purple-500"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => setCurrentStep(0)} className="p-3 bg-white dark:bg-slate-700/50 hover:bg-slate-50 dark:hover:bg-slate-600/50 rounded-xl transition-all text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white shadow-sm" title="Reset (R)">
                      <RefreshCw className="w-5 h-5" />
                    </button>
                    <button onClick={() => setCurrentStep(Math.max(0, currentStep - 1))} className="p-3 bg-white dark:bg-slate-700/50 hover:bg-slate-50 dark:hover:bg-slate-600/50 rounded-xl transition-all text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white shadow-sm" title="Previous (←)">
                      <SkipBack className="w-5 h-5" />
                    </button>
                    <button onClick={() => setIsPlaying(!isPlaying)} className="px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white rounded-xl transition-all shadow-lg" title="Play/Pause (Space)">
                      {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                    </button>
                    <button onClick={() => setCurrentStep(Math.min((traceData?.length || 1) - 1, currentStep + 1))} className="p-3 bg-white dark:bg-slate-700/50 hover:bg-slate-50 dark:hover:bg-slate-600/50 rounded-xl transition-all text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white shadow-sm" title="Next (→)">
                      <SkipForward className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <div className="relative">
                  <input 
                    type="range" min="0" max={Math.max(0, (traceData?.length || 1) - 1)} value={currentStep} 
                    onChange={(e) => { setIsPlaying(false); setCurrentStep(parseInt(e.target.value)); }} 
                    className="w-full h-2 bg-slate-300 dark:bg-slate-700 rounded-lg accent-purple-500 cursor-pointer"
                  />
                  <div 
                    className="absolute top-0 left-0 h-2 bg-gradient-to-r from-violet-500 to-purple-500 rounded-lg pointer-events-none"
                    style={{ width: `${(currentStep / Math.max(1, (traceData?.length || 1) - 1)) * 100}%` }}
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
};

export default VisualizerEngine;
