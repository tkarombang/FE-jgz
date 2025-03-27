import React from "react";
import { Link } from "react-router-dom";

const WellcomePage: React.FC = () => {
  return (
    <div className="text-center">
      <h1 className="text-3x1 font-bold mb-4">Wellcome to The App</h1>
      <div className="space-x-4">
        <Link to="/developers" className="px-4 py-2 bg-emerald-600 text-white rounded">
          Developers
        </Link>
        <Link to="/project" className="px-4 py-2 bg-emerald-600 text-white rounded">
          Projects
        </Link>
      </div>
    </div>
  );
};

export default WellcomePage;
