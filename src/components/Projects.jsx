import React from "react";

function Projects() {
  const projects = [
    {
      title: "Project Title",
      description:
        "A brief description of your project. Explain what the project does, what problems it solves, and what makes it unique. Keep this concise but informative.",
      tech: ["Technology 1", "Technology 2", "Technology 3", "Technology 4"],
      link: "#",
    },
  ];

  return (
    <section id="projects" className="min-h-screen py-20 bg-blue-50">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="section-title text-center">Projects</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div key={index} className="card">
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
              <a
                href={project.link}
                className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
              >
                View Project →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;
