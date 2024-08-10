"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Draggable } from "gsap/dist/Draggable";
import { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { Russo_One } from "next/font/google";
import Bounded from "@/components/Bounded";
import { usePathname } from "next/navigation";
import ButtonLink from "@/components/ButtonLink";

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
  const pathname = usePathname();
  const carouselRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLDivElement>(null);
  const gsapTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const isDraggingRef = useRef<boolean>(false);
  const [key, setKey] = useState<number>(0);
  const refreshTimeoutRef = useRef<number | NodeJS.Timeout | null>(null);
  const glideTweenRef = useRef<gsap.core.Tween | null>(null);
  const onClickReadyRef = useRef<boolean>(false); // Reference to track onClick readiness

  useEffect(() => {
    const initTimeout = setTimeout(() => {
      gsap.registerPlugin(Draggable);

      const imagesContainer = imagesRef.current;
      if (!imagesContainer) {
        console.error("imagesContainer is not ready.");
        return;
      }

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
        inertia: true,
        resistance: 0.5,
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

            // Clear existing timeout when dragging starts
            if (refreshTimeoutRef.current) {
              clearTimeout(refreshTimeoutRef.current as number);
            }

            // Kill the ongoing glide tween if it exists
            if (glideTweenRef.current) {
              glideTweenRef.current.kill();
              glideTweenRef.current = null;
            }

            // Reset velocity by setting start and end to the same position
            startX = this.x;
            endX = this.x;
          }

          // Prevent default scrolling
          window.addEventListener("touchmove", preventScroll, {
            passive: false,
          });
          window.addEventListener("wheel", preventScroll, { passive: false });
        },
        onDragEnd: function () {
          isDraggingRef.current = false;

          // Calculate direction based on start and end positions
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

          // Create and store the glide tween reference
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

          // Set a new timeout for refreshing the carousel 5 seconds after dragging ends
          refreshTimeoutRef.current = window.setTimeout(() => {
            fadeOutAndRerender();
          }, 6000);

          // Re-enable scrolling after dragging ends
          window.removeEventListener("touchmove", preventScroll);
          window.removeEventListener("wheel", preventScroll);
        },
      });

      // Set timeout for onClick readiness 500ms after drag is initialized
      setTimeout(() => {
        onClickReadyRef.current = true;
      }, 100);

      // Event listener for click event when dragging is false
      const handleClick = () => {
        if (!isDraggingRef.current && onClickReadyRef.current) {
          if (glideTweenRef.current) {
            glideTweenRef.current.kill();
            glideTweenRef.current = null;
          }

          if (refreshTimeoutRef.current) {
            clearTimeout(refreshTimeoutRef.current as number);
          }

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
        window.removeEventListener("touchmove", preventScroll);
        window.removeEventListener("wheel", preventScroll);
        clearTimeout(initTimeout);
      };
    }, 100);
  }, [slice.primary.images, key]);

  const fadeOutAndRerender = () => {
    const container = imagesRef.current;
    if (container) {
      gsap.to(container, {
        opacity: 0,
        duration: 0.5,
        onComplete: () => {
          setKey((prevKey) => prevKey + 1);
        },
      });
    }
  };

  useEffect(() => {
    const container = imagesRef.current;
    if (container) {
      gsap.fromTo(container, { opacity: 0 }, { opacity: 1, duration: 0.5 });
    }
  }, [key]);

  const preventScroll = (event: Event) => {
    event.preventDefault();
  };

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      ref={carouselRef}
      key={key}
      className={`${pathname === "/aboutus" ? "bg-[url('/images/49.webp')] bg-cover bg-fixed bg-center ios:bg-scroll" : "bg-none"} relative mt-10 flex flex-col overflow-hidden pb-[6rem]`}
    >
      <div
        className={`${russoOne.className} flex flex-col items-center justify-center pb-[4rem] pt-[3rem] text-4xl text-shadow md:text-5xl lg:text-6xl`}
      >
        <PrismicRichText field={slice.primary.heading || "Programs"} />
      </div>
      <div
        ref={imagesRef}
        className="flex h-[25vh] w-[46.4vh] md:h-[40vh] md:w-[74.2vh]"
      >
        {slice.primary.images.map((item, index) => (
          <PrismicNextImage
            key={index}
            field={item.image}
            className="shadow-b mx-1 h-auto w-auto flex-shrink-0 transform rounded-3xl px-2 transition-transform duration-700 ease-in-out hover:scale-105 hover:opacity-80"
          />
        ))}
      </div>
      <ButtonLink
        field={slice.primary.button_link}
        className={`${pathname === "/aboutus" ? "block" : "hidden"} mx-auto mt-14 items-center justify-center bg-opacity-85`}
      >
        {slice.primary.button_label || "Learn More"}
      </ButtonLink>
    </Bounded>
  );
};

export default Carousel;
