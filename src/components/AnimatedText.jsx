import React from "react";

const AnimatedText = ({ text, className = "" }) => {
  // Character-specific spacing map (in pixels)
  const charSpacing = {
    // Uppercase letters
    H: 60,
    I: 20,
    P: 45,
    E: 50,
    T: 45,
    R: 50,
    L: 40,
    N: 55,
    // Lowercase letters
    h: 45,
    i: 20,
    p: 45,
    e: 45,
    t: 25,
    r: 35,
    l: 25,
    n: 40,
    // Special characters
    ",": 25,
    "'": 20,
    " ": 20,
    // Default for any other characters
    default: 45,
  };

  // Function to get spacing for a character
  const getCharSpacing = (char) => {
    return charSpacing[char] || charSpacing["default"];
  };

  // Split text into lines first, then characters
  const lines = text.split("\n");
  const characters = [];
  let globalIndex = 1;
  let maxWidth = 0;
  const lineHeights = [];

  lines.forEach((line, lineIndex) => {
    let currentX = 0;
    line.split("").forEach((char, charIndex) => {
      characters.push({
        char: char === " " ? "\u00A0" : char,
        index: globalIndex++,
        lineIndex,
        x: currentX,
      });

      // Use custom spacing for this character
      currentX += getCharSpacing(char);
    });

    // Track the width of each line
    lineHeights.push(currentX);
    maxWidth = Math.max(maxWidth, currentX);
  });

  // Calculate SVG dimensions
  const lineHeight = 1.2; // em units
  const totalHeight = lines.length * lineHeight;
  const fontSize = 72; // 4.5rem = 72px (assuming 16px base)
  const emToPx = fontSize; // 1em = fontSize in pixels

  // Convert em dimensions to pixels for viewBox
  const svgWidth = maxWidth;
  const svgHeight = totalHeight * emToPx;

  // Calculate vertical positioning to center the entire text block
  // Start from the top of the first line and center the whole block
  const startY = lineHeight; // Start at the first line position

  return (
    <svg
      className={`animated-text ${className}`}
      style={{
        overflow: "visible",
        userSelect: "none",
        WebkitUserSelect: "none",
        MozUserSelect: "none",
        msUserSelect: "none",
      }}
      viewBox={`0 0 ${svgWidth} ${svgHeight}`}
    >
      {characters.map(({ char, index, lineIndex, x }) => (
        <text
          key={index}
          x={x}
          y={startY + lineIndex * lineHeight + "em"}
          className={`letter letter-${index}`}
        >
          {char}
        </text>
      ))}
    </svg>
  );
};

export default AnimatedText;
