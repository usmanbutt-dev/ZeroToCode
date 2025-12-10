import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Clock, CheckCircle, ChevronRight, ArrowLeft, Sparkles, Target, Lock, Play, Trophy, Zap } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { completeLesson } from '../utils/userProgress';
import { staggerContainer, staggerItem, fadeInUp, viewportOnce } from '../utils/animationVariants';

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
  const [isCompleting, setIsCompleting] = useState(false);
  const [completionMessage, setCompletionMessage] = useState(null);
  
  const { currentUser, userData } = useAuth();

  const modules = [
    {
      id: 1,
      moduleKey: 'module1',
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
      moduleKey: 'module2',
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
      moduleKey: 'module3',
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
      moduleKey: 'module4',
      title: "Control Flow",
      description: "Master decision-making in C++ using if/else, switch, and loops.",
      gradient: "from-purple-500 to-violet-500",
      bgLight: "bg-purple-50 dark:bg-purple-900/20",
      borderColor: "border-purple-200 dark:border-purple-800",
      icon: "🔀",
      lessons: 6,
      time: "50 min",
      component: <CppControlFlowModule />
    },
    {
      id: 5,
      moduleKey: 'module5',
      title: "Functions",
      description: "Create reusable code with functions, parameters, and return values.",
      gradient: "from-rose-500 to-pink-500",
      bgLight: "bg-rose-50 dark:bg-rose-900/20",
      borderColor: "border-rose-200 dark:border-rose-800",
      icon: "🧩",
      lessons: 7,
      time: "55 min",
      component: <CppFunctionsModule />
    },
    {
      id: 6,
      moduleKey: 'module6',
      title: "Arrays",
      description: "Work with collections of data using arrays and basic algorithms.",
      gradient: "from-teal-500 to-cyan-500",
      bgLight: "bg-teal-50 dark:bg-teal-900/20",
      borderColor: "border-teal-200 dark:border-teal-800",
      icon: "📊",
      lessons: 6,
      time: "50 min",
      component: <CppArraysModule />
    },
    {
      id: 7,
      moduleKey: 'module7',
      title: "Strings",
      description: "Manipulate text with string operations, searching, and formatting.",
      gradient: "from-indigo-500 to-blue-500",
      bgLight: "bg-indigo-50 dark:bg-indigo-900/20",
      borderColor: "border-indigo-200 dark:border-indigo-800",
      icon: "📝",
      lessons: 5,
      time: "35 min",
      component: <CppStringsModule />
    },
    {
      id: 8,
      moduleKey: 'module8',
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

  // Get completed lessons from Firebase userData
  const completedLessons = userData?.completedLessons || {};
  
  // Calculate progress data based on Firebase data
  const progressData = {};
  modules.forEach(m => {
    progressData[m.id] = completedLessons[m.moduleKey] ? 100 : 0;
  });

  const handleModuleSelect = (id) => {
    setActiveModuleId(id);
    window.scrollTo(0, 0);
  };

  const handleBack = () => {
    setCompletionMessage(null);
    setActiveModuleId(null);
    window.scrollTo(0, 0);
  };

  const handleCompleteModule = async (moduleKey) => {
    if (!currentUser) {
      setCompletionMessage({ type: 'info', text: 'Sign in to save your progress!' });
      return;
    }
    
    setIsCompleting(true);
    const result = await completeLesson(currentUser.uid, moduleKey);
    setIsCompleting(false);
    
    if (result.success) {
      if (result.alreadyCompleted) {
        setCompletionMessage({ type: 'info', text: 'You\'ve already completed this module!' });
      } else {
        setCompletionMessage({ 
          type: 'success', 
          text: `🎉 Module completed! +${result.xpAwarded} XP earned!`,
          xp: result.xpAwarded
        });
      }
    } else {
      setCompletionMessage({ type: 'error', text: 'Failed to save progress. Try again!' });
    }
  };

  // Calculate overall progress
  const totalProgress = Object.values(progressData).reduce((a, b) => a + b, 0) / modules.length;
  const completedModulesCount = Object.values(progressData).filter(p => p === 100).length;

  // Active module view
  if (activeModuleId) {
    const activeModule = modules.find(m => m.id === activeModuleId);
    const isModuleCompleted = completedLessons[activeModule?.moduleKey];
    
    return (
      <motion.div 
        className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950 pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <motion.button 
            onClick={handleBack}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-300 transition-all font-medium shadow-sm w-fit"
            whileHover={{ x: -4 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Learning Path
          </motion.button>
          
          {currentUser && (
            <motion.button 
              onClick={() => handleCompleteModule(activeModule?.moduleKey)}
              disabled={isCompleting || isModuleCompleted}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold transition-all shadow-lg w-fit ${
                isModuleCompleted 
                  ? 'bg-green-500 text-white cursor-default'
                  : 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white shadow-emerald-500/30'
              } disabled:opacity-70`}
              whileHover={!isModuleCompleted ? { scale: 1.02, y: -2 } : {}}
              whileTap={!isModuleCompleted ? { scale: 0.98 } : {}}
            >
              {isCompleting ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : isModuleCompleted ? (
                <>
                  <CheckCircle className="w-5 h-5" />
                  Completed!
                </>
              ) : (
                <>
                  <Trophy className="w-5 h-5" />
                  Mark as Complete
                </>
              )}
            </motion.button>
          )}
        </div>
        
        {/* Completion Message */}
        <AnimatePresence>
          {completionMessage && (
            <motion.div 
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              className={`mb-6 p-4 rounded-xl flex items-center gap-3 ${
                completionMessage.type === 'success' 
                  ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-300'
                  : completionMessage.type === 'error'
                  ? 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300'
                  : 'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300'
              }`}
            >
              {completionMessage.type === 'success' && <Zap className="w-5 h-5 text-yellow-500" />}
              <span className="font-medium">{completionMessage.text}</span>
            </motion.div>
          )}
        </AnimatePresence>
        
        <div>
          {activeModule?.component}
        </div>
      </motion.div>
    );
  }

  // Main Learning Path View
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Header - Animated */}
        <motion.div 
          className="text-center mb-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div 
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/40 dark:to-indigo-900/40 rounded-full border border-blue-200 dark:border-blue-800 mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <BookOpen className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-semibold text-blue-700 dark:text-blue-300">8 Modules • Beginner Friendly</span>
          </motion.div>
          <motion.h1 
            className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Your Learning <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Path</span>
          </motion.h1>
          <motion.p 
            className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Master C++ programming from zero to hero. Track your progress as you complete each module.
          </motion.p>
        </motion.div>

        {/* Progress Overview Card - Animated */}
        <motion.div 
          className="bg-white dark:bg-slate-800 rounded-2xl p-6 mb-10 border border-slate-200 dark:border-slate-700 shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <motion.div 
                className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/30"
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <Target className="w-8 h-8 text-white" />
              </motion.div>
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">Overall Progress</h2>
                <p className="text-slate-500 dark:text-slate-400">{completedModulesCount} of {modules.length} modules completed</p>
              </div>
            </div>
            
            <div className="flex-1 max-w-md">
              <div className="flex justify-between text-sm font-medium mb-2">
                <span className="text-slate-600 dark:text-slate-400">Progress</span>
                <span className="text-blue-600 dark:text-blue-400">{Math.round(totalProgress)}%</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-700 h-3 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${totalProgress}%` }}
                  transition={{ delay: 0.6, duration: 1, ease: "easeOut" }}
                />
              </div>
            </div>

            <div className="flex gap-6">
              <div className="text-center">
                <motion.div 
                  className="text-2xl font-bold text-slate-900 dark:text-white"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                >
                  {modules.reduce((a, m) => a + m.lessons, 0)}
                </motion.div>
                <div className="text-xs text-slate-500 dark:text-slate-400">Total Lessons</div>
              </div>
              <div className="text-center">
                <motion.div 
                  className="text-2xl font-bold text-slate-900 dark:text-white"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  ~6h
                </motion.div>
                <div className="text-xs text-slate-500 dark:text-slate-400">Total Time</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Learning Path - Visual Timeline with Animations */}
        <div className="relative">
          {/* Vertical line connector */}
          <motion.div 
            className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-orange-500 hidden md:block origin-top"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ delay: 0.5, duration: 1.5 }}
          />
          
          <div className="space-y-4">
            {modules.map((module, index) => {
              const progress = progressData[module.id] || 0;
              const isCompleted = progress === 100;
              const isLocked = index > 0 && (progressData[modules[index - 1].id] || 0) < 50;
              
              return (
                <motion.div 
                  key={module.id}
                  className={`relative flex gap-4 md:gap-6 ${isLocked ? 'opacity-60' : ''}`}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: isLocked ? 0.6 : 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                >
                  {/* Step Number Circle */}
                  <div className="relative z-10 flex-shrink-0">
                    <motion.div 
                      className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-lg ${
                        isCompleted 
                          ? 'bg-gradient-to-br from-green-500 to-emerald-600' 
                          : isLocked
                            ? 'bg-slate-200 dark:bg-slate-700'
                            : `bg-gradient-to-br ${module.gradient}`
                      }`}
                      whileHover={!isLocked ? { scale: 1.1 } : {}}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {isCompleted ? (
                        <CheckCircle className="w-8 h-8 text-white" />
                      ) : isLocked ? (
                        <Lock className="w-6 h-6 text-slate-400" />
                      ) : (
                        <span>{module.icon}</span>
                      )}
                    </motion.div>
                  </div>

                  {/* Module Card */}
                  <motion.div 
                    onClick={() => !isLocked && handleModuleSelect(module.id)}
                    className={`flex-1 bg-white dark:bg-slate-800 rounded-2xl p-5 border-2 transition-all cursor-pointer ${
                      isLocked 
                        ? 'border-slate-200 dark:border-slate-700 cursor-not-allowed' 
                        : `${module.borderColor} hover:shadow-xl`
                    }`}
                    whileHover={!isLocked ? { y: -4, scale: 1.01 } : {}}
                    whileTap={!isLocked ? { scale: 0.99 } : {}}
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className={`px-2 py-0.5 rounded-md text-xs font-bold bg-gradient-to-r ${module.gradient} text-white`}>
                            Module {index + 1}
                          </span>
                          {isCompleted && (
                            <motion.span 
                              className="px-2 py-0.5 rounded-md text-xs font-bold bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ type: "spring" }}
                            >
                              ✓ Completed
                            </motion.span>
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
                            <motion.circle
                              cx="28"
                              cy="28"
                              r="24"
                              stroke="url(#gradient)"
                              strokeWidth="4"
                              fill="none"
                              strokeLinecap="round"
                              initial={{ strokeDasharray: "0 151" }}
                              whileInView={{ strokeDasharray: `${progress * 1.51} 151` }}
                              viewport={{ once: true }}
                              transition={{ delay: index * 0.1 + 0.3, duration: 0.8 }}
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
                        <motion.button 
                          disabled={isLocked}
                          className={`px-5 py-2.5 rounded-xl font-semibold text-sm flex items-center gap-2 transition-all ${
                            isLocked
                              ? 'bg-slate-100 dark:bg-slate-700 text-slate-400 cursor-not-allowed'
                              : isCompleted
                                ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 hover:bg-green-200'
                                : `bg-gradient-to-r ${module.gradient} text-white shadow-lg hover:shadow-xl`
                          }`}
                          whileHover={!isLocked ? { scale: 1.05 } : {}}
                          whileTap={!isLocked ? { scale: 0.95 } : {}}
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
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Motivation Banner - Animated */}
        <motion.div 
          className="mt-12 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-2xl p-8 text-center text-white relative overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.5 }}
        >
          <motion.div 
            className="absolute inset-0 opacity-10"
            animate={{ rotate: [0, 5, 0] }}
            transition={{ duration: 20, repeat: Infinity }}
          >
            <div className="absolute top-4 left-10 text-6xl">🚀</div>
            <div className="absolute bottom-4 right-10 text-6xl">💡</div>
          </motion.div>
          <h3 className="text-2xl font-bold mb-2 relative">Ready to become a C++ developer?</h3>
          <p className="text-blue-100 mb-4 relative">Complete all modules and start building real projects!</p>
          <motion.a 
            href="/projects" 
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition-colors relative"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View Projects <ChevronRight className="w-4 h-4" />
          </motion.a>
        </motion.div>
      </div>
    </div>
  );
};

export default LearnPage;
