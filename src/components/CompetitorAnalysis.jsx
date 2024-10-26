import React from "react";
import { useLocation } from "react-router-dom";

const CompetitorAnalysis = ({ isOpen, setIsOpen }) => {
  // Safely get 'analysis' data from localStorage with fallback to an empty object
  const analysis = JSON.parse(window.localStorage.getItem("analysis")) || "{}";

  // Fallback structure for analysis if it's not in the correct format
  const {
    successRate = 0,
    uniquenessScore = 0,
    competitors = [],
    strategies = [],
  } = analysis;

  const location = useLocation();
  const { title, description } = location.state || {
    title: "",
    description: "",
  };

  // Store title and description in local storage
  window.localStorage.setItem("title", title);
  window.localStorage.setItem("description", description);

  const titleData = window.localStorage.getItem("title") || "";
  const descriptionData = window.localStorage.getItem("description") || "";

  function handleCardClick() {
    setIsOpen(!isOpen);
  }

  return (
    <div
      className={`h-full md:w-[500px] md:right-[10px] top-1 absolute ${
        isOpen ? "block slide-in" : "hidden transition duration-300"
      } z-30 bg-white transition-all duration-300`}
    >
      <header className="bg-white p-[10px] sticky top-0 md:static flex items-center justify-between border box-shadow rounded-md">
        <span className="text-[18px] font-bold">Competitor Analysis</span>
        <svg
          onClick={handleCardClick}
          className="w-[30px] h-[30px] p-[5px]"
          id="Layer_1"
          version="1.1"
          viewBox="0 0 512 512"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M437.5,386.6L306.9,256l130.6-130.6c14.1-14.1,14.1-36.8,0-50.9c-14.1-14.1-36.8-14.1-50.9,0L256,205.1L125.4,74.5  c-14.1-14.1-36.8-14.1-50.9,0c-14.1,14.1-14.1,36.8,0,50.9L205.1,256L74.5,386.6c-14.1,14.1-14.1,36.8,0,50.9  c14.1,14.1,36.8,14.1,50.9,0L256,306.9l130.6,130.6c14.1,14.1,36.8,14.1,50.9,0C451.5,423.4,451.5,400.6,437.5,386.6z" />
        </svg>
      </header>
      <div className="p-[20px] md:h-[450px] bg-white overflow-y-scroll border rounded-md border-gray-300">
        {/* Title and Description */}
        <div className="mb-4">
          <label className="text-sm font-semibold">Business Title</label>
          <p className="text-2xl capitalize font-bold mt-1">{titleData}</p>
          <label className="text-sm font-semibold">Business Description</label>
          <p className="text-2xl capitalize font-bold max-w-[350px] text-ellipsis overflow-hidden whitespace-nowrap mt-1">
            {descriptionData}
          </p>
        </div>
        {/* Success Rate */}
        <div className="mb-4">
          <label className="text-sm font-semibold">Success Rate</label>
          <div className="w-full bg-gray-200 h-2 rounded mt-1">
            <div
              className="bg-blue-500 h-2 rounded"
              style={{ width: `${successRate}%` }}
            ></div>
          </div>
          <p className="text-sm mt-1">{successRate}% chance of success</p>
        </div>
        {/* Uniqueness Score */}
        <div className="mb-4">
          <label className="text-sm font-semibold">Uniqueness Score</label>
          <div className="w-full bg-gray-200 h-2 rounded mt-1">
            <div
              className="bg-green-500 h-2 rounded"
              style={{ width: `${uniquenessScore}%` }}
            ></div>
          </div>
          <p className="text-sm mt-1">{uniquenessScore}% unique</p>
        </div>
        {/* Existing Competitors */}
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Existing Competitors</h3>
          <ul className="space-y-3 gap-[5px] border-2 border-gray-300 rounded p-2">
            {competitors.map((competitor, index) => (
              <li key={index} className="flex justify-between">
                <span>{competitor.name}</span>
                <span
                  className={`text-sm font-medium px-2 rounded ${
                    competitor.strength === "High"
                      ? "bg-red-100 text-red-600"
                      : competitor.strength === "Medium"
                      ? "bg-yellow-100 text-yellow-600"
                      : "bg-green-100 text-green-600"
                  }`}
                >
                  {competitor.strength}
                </span>
              </li>
            ))}
          </ul>
        </div>
        {/* Strategies for Success */}
        <div>
          <h3 className="font-semibold mb-2">Strategies for Success</h3>
          <ul className="list-disc list-inside space-y-3 border-2 border-gray-300 rounded p-4 text-justify">
            {strategies.map((strategy, index) => (
              <li key={index}>{strategy}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CompetitorAnalysis;
