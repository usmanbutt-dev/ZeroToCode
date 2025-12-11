import React, { useState, useRef, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import SettingsModal from '../components/SettingsModal';

// Visualizers
import CppArraysVisualizer from '../components/visualizers/CppArraysVisualizer';
import CppPointersVisualizer from '../components/visualizers/CppPointersVisualizer';
import LogicBuildingVisualizer from '../components/visualizers/LogicBuildingVisualizer';
import VisualizerEngine from '../components/visualizer/VisualizerEngine';

const PlaygroundPage = () => {
  // Initial code state - prioritizes project code -> autosaved code -> default code
  const [code, setCode] = useState(() => {
    const projectCode = localStorage.getItem('playgroundCode');
    if (projectCode) {
      localStorage.removeItem('playgroundCode'); // Clear one-time transfer
      return projectCode;
    }
    
    const savedCode = localStorage.getItem('autosave_code');
    if (savedCode) return savedCode;
    
    return `// Write your C++ code here
#include <iostream>

int main() {
  std::cout << "Hello, World!" << std::endl;
  return 0;
}`;
  });
  const [output, setOutput] = useState('Click "Run" to see output...');
  const [isRunning, setIsRunning] = useState(false);
  const [fontSize, setFontSize] = useState(14);
  const [theme, setTheme] = useState('vs-dark');
  const [activeVisualizer, setActiveVisualizer] = useState(null);
  const [traceData, setTraceData] = useState([]);
  const [activeTab, setActiveTab] = useState('output'); // 'output' | 'visualizer'
  const [layout, setLayout] = useState('vertical'); // 'vertical' | 'horizontal'
  const [splitPosition, setSplitPosition] = useState(50); // Percentage
  const [isDragging, setIsDragging] = useState(false);
  
  // Settings
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [editorSettings, setEditorSettings] = useState({
    lineNumbers: 'on',
    minimap: { enabled: false },
    wordWrap: 'on',
    fontLigatures: true
  });

  // --- Input Protocol State ---
  const [accumulatedInput, setAccumulatedInput] = useState('');
  const [isWaitingForInput, setIsWaitingForInput] = useState(false);
  const [lastInputValue, setLastInputValue] = useState('');
  
  // Check if code has cin (for UI hints only)
  const [hasCin, setHasCin] = useState(false);
  
  // Separate console output from status messages
  const [consoleOutput, setConsoleOutput] = useState('');

  const editorRef = useRef(null);
  const containerRef = useRef(null);

  // Auto-save code changes (debounced)
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      localStorage.setItem('autosave_code', code);
    }, 1000); // Save after 1 second of inactivity

    return () => clearTimeout(timeoutId);
  }, [code]);

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
  };

  const handleSettingChange = (key, value) => {
    setEditorSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  // Theme Sync
  useEffect(() => {
    const updateTheme = () => {
      if (document.documentElement.classList.contains('dark')) {
        setTheme('vs-dark');
      } else {
        setTheme('light');
      }
    };

    updateTheme(); // Initial check

    // Observer for class changes on html element
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    return () => observer.disconnect();
  }, []);

  // Smart Visualizer Detection
  useEffect(() => {
    if (code.includes('int*') || code.includes('&')) {
      setActiveVisualizer('pointers');
    } else if (code.includes('[') && code.includes(']')) {
      setActiveVisualizer('arrays');
    } else if (code.includes('if') || code.includes('else')) {
      setActiveVisualizer('logic');
    } else {
      setActiveVisualizer(null);
    }
    
    // Detect cin usage
    setHasCin(code.includes('cin'));
  }, [code]);

  // Drag Handling
  const handleMouseDown = (e) => {
    setIsDragging(true);
    e.preventDefault();
  };

  useEffect(() => {
    let rafId = null;
    
    const handleMouseMove = (e) => {
      if (!isDragging || !containerRef.current) return;
      
      // Cancel previous frame
      if (rafId) cancelAnimationFrame(rafId);
      
      // Use RAF for smooth updates
      rafId = requestAnimationFrame(() => {
        const containerRect = containerRef.current.getBoundingClientRect();
        let newSplit;
        
        if (layout === 'vertical') {
          newSplit = ((e.clientX - containerRect.left) / containerRect.width) * 100;
        } else {
          newSplit = ((e.clientY - containerRect.top) / containerRect.height) * 100;
        }
        
        if (newSplit > 20 && newSplit < 80) {
          setSplitPosition(newSplit);
        }
      });
    };

    const handleMouseUp = () => {
      if (rafId) cancelAnimationFrame(rafId);
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, layout]);

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([code], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = "main.cpp";
    document.body.appendChild(element);
    element.click();
  };



  // Worker Reference
  const workerRef = useRef(null);

  useEffect(() => {
    // Initialize Worker
    workerRef.current = new Worker(new URL('../workers/clang.worker.js', import.meta.url), { type: 'module' });
    
    workerRef.current.onmessage = (e) => {
      const { type, payload } = e.data;
      
      if (type === 'STATUS') {
        setOutput(prev => prev === 'Compiling...' ? payload : prev + '\n' + payload);
      } else if (type === 'OUTPUT') {
        // Track console output separately
        setConsoleOutput(payload);
        setOutput(prev => prev + '\n' + payload);
      } else if (type === 'TRACE') {
        console.log("--- PLAYGROUND: RECEIVED TRACE DATA ---\n", payload);
        // Handle new payload structure: { traces, fullOutput }
        setTraceData(payload.traces || payload);
        setConsoleOutput(payload.fullOutput || '');
        setActiveTab('visualizer');
      } else if (type === 'NEED_INPUT') {
        setIsWaitingForInput(true);
        // Do NOT set isRunning to false, we are "paused"
      } else if (type === 'ERROR') {
        setOutput(prev => prev + '\nError: ' + payload);
        setIsRunning(false);
      } else if (type === 'FINISHED') {
        setIsRunning(false);
      }
    };

    workerRef.current.onerror = (err) => {
      console.error("Worker Error:", err);
      setOutput(prev => prev + '\nWorker Error: ' + (err.message || "Unknown error"));
      setIsRunning(false);
    };

    return () => {
      if (workerRef.current) workerRef.current.terminate();
    };
  }, []);

  const runCode = () => {
    setIsRunning(true);
    setTraceData(null);
    setConsoleOutput('');
    setOutput('Compiling...');
    setAccumulatedInput(''); // Reset input history on fresh run
    setIsWaitingForInput(false);
    
    if (workerRef.current) {
      workerRef.current.postMessage({ 
        type: 'COMPILE_AND_RUN', 
        payload: { 
          code: code,
          input: '' // Start with empty input
        } 
      });
    }
  };

  const handleInputSubmit = (e) => {
    e.preventDefault();
    const newInput = lastInputValue.trim();
    
    // Append new input to history with a newline
    const newAccumulated = accumulatedInput + newInput + '\n';
    setAccumulatedInput(newAccumulated);
    setLastInputValue('');
    setIsWaitingForInput(false);
    
    // RE-RUN with full input history
    // This simulates "resuming" by re-executing everything with the new input available
    if (workerRef.current) {
        workerRef.current.terminate();
    }
    workerRef.current = new Worker(new URL('../workers/clang.worker.js', import.meta.url), { type: 'module' });
    
    // Re-attach listeners (duplicated code, ideal for refactoring but keeping inline for now)
    workerRef.current.onmessage = (e) => {
      const { type, payload } = e.data;
      if (type === 'STATUS') {
         // Ignore status on re-runs to avoid spam
      } else if (type === 'OUTPUT') {
        setConsoleOutput(payload);
        setOutput(prev => prev + '\n' + payload);
      } else if (type === 'TRACE') {
        setTraceData(payload.traces || payload);
        setConsoleOutput(payload.fullOutput || '');
        setActiveTab('visualizer');
      } else if (type === 'NEED_INPUT') {
        setIsWaitingForInput(true);
      } else if (type === 'ERROR') {
        setOutput(prev => prev + '\nError: ' + payload);
        setIsRunning(false);
      } else if (type === 'FINISHED') {
        setIsRunning(false);
      }
    };
    
    workerRef.current.postMessage({ 
      type: 'COMPILE_AND_RUN', 
      payload: { 
        code: code,
        input: newAccumulated
      } 
    });
  };

  return (
    <div className="pt-16 h-screen flex flex-col bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      


      <SettingsModal 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)}
        settings={editorSettings}
        onSettingChange={handleSettingChange}
      />

      {/* Toolbar */}
      <div className="h-14 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 flex items-center px-4 justify-between shrink-0 gap-4 overflow-x-auto transition-colors duration-300">
        
        <div className="flex items-center gap-3">
          {/* Run Button */}
          <button 
            onClick={runCode}
            disabled={isRunning && !isWaitingForInput}
            className={`px-4 py-1.5 rounded-lg font-semibold text-sm flex items-center gap-2 transition-all ${
              isRunning && !isWaitingForInput
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
                : 'bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-500/30'
            }`}
          >
            {isRunning && !isWaitingForInput ? (
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" /></svg>
            )}
            {isRunning ? (isWaitingForInput ? 'Waiting...' : 'Running...') : 'Run'}
          </button>
          

        </div>

        <div className="flex items-center gap-2">
          {/* Layout Switcher */}
          <div className="flex bg-slate-100 dark:bg-slate-700 rounded-lg p-1 transition-colors duration-300">
            <button
              onClick={() => setLayout('vertical')}
              className={`p-1.5 rounded transition-all duration-200 ${layout === 'vertical' ? 'bg-white dark:bg-slate-600 shadow-sm text-blue-600 dark:text-blue-400' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
              title="Vertical Split"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M4 4h16v16H4V4zm7 14V6H6v12h5zm7 0h-5V6h5v12z"/></svg>
            </button>
            <button
              onClick={() => setLayout('horizontal')}
              className={`p-1.5 rounded transition-all duration-200 ${layout === 'horizontal' ? 'bg-white dark:bg-slate-600 shadow-sm text-blue-600 dark:text-blue-400' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
              title="Horizontal Split"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20 4H4v16h16V4zm-2 5H6V6h12v3zm0 9H6v-7h12v7z"/></svg>
            </button>
          </div>

          <div className="h-6 w-px bg-slate-200 dark:bg-slate-700 mx-1 transition-colors duration-300"></div>

          {/* Font Size Slider */}
          <div className="flex items-center gap-3 px-2">
            <span className="text-xs font-bold text-slate-400">Aa</span>
            <input 
              type="range" 
              min="12" 
              max="24" 
              value={fontSize} 
              onChange={(e) => setFontSize(parseInt(e.target.value))}
              className="w-24 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600 hover:accent-blue-500 transition-all"
            />
            <span className="text-xs font-bold text-slate-400">Aa</span>
          </div>

          {/* Settings Button */}
          <button 
            onClick={() => setIsSettingsOpen(true)}
            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 transition-colors"
            title="Editor Settings"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>

          {/* Download */}
          <button 
            onClick={handleDownload}
            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 transition-colors"
            title="Download Code"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div 
        ref={containerRef} 
        className={`flex-1 flex overflow-hidden relative ${layout === 'vertical' ? 'flex-row' : 'flex-col'}`}
      >
        {/* Code Editor - Slides out when visualizer is active */}
        <div 
          className={`bg-[#1e1e1e] border-slate-800 overflow-hidden relative transition-all duration-500 ease-out ${
            isDragging ? 'transition-none' : ''
          }`}
          style={{ 
            width: activeTab === 'visualizer' 
              ? '0%' 
              : (layout === 'vertical' ? `${splitPosition}%` : '100%'),
            height: layout === 'vertical' ? '100%' : (activeTab === 'visualizer' ? '0%' : `${splitPosition}%`),
            borderRightWidth: layout === 'vertical' ? '1px' : '0',
            borderBottomWidth: layout === 'vertical' ? '0' : '1px',
            opacity: activeTab === 'visualizer' ? 0 : 1,
            minWidth: activeTab === 'visualizer' ? 0 : undefined
          }}
        >
          <Editor
            height="100%"
            defaultLanguage="cpp"
            theme={theme}
            value={code}
            onChange={(value) => setCode(value)}
            onMount={handleEditorDidMount}
            options={{
              minimap: editorSettings.minimap,
              fontSize: fontSize,
              lineNumbers: editorSettings.lineNumbers,
              wordWrap: editorSettings.wordWrap,
              fontLigatures: editorSettings.fontLigatures,
              padding: { top: 16 },
              scrollBeyondLastLine: false,
              smoothScrolling: true,
            }}
          />
        </div>

        {/* Dragger - Fades out when visualizer is active */}
        <div 
          className={`bg-slate-200 dark:bg-slate-700 hover:bg-blue-500 z-10 flex items-center justify-center transition-all duration-500 ease-out ${
            isDragging ? 'transition-none' : ''
          } ${
            layout === 'vertical' 
              ? 'cursor-col-resize h-full' 
              : 'cursor-row-resize w-full'
          }`}
          style={{
            width: activeTab === 'visualizer' ? '0px' : (layout === 'vertical' ? '4px' : '100%'),
            height: activeTab === 'visualizer' ? '0px' : (layout === 'vertical' ? '100%' : '4px'),
            opacity: activeTab === 'visualizer' ? 0 : 1
          }}
          onMouseDown={handleMouseDown}
        />

        {/* Output & Visualizer Panel - Expands smoothly */}
        <div 
          className={`bg-slate-100 dark:bg-slate-900 flex flex-col overflow-hidden transition-all duration-500 ease-out ${
            isDragging ? 'transition-none' : ''
          }`}
          style={{ 
            width: activeTab === 'visualizer' ? '100%' : (layout === 'vertical' ? `${100 - splitPosition}%` : '100%'),
            height: activeTab === 'visualizer' ? '100%' : (layout === 'vertical' ? '100%' : `${100 - splitPosition}%`)
          }}
        >
            {/* Tabs */}
            <div className="flex border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800">
              <button
                onClick={() => setActiveTab('output')}
                className={`px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors ${
                  activeTab === 'output'
                    ? 'text-blue-600 border-b-2 border-blue-600 dark:text-blue-400 bg-white dark:bg-slate-900'
                    : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
                }`}
              >
                Terminal
              </button>
              <button
                onClick={() => setActiveTab('visualizer')}
                className={`px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-2 ${
                  activeTab === 'visualizer'
                    ? 'text-blue-600 border-b-2 border-blue-600 dark:text-blue-400 bg-white dark:bg-slate-900'
                    : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
                }`}
              >
                <span>Smart Visualizer</span>
                {traceData && traceData.length > 0 && (
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                )}
              </button>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-hidden relative bg-slate-50 dark:bg-[#1e1e1e]">
              {activeTab === 'output' ? (
                <div className="h-full flex flex-col">
                  {/* Terminal Output Area */}
                  <div className="flex-1 p-4 font-mono text-sm text-slate-700 dark:text-slate-300 overflow-auto whitespace-pre-wrap">
                    <div className="flex-1">
                      {output}
                      {/* Integrated Terminal Input */}
                      {isWaitingForInput && (
                        <form onSubmit={handleInputSubmit} className="inline-block align-baseline ml-1">
                          <input
                            type="text"
                            value={lastInputValue}
                            onChange={(e) => setLastInputValue(e.target.value)}
                            className="bg-transparent border-none outline-none text-slate-700 dark:text-slate-300 font-mono p-0 m-0 w-32 min-w-[20px] focus:ring-0"
                            autoFocus
                            ref={(input) => input && input.focus()}
                          />
                        </form>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <VisualizerEngine 
                  traceData={traceData} 
                  sourceCode={code} 
                  consoleOutput={consoleOutput}
                  isWaitingForInput={isWaitingForInput}
                  onInputSubmit={handleInputSubmit}
                  inputValue={lastInputValue}
                  onInputChange={setLastInputValue}
                />
              )}
            </div>
          </div>
      </div>
    </div>
  );
};

export default PlaygroundPage;
