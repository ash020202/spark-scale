import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 20, opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="text-gray-400 text-[14px] font-bold text-justify uppercase"
        >
          {messages[currentIndex]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Loader;
