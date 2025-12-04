import React, { useState, useEffect } from 'react';
import ModuleCard from '../components/ModuleCard';
import { getModuleProgress } from '../utils/progress';

// Detailed Components
import ComputerBasicsModule from '../components/ComputerBasicsModule';
import LogicBuildingModule from '../components/LogicBuildingModule';
import CppFundamentalsModule from '../components/CppFundamentalsModule';
import CppControlFlowModule from '../components/CppControlFlowModule';
import CppFunctionsModule from '../components/CppFunctionsModule';
import CppArraysModule from '../components/CppArraysModule';
import CppStringsModule from '../components/CppStringsModule';
import CppPointersModule from '../components/CppPointersModule';

const LearnPage = () => {
  const [activeModuleId, setActiveModuleId] = useState(null);
  const [animClass, setAnimClass] = useState('fadeIn');

  const modules = [
    {
      id: 1,
      title: "Computer Basics",
      description: "Learn how computers work, what hardware/software is, and how files are organized.",
      color: "blue",
      progress: 0,
      icon: "💻",
      component: <ComputerBasicsModule />
    },
    {
      id: 2,
      title: "Logic Building",
      description: "Build problem-solving skills using sequences, conditions, loops, and flowcharts.",
      color: "green",
      progress: 0,
      icon: "🧠",
      component: <LogicBuildingModule />
    },
    {
      id: 3,
      title: "C++ Fundamentals",
      description: "Learn basic C++ syntax, variables, input/output, and simple programs.",
      color: "orange",
      progress: 0,
      icon: "⚡",
      component: <CppFundamentalsModule />
    },
    {
      id: 4,
      title: "Control Flow",
      description: "Master decision-making in C++ using if/else, switch, and loops.",
      color: "blue",
      progress: 0,
      icon: "🔀",
      component: <CppControlFlowModule />
    },
    {
      id: 5,
      title: "Functions",
      description: "Learn to create reusable code blocks using parameters, return values, and scope rules.",
      color: "green",
      progress: 0,
      icon: "🔧",
      component: <CppFunctionsModule />
    },
    {
      id: 6,
      title: "Arrays",
      description: "Store and process multiple values using 1D and 2D arrays.",
      color: "blue",
      progress: 0,
      icon: "📦",
      component: <CppArraysModule />
    },
    {
      id: 7,
      title: "Strings",
      description: "Handle text in C++ using character arrays and std::string.",
      color: "red",
      progress: 0,
      icon: "📝",
      component: <CppStringsModule />
    },
    {
      id: 8,
      title: "Pointers",
      description: "Understand memory addresses, dereferencing, and dynamic memory basics.",
      color: "orange",
      progress: 0,
      icon: "📍",
      component: <CppPointersModule />
    }
  ];

  const [progressData, setProgressData] = useState({});

  useEffect(() => {
    const data = {};
    modules.forEach(m => {
      data[m.id] = getModuleProgress(m.id);
    });
    setProgressData(data);
  }, []);

  const handleModuleSelect = (id) => {
    setAnimClass('fadeOut');
    setTimeout(() => {
      setActiveModuleId(id);
      setAnimClass('fadeIn');
      window.scrollTo(0, 0);
    }, 300);
  };

  const handleBack = () => {
    setAnimClass('fadeOut');
    setTimeout(() => {
      setActiveModuleId(null);
      setAnimClass('fadeIn');
      window.scrollTo(0, 0);
    }, 300);
  };

  // If a module is active, show its detailed component with a back button
  if (activeModuleId) {
    const activeModule = modules.find(m => m.id === activeModuleId);
    return (
      <div className={`min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto transition-container ${animClass}`}>
        <button 
          onClick={handleBack}
          className="mb-6 flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Modules
        </button>
        <div>
          {activeModule?.component}
        </div>
      </div>
    );
  }

  // Default View: Module Grid
  return (
    <div className={`min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto transition-container ${animClass}`}>
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
          Learning Path
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Start from zero and master C++ programming step by step. Track your progress and learn by doing.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {modules.map((module) => (
          <ModuleCard
            key={module.id}
            title={module.title}
            description={module.description}
            color={module.color}
            icon={module.icon}
            progress={progressData[module.id] || 0}
            onStart={() => handleModuleSelect(module.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default LearnPage;
