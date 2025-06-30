import React from "react";
import PaperCanvas from "./PaperCanvas";

function Home() {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100"
    >
      <div className="text-center max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="text-left">
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
              Hi, I'm
              <br />
              <span className="text-blue-600">Peter Lin</span>
            </h1>
          </div>
          <div className="flex items-center justify-center w-full">
            <div className="w-full max-w-md">
              <PaperCanvas />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;
