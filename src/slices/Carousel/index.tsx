"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
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

      const handleClick = () => {
        if (gsapTimelineRef.current) {
          if (gsapTimelineRef.current.paused()) {
            gsapTimelineRef.current.play();
          } else {
            gsapTimelineRef.current.pause();
          }
        }
      };

      if (imagesContainer) {
        imagesContainer.addEventListener("click", handleClick);
      }

      return () => {
        if (imagesContainer) {
          imagesContainer.removeEventListener("click", handleClick);
        }
        if (gsapTimelineRef.current) {
          gsapTimelineRef.current.kill();
        }
      };
    }
  }, [slice.primary.images]);

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      ref={carouselRef}
      className="flex flex-col overflow-hidden pb-[3rem]"
    >
      <div
        className={` ${russoOne.className} flex flex-col items-center justify-center pb-[4rem] pt-2 text-secondary text-4xl md:text-5xl lg:text-6xl`}
      >
        <PrismicRichText field={slice.primary.heading} />
      </div>
      <div ref={imagesRef} className="flex h-[25vh] w-[46.4vh] md:h-[40vh] md:w-[74.2vh]">
        {slice.primary.images.map((item, index) => (
          <PrismicNextImage
            key={index}
            field={item.image}
            className="h-auto w-auto flex-shrink-0 transform transition-transform duration-700 ease-in-out hover:translate-y-[-10px] px-2 md:px-3"
          />
        ))}
      </div>
    </section>
  );
};

export default Carousel;
