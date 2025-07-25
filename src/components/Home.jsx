import React from "react";
import VideoCanvas from "./VideoCanvas";
import AnimatedText from "./AnimatedText";

function Home() {
  return (
    <section
      id="home"
      className="min-h-screen bg-blue-50 relative overflow-hidden flex items-center justify-center"
    >
      {/* Single container that holds both text and image as one unit */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-16 md:gap-32 max-w-6xl mx-auto px-4 md:px-8">
        {/* Text Section - matching height to video container */}
        <div className="w-64 h-48 md:w-96 md:h-96 lg:w-120 lg:h-120 flex-shrink-0 flex items-center justify-center text-gray-900 text-center md:text-left">
          <AnimatedText text={`Hi, I'm\nPeter Lin`} />
        </div>

        {/* Image Section - responsive sizing */}
        <div className="w-64 h-64 md:w-96 md:h-96 lg:w-120 lg:h-120 flex-shrink-0">
          <VideoCanvas />
        </div>
      </div>
    </section>
  );
}

export default Home;
