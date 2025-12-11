import React, { useState } from 'react';
import TopicViewer from './modules/ComputerBasics/TopicViewer';
import HardwareBuilder from './modules/ComputerBasics/HardwareBuilder';
import BinaryVisualizer from './modules/ComputerBasics/BinaryVisualizer';
import RamVsStorage from './modules/ComputerBasics/RamVsStorage';
import SingleBit from './modules/ComputerBasics/SingleBit';
import IPODiagram from './modules/ComputerBasics/IPODiagram';
import CPUClockVisualizer from './modules/ComputerBasics/CPUClockVisualizer';
import FileExplorerSim from './modules/ComputerBasics/FileExplorerSim';
import TaskManagerMini from './modules/ComputerBasics/TaskManagerMini';
import Term from './modules/ComputerBasics/Term';
import FunFact from './modules/ComputerBasics/FunFact';
import RealWorld from './modules/ComputerBasics/RealWorld';
import Expandable from './modules/ComputerBasics/Expandable';
import MiniQuiz from './modules/ComputerBasics/MiniQuiz';

const ComputerBasicsModule = ({ onFinish }) => {
  const [started, setStarted] = useState(false);

  // FULLY ENHANCED CURRICULUM
  const topics = [
    // --- SECTION 1: INTRODUCTION ---
    {
      title: "Welcome to Computer Basics",
      readTime: "1 min",
      objective: "Understand that a computer is just a machine that follows instructions.",
      content: (
        <>
          <p className="text-lg">
            Welcome! Before we write our first line of code, we need to understand the machine that will run it.
          </p>
          <p className="mt-4">
            A computer is <strong>not</strong> a magical thinking brain. It's surprisingly simple at its core.
          </p>
          <p className="mt-4">
            It's just an electronic machine that follows <Term word="Instructions" definition="A set of commands that tell the computer exactly what to do, step by step.">instructions</Term> — incredibly fast, perfectly consistently, but with zero creativity.
          </p>
          <FunFact>
            The first <Term word="general-purpose" definition="Can perform any task it's programmed to do, not just one specific calculation.">general-purpose</Term> computer (ENIAC, 1945) weighed 27 tons and filled an entire room. Your smartphone is millions of times more powerful.
          </FunFact>
        </>
      ),
      visualizer: null
    },
    {
      title: "The Information Processing Cycle",
      readTime: "2 min",
      objective: "Learn the 4 fundamental steps all computers follow: Input, Process, Output, Storage.",
      content: (
        <>
          <p>
            Every computer, from your phone to a supercomputer, does the exact same 4 things over and over:
          </p>
          <div className="space-y-4 mt-6">
            <div className="flex items-start gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <span className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold shrink-0">1</span>
              <div>
                <p className="font-bold text-blue-700 dark:text-blue-300">Input</p>
                <p className="text-sm">Receiving data from you (keyboard, mouse, touchscreen, microphone).</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <span className="w-8 h-8 rounded-full bg-purple-500 text-white flex items-center justify-center font-bold shrink-0">2</span>
              <div>
                <p className="font-bold text-purple-700 dark:text-purple-300">Process</p>
                <p className="text-sm">The brain (CPU) performs calculations and makes decisions.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <span className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center font-bold shrink-0">3</span>
              <div>
                <p className="font-bold text-green-700 dark:text-green-300">Output</p>
                <p className="text-sm">Showing results to you (screen, speakers, printer).</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
              <span className="w-8 h-8 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold shrink-0">4</span>
              <div>
                <p className="font-bold text-amber-700 dark:text-amber-300">Storage</p>
                <p className="text-sm">Saving data for later (hard drive, SSD, USB).</p>
              </div>
            </div>
          </div>
        </>
      ),
      visualizer: <IPODiagram />
    },

    // --- SECTION 2: HARDWARE ---
    {
      title: "The Brain: CPU",
      readTime: "2 min",
      objective: "Understand what a CPU does and why 'GHz' matters.",
      content: (
        <>
          <p>
            Let's now look <strong>inside</strong> the computer. The most important part is the <Term word="CPU" definition="Central Processing Unit. The 'brain' of the computer that executes instructions.">CPU</Term> (Central Processing Unit).
          </p>
          <p className="mt-4">
            The CPU is the "brain" that reads and executes every single instruction in your programs.
          </p>
          <Expandable title="What is GHz (Gigahertz)?">
            <p>
              You'll see CPUs marketed as "3.5 GHz". This means the CPU's internal clock ticks <strong>3.5 billion times per second</strong>.
            </p>
            <p className="mt-2">
              On each tick, the CPU can perform simple operations like adding two numbers. Billions of tiny steps = complex programs!
            </p>
          </Expandable>
          <RealWorld>
            When your computer "freezes," it's often because the CPU is overwhelmed with too many instructions at once. You're asking the brain to do too much!
          </RealWorld>
        </>
      ),
      visualizer: <CPUClockVisualizer />
    },
    {
      title: "Memory vs. Storage",
      readTime: "3 min",
      objective: "Clearly distinguish between RAM (temporary) and Storage (permanent).",
      content: (
        <>
          <p>
            This is <strong>the #1 confusion</strong> for beginners. Let's clear it up forever.
          </p>
          <p className="mt-4 font-semibold text-lg">Analogy: Your Office</p>
          <ul className="list-disc pl-5 space-y-3 mt-2">
            <li>
              <Term word="Storage" definition="A hard drive (HDD) or solid-state drive (SSD). Keeps data even when power is off.">Storage (SSD/HDD)</Term> is like a <strong>huge filing cabinet</strong> in another room. It can hold everything — photos, documents, games — but it takes time to walk there and find what you need.
            </li>
            <li>
              <Term word="RAM" definition="Random Access Memory. Extremely fast but temporary. Everything here is lost when you turn off the PC.">RAM (Memory)</Term> is like your <strong>desk</strong>. It's small, but everything on it is instantly accessible. You can only work on what's currently on your desk.
            </li>
          </ul>
          <FunFact>
            RAM is about 100x faster than an SSD. That's why computers load data from storage INTO RAM before working on it.
          </FunFact>
        </>
      ),
      visualizer: <RamVsStorage />
    },
    {
      title: "🧪 Quiz: Hardware Check",
      readTime: "1 min",
      content: (
        <MiniQuiz
          question="Which component loses all its data when you turn off your computer?"
          options={["Hard Drive (SSD)", "RAM (Memory)", "CPU", "Monitor"]}
          correctIndex={1}
          explanation={
            <>
              RAM is <Term word="volatile" definition="Data is lost when power is cut.">volatile</Term> — it's incredibly fast but temporary. When power is cut, it's wiped clean. That's why you 'save' files to permanent storage!
            </>
          }
        />
      ),
      visualizer: null
    },
    {
      title: "Interactive: Manage Your RAM",
      readTime: "2 min",
      objective: "See how running apps use up RAM and how closing them frees memory.",
      content: (
        <>
          <p>
            Now let's see RAM in action! The interactive tool shows apps running on your computer.
          </p>
          <p className="mt-4">
            Each app uses a portion of your RAM. Try <strong>closing apps</strong> by clicking the X button and watch the RAM bar shrink.
          </p>
          <p className="mt-4 text-slate-500 text-sm">
            You can also reopen apps to see RAM usage go back up!
          </p>
        </>
      ),
      visualizer: <TaskManagerMini />
    },
    {
      title: "🔧 Lab: Build a PC",
      readTime: "3 min",
      objective: "Put your knowledge to work by placing components in the correct slots.",
      content: (
        <>
          <p>
            You've learned about the parts. Now it's time to <strong>build</strong>.
          </p>
          <p className="mt-4 text-slate-500">
            Click on each component on the left to place it into the motherboard on the right. Don't worry, you can't break anything! 😉
          </p>
          <ul className="list-disc pl-5 text-sm text-slate-500 mt-4 space-y-1">
            <li><strong>CPU</strong> → <Term word="Socket" definition="The specific slot on the motherboard designed to hold the CPU.">Socket</Term></li>
            <li><strong>RAM</strong> → <Term word="DIMM Slots" definition="Dual Inline Memory Module slots. The long slots where RAM sticks snap in.">DIMM Slots</Term></li>
            <li><strong>GPU</strong> → <Term word="PCIe Slot" definition="Peripheral Component Interconnect Express. A high-speed expansion slot for graphics cards.">PCIe Slot</Term></li>
            <li><strong>Storage</strong> → <Term word="SATA Ports" definition="Serial ATA. The connectors used for hard drives and SSDs.">SATA Ports</Term></li>
          </ul>
        </>
      ),
      visualizer: <HardwareBuilder />
    },

    // --- SECTION 3: BINARY ---
    {
      title: "The Atomic Switch: The Bit",
      readTime: "2 min",
      objective: "Understand that a 'bit' is the smallest unit of data (0 or 1).",
      content: (
        <>
          <p>
            Computers run on electricity. Electricity is either <strong>flowing</strong> or <strong>not flowing</strong>. There's no in-between.
          </p>
          <p className="mt-4">
            We represent these two states as:
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li><strong>1</strong> = ON (electricity flowing)</li>
            <li><strong>0</strong> = OFF (no electricity)</li>
          </ul>
          <p className="mt-4">
            A single <strong>1</strong> or <strong>0</strong> is called a <Term word="Bit" definition="Binary Digit. The smallest unit of data in a computer. Either a 0 or a 1.">Bit</Term> (Binary Digit). It's the atom of the digital world.
          </p>
          <RealWorld>
            Your entire screen right now — every color, every letter — is stored as millions of bits flipping on and off!
          </RealWorld>
        </>
      ),
      visualizer: <SingleBit />
    },
    {
      title: "Counting with Bits: Bytes",
      readTime: "3 min",
      objective: "Learn how 8 bits combine into a Byte, and how binary counting works.",
      content: (
        <>
          <p>
            One bit isn't very useful. It can only represent two things (0 or 1). But what if we combine them?
          </p>
          <ul className="list-disc pl-5 mt-4 space-y-2">
            <li>2 bits = 4 combinations (00, 01, 10, 11)</li>
            <li>4 bits = 16 combinations</li>
            <li><strong>8 bits = 256 combinations</strong></li>
          </ul>
          <p className="mt-4">
            A group of <strong>8 bits</strong> is called a <Term word="Byte" definition="A unit of 8 bits. Can represent 256 different values (0-255).">Byte</Term>. This is the standard unit we measure data in.
          </p>
          <Expandable title="Why 256?">
            <p>Each bit doubles the possibilities: 2 × 2 × 2 × 2 × 2 × 2 × 2 × 2 = 2<sup>8</sup> = 256.</p>
            <p className="mt-2">The values range from 0 (all bits OFF) to 255 (all bits ON).</p>
          </Expandable>
          <p className="mt-4 text-sm text-slate-500">
            Try the interactive visualizer! Each switch doubles the value of the one to its right.
          </p>
        </>
      ),
      visualizer: <BinaryVisualizer />
    },
    {
      title: "🧪 Quiz: Binary Challenge",
      readTime: "1 min",
      content: (
        <MiniQuiz
          question="How many different values can a single Byte (8 bits) represent?"
          options={["8", "64", "128", "256"]}
          correctIndex={3}
          explanation="8 bits can represent 2^8 = 256 unique values, from 0 to 255."
        />
      ),
      visualizer: null
    },

    // --- SECTION 4: SOFTWARE ---
    {
      title: "Software: Giving Instructions",
      readTime: "2 min",
      objective: "Understand the difference between hardware and software.",
      content: (
        <>
          <p>
            We've talked about the physical parts (<Term word="Hardware" definition="The physical components of a computer you can touch.">Hardware</Term>). But a pile of hardware does nothing on its own.
          </p>
          <p className="mt-4">
            <Term word="Software" definition="Programs and applications. Instructions that tell the hardware what to do.">Software</Term> is the set of <strong>instructions</strong> that tells the hardware what to do. It's the "soul" of the machine.
          </p>
          <Expandable title="Types of Software">
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>System Software</strong>: The Operating System (Windows, macOS, Linux).</li>
              <li><strong>Application Software</strong>: Apps you use (Chrome, Photoshop, Games).</li>
            </ul>
          </Expandable>
        </>
      ),
      visualizer: null
    },
    {
      title: "The Operating System",
      readTime: "2 min",
      objective: "Learn what an OS does and why it's essential.",
      content: (
        <>
          <p>
            The <Term word="Operating System" definition="The master program (Windows, macOS, Linux) that manages hardware and lets you run apps.">Operating System (OS)</Term> is the most important software. It's the "manager" between you and the raw hardware.
          </p>
          <p className="mt-4 font-semibold">What does it do?</p>
          <ul className="list-disc pl-5 mt-2 space-y-2">
            <li>📁 <strong>File Management</strong>: Organizing your folders and files.</li>
            <li>🧠 <strong>Memory Management</strong>: Deciding how much RAM each app gets.</li>
            <li>⚡ <strong>Process Management</strong>: Letting multiple apps run "at once".</li>
            <li>🔌 <strong>Device Management</strong>: Talking to your keyboard, mouse, printer.</li>
          </ul>
          <RealWorld>
            Ever wonder why you can listen to music while browsing the web? The OS is rapidly switching between apps, giving each a tiny slice of CPU time. It's so fast it looks simultaneous!
          </RealWorld>
        </>
      ),
      visualizer: (
        <div className="h-full flex flex-col items-center justify-center p-8 bg-slate-800 rounded-xl text-green-400 font-mono">
          <div className="w-full max-w-sm border border-slate-600 rounded p-4 bg-black shadow-2xl">
            <div className="flex gap-1 mb-2">
              <div className="w-3 h-3 rounded-full bg-red-500"/>
              <div className="w-3 h-3 rounded-full bg-yellow-500"/>
              <div className="w-3 h-3 rounded-full bg-green-500"/>
            </div>
            <div className="text-sm space-y-1">
              <p>user@zerotocode:~$ <span className="text-white">whoami</span></p>
              <p className="text-slate-300">learner</p>
              <p>user@zerotocode:~$ <span className="text-white">echo "I get it now!"</span></p>
              <p className="text-slate-300">I get it now!</p>
              <p>user@zerotocode:~$ <span className="animate-pulse">_</span></p>
            </div>
          </div>
          <p className="mt-4 text-slate-400 text-sm text-center">
            The <Term word="terminal" definition="A text-only interface to control the computer (also called Command Line).">terminal</Term> is how developers talk directly to the OS. You'll master it soon!
          </p>
        </div>
      )
    },
    {
      title: "Interactive: Explore Files & Folders",
      readTime: "2 min",
      objective: "Navigate through folders and see how files are organized.",
      content: (
        <>
          <p>
            The OS organizes all your data into <Term word="Files" definition="Documents, images, videos — any piece of saved data.">files</Term> and <Term word="Folders" definition="Containers that hold files and other folders, creating a hierarchy.">folders</Term>.
          </p>
          <p className="mt-4">
            Try clicking on folders to open them. Click ".." to go back up. Notice how folders can contain other folders — this creates a <strong>hierarchy</strong>!
          </p>
        </>
      ),
      visualizer: <FileExplorerSim />
    },
    {
      title: "🎉 Module Complete!",
      readTime: "1 min",
      content: (
        <>
          <div className="text-center space-y-6">
            <div className="text-6xl">🏆</div>
            <h3 className="text-2xl font-bold text-slate-800 dark:text-white">Congratulations!</h3>
            <p className="text-slate-600 dark:text-slate-400">
              You've completed <strong>Module 1: Computer Basics</strong>. You now understand:
            </p>
            <div className="grid grid-cols-2 gap-3 max-w-md mx-auto text-left">
              <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800 text-sm">✓ Input-Process-Output cycle</div>
              <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800 text-sm">✓ CPU, RAM, and Storage</div>
              <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800 text-sm">✓ Bits and Bytes</div>
              <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800 text-sm">✓ Operating Systems</div>
            </div>
            <p className="text-sm text-slate-500">
              Next up: <strong>Logic Building</strong> — where we learn to think like a programmer!
            </p>
          </div>
        </>
      ),
      visualizer: null
    }
  ];

  // --- INTRO SCREEN ---
  if (!started) {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-700 overflow-hidden p-8 text-center space-y-8">
        <div className="max-w-2xl mx-auto space-y-4">
          <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-semibold">
            Module 1 of 6
          </span>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Computer Basics</h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg">
            Before we write code, we need to understand the machine.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex flex-col items-center gap-2">
            <div className="text-3xl">🧠</div>
            <div className="font-semibold text-slate-800 dark:text-white text-sm">Hardware</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex flex-col items-center gap-2">
            <div className="text-3xl">💾</div>
            <div className="font-semibold text-slate-800 dark:text-white text-sm">Memory</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex flex-col items-center gap-2">
            <div className="text-3xl">⚡</div>
            <div className="font-semibold text-slate-800 dark:text-white text-sm">Binary</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex flex-col items-center gap-2">
            <div className="text-3xl">💻</div>
            <div className="font-semibold text-slate-800 dark:text-white text-sm">Software</div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-2">
          <p className="text-sm text-slate-500">Estimated time: 20 minutes</p>
          <button 
            onClick={() => setStarted(true)}
            className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-lg shadow-xl shadow-blue-500/20 hover:-translate-y-1 transition-all"
          >
            Start Module →
          </button>
        </div>
      </div>
    );
  }

  // --- MAIN MODULE VIEW ---
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-700 overflow-hidden p-4 md:p-8">
      <TopicViewer 
        topics={topics} 
        onComplete={onFinish} 
      />
    </div>
  );
};

export default ComputerBasicsModule;
