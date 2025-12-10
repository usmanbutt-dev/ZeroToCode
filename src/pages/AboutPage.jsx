import React from 'react';
import { motion } from 'framer-motion';
import { Code, Cpu, Eye, Zap, Users, BookOpen, Layers, Database, Box, ArrowRight } from 'lucide-react';
import { staggerContainer, staggerItem, fadeInUp, viewportOnce } from '../utils/animationVariants';

const AboutPage = () => {
  const features = [
    {
      icon: <Eye className="w-6 h-6" />,
      title: "Smart Visualizer",
      description: "Watch your code execute step-by-step with real-time memory visualization. See pointers, arrays, and data structures come alive.",
      color: "from-purple-500 to-indigo-500"
    },
    {
      icon: <Database className="w-6 h-6" />,
      title: "Heap & Stack",
      description: "Understand dynamic memory allocation. See new/delete operations, detect memory leaks, and visualize the heap.",
      color: "from-orange-500 to-amber-500"
    },
    {
      icon: <Box className="w-6 h-6" />,
      title: "Structs & Classes",
      description: "Visualize object-oriented concepts. Watch struct fields update in real-time with color-coded displays.",
      color: "from-pink-500 to-rose-500"
    },
    {
      icon: <Layers className="w-6 h-6" />,
      title: "Scope Tracking",
      description: "See variables appear and disappear as you enter and exit blocks. Understand lifetime and scope intuitively.",
      color: "from-teal-500 to-emerald-500"
    },
    {
      icon: <Cpu className="w-6 h-6" />,
      title: "In-Browser Compiler",
      description: "No setup required. Compile and run C++ directly in your browser using WebAssembly technology.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Step Explanations",
      description: "Natural language explanations for every step. Understand what's happening without reading raw memory addresses.",
      color: "from-yellow-500 to-orange-500"
    }
  ];

  return (
    <div className="pt-24 pb-20 min-h-screen bg-slate-50 dark:bg-slate-900 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section - Animated */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div 
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-600 dark:text-blue-400 text-sm font-medium mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Code className="w-4 h-4" />
            Learn by Seeing
          </motion.div>
          <motion.h1 
            className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            About <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">ZeroToCode</span>
          </motion.h1>
          <motion.p 
            className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            We believe that understanding how computers think shouldn't require years of experience. 
            Our interactive visualizer makes the invisible visible, turning abstract concepts into intuitive understanding.
          </motion.p>
        </motion.div>

        {/* Mission Card - Animated */}
        <motion.div 
          className="bg-white dark:bg-slate-800 rounded-3xl p-8 md:p-12 shadow-xl border border-slate-100 dark:border-slate-700 mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <motion.div 
              className="flex-1 space-y-6"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={viewportOnce}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Why We Built This</h2>
              <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
                Traditional coding tutorials show you syntax but leave the "how it works" to imagination. 
                We built ZeroToCode's <strong className="text-blue-600">Smart Visualizer</strong> to bridge that gap.
              </p>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Watch pointers move through memory. See arrays update cell by cell. Understand why your code crashed 
                by watching memory states in real-time. Learning C++ shouldn't feel like solving a mystery.
              </p>
              <div className="flex gap-8 pt-4">
                {[
                  { value: "10k+", label: "Students", gradient: "from-blue-600 to-indigo-600" },
                  { value: "50+", label: "Modules", gradient: "from-purple-600 to-pink-600" },
                  { value: "100%", label: "Browser-Based", gradient: "from-orange-600 to-amber-600" }
                ].map((stat, index) => (
                  <motion.div 
                    key={stat.label}
                    className="text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={viewportOnce}
                    transition={{ delay: 0.4 + index * 0.1 }}
                  >
                    <div className={`text-4xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}>
                      {stat.value}
                    </div>
                    <div className="text-sm text-slate-500 font-medium">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            {/* Visualizer Preview - Animated */}
            <motion.div 
              className="flex-1 w-full"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={viewportOnce}
              transition={{ delay: 0.3 }}
            >
              <motion.div 
                className="bg-slate-900 rounded-2xl p-4 shadow-2xl border border-slate-700"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex gap-2 mb-3">
                  <motion.div 
                    className="w-3 h-3 rounded-full bg-red-500"
                    whileHover={{ scale: 1.2 }}
                  />
                  <motion.div 
                    className="w-3 h-3 rounded-full bg-yellow-500"
                    whileHover={{ scale: 1.2 }}
                  />
                  <motion.div 
                    className="w-3 h-3 rounded-full bg-green-500"
                    whileHover={{ scale: 1.2 }}
                  />
                  <span className="text-xs text-slate-500 ml-2">Smart Visualizer</span>
                </div>
                <div className="space-y-3">
                  {/* Mock Stack Frame */}
                  <motion.div 
                    className="bg-slate-800 rounded-lg p-3 border border-slate-700"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={viewportOnce}
                    transition={{ delay: 0.5 }}
                  >
                    <div className="text-xs text-slate-400 mb-2 flex items-center gap-2">
                      <Layers className="w-3 h-3" /> main()
                    </div>
                    <div className="flex gap-2">
                      <motion.div 
                        className="bg-blue-500/20 border border-blue-500 rounded px-3 py-2 text-center"
                        whileHover={{ scale: 1.05 }}
                      >
                        <div className="text-blue-400 text-xs">x</div>
                        <div className="text-white font-bold">42</div>
                      </motion.div>
                      <motion.div 
                        className="bg-purple-500/20 border border-purple-500 rounded px-3 py-2 text-center"
                        whileHover={{ scale: 1.05 }}
                      >
                        <div className="text-purple-400 text-xs flex items-center gap-1">
                          <motion.div 
                            className="w-2 h-2 rounded-full bg-purple-500"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          />
                          ptr
                        </div>
                        <div className="text-white font-bold text-xs">→ arr[0]</div>
                      </motion.div>
                      <div className="bg-green-500/20 border border-green-500 rounded px-2 py-2">
                        <div className="text-green-400 text-xs mb-1">arr[]</div>
                        <div className="flex gap-1">
                          {[1, 2, 3].map((num, i) => (
                            <motion.div 
                              key={i}
                              className={`w-6 h-6 ${i === 0 ? 'bg-purple-500/30 border border-purple-500' : 'bg-green-500/10'} rounded flex items-center justify-center text-white text-xs`}
                              initial={{ opacity: 0, scale: 0 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              viewport={viewportOnce}
                              transition={{ delay: 0.7 + i * 0.1 }}
                            >
                              {num}
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                  {/* Mock Heap */}
                  <motion.div 
                    className="bg-orange-500/10 rounded-lg p-3 border border-orange-500/50"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={viewportOnce}
                    transition={{ delay: 0.6 }}
                  >
                    <div className="text-xs text-orange-400 mb-2 flex items-center gap-2">
                      <Database className="w-3 h-3" /> HEAP
                    </div>
                    <motion.div 
                      className="bg-orange-500/20 border border-orange-500 rounded px-3 py-2 inline-block"
                      whileHover={{ scale: 1.05 }}
                    >
                      <div className="text-orange-400 text-xs">heapVar</div>
                      <div className="text-white font-bold">99</div>
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Features Grid - Animated */}
        <div className="mb-16">
          <motion.h2 
            className="text-2xl font-bold text-slate-900 dark:text-white text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
          >
            What Makes Us Different
          </motion.h2>
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            {features.map((feature, index) => (
              <motion.div 
                key={index} 
                className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-100 dark:border-slate-700 hover:shadow-xl transition-shadow group"
                variants={staggerItem}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <motion.div 
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-white mb-4 shadow-lg`}
                  whileHover={{ scale: 1.15, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {feature.icon}
                </motion.div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{feature.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* CTA - Animated */}
        <motion.div 
          className="text-center bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-8 md:p-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.5 }}
        >
          <motion.h2 
            className="text-2xl md:text-3xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ delay: 0.2 }}
          >
            Ready to See Your Code Come Alive?
          </motion.h2>
          <motion.p 
            className="text-blue-100 mb-6 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={viewportOnce}
            transition={{ delay: 0.3 }}
          >
            Start learning with our interactive visualizer. No installation required - everything runs in your browser.
          </motion.p>
          <motion.a 
            href="/playground" 
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 rounded-xl font-bold hover:bg-blue-50 transition-colors shadow-lg"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            Try the Playground <ArrowRight className="w-5 h-5" />
          </motion.a>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutPage;
