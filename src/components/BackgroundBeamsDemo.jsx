"use client";
import React, { useEffect } from "react";
import { BackgroundBeams } from "./BackgroundBeams";
import Generate from "./Generate";
import { useNavigate } from "react-router-dom";

export function BackgroundBeamsDemo() {
  const navigate = useNavigate();
  useEffect(() => {
    if (
      window.localStorage.getItem("nodes") &&
      window.localStorage.getItem("nodes") != "[]" &&
      window.localStorage.getItem("edges") &&
      window.localStorage.getItem("edges") != "[]"
    ) {
      navigate("/roadmap");
    }
  }, []);
  return (
    <div className="h-[100dvh] w-full p-4 rounded-md bg-neutral-950 relative flex flex-col items-center justify-center antialiased">
      <p className="md:text-4xl text-3xl font-bold capitalize mb-6 z-20 text-white fade-in-delay">
        SparkScale
      </p>
      <p className="md:text-4xl text-3xl font-bold z-20 text-center capitalize mb-2 text-white fade-in-delay-2">
        Spark Your Idea. Scale Your Business.
      </p>
      <Generate />
      <BackgroundBeams />
    </div>
  );
}
