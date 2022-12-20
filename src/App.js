import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import Podcast from "./pages/Podcast";
import SinglePodcast from "./pages/SinglePodcast";
function App() {
  return (
    <Router>
      <Navbar />
      <main>
        <Routes>
          {["podcasts", "/"].map((path, index) => (
            <Route path={path} element={<Podcast />} key={index} />
          ))}
          <Route path="/podcast/:id" element={<SinglePodcast />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
