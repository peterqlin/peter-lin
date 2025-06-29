import React from "react";

function Home() {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100"
    >
      <div className="text-center max-w-4xl mx-auto px-6">
        <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
          Hi, I'm <span className="text-blue-600">Peter Lin</span>
        </h1>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/about"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
          >
            Learn More About Me
          </a>
          <a
            href="/projects"
            className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-600 hover:text-white transition-colors duration-200 font-medium"
          >
            View My Work
          </a>
        </div>
      </div>
    </section>
  );
}

export default Home;
