import Paper from 'paper';

export const setupBalls = (center, boundaryRadius, data) => {
  const boundary = new Paper.Shape.Circle(center, boundaryRadius);
  const visibleBoundary = new Paper.Shape.Circle(center, boundaryRadius / 2);
  visibleBoundary.fillColor = new Paper.Color(0.5, 0.5, 0.5, 0.5);
  const angleOffset = Math.random() * 360;
  const angleDelta = 360 / data.count;

  const balls = Array.from({ length: data.count }, (_, i) => {
    const radius = Math.random() * 50 + boundaryRadius / 5;
    const speed = Math.random() * 5 + 5;
    const launchAngle = angleOffset + i * angleDelta;
    const raster = new Paper.Raster({
      source: data.images[i],
      position: center,
    });
    raster.onLoad = () => {
      raster.scaling = radius * 2 / raster.width;
    };
    const ball = new Paper.Group({
      children: [new Paper.Shape.Circle(center, radius), raster],
      clipped: true,
      radius: radius,
      opacity: 0,
      velocity: new Paper.Point(speed * Math.cos((launchAngle * Math.PI) / 180), speed * Math.sin((launchAngle * Math.PI) / 180)),
      mass: radius,
      applyMatrix: false,
      onMouseEnter: () => {
        ball.tween(
          { scaling: ball.scaling },
          { scaling: 1.2 },
          {
            duration: 300,
            easing: "easeInOutQuad"
          }
        );
      },
      onMouseLeave: () => {
        ball.tween(
          { scaling: ball.scaling },
          { scaling: 1 },
          {
            duration: 300,
            easing: "easeInOutQuad"
          }
        );
      }
    });
    return ball;
  });

  const ballGroup = new Paper.Group({
    children: [boundary, visibleBoundary, ...balls],
    clipped: true
  });

  return ballGroup;
}

export const animateBalls = (isActive, balls, boundary) => {
  if (isActive) {
    for (let i = 0; i < balls.length; i++) {
      let ball = balls[i];

      ball.opacity = 1;
      ball.position = ball.position.add(ball.velocity);

      // * circular boundary collision check
      if (boundary.position.getDistance(ball.position, true) >= Math.pow(boundary.radius - ball.radius, 2)) {
        let collisionNormal = ball.position.subtract(boundary.position).normalize();
        let collisionPoint = boundary.position.add(collisionNormal.multiply(boundary.radius));
        ball.position = collisionPoint.subtract(collisionNormal.multiply(ball.radius));
        let dotProduct = ball.velocity.dot(collisionNormal);
        if (dotProduct > 0) {
          const restitution = 0.85;
          ball.velocity = ball.velocity.subtract(collisionNormal.multiply(2 * dotProduct * restitution));
        }
      }

      // * screen boundary collision check
      if (ball.position.x - ball.radius < 0 || ball.position.x + ball.radius > Paper.view.size.width) {
        ball.velocity.x *= -1;
      }
      if (ball.position.y - ball.radius < 0 || ball.position.y + ball.radius > Paper.view.size.height) {
        ball.velocity.y *= -1;
      }


      // * ball collision check
      for (let j = i + 1; j < balls.length; j++) {
        let otherBall = balls[j];
        let distance = ball.position.getDistance(otherBall.position);

        if (distance < ball.radius + otherBall.radius) {
          let collisionNormal = otherBall.position.subtract(ball.position).normalize();
          let relativeVelocity = otherBall.velocity.subtract(ball.velocity);
          let velocityAlongNormal = relativeVelocity.dot(collisionNormal);
          if (velocityAlongNormal > 0) continue;
          let restitution = 0.85;
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