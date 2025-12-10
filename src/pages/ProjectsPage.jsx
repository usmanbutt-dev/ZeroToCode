import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Code, Play, Lightbulb, CheckCircle, Clock, ChevronDown, Filter, Sparkles, Trophy, Target, Zap, BookOpen } from 'lucide-react';
import { staggerContainer, staggerItem, fadeInUp, viewportOnce } from '../utils/animationVariants';

// Custom Dropdown Component
const Dropdown = ({ value, onChange, options, icon: Icon, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.find(o => o.value === value);

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-slate-800 rounded-xl border-2 transition-all ${
          isOpen 
            ? 'border-blue-500 shadow-lg shadow-blue-500/20' 
            : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
        }`}
      >
        {Icon && <Icon className="w-4 h-4 text-slate-400" />}
        <span className={`text-sm font-medium ${value === 'all' ? 'text-slate-500' : 'text-slate-800 dark:text-slate-200'}`}>
          {selectedOption?.label || placeholder}
        </span>
        <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      {isOpen && (
        <div className="absolute top-full mt-2 left-0 w-48 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-xl z-50 overflow-hidden">
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              className={`w-full px-4 py-2.5 text-left text-sm font-medium transition-colors flex items-center gap-2 ${
                value === option.value 
                  ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' 
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50'
              }`}
            >
              {option.icon && <span>{option.icon}</span>}
              {option.label}
              {value === option.value && (
                <CheckCircle className="w-4 h-4 ml-auto text-blue-500" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const ProjectsPage = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [filterDifficulty, setFilterDifficulty] = useState('all');
  const [filterTag, setFilterTag] = useState('all');

  const projects = [
    // ===== BEGINNER PROJECTS (5) =====
    {
      id: 1,
      title: "Hello World Plus",
      description: "Your first C++ program with personalized greeting.",
      fullDescription: "Create a program that asks for the user's name and prints a personalized greeting. This introduces you to basic input/output operations in C++.",
      difficulty: "Beginner",
      time: "10 min",
      tags: ["I/O", "Variables"],
      icon: "👋",
      hints: ["Use std::cin to read the name", "Use std::cout to print the greeting", "Remember to include <iostream>"],
      starterCode: `#include <iostream>
using namespace std;

int main() {
    string name;
    cout << "What's your name? ";
    // TODO: Read the name using cin
    // TODO: Print "Hello, [name]! Welcome to C++!"
    return 0;
}`,
      solution: `#include <iostream>
using namespace std;

int main() {
    string name;
    cout << "What's your name? ";
    cin >> name;
    cout << "Hello, " << name << "! Welcome to C++!" << endl;
    return 0;
}`
    },
    {
      id: 2,
      title: "Simple Calculator",
      description: "Build a calculator using switch statements.",
      fullDescription: "Create a calculator that performs addition, subtraction, multiplication, and division based on user input.",
      difficulty: "Beginner",
      time: "20 min",
      tags: ["Switch", "I/O", "Operators"],
      icon: "🧮",
      hints: ["Use switch on the operator character", "Handle division by zero!", "Each case should perform one operation"],
      starterCode: `#include <iostream>
using namespace std;

int main() {
    double num1, num2;
    char op;
    cout << "Enter: num1 op num2: ";
    cin >> num1 >> op >> num2;
    // TODO: Use switch to perform operation
    return 0;
}`,
      solution: `#include <iostream>
using namespace std;

int main() {
    double num1, num2, result;
    char op;
    cout << "Enter: num1 op num2: ";
    cin >> num1 >> op >> num2;
    switch(op) {
        case '+': result = num1 + num2; break;
        case '-': result = num1 - num2; break;
        case '*': result = num1 * num2; break;
        case '/': result = (num2 != 0) ? num1/num2 : 0; break;
        default: cout << "Invalid!"; return 1;
    }
    cout << "Result: " << result << endl;
    return 0;
}`
    },
    {
      id: 3,
      title: "Temperature Converter",
      description: "Convert between Celsius and Fahrenheit.",
      fullDescription: "Build a program that converts temperatures between Celsius and Fahrenheit based on user choice.",
      difficulty: "Beginner",
      time: "15 min",
      tags: ["I/O", "Math", "Conditionals"],
      icon: "🌡️",
      hints: ["F = (C × 9/5) + 32", "C = (F - 32) × 5/9", "Use if/else for choice"],
      starterCode: `#include <iostream>
using namespace std;

int main() {
    double temp;
    char choice;
    cout << "Convert to (C)elsius or (F)ahrenheit? ";
    cin >> choice;
    cout << "Enter temperature: ";
    cin >> temp;
    // TODO: Convert based on choice
    return 0;
}`,
      solution: `#include <iostream>
using namespace std;

int main() {
    double temp, result;
    char choice;
    cout << "Convert to (C)elsius or (F)ahrenheit? ";
    cin >> choice;
    cout << "Enter temperature: ";
    cin >> temp;
    if(choice == 'F' || choice == 'f') {
        result = (temp * 9.0/5.0) + 32;
        cout << temp << "C = " << result << "F" << endl;
    } else {
        result = (temp - 32) * 5.0/9.0;
        cout << temp << "F = " << result << "C" << endl;
    }
    return 0;
}`
    },
    {
      id: 4,
      title: "Even/Odd Counter",
      description: "Count even and odd numbers from input.",
      fullDescription: "Create a program that reads numbers until 0 is entered, then displays count of even and odd numbers.",
      difficulty: "Beginner",
      time: "15 min",
      tags: ["Loops", "Conditionals", "Math"],
      icon: "🔢",
      hints: ["Use modulo (%) to check even/odd", "Even if num % 2 == 0", "Use while loop until input is 0"],
      starterCode: `#include <iostream>
using namespace std;

int main() {
    int num, evenCount = 0, oddCount = 0;
    cout << "Enter numbers (0 to stop):" << endl;
    // TODO: Loop, read numbers, count evens/odds
    return 0;
}`,
      solution: `#include <iostream>
using namespace std;

int main() {
    int num, evenCount = 0, oddCount = 0;
    cout << "Enter numbers (0 to stop):" << endl;
    while(true) {
        cin >> num;
        if(num == 0) break;
        if(num % 2 == 0) evenCount++;
        else oddCount++;
    }
    cout << "Even: " << evenCount << ", Odd: " << oddCount << endl;
    return 0;
}`
    },
    {
      id: 5,
      title: "Multiplication Table",
      description: "Generate a formatted multiplication table.",
      fullDescription: "Create a program that prints a 10x10 multiplication table with aligned columns.",
      difficulty: "Beginner",
      time: "20 min",
      tags: ["Loops", "I/O", "Formatting"],
      icon: "✖️",
      hints: ["Use nested for loops", "Use setw() from <iomanip>", "Print header row first"],
      starterCode: `#include <iostream>
#include <iomanip>
using namespace std;

int main() {
    // TODO: Print multiplication table 1-10
    return 0;
}`,
      solution: `#include <iostream>
#include <iomanip>
using namespace std;

int main() {
    for(int i = 1; i <= 10; i++) {
        for(int j = 1; j <= 10; j++) {
            cout << setw(4) << (i * j);
        }
        cout << endl;
    }
    return 0;
}`
    },
    // ===== INTERMEDIATE PROJECTS (5) =====
    {
      id: 6,
      title: "Number Guessing Game",
      description: "Create a fun game using loops and random numbers.",
      fullDescription: "Build a game where the computer picks a random number 1-100 and player guesses with hints.",
      difficulty: "Intermediate",
      time: "30 min",
      tags: ["Loops", "Random", "Conditionals"],
      icon: "🎲",
      hints: ["Use rand() % 100 + 1", "Use while loop until correct", "Count attempts"],
      starterCode: `#include <iostream>
#include <cstdlib>
#include <ctime>
using namespace std;

int main() {
    srand(time(0));
    int secret = rand() % 100 + 1;
    int guess, attempts = 0;
    // TODO: Game loop with hints
    return 0;
}`,
      solution: `#include <iostream>
#include <cstdlib>
#include <ctime>
using namespace std;

int main() {
    srand(time(0));
    int secret = rand() % 100 + 1;
    int guess, attempts = 0;
    cout << "Guess 1-100!" << endl;
    do {
        cin >> guess;
        attempts++;
        if(guess > secret) cout << "Too high!" << endl;
        else if(guess < secret) cout << "Too low!" << endl;
    } while(guess != secret);
    cout << "Correct in " << attempts << " tries!" << endl;
    return 0;
}`
    },
    {
      id: 7,
      title: "Array Statistics",
      description: "Calculate min, max, and average of an array.",
      fullDescription: "Write a program that finds minimum, maximum, sum, and average of array elements.",
      difficulty: "Intermediate",
      time: "25 min",
      tags: ["Arrays", "Loops", "Math"],
      icon: "📊",
      hints: ["Initialize min/max with first element", "Use for loop to traverse", "Cast to double for average"],
      starterCode: `#include <iostream>
using namespace std;

int main() {
    int arr[] = {45, 23, 78, 12, 56, 89, 34};
    int size = 7;
    // TODO: Find min, max, sum, average
    return 0;
}`,
      solution: `#include <iostream>
using namespace std;

int main() {
    int arr[] = {45, 23, 78, 12, 56, 89, 34};
    int size = 7;
    int min = arr[0], max = arr[0], sum = 0;
    for(int i = 0; i < size; i++) {
        if(arr[i] < min) min = arr[i];
        if(arr[i] > max) max = arr[i];
        sum += arr[i];
    }
    cout << "Min: " << min << ", Max: " << max << endl;
    cout << "Sum: " << sum << ", Avg: " << (double)sum/size << endl;
    return 0;
}`
    },
    {
      id: 8,
      title: "Pointer Swap",
      description: "Swap two variables using pointers.",
      fullDescription: "Create a swap function using pointers to exchange values. Fundamental for pass-by-reference.",
      difficulty: "Intermediate",
      time: "20 min",
      tags: ["Pointers", "Functions"],
      icon: "🔄",
      hints: ["Function takes int* a, int* b", "Use temp variable", "Dereference with *"],
      starterCode: `#include <iostream>
using namespace std;

// TODO: void swap(int* a, int* b)

int main() {
    int x = 10, y = 20;
    cout << "Before: " << x << ", " << y << endl;
    // TODO: Call swap
    cout << "After: " << x << ", " << y << endl;
    return 0;
}`,
      solution: `#include <iostream>
using namespace std;

void swap(int* a, int* b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

int main() {
    int x = 10, y = 20;
    cout << "Before: " << x << ", " << y << endl;
    swap(&x, &y);
    cout << "After: " << x << ", " << y << endl;
    return 0;
}`
    },
    {
      id: 9,
      title: "Fibonacci Generator",
      description: "Generate Fibonacci sequence up to n terms.",
      fullDescription: "Write a program that generates the Fibonacci sequence with user-specified number of terms.",
      difficulty: "Intermediate",
      time: "25 min",
      tags: ["Loops", "Math", "Sequences"],
      icon: "🐚",
      hints: ["First two are 0 and 1", "Next = sum of previous two", "Track previous values"],
      starterCode: `#include <iostream>
using namespace std;

int main() {
    int n;
    cout << "How many terms? ";
    cin >> n;
    // TODO: Generate Fibonacci sequence
    return 0;
}`,
      solution: `#include <iostream>
using namespace std;

int main() {
    int n;
    cout << "How many terms? ";
    cin >> n;
    long long a = 0, b = 1, next;
    for(int i = 0; i < n; i++) {
        cout << a << " ";
        next = a + b;
        a = b;
        b = next;
    }
    cout << endl;
    return 0;
}`
    },
    {
      id: 10,
      title: "Reverse Array",
      description: "Reverse an array in-place without extra memory.",
      fullDescription: "Reverse array using two-pointer technique. No extra array allowed!",
      difficulty: "Intermediate",
      time: "20 min",
      tags: ["Arrays", "Algorithms", "Pointers"],
      icon: "🔃",
      hints: ["Use start and end pointers", "Swap elements", "Move toward center"],
      starterCode: `#include <iostream>
using namespace std;

int main() {
    int arr[] = {1, 2, 3, 4, 5};
    int size = 5;
    // TODO: Reverse in-place
    for(int i = 0; i < size; i++) cout << arr[i] << " ";
    return 0;
}`,
      solution: `#include <iostream>
using namespace std;

int main() {
    int arr[] = {1, 2, 3, 4, 5};
    int size = 5;
    int start = 0, end = size - 1;
    while(start < end) {
        int temp = arr[start];
        arr[start] = arr[end];
        arr[end] = temp;
        start++; end--;
    }
    for(int i = 0; i < size; i++) cout << arr[i] << " ";
    return 0;
}`
    },
    // ===== ADVANCED PROJECTS (5) =====
    {
      id: 11,
      title: "Student Grade Manager",
      description: "Manage student records using structs and arrays.",
      fullDescription: "Build a program with Student struct, calculate averages, and determine letter grades.",
      difficulty: "Advanced",
      time: "45 min",
      tags: ["Structs", "Arrays", "Functions"],
      icon: "🎓",
      hints: ["Create Student struct", "Function for average", "Function for letter grade"],
      starterCode: `#include <iostream>
using namespace std;

// TODO: Define Student struct

int main() {
    // TODO: Create students, calc averages, print grades
    return 0;
}`,
      solution: `#include <iostream>
#include <string>
using namespace std;

struct Student {
    string name;
    int grades[3];
    double avg;
};

int main() {
    Student s = {"Alice", {90, 85, 92}, 0};
    s.avg = (s.grades[0] + s.grades[1] + s.grades[2]) / 3.0;
    char grade = s.avg >= 90 ? 'A' : s.avg >= 80 ? 'B' : 'C';
    cout << s.name << ": " << s.avg << "% (" << grade << ")" << endl;
    return 0;
}`
    },
    {
      id: 12,
      title: "Dynamic Array Manager",
      description: "Practice new/delete with dynamic memory.",
      fullDescription: "Create a program that dynamically allocates array, fills it, and properly frees memory.",
      difficulty: "Advanced",
      time: "35 min",
      tags: ["Pointers", "Heap", "Memory"],
      icon: "💾",
      hints: ["Use new int[size]", "Use delete[] for arrays", "Set to nullptr after"],
      starterCode: `#include <iostream>
using namespace std;

int main() {
    int size;
    cout << "Size: ";
    cin >> size;
    // TODO: Allocate, fill, print, free
    return 0;
}`,
      solution: `#include <iostream>
using namespace std;

int main() {
    int size;
    cout << "Size: ";
    cin >> size;
    int* arr = new int[size];
    for(int i = 0; i < size; i++) {
        cout << "Enter #" << i << ": ";
        cin >> arr[i];
    }
    cout << "Array: ";
    for(int i = 0; i < size; i++) cout << arr[i] << " ";
    delete[] arr;
    arr = nullptr;
    return 0;
}`
    },
    {
      id: 13,
      title: "Tic-Tac-Toe Game",
      description: "Build a complete 2-player game using 2D arrays.",
      fullDescription: "Create Tic-Tac-Toe with board display, turn-based play, and win detection.",
      difficulty: "Advanced",
      time: "60 min",
      tags: ["2D Arrays", "Loops", "Functions", "Game"],
      icon: "🎮",
      hints: ["char board[3][3]", "Function for display", "Check rows, cols, diagonals"],
      starterCode: `#include <iostream>
using namespace std;

char board[3][3] = {{' ',' ',' '},{' ',' ',' '},{' ',' ',' '}};

// TODO: printBoard(), checkWinner(), main game loop

int main() {
    // TODO: Game loop
    return 0;
}`,
      solution: `#include <iostream>
using namespace std;

char board[3][3] = {{' ',' ',' '},{' ',' ',' '},{' ',' ',' '}};

void printBoard() {
    for(int i = 0; i < 3; i++) {
        cout << board[i][0] << "|" << board[i][1] << "|" << board[i][2] << endl;
        if(i < 2) cout << "-----" << endl;
    }
}

int main() {
    char player = 'X';
    for(int turn = 0; turn < 9; turn++) {
        printBoard();
        int r, c;
        cout << player << " move (row col): ";
        cin >> r >> c;
        board[r][c] = player;
        player = (player == 'X') ? 'O' : 'X';
    }
    printBoard();
    return 0;
}`
    },
    {
      id: 14,
      title: "Linked List",
      description: "Implement a singly linked list from scratch.",
      fullDescription: "Build linked list with insert, delete, display operations. Master dynamic data structures.",
      difficulty: "Advanced",
      time: "50 min",
      tags: ["Pointers", "Structs", "Data Structures"],
      icon: "🔗",
      hints: ["Node struct with data and next", "Track head pointer", "Traverse to find nodes"],
      starterCode: `#include <iostream>
using namespace std;

struct Node {
    int data;
    Node* next;
};

// TODO: insert, display, delete functions

int main() {
    Node* head = nullptr;
    // TODO: Test linked list
    return 0;
}`,
      solution: `#include <iostream>
using namespace std;

struct Node {
    int data;
    Node* next;
};

void insert(Node*& head, int val) {
    Node* n = new Node{val, nullptr};
    if(!head) { head = n; return; }
    Node* t = head;
    while(t->next) t = t->next;
    t->next = n;
}

void display(Node* head) {
    while(head) { cout << head->data << " -> "; head = head->next; }
    cout << "NULL" << endl;
}

int main() {
    Node* head = nullptr;
    insert(head, 10);
    insert(head, 20);
    insert(head, 30);
    display(head);
    return 0;
}`
    },
    {
      id: 15,
      title: "Binary Search",
      description: "Implement binary search iteratively and recursively.",
      fullDescription: "Implement efficient O(log n) search on sorted arrays both ways.",
      difficulty: "Advanced",
      time: "40 min",
      tags: ["Algorithms", "Recursion", "Arrays"],
      icon: "🎯",
      hints: ["Array must be sorted", "Compare with middle", "Eliminate half each step"],
      starterCode: `#include <iostream>
using namespace std;

// TODO: binarySearch function

int main() {
    int arr[] = {2, 5, 8, 12, 16, 23, 38, 56};
    int target = 23;
    // TODO: Search and print result
    return 0;
}`,
      solution: `#include <iostream>
using namespace std;

int binarySearch(int arr[], int size, int target) {
    int low = 0, high = size - 1;
    while(low <= high) {
        int mid = (low + high) / 2;
        if(arr[mid] == target) return mid;
        if(arr[mid] < target) low = mid + 1;
        else high = mid - 1;
    }
    return -1;
}

int main() {
    int arr[] = {2, 5, 8, 12, 16, 23, 38, 56};
    int idx = binarySearch(arr, 8, 23);
    if(idx != -1) cout << "Found at index " << idx << endl;
    else cout << "Not found" << endl;
    return 0;
}`
    }
  ];

  // Get unique tags
  const allTags = [...new Set(projects.flatMap(p => p.tags))];
  
  // Filter projects
  const filteredProjects = projects.filter(p => {
    const diffMatch = filterDifficulty === 'all' || p.difficulty === filterDifficulty;
    const tagMatch = filterTag === 'all' || p.tags.includes(filterTag);
    return diffMatch && tagMatch;
  });

  const difficultyOptions = [
    { value: 'all', label: 'All Levels', icon: '📚' },
    { value: 'Beginner', label: 'Beginner', icon: '🌱' },
    { value: 'Intermediate', label: 'Intermediate', icon: '🌿' },
    { value: 'Advanced', label: 'Advanced', icon: '🌳' },
  ];

  const tagOptions = [
    { value: 'all', label: 'All Topics', icon: '📁' },
    ...allTags.map(tag => ({ value: tag, label: tag, icon: '📌' }))
  ];

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'Beginner': return 'bg-gradient-to-r from-green-500 to-emerald-500 text-white';
      case 'Intermediate': return 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white';
      case 'Advanced': return 'bg-gradient-to-r from-red-500 to-pink-500 text-white';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const getDifficultyBorder = (difficulty) => {
    switch(difficulty) {
      case 'Beginner': return 'border-green-200 dark:border-green-800 hover:border-green-400';
      case 'Intermediate': return 'border-yellow-200 dark:border-yellow-800 hover:border-yellow-400';
      case 'Advanced': return 'border-red-200 dark:border-red-800 hover:border-red-400';
      default: return 'border-slate-200';
    }
  };

  return (
    <div className="pt-24 pb-20 min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header - Animated */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div 
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/40 dark:to-pink-900/40 rounded-full border border-purple-200 dark:border-purple-800 mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Trophy className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            <span className="text-sm font-semibold text-purple-700 dark:text-purple-300">15 Projects</span>
          </motion.div>
          <motion.h1 
            className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Coding <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Projects</span>
          </motion.h1>
          <motion.p 
            className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            5 projects per level. Each includes hints, starter code, and solutions.
          </motion.p>
        </motion.div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-10 justify-center items-center">
          <Dropdown value={filterDifficulty} onChange={setFilterDifficulty} options={difficultyOptions} icon={Zap} placeholder="All Levels" />
          <Dropdown value={filterTag} onChange={setFilterTag} options={tagOptions} icon={BookOpen} placeholder="All Topics" />
          <div className="h-8 w-px bg-slate-200 dark:bg-slate-700 hidden sm:block"></div>
          <div className="px-4 py-2 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-600 dark:text-slate-400">
            {filteredProjects.length} of {projects.length} projects
          </div>
        </div>

        {/* Projects Grid - Animated */}
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          key={`${filterDifficulty}-${filterTag}`}
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div 
                key={project.id}
                variants={staggerItem}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.05 }}
                layout
                whileHover={{ y: -8, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`group bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-lg border-2 ${getDifficultyBorder(project.difficulty)} hover:shadow-2xl transition-shadow flex flex-col cursor-pointer`}
                onClick={() => setSelectedProject(project)}
              >
                <div className="flex justify-between items-start mb-3">
                  <motion.div 
                    className="text-3xl"
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {project.icon}
                  </motion.div>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${getDifficultyColor(project.difficulty)}`}>
                    {project.difficulty}
                  </span>
                </div>
                
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1 group-hover:text-blue-600 transition-colors">
                  {project.title}
                </h3>
                <p className="text-slate-500 dark:text-slate-400 text-xs mb-3 flex-1">{project.description}</p>
                
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" />{project.time}
                  </span>
                  <div className="flex gap-1">
                    {project.tags.slice(0, 2).map(tag => (
                      <span key={tag} className="text-xs bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 rounded">{tag}</span>
                    ))}
                  </div>
                </div>
                
                <motion.button 
                  className="w-full py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold text-sm hover:from-blue-700 hover:to-indigo-700 transition-all flex items-center justify-center gap-1"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Target className="w-3 h-3" /> Start
                </motion.button>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-16">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-xl font-bold text-slate-700 dark:text-slate-300 mb-2">No projects found</h3>
            <button onClick={() => { setFilterDifficulty('all'); setFilterTag('all'); }} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm">Clear Filters</button>
          </div>
        )}
      </div>

      {/* Modal - Animated */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" 
            onClick={(e) => e.target === e.currentTarget && setSelectedProject(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-3xl max-h-[85vh] overflow-hidden flex flex-col"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              <div className="flex justify-between items-center p-5 border-b border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-3">
                  <motion.span 
                    className="text-4xl"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", delay: 0.1 }}
                  >
                    {selectedProject.icon}
                  </motion.span>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${getDifficultyColor(selectedProject.difficulty)}`}>{selectedProject.difficulty}</span>
                      <span className="text-xs text-slate-400">{selectedProject.time}</span>
                    </div>
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">{selectedProject.title}</h2>
                  </div>
                </div>
                <motion.button 
                  onClick={() => setSelectedProject(null)} 
                  className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg"
                  whileHover={{ rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-5 h-5 text-slate-500" />
                </motion.button>
              </div>

              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                <p className="text-slate-600 dark:text-slate-300">{selectedProject.fullDescription}</p>
                
                <motion.div 
                  className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-4 border border-amber-200 dark:border-amber-800"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <h3 className="flex items-center gap-2 text-amber-700 dark:text-amber-400 font-bold mb-2">
                    <Lightbulb className="w-4 h-4" /> Hints
                  </h3>
                  <ul className="space-y-1">
                    {selectedProject.hints.map((hint, i) => (
                      <motion.li 
                        key={i} 
                        className="flex items-start gap-2 text-amber-800 dark:text-amber-300 text-sm"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + i * 0.1 }}
                      >
                        <CheckCircle className="w-4 h-4 mt-0.5" />{hint}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <h3 className="flex items-center gap-2 text-slate-700 dark:text-slate-300 font-bold mb-2">
                    <Code className="w-4 h-4" /> Starter Code
                  </h3>
                  <pre className="bg-slate-900 text-slate-100 rounded-xl p-4 overflow-x-auto text-sm">{selectedProject.starterCode}</pre>
                </motion.div>
              </div>

              <div className="flex gap-3 p-5 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50">
                <motion.div className="flex-1" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    to="/playground"
                    className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold flex items-center justify-center gap-2"
                    onClick={() => localStorage.setItem('playgroundCode', selectedProject.starterCode)}
                  >
                    <Play className="w-4 h-4" /> Try in Playground
                  </Link>
                </motion.div>
                <motion.button
                  onClick={() => { localStorage.setItem('playgroundCode', selectedProject.solution); window.location.href = '/playground'; }}
                  className="px-6 py-3 bg-green-500 text-white rounded-xl font-semibold flex items-center gap-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Sparkles className="w-4 h-4" /> Solution
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProjectsPage;
