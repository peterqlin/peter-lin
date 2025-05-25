import Canvas from './Canvas';
import './App.css';

function App() {
  const data1 = {
    count: 3,
    images: ['img_src1', 'img_src2', 'img_src3']
  };
  const data2 = {
    count: 5,
    images: ['img_src1', 'img_src2', 'img_src3', 'img_src4', 'img_src5']
  };
  return (
    <div id="canvas-container">
      <Canvas id={1} data={data1} />
      <Canvas id={2} data={data2} />
    </div>
  );
}

export default App;