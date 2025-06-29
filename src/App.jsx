import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import About from "./components/About";
import Projects from "./components/Projects";
import Reading from "./components/Reading";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Header />

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/reading" element={<Reading />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
