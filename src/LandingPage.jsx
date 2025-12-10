import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Play, Code, Cpu, Eye, Zap, BookOpen, ArrowRight, Terminal, Layers, Database, Box, Sparkles, CheckCircle } from 'lucide-react';
import { 
  fadeInUp, 
  fadeInLeft, 
  fadeInRight, 
  staggerContainer, 
  staggerItem, 
  scaleIn,
  float,
  floatSlow,
  cardHover,
  viewportOnce,
  heroTextContainer,
  heroTextItem
} from './utils/animationVariants';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300 overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
        {/* Background Gradient Orbs - Animated */}
        <motion.div 
          className="absolute top-20 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl"
          animate={{ 
            y: [-20, 20, -20],
            x: [-10, 10, -10],
            scale: [1, 1.1, 1] 
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
          animate={{ 
            y: [20, -20, 20],
            x: [10, -10, 10],
            scale: [1.1, 1, 1.1] 
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        
        <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content - Staggered Animation */}
          <motion.div 
            className="space-y-8"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {/* Badge */}
            <motion.div 
              variants={staggerItem}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/40 dark:to-purple-900/40 rounded-full border border-blue-200 dark:border-blue-800"
            >
              <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-medium text-blue-700 dark:text-blue-300">New: Smart Memory Visualizer</span>
            </motion.div>
            
            {/* Headline */}
            <motion.h1 
              variants={heroTextContainer}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white leading-tight tracking-tight"
            >
              <motion.span variants={heroTextItem} className="block">Don't Just Read Code.</motion.span>
              <motion.span 
                variants={heroTextItem}
                className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600"
              >
                Watch It Execute.
              </motion.span>
            </motion.h1>
            
            {/* Subtitle */}
            <motion.p 
              variants={staggerItem}
              className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-xl leading-relaxed"
            >
              The only platform that visualizes memory, pointers, and heap in real-time. 
              Master C++ by <strong className="text-slate-800 dark:text-slate-200">seeing</strong> exactly what happens under the hood.
            </motion.p>
            
            {/* CTA Buttons */}
            <motion.div 
              variants={staggerItem}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.div whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }}>
                <Link 
                  to="/playground" 
                  className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-semibold text-lg shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all text-center flex items-center justify-center gap-2"
                >
                  <Play className="w-5 h-5" />
                  Try the Visualizer
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }}>
                <Link 
                  to="/learn" 
                  className="px-8 py-4 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-2 border-slate-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-500 rounded-xl font-semibold text-lg transition-all hover:shadow-lg text-center flex items-center justify-center gap-2"
                >
                  <BookOpen className="w-5 h-5" />
                  Start Learning
                </Link>
              </motion.div>
            </motion.div>
            
            {/* Social Proof */}
            <motion.div 
              variants={staggerItem}
              className="flex items-center gap-6 pt-4"
            >
              <div className="flex -space-x-3">
                {['bg-blue-500', 'bg-purple-500', 'bg-green-500', 'bg-orange-500'].map((color, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 + i * 0.1, type: "spring" }}
                    className={`w-10 h-10 rounded-full ${color} border-3 border-white dark:border-slate-900 flex items-center justify-center text-white font-bold text-sm shadow-lg`}
                  >
                    {String.fromCharCode(65 + i)}
                  </motion.div>
                ))}
              </div>
              <div>
                <div className="text-slate-900 dark:text-white font-bold">10,000+ Students</div>
                <div className="text-sm text-slate-500">learning with ZeroToCode</div>
              </div>
            </motion.div>
          </motion.div>
          
          {/* Hero Visual - Interactive Code Preview */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
          >
            <motion.div 
              className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-purple-500/10 rounded-3xl blur-2xl"
              animate={{ scale: [1, 1.05, 1], opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            <motion.div 
              className="relative bg-slate-900 rounded-2xl shadow-2xl border border-slate-700 overflow-hidden"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              {/* Terminal Header */}
              <div className="flex items-center gap-2 px-4 py-3 bg-slate-800 border-b border-slate-700">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <span className="text-xs text-slate-400 ml-2 font-mono">Smart Visualizer</span>
              </div>
              
              {/* Code + Visualizer Split */}
              <div className="flex divide-x divide-slate-700">
                {/* Code Side */}
                <div className="w-1/2 p-4 font-mono text-sm">
                  <div className="text-slate-500">// Watch pointers move!</div>
                  <div><span className="text-purple-400">int</span> arr[<span className="text-orange-400">3</span>] = {'{'}1,2,3{'}'};</div>
                  <div><span className="text-purple-400">int</span>* ptr = arr;</div>
                  <motion.div 
                    className="bg-blue-500/20 border-l-2 border-blue-500 pl-2 -ml-2"
                    animate={{ backgroundColor: ['rgba(59, 130, 246, 0.2)', 'rgba(59, 130, 246, 0.4)', 'rgba(59, 130, 246, 0.2)'] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    ptr++;
                  </motion.div>
                  <div className="text-green-400">// ptr → arr[1]</div>
                </div>
                
                {/* Visualizer Side */}
                <div className="w-1/2 p-4 space-y-3">
                  <div className="text-xs text-slate-400 flex items-center gap-2">
                    <Layers className="w-3 h-3" /> Stack Frame
                  </div>
                  <div className="space-y-2">
                    {/* Array */}
                    <div className="bg-green-500/10 border border-green-500/50 rounded p-2">
                      <div className="text-xs text-green-400 mb-1">arr[]</div>
                      <div className="flex gap-1">
                        <div className="w-7 h-7 bg-green-500/20 rounded flex items-center justify-center text-white text-xs">1</div>
                        <motion.div 
                          className="w-7 h-7 bg-purple-500/30 border border-purple-500 rounded flex items-center justify-center text-white text-xs font-bold"
                          animate={{ scale: [1, 1.1, 1], boxShadow: ['0 0 0 0 rgba(168, 85, 247, 0)', '0 0 0 4px rgba(168, 85, 247, 0.3)', '0 0 0 0 rgba(168, 85, 247, 0)'] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          2
                        </motion.div>
                        <div className="w-7 h-7 bg-green-500/20 rounded flex items-center justify-center text-white text-xs">3</div>
                      </div>
                    </div>
                    {/* Pointer */}
                    <div className="bg-purple-500/10 border border-purple-500 rounded p-2">
                      <div className="flex items-center gap-2">
                        <motion.div 
                          className="w-3 h-3 rounded-full bg-purple-500"
                          animate={{ scale: [1, 1.3, 1] }}
                          transition={{ duration: 1, repeat: Infinity }}
                        />
                        <span className="text-white text-sm font-mono">ptr</span>
                      </div>
                      <div className="text-purple-400 text-xs mt-1">→ arr[1] (value: 2)</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="py-20 bg-white dark:bg-slate-900/50 border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              See What's <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Really Happening</span>
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Our Smart Visualizer shows you the complete picture - stack, heap, pointers, and scope changes in real-time.
            </p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            {[
              { icon: <Layers className="w-6 h-6" />, title: "Stack Frames", desc: "Watch variables appear and disappear", gradient: "from-blue-500 to-blue-600", bg: "bg-blue-50 dark:bg-blue-900/20", border: "border-blue-200 dark:border-blue-800" },
              { icon: <Database className="w-6 h-6" />, title: "Heap Memory", desc: "See new/delete with leak detection", gradient: "from-orange-500 to-orange-600", bg: "bg-orange-50 dark:bg-orange-900/20", border: "border-orange-200 dark:border-orange-800" },
              { icon: <Eye className="w-6 h-6" />, title: "Pointer Tracking", desc: "Follow pointers to their targets", gradient: "from-purple-500 to-purple-600", bg: "bg-purple-50 dark:bg-purple-900/20", border: "border-purple-200 dark:border-purple-800" },
              { icon: <Box className="w-6 h-6" />, title: "Struct Fields", desc: "Visualize object member updates", gradient: "from-pink-500 to-pink-600", bg: "bg-pink-50 dark:bg-pink-900/20", border: "border-pink-200 dark:border-pink-800" },
            ].map((feature, idx) => (
              <motion.div 
                key={idx} 
                variants={staggerItem}
                whileHover={{ y: -8, scale: 1.02 }}
                className={`p-6 rounded-2xl ${feature.bg} border ${feature.border} hover:shadow-xl transition-shadow group cursor-default`}
              >
                <motion.div 
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center text-white mb-4 shadow-lg`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {feature.icon}
                </motion.div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{feature.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              How It Works
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              Three simple steps to understand any C++ concept
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: "01", title: "Write Code", desc: "Type or paste your C++ code in the playground editor", icon: <Code className="w-8 h-8" /> },
              { step: "02", title: "Click Run", desc: "We compile and instrument your code in the browser", icon: <Terminal className="w-8 h-8" /> },
              { step: "03", title: "Watch & Learn", desc: "Step through execution and see memory change in real-time", icon: <Eye className="w-8 h-8" /> },
            ].map((item, idx) => (
              <motion.div 
                key={idx} 
                className="relative"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportOnce}
                transition={{ delay: idx * 0.15, duration: 0.5 }}
              >
                <motion.div 
                  className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-shadow h-full"
                  whileHover={{ y: -5 }}
                >
                  <div className="text-6xl font-bold text-slate-100 dark:text-slate-800 absolute top-4 right-6">{item.step}</div>
                  <div className="relative z-10">
                    <motion.div 
                      className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white mb-6 shadow-lg shadow-blue-500/30"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      {item.icon}
                    </motion.div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{item.title}</h3>
                    <p className="text-slate-600 dark:text-slate-400">{item.desc}</p>
                  </div>
                </motion.div>
                {idx < 2 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={viewportOnce}
                    transition={{ delay: 0.5 + idx * 0.2 }}
                  >
                    <ArrowRight className="hidden md:block absolute top-1/2 -right-4 w-8 h-8 text-slate-300 dark:text-slate-600 transform -translate-y-1/2" />
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <motion.section 
        className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={viewportOnce}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ delay: 0.2 }}
          >
            Ready to See Your Code Come Alive?
          </motion.h2>
          <motion.p 
            className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ delay: 0.3 }}
          >
            No installation needed. Everything runs in your browser. Start visualizing in seconds.
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ delay: 0.4 }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link 
                to="/playground" 
                className="px-8 py-4 bg-white text-blue-600 rounded-xl font-bold text-lg hover:bg-blue-50 transition-colors shadow-lg flex items-center justify-center gap-2"
              >
                <Play className="w-5 h-5" />
                Open Playground
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link 
                to="/about" 
                className="px-8 py-4 bg-white/10 text-white border-2 border-white/30 rounded-xl font-bold text-lg hover:bg-white/20 transition-colors flex items-center justify-center gap-2"
              >
                Learn More
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-1 md:col-span-2">
              <span className="text-2xl font-bold text-white mb-4 block flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                  <Code className="w-5 h-5 text-white" />
                </div>
                ZeroToCode
              </span>
              <p className="text-slate-400 max-w-xs">
                The visual way to master C++. See memory, understand pointers, debug like a pro.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/learn" className="hover:text-blue-400 transition-colors">Courses</Link></li>
                <li><Link to="/playground" className="hover:text-blue-400 transition-colors">Playground</Link></li>
                <li><Link to="/projects" className="hover:text-blue-400 transition-colors">Projects</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/about" className="hover:text-blue-400 transition-colors">About Us</Link></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-slate-500">
              © {new Date().getFullYear()} ZeroToCode. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
              </a>
              <a href="https://github.com/usmanbutt-dev/ZeroToCodemp" className="text-slate-400 hover:text-white transition-colors">
                <span className="sr-only">GitHub</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
