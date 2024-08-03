"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";

const Carousel = () => {
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (carouselRef.current) {
      const carousel = carouselRef.current;
      const items = carousel.querySelectorAll(".carousel-item");

      gsap.to(carousel, {
        xPercent: -100 * (items.length - 1),
        ease: "none",
        duration: 20, // Adjust duration for speed
        repeat: -1,
        modifiers: {
          xPercent: gsap.utils.unitize(
            (x) => parseFloat(x) % (100 * items.length),
          ),
        },
      });
    }
  }, []);

  return (
    <div className="relative overflow-hidden">
      <div ref={carouselRef} className="flex">
        <div className="carousel-item w-full flex-none ">
          <Image
            src="/images/church.jpg"
            alt="Image 1"
            width={200}
            height={200}
            layout="responsive"
            aspect-video
          />
        </div>
        <div className="carousel-item w-full flex-none " >
          <Image
            src="/images/church.jpeg"
            alt="Image 2"
            width={200}
            height={200}
            layout="responsive"
            aspect-video
          />
        </div>
        <div className="carousel-item w-full flex-none">
          <Image
            src="/images/I3.jpg"
            alt="Image 3"
            width={200}
            height={200}
            layout="responsive"
            aspect-video
          />
        </div>
        {/* Add more items as needed */}
      </div>
    </div>
  );
};

export default Carousel;
