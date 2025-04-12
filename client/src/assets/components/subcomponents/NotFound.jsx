// src/pages/NotFound.jsx
import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4 bg-base-200">
      <h1 className="text-6xl font-bold text-error mb-4">404</h1>
      <p className="text-xl text-base-content mb-6"> Page not found.</p>
      <Link
        to="/"
        className="btn btn-primary"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
