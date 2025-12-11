import React, { useState } from 'react';
import TopicViewer from './modules/ComputerBasics/TopicViewer';
import VariableBox from './modules/LogicBuilding/VariableBox';
import LoopVisualizer from './modules/LogicBuilding/LoopVisualizer';
import ConditionalBuilder from './modules/LogicBuilding/ConditionalBuilder';
import FlowchartBuilder from './modules/LogicBuilding/FlowchartBuilder';
import SequenceReorderGame from './modules/LogicBuilding/SequenceReorderGame';
import RobotInstructionSim from './modules/LogicBuilding/RobotInstructionSim';
import LoopPatternBuilder from './modules/LogicBuilding/LoopPatternBuilder';
import Term from './modules/ComputerBasics/Term';
import FunFact from './modules/ComputerBasics/FunFact';
import RealWorld from './modules/ComputerBasics/RealWorld';
import Expandable from './modules/ComputerBasics/Expandable';
import MiniQuiz from './modules/ComputerBasics/MiniQuiz';

const LogicBuildingModule = ({ onFinish }) => {
  const [started, setStarted] = useState(false);

  const topics = [
    // --- SECTION 1: INTRODUCTION ---
    {
      title: "What is Logic Building?",
      readTime: "2 min",
      objective: "Understand that programming is just giving clear instructions.",
      content: (
        <>
          <p className="text-lg">
            Have you ever explained to a friend how to get to your house? Or followed a recipe to bake a cake?
          </p>
          <p className="mt-4">
            <strong>That's logic building!</strong> It's the skill of breaking down a task into clear, simple steps that anyone (or any computer) can follow.
          </p>
          <p className="mt-4">
            In this module, you won't write any code yet. Instead, you'll learn <em>how to think</em> like a programmer.
          </p>
          <FunFact>
            Every app on your phone — Instagram, YouTube, games — is just a list of instructions that a programmer wrote down step by step!
          </FunFact>
        </>
      ),
      visualizer: null
    },
    {
      title: "Giving Instructions: The Robot Test",
      readTime: "2 min",
      objective: "Learn that computers follow instructions literally, with no guessing.",
      content: (
        <>
          <p>
            Imagine you have a robot helper. You tell it: <em>"Make me a sandwich."</em>
          </p>
          <p className="mt-4">
            The robot just stares at you. Why? Because it doesn't know <strong>which sandwich</strong>, <strong>what ingredients</strong>, or <strong>how to spread butter</strong>.
          </p>
          <p className="mt-4 font-semibold">Computers are like that robot.</p>
          <p className="mt-2">
            They need <Term word="Explicit Instructions" definition="Very clear and detailed steps, leaving nothing to guessing.">explicit instructions</Term> — every tiny step spelled out.
          </p>
          <Expandable title="Try This: Sandwich Instructions">
            <p>How would you tell the robot to make a peanut butter sandwich? You might say:</p>
            <ol className="list-decimal pl-5 mt-2 space-y-1">
              <li>Open the bread bag</li>
              <li>Take out 2 slices of bread</li>
              <li>Open the peanut butter jar</li>
              <li>Pick up a knife</li>
              <li>Scoop peanut butter with the knife</li>
              <li>Spread it on one slice</li>
              <li>Put the other slice on top</li>
            </ol>
            <p className="mt-2 text-slate-500">See how detailed that is? Computers need this level of detail!</p>
          </Expandable>
        </>
      ),
      visualizer: <RobotInstructionSim />
    },
    {
      title: "Step by Step: Why Order Matters",
      readTime: "2 min",
      objective: "Understand that the order of steps changes the outcome.",
      content: (
        <>
          <p>
            What if you put on your shoes <em>before</em> your socks?
          </p>
          <p className="mt-4">
            It doesn't work! The <strong>order</strong> of steps matters a lot.
          </p>
          <p className="mt-4">
            In programming, this is called a <Term word="Sequence" definition="A specific order of steps that must be followed.">sequence</Term>. If you mix up the order, you get wrong results — or errors.
          </p>
          <RealWorld>
            Think about your morning routine: wake up → brush teeth → get dressed → eat breakfast. If you eat breakfast before waking up... well, that's impossible!
          </RealWorld>
        </>
      ),
      visualizer: <SequenceReorderGame />
    },
    {
      title: "🧪 Quiz: Sequences",
      readTime: "1 min",
      content: (
        <MiniQuiz
          question="You want to make tea. Which step should come FIRST?"
          options={[
            "Drink the tea",
            "Boil water",
            "Add sugar",
            "Pour tea into cup"
          ]}
          correctIndex={1}
          explanation="You can't drink tea that doesn't exist yet! Boiling water is the first step. Order matters."
        />
      ),
      visualizer: null
    },

    // --- SECTION 2: REMEMBERING THINGS ---
    {
      title: "Remembering Things: The Labeled Box",
      readTime: "3 min",
      objective: "Understand how we store and change information.",
      content: (
        <>
          <p>
            Imagine you have a box. You stick a label on it that says <strong>"My Age"</strong>.
          </p>
          <p className="mt-4">
            Inside the box, you put a piece of paper with the number <strong>10</strong> written on it.
          </p>
          <p className="mt-4">
            Next year, you take out the old paper and put in a new one: <strong>11</strong>.
          </p>
          <p className="mt-4">
            The label ("My Age") didn't change, but the <strong>content</strong> inside the box changed!
          </p>
          <p className="mt-4">
            In programming, this box is called a <Term word="Variable" definition="A labeled container that stores a value. The value can change, but the label stays the same.">variable</Term>.
          </p>
          <FunFact>
            Video games use variables all the time! Your "score", "health", and "level" are all variables that change as you play.
          </FunFact>
        </>
      ),
      visualizer: <VariableBox />
    },
    {
      title: "🧪 Quiz: Variables",
      readTime: "1 min",
      content: (
        <MiniQuiz
          question="You have a box labeled 'Score'. Right now it contains 50. You earn 10 points. What do you do?"
          options={[
            "Throw away the box",
            "Change the label to 'Score 2'",
            "Replace the paper inside with 60",
            "Nothing, the box is full"
          ]}
          correctIndex={2}
          explanation="The label stays 'Score', but we update the value inside from 50 to 60. That's how variables work!"
        />
      ),
      visualizer: null
    },

    // --- SECTION 3: MAKING CHOICES ---
    {
      title: "Making Choices: Yes or No?",
      readTime: "2 min",
      objective: "Understand how we make decisions based on conditions.",
      content: (
        <>
          <p>
            Every day, you make decisions based on <strong>conditions</strong>.
          </p>
          <ul className="list-disc pl-5 mt-3 space-y-2">
            <li><em>If</em> it's raining → bring an umbrella</li>
            <li><em>If</em> you're hungry → eat something</li>
            <li><em>If</em> you have homework → do it before playing</li>
          </ul>
          <p className="mt-4">
            Programs work the same way! They ask a question (true or false?), and then do something based on the answer.
          </p>
          <p className="mt-4">
            This is called a <Term word="Conditional" definition="A decision point where the program checks if something is true or false, then acts accordingly.">conditional</Term> — an "if-then" decision.
          </p>
        </>
      ),
      visualizer: null
    },
    {
      title: "Interactive: Make a Decision!",
      readTime: "2 min",
      objective: "Experience making a conditional choice.",
      content: (
        <>
          <p>
            Let's try it! The interactive tool on the right asks you a simple question.
          </p>
          <p className="mt-4">
            <strong>Your job:</strong> Pick an answer and watch what happens next. Notice how different answers lead to different outcomes!
          </p>
          <p className="mt-4 text-slate-500 text-sm">
            This is exactly how apps work: "If the user clicks 'Login', show the home page. Otherwise, show an error."
          </p>
        </>
      ),
      visualizer: <ConditionalBuilder />
    },
    {
      title: "🧪 Quiz: Conditionals",
      readTime: "1 min",
      content: (
        <MiniQuiz
          question="'If you have money, buy a snack. Otherwise, go home.' What happens if you have NO money?"
          options={[
            "Buy a snack",
            "Go home",
            "Do nothing",
            "Buy money"
          ]}
          correctIndex={1}
          explanation="The condition 'have money' is FALSE, so you follow the 'otherwise' (else) path: go home."
        />
      ),
      visualizer: null
    },

    // --- SECTION 4: REPEATING THINGS ---
    {
      title: "Repeating Actions: Loops",
      readTime: "2 min",
      objective: "Understand how we repeat tasks without writing them over and over.",
      content: (
        <>
          <p>
            Imagine you need to write "I will be good" on the board <strong>100 times</strong>.
          </p>
          <p className="mt-4">
            Would you write it out one by one? That's exhausting!
          </p>
          <p className="mt-4">
            Instead, you could say: <em>"Write 'I will be good', then repeat 99 more times."</em>
          </p>
          <p className="mt-4">
            In programming, this is called a <Term word="Loop" definition="A way to repeat an action multiple times without rewriting it.">loop</Term>. It saves time and effort!
          </p>
          <RealWorld>
            Think about brushing your teeth: you move the brush back and forth, back and forth, repeating the same motion many times. That's a loop!
          </RealWorld>
        </>
      ),
      visualizer: null
    },
    {
      title: "Interactive: Watch a Loop Run",
      readTime: "2 min",
      objective: "See how a loop repeats an action step by step.",
      content: (
        <>
          <p>
            Press the <strong>Play</strong> button on the right to watch a loop in action.
          </p>
          <p className="mt-4">
            The loop will repeat 5 times, creating a new box each time. Notice the counter going up: 0, 1, 2, 3, 4.
          </p>
          <p className="mt-4 text-slate-500 text-sm">
            Tip: You can pause or reset the animation if you want to see it again!
          </p>
        </>
      ),
      visualizer: <LoopVisualizer />
    },
    {
      title: "Interactive: Build Your Own Loop",
      readTime: "2 min",
      objective: "Choose an action and count, then watch it repeat.",
      content: (
        <>
          <p>
            Now it's your turn! Pick an <strong>action</strong> (jump, spin, wave, or clap) and choose <strong>how many times</strong> to repeat it.
          </p>
          <p className="mt-4">
            Press Play and watch the avatar perform your loop!
          </p>
          <p className="mt-4 text-slate-500 text-sm">
            This is exactly how programmers think: "What action?" + "How many times?"
          </p>
        </>
      ),
      visualizer: <LoopPatternBuilder />
    },
    {
      title: "🧪 Quiz: Loops",
      readTime: "1 min",
      content: (
        <MiniQuiz
          question="You say: 'Clap your hands 3 times.' How many claps will happen?"
          options={["1", "2", "3", "Infinite"]}
          correctIndex={2}
          explanation="The loop runs exactly 3 times — once for each clap. Then it stops."
        />
      ),
      visualizer: null
    },

    // --- SECTION 5: PLANNING AHEAD ---
    {
      title: "Planning with Pictures: Flowcharts",
      readTime: "2 min",
      objective: "Learn how to visualize steps before doing them.",
      content: (
        <>
          <p>
            Before building something complex, it helps to <strong>draw a plan</strong>.
          </p>
          <p className="mt-4">
            A <Term word="Flowchart" definition="A diagram that uses shapes and arrows to show the steps of a process.">flowchart</Term> is like a map of your logic. It shows:
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-2">
            <li><strong>Start</strong> and <strong>End</strong> points</li>
            <li><strong>Steps</strong> (things to do)</li>
            <li><strong>Decisions</strong> (yes/no questions)</li>
            <li><strong>Arrows</strong> (which way to go next)</li>
          </ul>
          <FunFact>
            Flowcharts aren't just for programmers! Doctors use them to diagnose illnesses, and companies use them to plan projects.
          </FunFact>
        </>
      ),
      visualizer: null
    },
    {
      title: "Interactive: See a Flowchart",
      readTime: "2 min",
      objective: "See how a flowchart maps out a simple task.",
      content: (
        <>
          <p>
            The flowchart on the right shows how to <strong>make a cup of tea</strong>.
          </p>
          <p className="mt-4">
            Notice the diamond shape: that's a <strong>decision</strong> (Is the water boiled?). If "No", you wait. If "Yes", you continue.
          </p>
          <p className="mt-4 text-slate-500 text-sm">
            This is the same logic you would tell a computer! Flowcharts help you plan before you start coding.
          </p>
        </>
      ),
      visualizer: <FlowchartBuilder />
    },

    // --- COMPLETION ---
    {
      title: "🎉 You're Thinking Like a Programmer!",
      readTime: "1 min",
      content: (
        <>
          <div className="text-center space-y-6">
            <div className="text-6xl">🧠</div>
            <h3 className="text-2xl font-bold text-slate-800 dark:text-white">Module Complete!</h3>
            <p className="text-slate-600 dark:text-slate-400">
              You've learned the <strong>foundations of logical thinking</strong>:
            </p>
            <div className="grid grid-cols-2 gap-3 max-w-md mx-auto text-left">
              <div className="p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg border border-indigo-200 dark:border-indigo-800 text-sm">✓ Clear step-by-step instructions</div>
              <div className="p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg border border-indigo-200 dark:border-indigo-800 text-sm">✓ Storing info in "boxes" (variables)</div>
              <div className="p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg border border-indigo-200 dark:border-indigo-800 text-sm">✓ Making yes/no decisions</div>
              <div className="p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg border border-indigo-200 dark:border-indigo-800 text-sm">✓ Repeating actions (loops)</div>
              <div className="p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg border border-indigo-200 dark:border-indigo-800 text-sm col-span-2 text-center">✓ Planning with flowcharts</div>
            </div>
            <p className="text-sm text-slate-500 mt-4">
              <strong>Next:</strong> You'll use these ideas to write <em>real code</em> in C++!
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
          <span className="inline-block px-3 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-full text-sm font-semibold">
            Module 2 of 6
          </span>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Logic Building</h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg">
            Learn to think like a programmer — no coding required yet!
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex flex-col items-center gap-2">
            <div className="text-3xl">📝</div>
            <div className="font-semibold text-slate-800 dark:text-white text-sm">Step-by-Step</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex flex-col items-center gap-2">
            <div className="text-3xl">📦</div>
            <div className="font-semibold text-slate-800 dark:text-white text-sm">Remembering</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex flex-col items-center gap-2">
            <div className="text-3xl">🔀</div>
            <div className="font-semibold text-slate-800 dark:text-white text-sm">Choosing</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex flex-col items-center gap-2">
            <div className="text-3xl">🔁</div>
            <div className="font-semibold text-slate-800 dark:text-white text-sm">Repeating</div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-2">
          <p className="text-sm text-slate-500">Estimated time: 20 minutes • No coding needed</p>
          <button 
            onClick={() => setStarted(true)}
            className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-lg shadow-xl shadow-indigo-500/20 hover:-translate-y-1 transition-all"
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

export default LogicBuildingModule;
