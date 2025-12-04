import React from 'react';

const ProjectsPage = () => {
  const projects = [
    {
      title: "Calculator App",
      description: "Build a simple calculator using C++ switch statements.",
      difficulty: "Easy",
      tags: ["Switch", "IO"]
    },
    {
      title: "Number Guessing Game",
      description: "Use loops and conditionals to create a fun game.",
      difficulty: "Medium",
      tags: ["Loops", "Random"]
    },
    {
      title: "Student Database",
      description: "Manage student records using arrays and structs.",
      difficulty: "Hard",
      tags: ["Structs", "Arrays"]
    }
  ];

  return (
    <div className="pt-24 pb-20 min-h-screen bg-slate-50 dark:bg-slate-900 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
            Projects
          </h1>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl font-medium transition-colors shadow-lg shadow-blue-500/30">
            Submit Project
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div key={index} className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-100 dark:border-slate-700 hover:-translate-y-1 transition-transform duration-300">
              <div className="flex justify-between items-start mb-4">
                <span className={`px-2 py-1 rounded text-xs font-semibold ${
                  project.difficulty === 'Easy' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                  project.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
                  'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                }`}>
                  {project.difficulty}
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{project.title}</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map(tag => (
                  <span key={tag} className="text-xs bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-2 py-1 rounded">
                    #{tag}
                  </span>
                ))}
              </div>
              <button className="w-full py-2 border border-blue-600 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors font-medium">
                View Project
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;
