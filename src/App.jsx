import Canvas from './Canvas';
import './App.css';

function App() {
  const data1 = {
    count: 5,
    images: ['peter0.jpg', 'peter1.jpg', 'peter2.jpg', 'peter3.jpg', 'peter4.jpg']
  };
  const data2 = {
    count: 0,
    images: []
  };
  return (
    <div id="canvas-container">
      <Canvas id={1} data={data1} />
      <Canvas id={2} data={data2} />
    </div>
  );
}

export default App;