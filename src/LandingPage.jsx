import React from 'react';
import { Link } from 'react-router-dom';
import FeatureCard from './FeatureCard';
import VisualizerShowcase from './components/VisualizerShowcase';
import CurriculumPreview from './components/CurriculumPreview';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      {/* Hero Section */}
      <section className="pt-32 pb-20 lg:pt-48 lg:pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white leading-tight tracking-tight">
              Don't Just Read Code. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                Experience It.
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
              The only platform that lets you visualize memory, logic, and hardware in real-time. Master C++ by seeing exactly what happens under the hood.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/learn" className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-lg shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40 transition-all hover:-translate-y-1 text-center">
                Start Learning Free
              </Link>
              <Link to="/playground" className="px-8 py-4 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-500 rounded-xl font-semibold text-lg transition-all hover:-translate-y-1 hover:shadow-md text-center">
                Try Playground
              </Link>
            </div>
            <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-500 font-medium">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 border-2 border-white dark:border-slate-900"></div>
                ))}
              </div>
              <p>Join 10,000+ students today</p>
            </div>
          </div>
          
          {/* Hero Visual - Abstract Representation of Logic */}
          <div className="relative lg:h-[500px] w-full flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-100 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-3xl blur-3xl opacity-70"></div>
            <div className="relative w-full max-w-md aspect-square bg-slate-900 rounded-2xl shadow-2xl border border-slate-800 p-8 flex flex-col items-center justify-center overflow-hidden group">
               {/* Animated Grid Background */}
               <div className="absolute inset-0 opacity-20" 
                    style={{ backgroundImage: 'radial-gradient(#4f46e5 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
               </div>
               
               {/* Central Element */}
               <div className="relative z-10 text-center">
                 <div className="w-24 h-24 bg-blue-600 rounded-2xl rotate-12 flex items-center justify-center shadow-lg shadow-blue-500/50 mb-6 mx-auto group-hover:rotate-0 transition-all duration-500">
                   <span className="text-4xl">🚀</span>
                 </div>
                 <h3 className="text-white text-2xl font-bold mb-2">ZeroToCode</h3>
                 <p className="text-slate-400">Interactive C++ Mastery</p>
               </div>

               {/* Floating Elements */}
               <div className="absolute top-10 left-10 bg-slate-800 p-3 rounded-lg border border-slate-700 animate-bounce delay-100">
                 <code className="text-green-400 text-xs">int main()</code>
               </div>
               <div className="absolute bottom-20 right-10 bg-slate-800 p-3 rounded-lg border border-slate-700 animate-bounce delay-700">
                 <code className="text-orange-400 text-xs">0x1A4F</code>
               </div>
               <div className="absolute bottom-10 left-20 bg-slate-800 p-3 rounded-lg border border-slate-700 animate-bounce delay-300">
                 <code className="text-blue-400 text-xs">std::cout</code>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visualizer Showcase Section */}
      <VisualizerShowcase />

      {/* Features Section */}
      <section id="features" className="py-20 bg-white dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Why ZeroToCode?
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              We break down complex concepts into bite-sized, interactive lessons designed for absolute beginners.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              }
              title="Computer Basics"
              description="Understand how computers work, memory, binary, and the fundamentals of hardware."
            />
            <FeatureCard
              icon={
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              }
              title="Logic Building"
              description="Master algorithmic thinking and problem-solving skills before writing a single line of code."
            />
            <FeatureCard
              icon={
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              }
              title="C++ Visualizer"
              description="See your code execute step-by-step with our unique memory and stack visualizer."
            />
            <FeatureCard
              icon={
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              }
              title="Real Projects"
              description="Build actual applications and games to reinforce what you've learned."
            />
          </div>
        </div>
      </section>

      {/* Curriculum Preview Section */}
      <CurriculumPreview />

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-1 md:col-span-2">
              <span className="text-2xl font-bold text-white mb-4 block">ZeroToCode</span>
              <p className="text-slate-400 max-w-xs">
                Empowering the next generation of developers with a solid foundation in computer science and C++.
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
              {/* Social Placeholders */}
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
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

