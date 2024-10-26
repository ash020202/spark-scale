// components/SideBar.jsx
import React from "react";

const SideBar = ({ isOpen, onClose, nodeData }) => {
  if (!isOpen) return null; // Don't render if sidebar is closed

  const { title, description, links } = nodeData;

  return (
    <div className="fixed right-0 top-0 h-[100dvh] w-full flex justify-end bg-gray-900 bg-opacity-50 backdrop-blur-sm box-shadow z-20 fade-in">
      <div className="slide-in h-[100dvh] w-[500px] bg-white p-4 z-20">
        <svg
          onClick={onClose}
          className="w-[30px] h-[30px] p-[5px] absolute top-2 right-2 text-3xl"
          id="Layer_1"
          version="1.1"
          viewBox="0 0 512 512"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M437.5,386.6L306.9,256l130.6-130.6c14.1-14.1,14.1-36.8,0-50.9c-14.1-14.1-36.8-14.1-50.9,0L256,205.1L125.4,74.5  c-14.1-14.1-36.8-14.1-50.9,0c-14.1,14.1-14.1,36.8,0,50.9L205.1,256L74.5,386.6c-14.1,14.1-14.1,36.8,0,50.9  c14.1,14.1,36.8,14.1,50.9,0L256,306.9l130.6,130.6c14.1,14.1,36.8,14.1,50.9,0C451.5,423.4,451.5,400.6,437.5,386.6z" />
        </svg>

        <h2 className="text-2xl font-bold mb-4">{title}</h2>

        <h3 className="text-xl font-semibold mb-2">Description</h3>
        <p className="text-gray-700 mb-4 text-justify">{description}</p>

        <h3 className="text-xl font-semibold mb-2">Useful Links</h3>
        {links && links.length > 0 ? (
          <ul className="list-disc px-3">
            <li className="">
              <a
                href={links}
                target="_blank"
                className="text-blue-500 text-justify"
                rel="noopener noreferrer"
              >
                {links}
              </a>
            </li>
          </ul>
        ) : (
          <p>No links available</p>
        )}
      </div>
    </div>
  );
};

export default SideBar;
