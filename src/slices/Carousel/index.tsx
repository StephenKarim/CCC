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
  const carouselRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLDivElement>(null);
  const gsapTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const isDraggingRef = useRef<boolean>(false);
  const [key, setKey] = useState<number>(0); // State to trigger re-render
  const refreshTimeoutRef = useRef<number | NodeJS.Timeout | null>(null); // Updated type

  useEffect(() => {
    gsap.registerPlugin(Draggable);

    const imagesContainer = imagesRef.current;
    if (imagesContainer) {
      const images = imagesContainer.children;
      const imagesArray = Array.from(images) as HTMLElement[];
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
          if (gsapTimelineRef.current) {
            gsapTimelineRef.current.pause();
            isDraggingRef.current = true;

            // Clear existing timeout when dragging starts
            if (refreshTimeoutRef.current) {
              clearTimeout(refreshTimeoutRef.current as number); // Type assertion for number
            }
          }
        },
        onDragEnd: function () {
          isDraggingRef.current = false;

          // Set a new timeout for refreshing the carousel 5 seconds after dragging ends
          refreshTimeoutRef.current = window.setTimeout(() => {
            if (gsapTimelineRef.current) {
              gsapTimelineRef.current.play();
            }
            setKey((prevKey) => prevKey + 1); // Trigger a re-render by updating the key
          }, 5000);
        },
      });

      // Event listener for click event when dragging is false
      const handleClick = () => {
        if (!isDraggingRef.current) {
          // Clear any existing timeout
          if (refreshTimeoutRef.current) {
            clearTimeout(refreshTimeoutRef.current as number);
          }

          // Set a new timeout for re-rendering after 6 seconds
          refreshTimeoutRef.current = window.setTimeout(() => {
            setKey((prevKey) => prevKey + 1);
          }, 6000);
        }
      };

      // Add click event listener to the carousel container
      imagesContainer.addEventListener("click", handleClick);

      return () => {
        if (gsapTimelineRef.current) {
          gsapTimelineRef.current.kill();
        }
        Draggable.get(imagesContainer)?.kill();
        imagesContainer.removeEventListener("click", handleClick); // Clean up event listener
      };
    }
  }, [slice.primary.images, key]); // Include `key` in the dependency array to trigger re-render

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      ref={carouselRef}
      key={key} // Set the key here to trigger re-render
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
