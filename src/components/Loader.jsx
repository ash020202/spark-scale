import React, { useEffect, useState } from "react";

const Loader = () => {
  const messages = [
    "Igniting your brilliant idea... 💡",
    "Calculating awesomeness quotient... 🚀",
    "Sprinkling innovation dust... ✨",
    "Revving up the idea engine... 🏎️",
    "Polishing your entrepreneurial crown... 👑",
    "Unleashing creative chaos... 🌪️",
    "Brewing a potion of success... 🧪",
    "Decoding your million-dollar vision... 💰",
    "Assembling your dream team... 🦸‍♀️🦸‍♂️",
    "Fueling rockets with your ambition... 🚀",
    "Harnessing unicorn magic... 🦄",
    "Calibrating disruptive potential... 💥",
    "Amplifying your genius wavelength... 📡",
  ];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col justify-center items-center h-screen space-y-14">
      <div className="loader"></div>

      <div
        key={currentIndex}
        className="text-gray-400 text-[14px] font-bold text-justify uppercase animate"
      >
        {messages[currentIndex]}
      </div>
    </div>
  );
};

export default Loader;
