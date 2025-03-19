import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import WellcomePage from "./pages/WellcomePage";
import DeveloperPage from "./pages/DevelopersPage";

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 p-4">
        <Routes>
          <Route path="/" element={<WellcomePage />} />
          <Route path="/developers" element={<DeveloperPage />} />
          {/* <Route path="/project" element={<ProjectPage />} /> */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
