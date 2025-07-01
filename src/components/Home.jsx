import React from "react";
import PaperCanvas from "./PaperCanvas";
import AnimatedText from "./AnimatedText";

function Home() {
  return (
    <section id="home" className="h-screen bg-blue-50 relative overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center py-4">
        {/* Single container that holds both text and image as one unit */}
        <div className="flex items-center justify-center gap-32 max-w-6xl mx-auto px-8">
          {/* Text Section */}
          <div className="text-gray-900 flex-shrink-0">
            <AnimatedText text={`Hi, I'm\nPeter Lin`} />
          </div>

          {/* Image Section - smaller, more appropriate size */}
          <div className="w-120 h-120 flex-shrink-0">
            <PaperCanvas />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;
