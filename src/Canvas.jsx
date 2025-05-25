import React, { useRef, useEffect } from 'react';
import Paper from 'paper';

const width = 512;

const Canvas = props => {

  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current;
    Paper.setup(canvas);
    Paper.view.viewSize = new Paper.Size(window.innerWidth, window.innerHeight);

    // * BEGIN CENTER CIRCLE + RASTER

    const centerCircle = new Paper.Path.Circle({
      center: Paper.view.center,
      radius: width / 2
    });

    const centerRaster = new Paper.Raster({
      source: 'peter0.jpg',
      position: centerCircle.position,
      onLoad: () => {
        const scaleFactor = width / centerRaster.width;
        centerRaster.scale(scaleFactor, scaleFactor);
      }
    });

    const centerCircleRasterGroup = new Paper.Group({
      children: [centerCircle, centerRaster],
      applyMatrix: false,
      clipped: true
    });

    // * END CENTER CIRCLE + RASTER


    // * BEGIN RIGHT CIRCLE + RASTER

    const rightCircle = new Paper.Path.Circle({
      center: Paper.view.center.add([width, 0]),
      radius: width / 4,
      fillColor: 'black',
      applyMatrix: false
    });

    const rightRaster = new Paper.Raster({
      source: 'amongus-bg.jpg',
      position: rightCircle.position,
      onLoad: () => {
        const scaleFactor = width * 3.1 / rightRaster.width;
        rightRaster.scale(scaleFactor, scaleFactor)
      }
    });

    const rightCircleRasterGroup = new Paper.Group({
      children: [rightCircle, rightRaster],
      applyMatrix: false,
      clipped: true
    });

    // * END RIGHT CIRCLE + RASTER

    const triggerLayer = new Paper.Layer();

    const duration = 500;

    const rightCircleTrigger = new Paper.Path.Circle({
      center: Paper.view.center.add([width, 0]),
      radius: width / 4,
      fillColor: 'red',
      applyMatrix: false,
      onMouseEnter: () => {
        rightCircleTrigger.tween(
          { opacity: 1 },
          { opacity: 0 },
          {
            duration: duration,
            easing: 'easeInOutQuad'
          }
        );
        rightCircle.tween(
          { scaling: 1 },
          { scaling: 6.1 },
          {
            duration: duration,
            easing: 'easeInOutQuad',
            onComplete: () => {
              console.log('tween done');
            }
          }
        );
        centerCircleRasterGroup.tween(
          { rotation: 0, scaling: 1, opacity: 1, position: Paper.view.center },
          { rotation: 360, scaling: 0.001, opacity: 0, position: rightCircle.position },
          {
            duration: duration,
            easing: 'easeInOutQuad',
          }
        );
      },
      onMouseLeave: () => {
        rightCircleTrigger.tween(
          { opacity: 0 },
          { opacity: 1 },
          {
            duration: duration,
            easing: 'easeInOutQuad'
          }
        );
        rightCircle.tween(
          { scaling: 6.1 },
          { scaling: 1 },
          {
            duration: duration,
            easing: 'easeInOutQuad'
          }
        );
        centerCircleRasterGroup.tween(
          { rotation: 0, scaling: 0.001, opacity: 0, position: rightCircle.position },
          { rotation: -360, scaling: 1, opacity: 1, position: Paper.view.center },
          {
            duration: duration,
            easing: 'easeInOutQuad'
          }
        );
      },
      parent: triggerLayer
    });

    centerCircleRasterGroup.bringToFront();
    triggerLayer.bringToFront();

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