"use client";
import React, { useEffect } from "react";
import { FaCross } from "react-icons/fa"; // Importing the cross icon from react-icons

const CustomCursor: React.FC = () => {
  useEffect(() => {
    const cursor = document.querySelector(".custom-cursor") as HTMLDivElement;

    const moveCursor = (e: MouseEvent) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    };

    document.addEventListener("mousemove", moveCursor);

    return () => {
      document.removeEventListener("mousemove", moveCursor);
    };
  }, []);

  return (
    <div className="custom-cursor pointer-events-none fixed left-0 top-0 z-[9999] flex animate-pulse items-center justify-center text-black">
      <FaCross className="text-4xl" />
    </div>
  );
};

export default CustomCursor;
