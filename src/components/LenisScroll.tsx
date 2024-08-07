'use client'
// components/LenisScroll.tsx
import { useEffect } from 'react';
import Lenis, { LenisOptions } from '@studio-freight/lenis';

const LenisScroll: React.FC = () => {
  useEffect(() => {
    // Configuration options for Lenis
    const lenisOptions: LenisOptions = {
      duration: 1.2,  // Duration of the scroll animation
      easing: (t: number) => t,  // Easing function for the scroll animation
      lerp: 0.1,  // Linear interpolation factor
      smoothWheel: true,  // Smooth scrolling for the wheel
      syncTouch: true,  // Sync touch scrolling with the wheel
      touchMultiplier: 1,  // Multiplier for touch scrolling
      wheelMultiplier: 1,  // Multiplier for wheel scrolling
      autoResize: true,  // Automatically resize when the window is resized
      // Add any other options you want to configure
    };

    // Initialize Lenis with the options
    const lenis = new Lenis(lenisOptions);

    // Function to update Lenis on each frame
    const update = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(update);
    };
    requestAnimationFrame(update);

    // Clean up on unmount
    return () => {
      lenis.destroy();
    };
  }, []);

  return null;
};

export default LenisScroll;
