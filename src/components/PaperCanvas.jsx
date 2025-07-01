import React, { useEffect, useRef, useState } from "react";

function PaperCanvas() {
  const canvasRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [hasCompleted, setHasCompleted] = useState(false);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Check if Paper.js is available globally
    if (typeof window.paper === "undefined") {
      setError("Paper.js library not loaded. Please refresh the page.");
      return;
    }

    const paper = window.paper;

    // Animation constants
    const MIN_SQUARE_SIZE = 16;
    const SQUARE_SPLIT_ANIMATION_DURATION = 300;
    const INITIAL_SQUARE_ANIMATION_DURATION = 3000;
    const IMAGE_SCALE_BUFFER = 1.05;
    const SQUARE_CORNER_RADIUS = 0.15; // Rounded corners (15% of square size)

    try {
      // Initialize Paper.js
      paper.setup(canvasRef.current);
      paper.view.viewSize = new paper.Size(800, 800);

      // Image setup
      const portraitImage = new paper.Raster("peter_lin_portrait.jpg");
      let isPortraitLoaded = false;

      // Hide portrait immediately to prevent it from showing enlarged
      portraitImage.visible = false;

      // Animation state management
      let totalSquaresToCreate = 0;
      let squaresCompleted = 0;
      let finalPortraitOverlay = null;
      let activeSquares = new Set();
      let isAnimationFinishing = false;
      let finalImageTimeout = null;
      let isComponentMounted = true;
      let hasAnimationCompleted = hasCompleted; // Track completion within this effect

      portraitImage.on("load", () => {
        isPortraitLoaded = true;
        // Ensure portrait is still hidden
        portraitImage.visible = false;

        // If animation has completed in this component lifecycle, show final image immediately
        if (hasAnimationCompleted) {
          showFinalPortraitImmediately();
        } else {
          startSquareAnimation();
        }
      });

      // Helper function to show final image immediately (for returning users)
      function showFinalPortraitImmediately() {
        if (finalPortraitOverlay || isAnimationFinishing || !isComponentMounted)
          return;

        isAnimationFinishing = true;
        setIsLoaded(true);

        // Ensure portrait is hidden
        portraitImage.visible = false;

        // Setup view and portrait positioning (same as in startSquareAnimation function)
        const canvasSize = 800;
        const powerOfTwoSize = Math.pow(2, Math.floor(Math.log2(canvasSize)));
        const portraitFitScale = Math.max(
          canvasSize / portraitImage.width,
          canvasSize / portraitImage.height
        );
        const finalScaleFactor = Math.min(
          (IMAGE_SCALE_BUFFER * powerOfTwoSize) / canvasSize,
          (IMAGE_SCALE_BUFFER * powerOfTwoSize) / canvasSize
        );

        paper.view.viewSize = new paper.Size(powerOfTwoSize, powerOfTwoSize);
        portraitImage.position = new paper.Point(
          powerOfTwoSize / 2,
          powerOfTwoSize / 2
        );
        portraitImage.scale(portraitFitScale * finalScaleFactor);

        // Create and show final image immediately with proper positioning
        finalPortraitOverlay = portraitImage.clone();
        finalPortraitOverlay.visible = true;
        finalPortraitOverlay.opacity = 1;
        finalPortraitOverlay.position = new paper.Point(
          powerOfTwoSize / 2,
          powerOfTwoSize / 2
        );
        finalPortraitOverlay.scale(portraitFitScale * finalScaleFactor);
        finalPortraitOverlay.sendToBack();

        // Clean up any existing squares
        const squaresToRemove = Array.from(activeSquares);
        squaresToRemove.forEach((squareGroup) => {
          if (squareGroup && squareGroup.remove) squareGroup.remove();
        });
        activeSquares.clear();

        // Final cleanup
        paper.project.activeLayer.children.slice().forEach((child) => {
          if (child instanceof paper.Path.Rectangle) child.remove();
        });
      }

      // Helper function to create rounded square
      function createRoundedSquare(
        center,
        size,
        fillColor,
        targetPosition = null
      ) {
        if (!isComponentMounted) return null;

        // Create a wrapper group to contain the margin and the actual square
        const squareGroup = new paper.Group();

        // Create an invisible square for margin (slightly larger than the actual square)
        const marginSize = size * 1.1; // 10% larger for margin
        const marginRect = new paper.Rectangle(
          center.subtract(marginSize / 2),
          new paper.Size(marginSize, marginSize)
        );
        const marginSquare = new paper.Path.Rectangle(marginRect);
        marginSquare.fillColor = new paper.Color(0, 0, 0, 0); // Transparent
        marginSquare.applyMatrix = false;

        // Create the actual rounded square (smaller to create visual gap)
        const squareSize = size * 0.98;
        const rect = new paper.Rectangle(
          center.subtract(squareSize / 2),
          new paper.Size(squareSize, squareSize)
        );

        const roundedSquare = new paper.Path.Rectangle(
          rect,
          new paper.Size(
            squareSize * SQUARE_CORNER_RADIUS,
            squareSize * SQUARE_CORNER_RADIUS
          )
        );
        roundedSquare.fillColor = fillColor;
        roundedSquare.applyMatrix = false;

        // Add both elements to the wrapper group
        squareGroup.addChild(marginSquare);
        squareGroup.addChild(roundedSquare);
        squareGroup.applyMatrix = false;

        activeSquares.add(squareGroup);

        if (targetPosition) {
          squareGroup.tweenTo(
            { position: targetPosition },
            {
              duration: SQUARE_SPLIT_ANIMATION_DURATION,
              easing: "easeInOutQuad",
            }
          );
        }

        return squareGroup;
      }

      // Helper function to get average color for a region
      function getAverageColorForRegion(center, radius) {
        // Temporarily make portrait visible to get average color, then hide it
        portraitImage.visible = true;
        const regionRect = new paper.Rectangle(
          center.subtract([radius, radius]),
          new paper.Size(radius * 2, radius * 2)
        );
        const averageColor = portraitImage.getAverageColor(regionRect);
        portraitImage.visible = false;
        return averageColor;
      }

      // Helper function to create temporary fade-out square
      function createTemporaryFadeSquare(center, size, fillColor) {
        if (!isComponentMounted) return;

        const tempSquare = createRoundedSquare(center, size, fillColor);
        if (!tempSquare) return;

        tempSquare.tweenTo(
          { opacity: 0 },
          {
            duration: SQUARE_SPLIT_ANIMATION_DURATION,
            easing: "easeInOutQuad",
          }
        );

        setTimeout(() => {
          if (!isComponentMounted) return;
          tempSquare.remove();
          activeSquares.delete(tempSquare);
        }, SQUARE_SPLIT_ANIMATION_DURATION);
      }

      // Function to handle square splitting
      function scheduleSquareSplit(center, size, squareGroup = null) {
        if (
          !isComponentMounted ||
          !isPortraitLoaded ||
          size < MIN_SQUARE_SIZE * 2 ||
          isAnimationFinishing
        ) {
          squaresCompleted++;
          checkForAnimationCompletion();
          return;
        }

        // Calculate split delay
        const splitDelayRange = 500;
        const baseSplitDelay = 500;
        const maxSquareSize = 764;
        const delayScaleFactor = Math.pow(size / maxSquareSize, 2) + 0.8;
        const splitDelay =
          Math.random() * splitDelayRange + baseSplitDelay * delayScaleFactor;

        setTimeout(() => {
          if (
            !isComponentMounted ||
            !isPortraitLoaded ||
            size < MIN_SQUARE_SIZE * 2 ||
            isAnimationFinishing
          )
            return;

          // Remove original square
          if (squareGroup) {
            squareGroup.remove();
            activeSquares.delete(squareGroup);
          }

          // Create temporary fade-out square
          createTemporaryFadeSquare(
            center,
            size,
            getAverageColorForRegion(center, size / 2)
          );

          // Create new squares that form a perfect 2x2 grid
          const newSquareSize = size / 2; // Each square is exactly half the size

          // Position squares to form a perfect grid without gaps
          const newSquarePositions = [
            center.add([-newSquareSize / 2, -newSquareSize / 2]), // Top-left
            center.add([newSquareSize / 2, -newSquareSize / 2]), // Top-right
            center.add([-newSquareSize / 2, newSquareSize / 2]), // Bottom-left
            center.add([newSquareSize / 2, newSquareSize / 2]), // Bottom-right
          ];

          newSquarePositions.forEach((position) => {
            const newSquareGroup = createRoundedSquare(
              center,
              newSquareSize,
              getAverageColorForRegion(position, newSquareSize / 2),
              position
            );
            if (newSquareGroup) {
              scheduleSquareSplit(position, newSquareSize, newSquareGroup);
            }
          });
        }, splitDelay);
      }

      // Check completion and show final image
      function checkForAnimationCompletion() {
        if (
          squaresCompleted >= totalSquaresToCreate &&
          totalSquaresToCreate > 0
        ) {
          if (finalImageTimeout) clearTimeout(finalImageTimeout);
          finalImageTimeout = setTimeout(showFinalPortrait, 300);
        }
      }

      // Show the final image overlay
      function showFinalPortrait() {
        if (finalPortraitOverlay || isAnimationFinishing || !isComponentMounted)
          return;

        if (finalImageTimeout) {
          clearTimeout(finalImageTimeout);
          finalImageTimeout = null;
        }

        isAnimationFinishing = true;
        hasAnimationCompleted = true;
        setHasCompleted(true);

        // Create and fade in final image
        finalPortraitOverlay = portraitImage.clone();
        finalPortraitOverlay.visible = true;
        finalPortraitOverlay.opacity = 0;
        finalPortraitOverlay.sendToBack();
        finalPortraitOverlay.tweenTo(
          { opacity: 1 },
          {
            duration: 500,
            easing: "easeInOutQuad",
          }
        );

        // Fade out squares after image appears
        setTimeout(() => {
          if (!isComponentMounted) return;

          const squaresToFadeOut = Array.from(activeSquares);
          if (squaresToFadeOut.length > 0) {
            squaresToFadeOut.forEach((squareGroup) => {
              if (squareGroup && squareGroup.tweenTo) {
                squareGroup.tweenTo(
                  { opacity: 0 },
                  {
                    duration: 800,
                    easing: "easeInOutQuad",
                  }
                );
              }
            });

            // Clean up squares
            setTimeout(() => {
              if (!isComponentMounted) return;

              squaresToFadeOut.forEach((squareGroup) => {
                if (squareGroup && squareGroup.remove) squareGroup.remove();
              });
              activeSquares.clear();

              // Final cleanup
              paper.project.activeLayer.children.slice().forEach((child) => {
                if (child instanceof paper.Path.Rectangle) child.remove();
              });
            }, 800);
          }
        }, 200);
      }

      function startSquareAnimation() {
        if (!isComponentMounted) return;

        // Calculate dimensions - make it square
        const canvasSize = 800;
        const powerOfTwoSize = Math.pow(2, Math.floor(Math.log2(canvasSize)));
        const initialSquareSize = powerOfTwoSize; // Use full width for initial square

        // Calculate total squares
        let currentSquareSize = initialSquareSize;
        let splitLevel = 0;
        totalSquaresToCreate = 0;
        while (currentSquareSize >= MIN_SQUARE_SIZE * 2) {
          totalSquaresToCreate += Math.pow(4, splitLevel);
          currentSquareSize = currentSquareSize / 2; // Each square splits into 4 squares of half size
          splitLevel++;
        }

        // Setup view and portrait
        const portraitFitScale = Math.max(
          canvasSize / portraitImage.width,
          canvasSize / portraitImage.height
        );
        const finalScaleFactor = Math.min(
          (IMAGE_SCALE_BUFFER * powerOfTwoSize) / canvasSize,
          (IMAGE_SCALE_BUFFER * powerOfTwoSize) / canvasSize
        );

        paper.view.viewSize = new paper.Size(powerOfTwoSize, powerOfTwoSize);
        portraitImage.position = new paper.Point(
          powerOfTwoSize / 2,
          powerOfTwoSize / 2
        );
        portraitImage.scale(portraitFitScale * finalScaleFactor);

        // Temporarily make portrait visible to get average color, then hide it
        portraitImage.visible = true;
        const overallAverageColor = portraitImage.getAverageColor(
          paper.view.bounds
        );
        portraitImage.visible = false;

        // Create initial square
        const canvasCenter = paper.view.bounds.center;
        const initialSquareGroup = createRoundedSquare(
          canvasCenter,
          initialSquareSize,
          overallAverageColor
        );

        if (!initialSquareGroup) return;

        // Set initial state for animation
        initialSquareGroup.opacity = 0;

        // Initial animation
        initialSquareGroup.tweenTo(
          { opacity: 1 },
          {
            duration: INITIAL_SQUARE_ANIMATION_DURATION,
            easing: "easeInOutQuad",
          }
        );

        // Start splitting after initial animation
        setTimeout(() => {
          if (!isComponentMounted) return;

          scheduleSquareSplit(
            canvasCenter,
            initialSquareSize,
            initialSquareGroup
          );
          // Safety timeout
          finalImageTimeout = setTimeout(() => {
            if (!isComponentMounted) return;
            if (!finalPortraitOverlay && !isAnimationFinishing) {
              showFinalPortrait();
            }
          }, 10000);
        }, INITIAL_SQUARE_ANIMATION_DURATION);

        setIsLoaded(true);
      }

      // Cleanup function
      return () => {
        isComponentMounted = false;

        if (finalImageTimeout) {
          clearTimeout(finalImageTimeout);
        }

        // Force completion if animation is still running (user navigated away)
        if (!hasAnimationCompleted && !finalPortraitOverlay) {
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
  }, []);

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
    <div className="w-full h-full flex items-center justify-center">
      <canvas
        ref={canvasRef}
        id="paper-canvas"
        width={800}
        height={800}
        className="rounded-sm object-contain max-w-full max-h-full"
        style={{
          display: "block",
          background: "transparent",
        }}
      />
    </div>
  );
}

export default PaperCanvas;
