import React, { useState, useEffect } from 'react';
import { getModuleProgress } from '../utils/progress';
import { BookOpen, Clock, CheckCircle, ChevronRight, ArrowLeft, Sparkles, Target, Lock, Play } from 'lucide-react';

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
      gradient: "from-blue-500 to-cyan-500",
      bgLight: "bg-blue-50 dark:bg-blue-900/20",
      borderColor: "border-blue-200 dark:border-blue-800",
      icon: "💻",
      lessons: 5,
      time: "30 min",
      component: <ComputerBasicsModule />
    },
    {
      id: 2,
      title: "Logic Building",
      description: "Build problem-solving skills using sequences, conditions, loops, and flowcharts.",
      gradient: "from-green-500 to-emerald-500",
      bgLight: "bg-green-50 dark:bg-green-900/20",
      borderColor: "border-green-200 dark:border-green-800",
      icon: "🧠",
      lessons: 6,
      time: "45 min",
      component: <LogicBuildingModule />
    },
    {
      id: 3,
      title: "C++ Fundamentals",
      description: "Learn basic C++ syntax, variables, input/output, and simple programs.",
      gradient: "from-orange-500 to-amber-500",
      bgLight: "bg-orange-50 dark:bg-orange-900/20",
      borderColor: "border-orange-200 dark:border-orange-800",
      icon: "⚡",
      lessons: 8,
      time: "60 min",
      component: <CppFundamentalsModule />
    },
    {
      id: 4,
      title: "Control Flow",
      description: "Master decision-making in C++ using if/else, switch, and loops.",
      gradient: "from-purple-500 to-violet-500",
      bgLight: "bg-purple-50 dark:bg-purple-900/20",
      borderColor: "border-purple-200 dark:border-purple-800",
      icon: "🔀",
      lessons: 7,
      time: "50 min",
      component: <CppControlFlowModule />
    },
    {
      id: 5,
      title: "Functions",
      description: "Learn to create reusable code blocks using parameters, return values, and scope rules.",
      gradient: "from-teal-500 to-cyan-500",
      bgLight: "bg-teal-50 dark:bg-teal-900/20",
      borderColor: "border-teal-200 dark:border-teal-800",
      icon: "🔧",
      lessons: 6,
      time: "45 min",
      component: <CppFunctionsModule />
    },
    {
      id: 6,
      title: "Arrays",
      description: "Store and process multiple values using 1D and 2D arrays.",
      gradient: "from-indigo-500 to-blue-500",
      bgLight: "bg-indigo-50 dark:bg-indigo-900/20",
      borderColor: "border-indigo-200 dark:border-indigo-800",
      icon: "📦",
      lessons: 5,
      time: "40 min",
      component: <CppArraysModule />
    },
    {
      id: 7,
      title: "Strings",
      description: "Handle text in C++ using character arrays and std::string.",
      gradient: "from-rose-500 to-pink-500",
      bgLight: "bg-rose-50 dark:bg-rose-900/20",
      borderColor: "border-rose-200 dark:border-rose-800",
      icon: "📝",
      lessons: 5,
      time: "35 min",
      component: <CppStringsModule />
    },
    {
      id: 8,
      title: "Pointers",
      description: "Understand memory addresses, dereferencing, and dynamic memory basics.",
      gradient: "from-amber-500 to-orange-500",
      bgLight: "bg-amber-50 dark:bg-amber-900/20",
      borderColor: "border-amber-200 dark:border-amber-800",
      icon: "📍",
      lessons: 8,
      time: "60 min",
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

  // Calculate overall progress
  const totalProgress = Object.values(progressData).reduce((a, b) => a + b, 0) / modules.length;
  const completedModules = Object.values(progressData).filter(p => p === 100).length;

  // Active module view
  if (activeModuleId) {
    const activeModule = modules.find(m => m.id === activeModuleId);
    return (
      <div className={`min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950 pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto transition-container ${animClass}`}>
        <button 
          onClick={handleBack}
          className="mb-6 flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-300 transition-all font-medium shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Learning Path
        </button>
        <div>
          {activeModule?.component}
        </div>
      </div>
    );
  }

  // Main Learning Path View
  return (
    <div className={`min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950 pt-24 pb-12 px-4 sm:px-6 lg:px-8 transition-container ${animClass}`}>
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/40 dark:to-indigo-900/40 rounded-full border border-blue-200 dark:border-blue-800 mb-6">
            <BookOpen className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-semibold text-blue-700 dark:text-blue-300">8 Modules • Beginner Friendly</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Your Learning <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Path</span>
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Master C++ programming from zero to hero. Track your progress as you complete each module.
          </p>
        </div>

        {/* Progress Overview Card */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 mb-10 border border-slate-200 dark:border-slate-700 shadow-lg">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
                <Target className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">Overall Progress</h2>
                <p className="text-slate-500 dark:text-slate-400">{completedModules} of {modules.length} modules completed</p>
              </div>
            </div>
            
            <div className="flex-1 max-w-md">
              <div className="flex justify-between text-sm font-medium mb-2">
                <span className="text-slate-600 dark:text-slate-400">Progress</span>
                <span className="text-blue-600 dark:text-blue-400">{Math.round(totalProgress)}%</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-700 h-3 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-500"
                  style={{ width: `${totalProgress}%` }}
                />
              </div>
            </div>

            <div className="flex gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-slate-900 dark:text-white">{modules.reduce((a, m) => a + m.lessons, 0)}</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">Total Lessons</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-slate-900 dark:text-white">~6h</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">Total Time</div>
              </div>
            </div>
          </div>
        </div>

        {/* Learning Path - Visual Timeline */}
        <div className="relative">
          {/* Vertical line connector */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-orange-500 hidden md:block" />
          
          <div className="space-y-4">
            {modules.map((module, index) => {
              const progress = progressData[module.id] || 0;
              const isCompleted = progress === 100;
              const isLocked = index > 0 && (progressData[modules[index - 1].id] || 0) < 50;
              
              return (
                <div 
                  key={module.id}
                  className={`relative flex gap-4 md:gap-6 ${isLocked ? 'opacity-60' : ''}`}
                >
                  {/* Step Number Circle */}
                  <div className="relative z-10 flex-shrink-0">
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-lg transition-transform hover:scale-110 ${
                      isCompleted 
                        ? 'bg-gradient-to-br from-green-500 to-emerald-600' 
                        : isLocked
                          ? 'bg-slate-200 dark:bg-slate-700'
                          : `bg-gradient-to-br ${module.gradient}`
                    }`}>
                      {isCompleted ? (
                        <CheckCircle className="w-8 h-8 text-white" />
                      ) : isLocked ? (
                        <Lock className="w-6 h-6 text-slate-400" />
                      ) : (
                        <span>{module.icon}</span>
                      )}
                    </div>
                  </div>

                  {/* Module Card */}
                  <div 
                    onClick={() => !isLocked && handleModuleSelect(module.id)}
                    className={`flex-1 bg-white dark:bg-slate-800 rounded-2xl p-5 border-2 transition-all cursor-pointer ${
                      isLocked 
                        ? 'border-slate-200 dark:border-slate-700 cursor-not-allowed' 
                        : `${module.borderColor} hover:shadow-xl hover:-translate-y-1`
                    }`}
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className={`px-2 py-0.5 rounded-md text-xs font-bold bg-gradient-to-r ${module.gradient} text-white`}>
                            Module {index + 1}
                          </span>
                          {isCompleted && (
                            <span className="px-2 py-0.5 rounded-md text-xs font-bold bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                              ✓ Completed
                            </span>
                          )}
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
                          {module.title}
                        </h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">
                          {module.description}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-slate-400">
                          <span className="flex items-center gap-1">
                            <BookOpen className="w-3 h-3" /> {module.lessons} lessons
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" /> {module.time}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        {/* Progress Ring */}
                        <div className="relative w-14 h-14">
                          <svg className="w-full h-full transform -rotate-90">
                            <circle
                              cx="28"
                              cy="28"
                              r="24"
                              stroke="currentColor"
                              strokeWidth="4"
                              fill="none"
                              className="text-slate-100 dark:text-slate-700"
                            />
                            <circle
                              cx="28"
                              cy="28"
                              r="24"
                              stroke="url(#gradient)"
                              strokeWidth="4"
                              fill="none"
                              strokeLinecap="round"
                              strokeDasharray={`${progress * 1.51} 151`}
                              className="transition-all duration-500"
                            />
                            <defs>
                              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#3B82F6" />
                                <stop offset="100%" stopColor="#6366F1" />
                              </linearGradient>
                            </defs>
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-sm font-bold text-slate-700 dark:text-slate-300">{progress}%</span>
                          </div>
                        </div>

                        {/* Action Button */}
                        <button 
                          disabled={isLocked}
                          className={`px-5 py-2.5 rounded-xl font-semibold text-sm flex items-center gap-2 transition-all ${
                            isLocked
                              ? 'bg-slate-100 dark:bg-slate-700 text-slate-400 cursor-not-allowed'
                              : isCompleted
                                ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 hover:bg-green-200'
                                : `bg-gradient-to-r ${module.gradient} text-white shadow-lg hover:shadow-xl hover:scale-105`
                          }`}
                        >
                          {isLocked ? (
                            <>
                              <Lock className="w-4 h-4" /> Locked
                            </>
                          ) : isCompleted ? (
                            <>
                              <Play className="w-4 h-4" /> Review
                            </>
                          ) : progress > 0 ? (
                            <>
                              <Play className="w-4 h-4" /> Continue
                            </>
                          ) : (
                            <>
                              <Sparkles className="w-4 h-4" /> Start
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Motivation Banner */}
        <div className="mt-12 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-2xl p-8 text-center text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-4 left-10 text-6xl">🚀</div>
            <div className="absolute bottom-4 right-10 text-6xl">💡</div>
          </div>
          <h3 className="text-2xl font-bold mb-2 relative">Ready to become a C++ developer?</h3>
          <p className="text-blue-100 mb-4 relative">Complete all modules and start building real projects!</p>
          <a href="/projects" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition-colors relative">
            View Projects <ChevronRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default LearnPage;
