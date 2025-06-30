import React, { useEffect, useRef, useState } from "react";

function PaperCanvas() {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [hasCompleted, setHasCompleted] = useState(false);

  useEffect(() => {
    if (!canvasRef.current) return;

    console.log("Initializing Paper.js canvas...", { hasCompleted });

    // Check if Paper.js is available globally
    if (typeof window.paper === "undefined") {
      setError("Paper.js library not loaded. Please refresh the page.");
      return;
    }

    const paper = window.paper;

    // Constants
    const MIN_RADIUS = 8;
    const ANIMATION_DURATION = 300;
    const INITIAL_ANIMATION_DURATION = 500;
    const SCALE_BUFFER = 1.05;

    try {
      // Initialize Paper.js
      paper.setup(canvasRef.current);
      paper.view.viewSize = new paper.Size(800, 800);
      console.log("Paper.js initialized successfully");

      // Image setup
      const raster = new paper.Raster("peter_lin_portrait.jpg");
      let isImageLoaded = false;

      // Hide raster immediately to prevent it from showing enlarged
      raster.visible = false;

      // State management
      let totalBubbles = 0;
      let completedBubbles = 0;
      let finalImage = null;
      let activeBubbles = new Set();
      let isCleaningUp = false;
      let completionTimeout = null;
      let isComponentMounted = true;
      let animationCompleted = hasCompleted; // Track completion within this effect

      raster.on("load", () => {
        isImageLoaded = true;
        console.log("Raster loaded, animationCompleted:", animationCompleted);
        // Ensure raster is still hidden
        raster.visible = false;

        // If animation has completed in this component lifecycle, show final image immediately
        if (animationCompleted) {
          console.log("Showing final image immediately");
          showFinalImageImmediately();
        } else {
          console.log("Starting animation");
          init();
        }
      });

      // Helper function to show final image immediately (for returning users)
      function showFinalImageImmediately() {
        if (finalImage || isCleaningUp || !isComponentMounted) return;

        isCleaningUp = true;
        setIsLoaded(true);

        // Ensure raster is hidden
        raster.visible = false;

        // Setup view and raster positioning (same as in init function)
        const viewSize = 800;
        const width = Math.pow(2, Math.floor(Math.log2(viewSize)));
        const fitScreenScaleFactor = Math.max(
          viewSize / raster.width,
          viewSize / raster.height
        );
        const scaleFactor = Math.min(
          (SCALE_BUFFER * width) / viewSize,
          (SCALE_BUFFER * width) / viewSize
        );

        paper.view.viewSize = new paper.Size(width, width);
        raster.position = new paper.Point(width / 2, width / 2);
        raster.scale(fitScreenScaleFactor * scaleFactor);

        // Create and show final image immediately with proper positioning
        finalImage = raster.clone();
        finalImage.visible = true;
        finalImage.opacity = 1;
        finalImage.position = new paper.Point(width / 2, width / 2);
        finalImage.scale(fitScreenScaleFactor * scaleFactor);
        finalImage.sendToBack();

        // Clean up any existing bubbles
        const bubblesToRemove = Array.from(activeBubbles);
        bubblesToRemove.forEach((bubble) => {
          if (bubble && bubble.remove) bubble.remove();
        });
        activeBubbles.clear();

        // Final cleanup
        paper.project.activeLayer.children.slice().forEach((child) => {
          if (child instanceof paper.Path.Circle) child.remove();
        });
      }

      // Helper function to create animated circle
      function createAnimatedCircle(
        center,
        radius,
        fillColor,
        targetPosition = null
      ) {
        if (!isComponentMounted) return null;

        const circle = new paper.Path.Circle({
          center: center,
          radius: radius,
          fillColor: fillColor,
          applyMatrix: false,
        });

        activeBubbles.add(circle);

        if (targetPosition) {
          circle.tweenTo(
            { position: targetPosition },
            {
              duration: ANIMATION_DURATION,
              easing: "easeInOutQuad",
            }
          );
        }

        return circle;
      }

      // Helper function to get average color for a region
      function getAverageColorForRegion(center, radius) {
        // Temporarily make raster visible to get average color, then hide it
        raster.visible = true;
        const rect = new paper.Rectangle(
          center.subtract([radius, radius]),
          new paper.Size(radius * 2, radius * 2)
        );
        const color = raster.getAverageColor(rect);
        raster.visible = false;
        return color;
      }

      // Helper function to create temporary fade-out circle
      function createTempCircle(center, radius, fillColor) {
        if (!isComponentMounted) return;

        const tempCircle = createAnimatedCircle(center, radius, fillColor);
        if (!tempCircle) return;

        tempCircle.tweenTo(
          { opacity: 0 },
          {
            duration: ANIMATION_DURATION,
            easing: "easeInOutQuad",
          }
        );

        setTimeout(() => {
          if (!isComponentMounted) return;
          tempCircle.remove();
          activeBubbles.delete(tempCircle);
        }, ANIMATION_DURATION);
      }

      // Function to handle bubble splitting
      function scheduleBubbleSplit(center, radius, bubble = null) {
        if (
          !isComponentMounted ||
          !isImageLoaded ||
          radius < MIN_RADIUS ||
          isCleaningUp
        ) {
          completedBubbles++;
          checkForCompletion();
          return;
        }

        // Calculate split delay
        const baseDelay = 500;
        const maxRadius = 764;
        const delayScale = Math.pow(radius / maxRadius, 2) + 0.8;
        const splitDelay = Math.random() * 500 + baseDelay * delayScale;

        setTimeout(() => {
          if (
            !isComponentMounted ||
            !isImageLoaded ||
            radius < MIN_RADIUS ||
            isCleaningUp
          )
            return;

          // Remove original bubble
          if (bubble) {
            bubble.remove();
            activeBubbles.delete(bubble);
          }

          // Create temporary fade-out circle
          createTempCircle(
            center,
            radius,
            getAverageColorForRegion(center, radius)
          );

          // Create new bubbles
          const newRadius = radius / 2;
          const offset = new paper.Point(newRadius, newRadius);
          const positions = [
            center.add(offset.multiply(-1, -1)),
            center.add(offset.multiply(-1, 1)),
            center.add(offset.multiply(1, -1)),
            center.add(offset.multiply(1, 1)),
          ];

          positions.forEach((pos) => {
            const circle = createAnimatedCircle(
              center,
              newRadius,
              getAverageColorForRegion(pos, newRadius),
              pos
            );
            if (circle) {
              scheduleBubbleSplit(pos, newRadius, circle);
            }
          });
        }, splitDelay);
      }

      // Check completion and show final image
      function checkForCompletion() {
        if (completedBubbles >= totalBubbles && totalBubbles > 0) {
          if (completionTimeout) clearTimeout(completionTimeout);
          completionTimeout = setTimeout(showFinalImage, 300);
        }
      }

      // Show the final image overlay
      function showFinalImage() {
        if (finalImage || isCleaningUp || !isComponentMounted) return;

        console.log("Showing final image");

        if (completionTimeout) {
          clearTimeout(completionTimeout);
          completionTimeout = null;
        }

        isCleaningUp = true;
        animationCompleted = true;
        setHasCompleted(true);

        // Create and fade in final image
        finalImage = raster.clone();
        finalImage.visible = true;
        finalImage.opacity = 0;
        finalImage.sendToBack();
        finalImage.tweenTo(
          { opacity: 1 },
          {
            duration: 400,
            easing: "easeInOutQuad",
          }
        );

        // Fade out bubbles after image appears
        setTimeout(() => {
          if (!isComponentMounted) return;

          const bubblesToFade = Array.from(activeBubbles);
          if (bubblesToFade.length > 0) {
            bubblesToFade.forEach((bubble) => {
              if (bubble && bubble.tweenTo) {
                bubble.tweenTo(
                  { opacity: 0 },
                  {
                    duration: 800,
                    easing: "easeInOutQuad",
                  }
                );
              }
            });

            // Clean up bubbles
            setTimeout(() => {
              if (!isComponentMounted) return;

              bubblesToFade.forEach((bubble) => {
                if (bubble && bubble.remove) bubble.remove();
              });
              activeBubbles.clear();

              // Final cleanup
              paper.project.activeLayer.children.slice().forEach((child) => {
                if (child instanceof paper.Path.Circle) child.remove();
              });
            }, 800);
          }
        }, 400);
      }

      function init() {
        if (!isComponentMounted) return;

        console.log("Initializing animation");

        // Calculate dimensions - make it square
        const viewSize = 800;
        const width = Math.pow(2, Math.floor(Math.log2(viewSize)));
        const radius = width / 2;

        // Calculate total bubbles
        let currentRadius = radius;
        let level = 0;
        totalBubbles = 0;
        while (currentRadius >= MIN_RADIUS) {
          totalBubbles += Math.pow(4, level);
          currentRadius /= 2;
          level++;
        }

        console.log("Total bubbles to create:", totalBubbles);

        // Setup view and raster
        const fitScreenScaleFactor = Math.max(
          viewSize / raster.width,
          viewSize / raster.height
        );
        const scaleFactor = Math.min(
          (SCALE_BUFFER * width) / viewSize,
          (SCALE_BUFFER * width) / viewSize
        );

        paper.view.viewSize = new paper.Size(width, width);
        raster.position = new paper.Point(width / 2, width / 2);
        raster.scale(fitScreenScaleFactor * scaleFactor);

        // Temporarily make raster visible to get average color, then hide it
        raster.visible = true;
        const averageColor = raster.getAverageColor(paper.view.bounds);
        raster.visible = false;

        // Create initial circle
        const center = paper.view.bounds.center;
        const circle = createAnimatedCircle(center, radius, averageColor);

        if (!circle) return;

        console.log("Created initial circle, starting animation");

        // Initial animation
        circle.tween(
          { opacity: 0, scaling: 0.0001 },
          { opacity: 1, scaling: 1 },
          {
            duration: INITIAL_ANIMATION_DURATION,
            easing: "easeInOutQuad",
          }
        );

        // Start splitting after initial animation
        setTimeout(() => {
          if (!isComponentMounted) return;

          console.log("Starting bubble splitting");
          scheduleBubbleSplit(center, radius, circle);
          // Safety timeout
          completionTimeout = setTimeout(() => {
            if (!isComponentMounted) return;
            if (!finalImage && !isCleaningUp) {
              console.log("Forcing completion due to timeout");
              showFinalImage();
            }
          }, 10000);
        }, INITIAL_ANIMATION_DURATION);

        setIsLoaded(true);
      }

      // Cleanup function
      return () => {
        console.log("Cleaning up Paper.js...");
        isComponentMounted = false;

        if (completionTimeout) {
          clearTimeout(completionTimeout);
        }

        // Force completion if animation is still running (user navigated away)
        if (!animationCompleted && !finalImage) {
          console.log("Forcing completion on navigation");
          setHasCompleted(true);
        }

        try {
          if (paper.view) {
            paper.view.remove();
          }
        } catch (error) {
          console.error("Cleanup error:", error);
        }
      };
    } catch (error) {
      console.error("Paper.js initialization error:", error);
      setError(error.message);
    }
  }, []); // Removed resetKey from dependencies since we no longer need it

  if (error) {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="text-red-500 text-center">
          <p>Canvas Error: {error}</p>
          <p className="text-sm mt-2">
            Please check the console for more details.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center p-4 w-full">
      <div
        className="relative w-full max-w-md"
        style={{ aspectRatio: "1 / 1" }}
      >
        <canvas
          ref={canvasRef}
          id="paper-canvas"
          width={800}
          height={800}
          className="rounded-3xl w-full h-full"
          style={{
            display: "block",
            width: "100%",
            height: "100%",
            background: "transparent",
          }}
        />
      </div>
    </div>
  );
}

export default PaperCanvas;
