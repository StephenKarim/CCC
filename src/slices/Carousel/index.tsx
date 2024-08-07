"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Draggable } from "gsap/dist/Draggable";
import { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { Russo_One } from "next/font/google";

const russoOne = Russo_One({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

/**
 * Props for Carousel.
 */
export type CarouselProps = SliceComponentProps<Content.CarouselSlice>;

/**
 * Component for "Carousel" Slices.
 */
const Carousel = ({ slice }: CarouselProps): JSX.Element => {
  const imagesRef = useRef<HTMLDivElement>(null);
  const gsapTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const isDraggingRef = useRef<boolean>(false);
  const refreshTimeoutRef = useRef<number | null>(null); // Simplified typing

  useEffect(() => {
    gsap.registerPlugin(Draggable);

    const imagesContainer = imagesRef.current;
    if (imagesContainer) {
      const images = imagesContainer.children;
      const imagesArray = Array.from(images) as HTMLElement[];

      // Check if cloning is necessary based on the purpose of the carousel.
      imagesArray.forEach((image) => {
        const clone = image.cloneNode(true);
        imagesContainer.appendChild(clone);
      });

      const numberOfImages = imagesArray.length;
      const duration = numberOfImages * 5; // 5 seconds per image

      const timeline = gsap.timeline({ repeat: -1, paused: false });

      timeline.to(imagesContainer, {
        x: `-${numberOfImages * 100}%`,
        duration: duration,
        ease: "none",
      });

      gsapTimelineRef.current = timeline;

      // Create Draggable instance on the images container
      Draggable.create(imagesContainer, {
        type: "x",
        bounds: {
          minX: -imagesContainer.scrollWidth + imagesContainer.clientWidth,
          maxX: 0,
        },
        inertia: true,
        onDragStart: function () {
          gsapTimelineRef.current?.pause();
          isDraggingRef.current = true;

          // Clear existing timeout when dragging starts
          if (refreshTimeoutRef.current) {
            clearTimeout(refreshTimeoutRef.current);
          }
        },
        onDragEnd: function () {
          isDraggingRef.current = false;

          // Set a new timeout for refreshing the carousel 5 seconds after dragging ends
          refreshTimeoutRef.current = window.setTimeout(() => {
            gsapTimelineRef.current?.play();
          }, 5000);
        },
      });

      // Event listener for click event when dragging is false
      const handleClick = () => {
        if (!isDraggingRef.current) {
          // Clear any existing timeout
          if (refreshTimeoutRef.current) {
            clearTimeout(refreshTimeoutRef.current);
          }

          // Set a new timeout for re-rendering after 6 seconds
          refreshTimeoutRef.current = window.setTimeout(() => {
            gsapTimelineRef.current?.restart(true);
          }, 6000);
        }
      };

      // Add click event listener to the carousel container
      imagesContainer.addEventListener("click", handleClick);

      return () => {
        gsapTimelineRef.current?.kill();
        Draggable.get(imagesContainer)?.kill();
        imagesContainer.removeEventListener("click", handleClick); // Clean up event listener
      };
    }
  }, [slice.primary.images]); // Removed `key` to avoid unnecessary re-renders

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative flex flex-col overflow-hidden pb-[3rem]"
    >
      <div
        className={` ${russoOne.className} flex flex-col items-center justify-center pb-[4rem] pt-2 text-4xl text-secondary md:text-5xl lg:text-6xl`}
      >
        <PrismicRichText field={slice.primary.heading} />
      </div>
      <div
        ref={imagesRef}
        className="flex h-[25vh] w-[46.4vh] md:h-[40vh] md:w-[74.2vh]"
      >
        {slice.primary.images.map((item, index) => (
          <PrismicNextImage
            key={index}
            field={item.image}
            className="h-auto w-auto flex-shrink-0 transform px-2 transition-transform duration-700 ease-in-out hover:translate-y-[-10px]"
          />
        ))}
      </div>
    </section>
  );
};

export default Carousel;
