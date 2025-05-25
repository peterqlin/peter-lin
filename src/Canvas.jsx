import React, { useRef, useEffect } from 'react';
import Paper from 'paper';

const Canvas = props => {

  const canvasRef = useRef(null)

  const setupBalls = (center, boundaryRadius, ballData) => {
    const boundary = new Paper.Shape.Circle(center, boundaryRadius);
    const visibleBoundary = new Paper.Shape.Circle(center, boundaryRadius / 2);
    visibleBoundary.fillColor = 'black';
    const numBalls = ballData.length;
    const angleOffset = Math.random() * 360;
    const angleDelta = 360 / numBalls;
    const balls = Array.from({ length: numBalls }, (_, i) => {
      const radius = Math.random() * 10 + boundaryRadius / 3;
      const speed = Math.random() * 5 + 5;
      const launchAngle = angleOffset + i * angleDelta;
      const ball = new Paper.Shape.Circle({
        position: center,
        radius: radius,
        opacity: 0,
        fillColor: new Paper.Color(Math.random(), Math.random(), Math.random()),
        velocity: new Paper.Point(speed * Math.cos((launchAngle * Math.PI) / 180), speed * Math.sin((launchAngle * Math.PI) / 180)),
        mass: radius
      });
      return ball;
    });

    const ballGroup = new Paper.Group({
      children: [boundary, visibleBoundary, ...balls],
      clipped: true
    });

    return ballGroup;
  }

  let counts = Array.from({ length: 5 }, () => 0);

  const animateBalls = (index, isActive, balls, boundary) => {
    if (isActive) {
      for (let i = 0; i < balls.length; i++) {
        let ball = balls[i];

        ball.opacity = 1;
        ball.position = ball.position.add(ball.velocity.multiply(Math.exp(-counts[index] / 300)));
        counts[index]++;

        if (boundary.position.getDistance(ball.position, true) >= Math.pow(boundary.radius - ball.radius, 2)) {
          let collisionNormal = ball.position.subtract(boundary.position).normalize();
          let collisionPoint = boundary.position.add(collisionNormal.multiply(boundary.radius));
          ball.position = collisionPoint.subtract(collisionNormal.multiply(ball.radius));
          let dotProduct = ball.velocity.dot(collisionNormal);
          if (dotProduct > 0) {
            const restitution = 0.8;
            ball.velocity = ball.velocity.subtract(collisionNormal.multiply(2 * dotProduct * restitution));
          }
        }

        for (let j = i + 1; j < balls.length; j++) {
          let otherBall = balls[j];
          let distance = ball.position.getDistance(otherBall.position);

          if (distance < ball.radius + otherBall.radius) {
            let collisionNormal = otherBall.position.subtract(ball.position).normalize();
            let relativeVelocity = otherBall.velocity.subtract(ball.velocity);
            let velocityAlongNormal = relativeVelocity.dot(collisionNormal);
            if (velocityAlongNormal > 0) continue;
            let restitution = 0.8;
            let impulse = (-(1 + restitution) * velocityAlongNormal) / (1 / ball.mass + 1 / otherBall.mass);
            let impulseVector = collisionNormal.multiply(impulse);
            ball.velocity = ball.velocity.subtract(impulseVector.multiply(1 / ball.mass));
            otherBall.velocity = otherBall.velocity.add(impulseVector.multiply(1 / otherBall.mass));
            let overlap = ball.radius + otherBall.radius - distance;
            let separationVector = collisionNormal.multiply(overlap * 0.5);
            ball.position = ball.position.subtract(separationVector);
            otherBall.position = otherBall.position.add(separationVector);
          }
        }
      }
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    Paper.setup(canvas);
    Paper.view.viewSize = new Paper.Size(window.innerWidth, window.innerHeight * 5);

    const offset = 300;

    const data = [[1, 2, 3], [1, 2, 3, 4, 5], [1, 2, 3, 4], [1, 2, 3], [1, 2, 3, 4]];
    let active = Array.from(data, () => false);
    const ballGroups = Array.from(data, (_, i) => {
      return setupBalls(new Paper.Point(i % 2 == 0 ? (offset * 1.2) : Paper.view.viewSize.width - (offset * 1.2), offset * 1.2 * (i + 1)), offset, data[i]);
    });

    Array.from(ballGroups, (group, i) => {
      const currentVisibleBoundary = group.children[1];
      group.onMouseDown = () => {
        active[i] = true;
        currentVisibleBoundary.tween(
          { scaling: currentVisibleBoundary.scaling },
          { scaling: 2 },
          {
            duration: 300,
            easing: 'easeInOutQuad'
          }
        );
        setTimeout(() => {
          active[i] = false;
        }, 5000);
      };
    })

    Paper.view.onFrame = () => {
      // TODO: make sure slice correctly separates children
      for (let i = 0; i < data.length; i++) {
        animateBalls(i, active[i], ballGroups[i].children.slice(2), ballGroups[i].children[0], counts[i]);
      }
    };

    return () => {

    }

  }, []);

  return <canvas
    ref={canvasRef}
    style={{
      display: "block",
      // * this somehow fixes centering issues
      border: '1px solid transparent'
    }}
    id="canvas"
    {...props}
  />
}

export default Canvas;