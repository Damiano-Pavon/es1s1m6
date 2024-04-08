import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import MainContent from "./components/homepage/MainContent";
import Success from "./pages/Success";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/success" element={<Success />} />
        <Route path="/home" element={<MainContent />} />
      </Routes>
    </Router>
  );
}

export default App;
