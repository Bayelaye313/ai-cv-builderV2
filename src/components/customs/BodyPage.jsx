import React from "react";
import { Link } from "react-router-dom";

function BodyPage() {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center py-20 ">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-primary mb-4 animate-slidein300">
          Welcome to the AI Resume Builder
        </h1>
        <p className="text-lg text-gray-600 mb-8 animate-slidein500">
          Build a professional resume with ease using our intelligent resume
          builder powered by AI. Whether you're just starting or looking to
          improve your current resume, we've got you covered!
        </p>
        <Link to="/dashboard">
          <button className="bg-primary text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-700 transition animate-slidein700">
            Get Started__It's Free
          </button>
        </Link>
      </div>
    </div>
  );
}

export default BodyPage;
