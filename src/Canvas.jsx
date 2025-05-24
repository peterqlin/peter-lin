import React, { useRef, useEffect } from 'react';
import Paper from 'paper';

const [viewWidth, viewHeight] = [1528, 708];
const width = 512;

const Canvas = props => {

  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current;
    Paper.setup(canvas);
    Paper.view.viewSize = new Paper.Size(width, width);

    const center = Paper.view.center;
    var from = new Paper.Point(20, 20);
    var to = new Paper.Point(80, 80);
    var line1 = new Paper.Path.Line(from, center);
    line1.strokeColor = 'white';
    line1.strokeWidth = 10;

    // Your red circle
    new Paper.Path.Circle(center, 50).fillColor = 'red';
  }, []);

  return <canvas
    ref={canvasRef}
    width={width}
    height={width}
    style={{
      display: 'block',
      background: 'black'
    }}
    id="canvas"
    {...props}
  />
}

export default Canvas;