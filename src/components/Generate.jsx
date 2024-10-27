import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const Generate = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  const handleGenerate = () => {
    if (title && description) {
      // Navigate to the roadmap with title and description passed via state
      navigate("/roadmap", { state: { title, description } });
    } else {
      alert("Please fill in both the title and description.");
    }
  };
  return (
    <div className="border bg-black  border-gray-800 z-10 p-4 rounded-md flex-column gap-2 box-shadow fade-in duration-[1.5s] ">
      <div>
        <p className="text-[18px] md:text-2xl font-semibold text-white">
          Generate Your Business Roadmap
        </p>
        <p className="text-sm text-gray-500">
          Enter your Business idea to get a customized roadmap
        </p>
      </div>

      <div className="flex-column justify-center items-start text-white">
        <label htmlFor="idea">Business Idea</label>
        <input
          type="text"
          name=""
          id="idea"
          className="w-full bg-transparent border border-gray-800 rounded-sm p-2 mb-2"
          placeholder="Enter your Business Idea"
          required
          autoComplete="off"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor="desc">Description</label>
        <textarea
          name=""
          id="desc"
          className="p-3 w-full bg-transparent border border-gray-800 rounded-sm"
          placeholder="Enter your Business Idea"
          required
          resize="none"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <button
        onClick={handleGenerate}
        className="bg-white rounded-md p-2 text-black"
      >
        Generate Roadmap
      </button>
    </div>
  );
};

export default Generate;
