import Restaurants from "./components/Restaurants";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Collections from "./components/Collections";
import Navbar from "./components/Navbar";
import "./App.css";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Restaurants />} />
        <Route path="/restaurants" element={<Restaurants />} />
        <Route path="/collections" element={<Collections />} />
      </Routes>
    </Router>
  );
}

export default App;
