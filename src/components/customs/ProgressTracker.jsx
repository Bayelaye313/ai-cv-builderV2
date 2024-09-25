import React from "react";

const ProgressTracker = ({ steps, currentStep }) => {
  return (
    <div className="flex items-center justify-between w-full max-w-xl mb-15 ">
      {steps.map((stepName, index) => (
        <div key={index} className="flex items-center">
          {/* Rectangle for each step */}
          <div
            className={`px-5 py-2 rounded-lg border-2 text-sm font-semibold ${
              index + 1 <= currentStep
                ? "bg-primary text-white border-white"
                : "bg-gray-300 text-gray-700 border-gray-300"
            }`}
          >
            {stepName}
          </div>
          {/* Line connecting the rectangles */}
          {index !== steps.length - 1 && (
            <div
              className={`h-1 w-8 mx-2 ${
                index + 1 < currentStep ? "bg-primary " : "bg-gray-300"
              }`}
            ></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProgressTracker;
