"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { Russo_One, Dancing_Script, Bebas_Neue } from "next/font/google";

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
  const timeoutRef = useRef<NodeJS.Timeout | null>(null); // Timeout reference

  useEffect(() => {
    const imagesContainer = imagesRef.current;
    if (imagesContainer) {
      const images = imagesContainer.children;
      const imagesArray = Array.from(images);
      imagesArray.forEach((image) => {
        const clone = image.cloneNode(true);
        imagesContainer.appendChild(clone);
      });

      const numberOfImages = imagesArray.length;
      const duration = numberOfImages * 5; // 15 seconds per image

      const timeline = gsap.timeline({ repeat: -1, paused: false });

      timeline.to(imagesContainer, {
        x: `-${numberOfImages * 100}%`,
        duration: duration,
        ease: "none",
      });

      gsapTimelineRef.current = timeline;

      const handleMouseOver = () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
        gsapTimelineRef.current?.pause();
      };

      const handleMouseOut = () => {
        if (gsapTimelineRef.current) {
          // Add delay before resuming the animation
          timeoutRef.current = setTimeout(() => {
            gsapTimelineRef.current?.play();
          }, 500); // Delay of 1\2 second
        }
      };

      if (imagesContainer) {
        imagesContainer.addEventListener("mouseover", handleMouseOver);
        imagesContainer.addEventListener("mouseout", handleMouseOut);
      }

      return () => {
        if (imagesContainer) {
          imagesContainer.removeEventListener("mouseover", handleMouseOver);
          imagesContainer.removeEventListener("mouseout", handleMouseOut);
        }
        if (gsapTimelineRef.current) {
          gsapTimelineRef.current.kill();
        }
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      };
    }
  }, [slice.primary.images]);

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      ref={carouselRef}
      className="overflow-hidden py-5 flex flex-col"
    >
      <div className={` ${russoOne.className} text-white pb-4 flex flex-col items-center justify-center`}>
      <PrismicRichText field={slice.primary.heading} />
      </div>
      <div ref={imagesRef} className="flex md:h-[40vh] md:w-[74.2vh]">
        {slice.primary.images.map((item, index) => (
          <PrismicNextImage
            key={index}
            field={item.image}
             className="h-auto  w-auto flex-shrink-0 transition-transform duration-700 ease-in-out transform hover:translate-y-[-10px]"
          />
        ))}
      </div>
    </section>
  );
};

export default Carousel;
