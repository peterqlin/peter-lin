import React from "react";

function Projects() {
  const projects = [
    {
      title: "Peters to the Max",
      description: "Based on koalastothemax.com.",
      tech: ["JavaScript", "Paper.js"],
      link: "https://peterstothemax.vercel.app/",
    },
    // {
    //   title: "Project Title",
    //   description:
    //     "A brief description of your project. Explain what the project does, what problems it solves, and what makes it unique. Keep this concise but informative.",
    //   tech: ["Technology 1", "Technology 2", "Technology 3", "Technology 4"],
    //   link: "#",
    // },
  ];

  return (
    <section
      id="projects"
      className="flex-1 min-h-screen flex flex-col py-16 bg-blue-50"
    >
      <div className="max-w-6xl mx-auto px-6 flex-1 flex flex-col">
        <h2 className="section-title text-center">Projects</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <a
              key={index}
              href={project.link}
              className="card block hover:shadow-lg transition-shadow duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400"
              target="_blank"
              rel="noopener noreferrer"
              tabIndex={0}
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {project.title}
              </h3>
              <p className="text-gray-700 mb-4 leading-relaxed">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <span className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200">
                View Project →
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;
