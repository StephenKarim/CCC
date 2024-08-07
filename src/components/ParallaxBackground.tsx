"use client"; // This directive ensures the component is only rendered on the client-side

import { useEffect, useRef } from "react";

const ParallaxBackground = ({ imageUrl }: { imageUrl: string }) => {
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (parallaxRef.current) {
        const scrollY = window.scrollY;
        parallaxRef.current.style.transform = `translateY(${scrollY * 0.0}px)`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      ref={parallaxRef}
      style={{
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed", // This helps on desktop
        height: "100vh",
        position: "absolute",
        top: "0",
        left: "0",
        width: "100%",
        zIndex: "-1",
      }}
    />
  );
};

export default ParallaxBackground;
