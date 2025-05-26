import { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router';
import Paper from 'paper';
import './Canvas.css';
import { setupBalls, animateBalls } from './utils';

const Canvas = props => {
  const canvasRef = useRef(null);
  const navigate = useNavigate();
  const pages = ['about', 'projects'];

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

    for (let i = 0; i < balls.length; i++) {
      const ball = balls[i];
      const text = ball.children[2];
      text.content = 'hello world';
      text.position = text.position.subtract(new Paper.Point(text.bounds.width / 2, 0));
      text.scaling = 0.01;
      ball.onClick = () => {
        navigate(pages[i]);
      };
      ball.onMouseEnter = () => {
        text.tween(
          { scaling: text.scaling },
          { scaling: 1 },
          {
            duration: 300,
            easing: 'easeInOutQuad'
          }
        );
      };
      ball.onMouseLeave = () => {
        text.tween(
          { scaling: text.scaling },
          { scaling: 0.01 },
          {
            duration: 300,
            easing: 'easeInOutQuad'
          }
        );
      };
    }

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