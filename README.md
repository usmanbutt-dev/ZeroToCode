# ZeroToCode

**ZeroToCode** is a futuristic, interactive educational platform designed to teach absolute beginners the fundamentals of computer science, logic building, and C++ programming. It specifically targets visual learners by providing a "Glass Box" model of code execution, allowing users to see exactly what happens inside the computer as their code runs.

## 🚀 Key Features

### 🖥️ Glass Box Visualizer
The heart of the platform. Unlike standard IDEs, our visualizer runs C++ code entirely in the browser (client-side) and provides:
-   **Real-time Memory Views**: See the Stack and Heap memory change as you step through code.
-   **Variable Tracing**: Watch variables declare, initialize, and update in real-time.
-   **Call Stack Visualization**: Understand function calls, scopes, and recursion deeply.
-   **Interactive Debugging**: Step-by-step execution controls (Step In, Step Over, Step Out).

### 🎓 Interactive Curriculum
Structured modules designed to build a strong foundation:
1.  **Computer Basics**: Hardware, Software, OS, Files.
2.  **Logic Building**: Sequences, Flowcharts, Pseudocode.
3.  **C++ Fundamentals**: Syntax, Variables, I/O.
4.  **Control Flow**: If/Else, Switch, Loops.
5.  **Functions**: Parameters, Return Values, Scope.
6.  **Memory & Pointers**: Arrays, Strings, Address manipulation.

### 👤 Profile & Personalization
-   **Glass-Morphism Avatars**: Unique, procedurally generated robot avatars tailored to your profile.
-   **Progress Tracking**: Save your learning progress, completed modules, and projects via Firebase integration.
-   **Customizable Settings**: Dark mode, editor preferences, and more.

### 🎮 Gamified Projects & Minigames
-   Apply your knowledge by building real projects.
-   Interactive mini-games to reinforce logic and coding concepts.

## 🛠️ Tech Stack

-   **Frontend**: React (v18), React Router DOM
-   **Styling**: Tailwind CSS, Framer Motion (for high-performance animations)
-   **Code Editor**: Monaco Editor (VS Code core)
-   **Runtime**: Custom Web Workers interacting with Emscripten/Clang for client-side C++ execution.
-   **Backend & Auth**: Firebase (Authentication, Firestore)
-   **Build Tool**: Vite

## 🏃‍♂️ Getting Started

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/usmanbutt-dev/ZeroToCode.git
    cd ZeroToCode
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Setup Environment**:
    -   Create a `.env` file based on `.env.example`.
    -   Add your Firebase configuration keys.

4.  **Run the development server**:
    ```bash
    npm run dev
    ```

5.  **Open your browser**:
    Navigate to `http://localhost:5173` to view the app.

## 🤝 Contributing

Contributions are welcome! If you have ideas for new visualizers, optimization for the runtime, or curriculum enhancements, feel free to open an issue or submit a pull request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
