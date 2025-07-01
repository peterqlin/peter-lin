import React, { useRef, useEffect, useState } from "react";

const AnimatedText = ({ text, className = "" }) => {
  const textRef = useRef(null);
  const [letterPositions, setLetterPositions] = useState([]);
  const [isReady, setIsReady] = useState(false);
  const [letterSpacing, setLetterSpacing] = useState("normal");

  useEffect(() => {
    if (!textRef.current) return;

    // Get the computed letter-spacing
    const computedStyle = window.getComputedStyle(textRef.current);
    setLetterSpacing(computedStyle.letterSpacing);

    // Create a temporary span to measure text
    const tempSpan = document.createElement("span");
    tempSpan.style.font = computedStyle.font;
    tempSpan.style.letterSpacing = computedStyle.letterSpacing;
    tempSpan.style.visibility = "hidden";
    tempSpan.style.position = "absolute";
    tempSpan.style.whiteSpace = "pre";
    document.body.appendChild(tempSpan);

    const lines = text.split("\n");
    const positions = [];
    let letterIndex = 1;

    lines.forEach((line, lineIndex) => {
      let currentX = 0;
      const lineLetters = [];

      line.split("").forEach((letter, charIndex) => {
        if (letter === " ") {
          tempSpan.textContent = " ";
          const spaceWidth = tempSpan.getBoundingClientRect().width;
          lineLetters.push({
            letter: " ",
            x: currentX,
            letterIndex: letterIndex++,
            lineIndex,
          });
          currentX += spaceWidth;
        } else {
          tempSpan.textContent = letter;
          const letterWidth = tempSpan.getBoundingClientRect().width;
          lineLetters.push({
            letter,
            x: currentX,
            letterIndex: letterIndex++,
            lineIndex,
          });
          currentX += letterWidth;
        }
      });

      positions.push(...lineLetters);
    });

    document.body.removeChild(tempSpan);
    setLetterPositions(positions);
    setIsReady(true);
  }, [text]);

  if (!isReady) {
    return (
      <div
        ref={textRef}
        className={className}
        style={{ visibility: "hidden", position: "absolute" }}
      >
        {text}
      </div>
    );
  }

  return (
    <svg
      className={`animated-text ${className}`}
      style={{ overflow: "visible" }}
    >
      {letterPositions.map(({ letter, x, letterIndex, lineIndex }) => (
        <text
          key={`${lineIndex}-${letterIndex}`}
          x={x * 4.7}
          y={lineIndex * 1.2 + "em"}
          className={`letter letter-${letterIndex}`}
          style={{ letterSpacing: letterSpacing }}
        >
          {letter === " " ? "\u00A0" : letter}
        </text>
      ))}
    </svg>
  );
};

export default AnimatedText;
