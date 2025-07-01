import React from "react";
import VideoCanvas from "./VideoCanvas";
import AnimatedText from "./AnimatedText";

function Home() {
  return (
    <section id="home" className="h-screen bg-blue-50 relative overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center py-4">
        {/* Single container that holds both text and image as one unit */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-32 max-w-6xl mx-auto px-4 md:px-8">
          {/* Text Section */}
          <div className="text-gray-900 flex-shrink-0 text-center md:text-left">
            <AnimatedText text={`Hi, I'm\nPeter Lin`} />
          </div>

          {/* Image Section - responsive sizing */}
          <div className="w-64 h-64 md:w-96 md:h-96 lg:w-120 lg:h-120 flex-shrink-0">
            <VideoCanvas />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;
