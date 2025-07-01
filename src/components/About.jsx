import React from "react";

function About() {
  return (
    <section id="about" className="min-h-screen py-20 bg-blue-50">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="section-title text-center mb-12">About Me</h2>

        {/* Personal Introduction */}
        <div className="mb-12">
          <div>
            <p className="text-xl text-gray-700 leading-relaxed max-w-3xl mb-8">
              I'm Peter Lin, a junior studying CS + Philosophy at the University
              of Illinois Urbana-Champaign. I'm passionate about exploring
              innovative ways to integrate AI into software development
              workflows. In my free time, I play guitar, take walks, read books,
              and whistle.
            </p>
            <div className="text-center mb-8">
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
              >
                View Resume
                <svg
                  className="ml-2 w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div className="mb-12">
          <h3 className="text-xl font-semibold mb-6 text-gray-800">Skills</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-lg shadow-md text-center">
              <h4 className="font-medium text-gray-800">Frontend</h4>
              <p className="text-sm text-gray-600 mt-2">
                React, Tailwind, HTML, CSS, JavaScript, TypeScript
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md text-center">
              <h4 className="font-medium text-gray-800">Backend</h4>
              <p className="text-sm text-gray-600 mt-2">
                Node.js, Python, Java, C++, Databases
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md text-center">
              <h4 className="font-medium text-gray-800">Tools</h4>
              <p className="text-sm text-gray-600 mt-2">
                Git, Docker, AWS (S3, EC2, Lambda, DynamoDB), CI/CD
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md text-center">
              <h4 className="font-medium text-gray-800">Other</h4>
              <p className="text-sm text-gray-600 mt-2">
                Agile, UI/UX, Machine Learning
              </p>
            </div>
          </div>
        </div>

        {/* Experience Section */}
        <div className="mb-12">
          <h3 className="text-xl font-semibold mb-6 text-gray-800">
            Experience
          </h3>
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-semibold text-lg">
                  DigITal Accelerator Development Program (DADP) Intern
                </h4>
                <span className="text-sm text-gray-500">
                  June 2025 - Present
                </span>
              </div>
              <p className="text-gray-600 font-medium mb-2">
                Bristol Myers Squibb
              </p>
              <ul className="text-gray-700 space-y-1">
                Bristol Myers Squibb (BMS) is a global biopharmaceutical company
                dedicated to discovering, developing, and delivering innovative
                medicines that help patients prevail over serious diseases, with
                a strong focus on areas like oncology, hematology, and
                immunology. They are driven by scientific innovation and a
                patient-first approach to transform lives through their
                treatments.
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-semibold text-lg">
                  Machine Learning Intern
                </h4>
                <span className="text-sm text-gray-500">
                  May 2025 - July 2024
                </span>
              </div>
              <p className="text-gray-600 font-medium mb-2">WhizAI</p>
              <ul className="text-gray-700 space-y-1">
                WhizAI is a pioneering AI-powered analytics platform
                specifically designed for the life sciences sector, enabling
                business users to gain instant, contextual insights from complex
                data through natural language interaction. It democratizes
                access to critical information, allowing for faster and more
                informed decision-making across various functions like sales,
                market access, and patient services.
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
