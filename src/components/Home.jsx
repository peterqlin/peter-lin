import React from "react";
import PaperCanvas from "./PaperCanvas";
import AnimatedText from "./AnimatedText";

function Home() {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100"
    >
      <div className="text-center max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="text-left">
            <div className="mb-6 text-gray-900">
              <AnimatedText text={`Hi, I'm\nPeter Lin`} />
            </div>
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
