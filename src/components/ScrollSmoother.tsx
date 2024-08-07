'use client'

// components/ScrollSmoother.tsx
import { useEffect } from 'react';
import gsap from 'gsap';
import ScrollSmoother from 'gsap/ScrollSmoother';

gsap.registerPlugin(ScrollSmoother);

const ScrollSmootherComponent: React.FC = () => {
  useEffect(() => {
    ScrollSmoother.create({
      smooth: 1.5, // Adjust the smoothing effect
      effects: true,
    });

    return () => {
      ScrollSmoother.get().destroy(); // Clean up on component unmount
    };
  }, []);

  return null; // This component doesn't render anything itself
};

export default ScrollSmootherComponent;
