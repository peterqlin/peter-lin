import React, { useRef, useEffect } from 'react';
import Paper from 'paper';
import './Canvas.css';
import { setupBalls, animateBalls } from './utils';

const Canvas = props => {
  const canvasRef = useRef(null);

  useEffect(() => {
    Paper.setup(canvasRef.current);

    const width = 600;
    const radius = width / 2;
    Paper.view.viewSize = new Paper.Size(width, width);

    const data = props.data;
    let isActive = false;
    let clicked = false;
    const ballGroup = setupBalls(Paper.view.bounds.center, radius, data);
    const boundary = ballGroup.children[0];
    const visibleBoundary = ballGroup.children[1];
    const balls = ballGroup.children.slice(2);

    ballGroup.onMouseDown = () => {
      if (!clicked) {
        clicked = true;
        isActive = true;
        visibleBoundary.tween(
          { scaling: visibleBoundary.scaling },
          { scaling: 2 },
          {
            duration: 300,
            easing: 'easeInOutQuad'
          }
        );
        setTimeout(() => {
          isActive = false;
        }, 20000);
      }
    };

    Paper.view.onFrame = () => {
      animateBalls(isActive, balls, boundary);
    };

    return () => {
      Paper.project.clear();
    }

  }, []);

  return <canvas ref={canvasRef} id={`canvas${props.id}`} />
}

export default Canvas;