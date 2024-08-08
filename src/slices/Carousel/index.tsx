'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Draggable } from 'gsap/dist/Draggable';
import { Content } from '@prismicio/client';
import { PrismicNextImage } from '@prismicio/next';
import { PrismicRichText, SliceComponentProps } from '@prismicio/react';
import { Russo_One } from 'next/font/google';

const russoOne = Russo_One({
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
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
  const glideTweenRef = useRef<gsap.core.Tween | null>(null); // Reference to the ongoing glide tween

  useEffect(() => {
    const initTimeout = setTimeout(() => {
      gsap.registerPlugin(Draggable);

      const imagesContainer = imagesRef.current;
      if (!imagesContainer) {
        console.error('imagesContainer is not ready.');
        return;
      }

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
        ease: 'none',
      });

      gsapTimelineRef.current = timeline;

      let startX = 0;
      let endX = 0;

      // Create Draggable instance on the images container
      Draggable.create(imagesContainer, {
        type: 'x',
        bounds: {
          minX: -imagesContainer.scrollWidth + imagesContainer.clientWidth,
          maxX: 0,
        },
        inertia: false, // We will handle inertia manually
        resistance: 0.05, // Lower resistance for smoother dragging
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
              clearTimeout(refreshTimeoutRef.current as number); // Type assertion for number
            }

            // Kill the ongoing glide tween if it exists
            if (glideTweenRef.current) {
              glideTweenRef.current.kill();
              glideTweenRef.current = null; // Reset glide tween reference
            }

            // Reset velocity by setting start and end to the same position
            startX = this.x;
            endX = this.x;
          }

          // Prevent default scrolling
          window.addEventListener('touchmove', preventScroll, {
            passive: false,
          });
          window.addEventListener('wheel', preventScroll, { passive: false });
        },
        onDragEnd: function () {
          isDraggingRef.current = false;

          // Calculate direction based on start and end positions
          let glideDistance = (endX - startX) * 3; // Adjust multiplier as needed for glide effect

          const currentX = endX + glideDistance;

          // Prevent gliding past the first and last images
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
            x: `+=${glideDistance}`, // Glide based on calculated distance
            ease: 'power3.out', // Use power3.out for a smooth deceleration
            duration: 2, // Duration of the glide
            onComplete: () => {
              // Adjust bounds if necessary
              const adjustedX = gsap.getProperty(imagesContainer, 'x') as number;
              if (adjustedX > 0) {
                gsap.to(imagesContainer, {
                  x: 0,
                  duration: 0.5,
                  ease: 'power3.out',
                });
              } else if (adjustedX < minX) {
                gsap.to(imagesContainer, {
                  x: minX,
                  duration: 0.5,
                  ease: 'power3.out',
                });
              }
            },
          });

          // Set a new timeout for refreshing the carousel 5 seconds after dragging ends
          refreshTimeoutRef.current = window.setTimeout(() => {
            fadeOutAndRerender(); // Trigger fade-out before re-render
          }, 5000);

          // Re-enable scrolling after dragging ends
          window.removeEventListener('touchmove', preventScroll);
          window.removeEventListener('wheel', preventScroll);
        },
      });

      // Event listener for click event when dragging is false
      const handleClick = () => {
        // Kill the ongoing glide tween if it exists
        if (glideTweenRef.current) {
          glideTweenRef.current.kill();
          glideTweenRef.current = null; // Reset glide tween reference
        }

        if (!isDraggingRef.current) {
          // Clear any existing timeout
          if (refreshTimeoutRef.current) {
            clearTimeout(refreshTimeoutRef.current as number);
          }

          // Set a new timeout for re-rendering after 6 seconds
          refreshTimeoutRef.current = window.setTimeout(() => {
            fadeOutAndRerender(); // Trigger fade-out before re-render
          }, 6000);
        }
      };

      // Add click event listener to the carousel container
      imagesContainer.addEventListener('click', handleClick);

      return () => {
        if (gsapTimelineRef.current) {
          gsapTimelineRef.current.kill();
        }
        Draggable.get(imagesContainer)?.kill();
        imagesContainer.removeEventListener('click', handleClick); // Clean up event listener
        window.removeEventListener('touchmove', preventScroll);
        window.removeEventListener('wheel', preventScroll);
        clearTimeout(initTimeout); // Clear the initialization timeout on cleanup
      };
    }, 100); // Delay initialization by 100ms to ensure DOM readiness
  }, [slice.primary.images, key]); // Include key in the dependency array to trigger re-render

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
      gsap.fromTo(
        container,
        { opacity: 0 },
        { opacity: 1, duration: 0.5 },
      );
    }
  }, [key]);

  const preventScroll = (event: Event) => {
    event.preventDefault();
  };

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      ref={carouselRef}
      key={key} // Set the key here to trigger re-render
      className="relative flex flex-col overflow-hidden pb-[3rem]"
    >
      <div
        className={`${russoOne.className} flex flex-col items-center justify-center pb-[4rem] pt-[3rem] text-4xl md:text-5xl lg:text-6xl`}
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
            className="h-auto w-auto flex-shrink-0 transform px-2 transition-transform duration-700 ease-in-out hover:scale-105 hover:opacity-80 shadow-2xl rounded-3xl"
          />
        ))}
      </div>
    </section>
  );
};

export default Carousel;
