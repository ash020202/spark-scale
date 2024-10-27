import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "./App.css";
import { BackgroundBeamsDemo } from "./components/BackgroundBeamsDemo";
import RoadmapWithDagreLayout from "./components/RoadmapWithDagreLayout.jsx";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BackgroundBeamsDemo />} />
        <Route path="/roadmap" element={<RoadmapWithDagreLayout />} />
      </Routes>
    </Router>
  );
}

export default App;
