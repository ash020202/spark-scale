import React from "react";

const ErrorComponent = ({ message, onRetry }) => (
  <div className="flex flex-col items-center justify-center h-screen bg-black">
    <h1 className="text-3xl font-bold uppercase text-red-500 mb-4">Error !!</h1>
    <p className="text-lg mb-6 text-center capitalize font-semibold text-white">
      {message}
    </p>
    <button className="px-4 py-2 bg-white text-black rounded" onClick={onRetry}>
      Try Again
    </button>
  </div>
);

export default ErrorComponent;
