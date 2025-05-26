import Canvas from './Canvas';
import './Home.css';

const Home = () => {
  const data1 = {
    count: 2,
    images: ['peter0.jpg', 'peter1.jpg'],
    pages: ['about', 'projects'],
  };
  return (
    <div id="canvas-container">
      <Canvas id={1} data={data1} />
    </div>
  )
}

export default Home