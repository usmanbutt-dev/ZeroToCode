import React, { useState, useRef, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import SettingsModal from '../components/SettingsModal';

// Visualizers
import CppArraysVisualizer from '../components/visualizers/CppArraysVisualizer';
import CppPointersVisualizer from '../components/visualizers/CppPointersVisualizer';
import LogicBuildingVisualizer from '../components/visualizers/LogicBuildingVisualizer';

const PlaygroundPage = () => {
  const [code, setCode] = useState(`// Write your C++ code here
#include <iostream>

int main() {
  std::cout << "Hello, World!" << std::endl;
  return 0;
}`);
  const [output, setOutput] = useState('Click "Run" to see output...');
  const [isRunning, setIsRunning] = useState(false);
  const [fontSize, setFontSize] = useState(14);
  const [theme, setTheme] = useState('vs-dark');
  const [activeVisualizer, setActiveVisualizer] = useState(null);
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

  // Input Handling
  const [inputNeeded, setInputNeeded] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [pendingInput, setPendingInput] = useState(null);

  const editorRef = useRef(null);
  const containerRef = useRef(null);

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
  }, [code]);

  // Drag Handling
  const handleMouseDown = (e) => {
    setIsDragging(true);
    e.preventDefault();
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging || !containerRef.current) return;
      
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
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
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

  const handleInputSubmit = (e) => {
    e.preventDefault();
    if (pendingInput) {
      pendingInput(inputValue);
      setInputValue('');
      setInputNeeded(false);
      setPendingInput(null);
    }
  };

  const runCode = () => {
    setIsRunning(true);
    setOutput('Compiling...');

    // Mock C++ Runner
    setTimeout(async () => {
      try {
        const lines = code.split('\n');
        let result = '';
        
        for (const line of lines) {
          if (line.includes('cout')) {
            const matches = line.match(/"([^"]*)"/g);
            if (matches) {
              matches.forEach(match => {
                result += match.replace(/"/g, '') + '\n';
              });
            }
            if (line.includes('<<') && !line.includes('"')) {
               const parts = line.split('<<');
               if (parts.length > 1) {
                 const val = parts[1].replace(';', '').trim();
                 if (!isNaN(val)) {
                   result += val + '\n';
                 }
               }
            }
          }
          
          // Mock cin
          if (line.includes('cin')) {
            setOutput(prev => prev + '\n> Waiting for input...');
            setInputNeeded(true);
            const userInput = await new Promise(resolve => {
              setPendingInput(() => resolve);
            });
            result += `> Input received: ${userInput}\n`;
          }
        }

        if (!result) result = 'Program exited with return value 0';
        setOutput(result);
      } catch (err) {
        setOutput('Error: Compilation failed.');
      }
      setIsRunning(false);
    }, 800);
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
            disabled={isRunning && !inputNeeded}
            className={`px-4 py-1.5 rounded-lg font-semibold text-sm flex items-center gap-2 transition-all ${
              isRunning && !inputNeeded
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
                : 'bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-500/30'
            }`}
          >
            {isRunning && !inputNeeded ? (
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" /></svg>
            )}
            {isRunning ? (inputNeeded ? 'Waiting...' : 'Running...') : 'Run'}
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
        {/* Code Editor */}
        <div 
          className="bg-[#1e1e1e] border-slate-800 overflow-hidden relative transition-all duration-300 ease-in-out"
          style={{ 
            width: layout === 'vertical' ? `${splitPosition}%` : '100%',
            height: layout === 'vertical' ? '100%' : `${splitPosition}%`,
            borderRightWidth: layout === 'vertical' ? '1px' : '0',
            borderBottomWidth: layout === 'vertical' ? '0' : '1px'
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

        {/* Dragger */}
        <div 
          className={`bg-slate-200 dark:bg-slate-700 hover:bg-blue-500 transition-colors z-10 flex items-center justify-center ${
            layout === 'vertical' 
              ? 'w-1 cursor-col-resize h-full' 
              : 'h-1 cursor-row-resize w-full'
          }`}
          onMouseDown={handleMouseDown}
        />

        {/* Output & Visualizer Panel */}
        <div 
          className="bg-slate-100 dark:bg-slate-900 flex flex-col overflow-hidden transition-all duration-300 ease-in-out"
          style={{ 
            width: layout === 'vertical' ? `${100 - splitPosition}%` : '100%',
            height: layout === 'vertical' ? '100%' : `${100 - splitPosition}%`
          }}
        >
          
          {/* Smart Visualizer Pane */}
          {activeVisualizer && (
            <div className="flex-1 border-b border-slate-200 dark:border-slate-700 flex flex-col overflow-hidden">
              <div className="bg-blue-50 dark:bg-blue-900/20 px-4 py-2 text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider border-b border-blue-100 dark:border-blue-800/50 flex justify-between items-center transition-colors duration-300">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span>Smart Visualizer</span>
                </div>
                <span className="bg-blue-100 dark:bg-blue-800 px-2 py-0.5 rounded text-[10px] transition-colors duration-300">
                  {activeVisualizer === 'pointers' ? 'Memory' : activeVisualizer === 'arrays' ? 'Arrays' : 'Logic'}
                </span>
              </div>
              <div className="flex-1 overflow-auto p-2 bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
                <div className="scale-75 origin-top-left w-[133%] h-[133%]">
                  {activeVisualizer === 'pointers' && <CppPointersVisualizer />}
                  {activeVisualizer === 'arrays' && <CppArraysVisualizer />}
                  {activeVisualizer === 'logic' && <LogicBuildingVisualizer />}
                </div>
              </div>
            </div>
          )}

          {/* Output Console */}
          <div className={`${activeVisualizer ? 'h-1/3' : 'flex-1'} flex flex-col transition-all duration-300`}>
            <div className="bg-slate-200 dark:bg-slate-800 px-4 py-2 text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-300 dark:border-slate-700 flex justify-between items-center transition-colors duration-300">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>Terminal</span>
              </div>
            </div>
            <div className="flex-1 p-4 font-mono text-sm text-slate-700 dark:text-slate-300 overflow-auto whitespace-pre-wrap flex flex-col transition-colors duration-300">
              <div className="flex-1">{output}</div>
              {inputNeeded && (
                <form onSubmit={handleInputSubmit} className="mt-2 flex items-center gap-2 border-t border-slate-200 dark:border-slate-700 pt-2">
                  <span className="text-green-500 font-bold">&gt;</span>
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="flex-1 bg-transparent border-none outline-none text-slate-700 dark:text-slate-300 font-mono"
                    placeholder="Type input here..."
                    autoFocus
                  />
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaygroundPage;
