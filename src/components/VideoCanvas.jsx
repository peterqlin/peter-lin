import React, { useRef, useEffect, useState } from "react";

function VideoCanvas() {
  const videoRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [hasCompleted, setHasCompleted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Select video once on mount - this prevents the source from changing on re-renders
  const [videoSource] = useState(() => {
    return `portrait-animation-${Math.floor(Math.random() * 3) + 1}.mp4`;
  });

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Set up video event handlers
    const handleLoadedData = () => {
      setIsLoaded(true);
    };

    const handleEnded = () => {
      setHasCompleted(true);
      // Keep the video on the last frame
      video.pause();
    };

    const handleError = (e) => {
      console.error("Video error:", e);
      setError("Failed to load video. Please refresh the page.");
    };

    // Add event listeners
    video.addEventListener("loadeddata", handleLoadedData);
    video.addEventListener("ended", handleEnded);
    video.addEventListener("error", handleError);

    // Set up fade-in delay
    const fadeInTimer = setTimeout(() => {
      setIsVisible(true);
    }, 3000);

    // Start playing the video after fade-in
    const playVideo = async () => {
      try {
        await video.play();
      } catch (err) {
        console.error("Failed to play video:", err);
        setError("Failed to play video. Please refresh the page.");
      }
    };

    // Play video after fade-in delay
    setTimeout(() => {
      playVideo();
    }, 3000);

    // Cleanup function
    return () => {
      clearTimeout(fadeInTimer);
      video.removeEventListener("loadeddata", handleLoadedData);
      video.removeEventListener("ended", handleEnded);
      video.removeEventListener("error", handleError);
    };
  }, []);

  if (error) {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="text-red-500 text-center">
          <p>Video Error: {error}</p>
          <p className="text-sm mt-2">
            Please check the console for more details.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex items-center justify-center">
      <video
        ref={videoRef}
        className="rounded-sm object-contain max-w-full max-h-full transition-opacity duration-1000 ease-in-out"
        style={{
          display: "block",
          background: "transparent",
          pointerEvents: "none",
          userSelect: "none",
          WebkitUserSelect: "none",
          MozUserSelect: "none",
          msUserSelect: "none",
          opacity: isVisible ? 1 : 0,
        }}
        width={800}
        height={800}
        muted
        playsInline
        preload="auto"
        controlsList="nodownload nofullscreen noremoteplayback"
        disablePictureInPicture
        onContextMenu={(e) => e.preventDefault()}
      >
        <source src={videoSource} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}

export default VideoCanvas;
