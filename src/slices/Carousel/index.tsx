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
  const [key, setKey] = useState<number>(0);
  const refreshTimeoutRef = useRef<number | NodeJS.Timeout | null>(null);
  const glideTweenRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const imagesContainer = imagesRef.current;

    if (!imagesContainer) {
      console.error("imagesContainer is not ready.");
      return;
    }

    // Add a small delay to ensure the DOM is fully ready
    const initTimeout = setTimeout(() => {
      gsap.registerPlugin(Draggable);

      const images = imagesContainer.children;
      const imagesArray = Array.from(images) as HTMLElement[];
      imagesArray.forEach((image) => {
        const clone = image.cloneNode(true);
        imagesContainer.appendChild(clone);
      });

      const numberOfImages = imagesArray.length;
      const duration = numberOfImages * 5;

      const timeline = gsap.timeline({ repeat: -1, paused: false });

      timeline.to(imagesContainer, {
        x: `-${numberOfImages * 100}%`,
        duration: duration,
        ease: "none",
      });

      gsapTimelineRef.current = timeline;

      let startX = 0;
      let endX = 0;

      Draggable.create(imagesContainer, {
        type: "x",
        bounds: {
          minX: -imagesContainer.scrollWidth + imagesContainer.clientWidth,
          maxX: 0,
        },
        inertia: false,
        resistance: 0.05,
        onPressInit: function () {
          startX = this.x;
        },
        onDrag: function () {
          endX = this.x;
        },
        onDragStart: function () {
          if (gsapTimelineRef.current) {
            gsapTimelineRef.current.pause();
            isDraggingRef.current = true;

            if (refreshTimeoutRef.current) {
              clearTimeout(refreshTimeoutRef.current as number);
            }

            if (glideTweenRef.current) {
              glideTweenRef.current.kill();
              glideTweenRef.current = null;
            }

            startX = this.x;
            endX = this.x;
          }
        },
        onDragEnd: function () {
          isDraggingRef.current = false;

          let glideDistance = (endX - startX) * 3;

          const currentX = endX + glideDistance;

          const minX =
            -imagesContainer.scrollWidth + imagesContainer.clientWidth;
          const maxX = 0;

          if (currentX > maxX) {
            glideDistance = maxX - endX;
          } else if (currentX < minX) {
            glideDistance = minX - endX;
          }

          glideTweenRef.current = gsap.to(imagesContainer, {
            x: `+=${glideDistance}`,
            ease: "power3.out",
            duration: 2,
            onComplete: () => {
              const adjustedX = gsap.getProperty(
                imagesContainer,
                "x",
              ) as number;
              if (adjustedX > 0) {
                gsap.to(imagesContainer, {
                  x: 0,
                  duration: 0.5,
                  ease: "power3.out",
                });
              } else if (adjustedX < minX) {
                gsap.to(imagesContainer, {
                  x: minX,
                  duration: 0.5,
                  ease: "power3.out",
                });
              }
            },
          });

          refreshTimeoutRef.current = window.setTimeout(() => {
            fadeOutAndRerender();
          }, 5000);
        },
      });

      const handleClick = () => {
        if (glideTweenRef.current) {
          glideTweenRef.current.kill();
          glideTweenRef.current = null;
        }

        if (!isDraggingRef.current) {
          if (refreshTimeoutRef.current) {
            clearTimeout(refreshTimeoutRef.current as number);
          }

          // Apply a delay before re-rendering
          refreshTimeoutRef.current = window.setTimeout(() => {
            fadeOutAndRerender();
          }, 6000);
        }
      };

      imagesContainer.addEventListener("click", handleClick);

      return () => {
        if (gsapTimelineRef.current) {
          gsapTimelineRef.current.kill();
        }
        Draggable.get(imagesContainer)?.kill();
        imagesContainer.removeEventListener("click", handleClick);
        clearTimeout(initTimeout);
      };
    }, 100); // Small delay to ensure DOM is ready
  }, [slice.primary.images, key]);

  const fadeOutAndRerender = () => {
    const container = imagesRef.current;
    if (container) {
      // Fade out
      gsap.to(container, {
        opacity: 0,
        duration: 0.5,
        onComplete: () => {
          // Trigger re-render
          setKey((prevKey) => prevKey + 1);
        },
      });
    }
  };

  useEffect(() => {
    // Apply a default fade-in animation whenever the component is rendered
    const container = imagesRef.current;
    if (container) {
      gsap.fromTo(container, { opacity: 0 }, { opacity: 1, duration: 0.5 });
    }
  }, [key]);

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative flex flex-col overflow-hidden pb-[3rem]"
    >
      <div
        className={` ${russoOne.className} flex flex-col items-center justify-center pb-[4rem] pt-[3rem] text-4xl md:text-5xl lg:text-6xl`}
      >
        <PrismicRichText field={slice.primary.heading} />
      </div>
      <div
        ref={imagesRef}
        key={key} // Only this part re-renders
        className="flex h-[25vh] w-[46.4vh] md:h-[40vh] md:w-[74.2vh]"
      >
        {slice.primary.images.map((item, index) => (
          <PrismicNextImage
            key={index}
            field={item.image}
            className="h-auto w-auto flex-shrink-0 transform rounded-3xl px-2 shadow-2xl transition-transform duration-700 ease-in-out hover:scale-105 hover:opacity-80"
          />
        ))}
      </div>
    </section>
  );
};

export default Carousel;
