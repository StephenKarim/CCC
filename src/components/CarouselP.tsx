"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Draggable, InertiaPlugin } from "gsap/all";
import Image from "next/image";

gsap.registerPlugin(Draggable, InertiaPlugin);

const CarouselP = () => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const prevButtonRef = useRef<HTMLButtonElement>(null);
  const nextButtonRef = useRef<HTMLButtonElement>(null);
  const proxyRef = useRef<HTMLDivElement>(document.createElement("div"));

  const [items, setItems] = useState<HTMLElement[] | null>(null);
  const [slideWidth, setSlideWidth] = useState<number>(0);
  const [animation, setAnimation] = useState<GSAPTween | null>(null);
  const [firstClick, setFirstClick] = useState<boolean>(true);

  useEffect(() => {
    if (carouselRef.current) {
      const carousel = carouselRef.current;
      const slides = carousel.querySelectorAll(
        ".carousel-item",
      ) as NodeListOf<HTMLElement>;
      setItems(Array.from(slides)); // Convert NodeList to Array

      if (slides.length > 0) {
        const width = slides[0].offsetWidth;
        setSlideWidth(width);

        gsap.set(slides, {
          xPercent: (i) => i * 100,
        });

        const numSlides = slides.length;
        const wrapX = gsap.utils.wrap(-100, (numSlides - 1) * 100);

        const anim = gsap.to(slides, {
          xPercent: "+=" + numSlides * 100,
          duration: 1,
          ease: "none",
          paused: true,
          repeat: -1,
          modifiers: {
            xPercent: wrapX,
          },
        });

        setAnimation(anim);

        const proxy = proxyRef.current;

        const draggable = new Draggable(proxy, {
          trigger: carousel,
          inertia: true,
          onPress: () => {
            timer.restart(true);
            anim.pause();
          },
          onDrag: () => {
            if (items && animation) {
              updateProgress(items, animation, numSlides, slideWidth);
            }
          },
          onThrowUpdate: () => {
            if (items && animation) {
              updateProgress(items, animation, numSlides, slideWidth);
            }
          },
          snap: {
            x: (value) => snapX(value, slideWidth),
          },
        });

        let initialTimeout = setTimeout(autoPlay, 100); // First auto play trigger

        const timer = gsap.delayedCall(6, autoPlay);

        if (prevButtonRef.current) {
          prevButtonRef.current.addEventListener("click", () => {
            if (items && animation) {
              animateSlides(1, items, slideWidth, animation);
              if (firstClick) {
                setTimeout(() => setFirstClick(false), 100);
              } else {
                timer.restart(true);
              }
            }
          });
        }

        if (nextButtonRef.current) {
          nextButtonRef.current.addEventListener("click", () => {
            if (items && animation) {
              animateSlides(-1, items, slideWidth, animation);
              if (firstClick) {
                setTimeout(() => setFirstClick(false), 100);
              } else {
                timer.restart(true);
              }
            }
          });
        }

        window.addEventListener("resize", resize);

        return () => {
          window.removeEventListener("resize", resize);
          clearTimeout(initialTimeout);
        };
      }
    }
  }, []);

  const updateProgress = (
    items: HTMLElement[],
    animation: GSAPTween,
    numSlides: number,
    slideWidth: number,
  ) => {
    const x = gsap.getProperty(proxyRef.current, "x");
    const xValue = typeof x === "number" ? x : parseFloat(x);
    animation.progress(
      gsap.utils.wrap(0, 1)(xValue / (slideWidth * numSlides)),
    );
  };

  const autoPlay = () => {
    const draggable = Draggable.get(proxyRef.current);
    if (
      !draggable?.isPressed &&
      !draggable?.isDragging &&
      !draggable?.isThrowing
    ) {
      if (items && animation) {
        animateSlides(-1, items, slideWidth, animation);
      }
    }
  };

  const animateSlides = (
    direction: number,
    items: HTMLElement[],
    slideWidth: number,
    animation: GSAPTween,
  ) => {
    const currentX = gsap.getProperty(proxyRef.current, "x");
    const currentXValue =
      typeof currentX === "number" ? currentX : parseFloat(currentX);
    gsap.to(proxyRef.current, {
      x: snapX(currentXValue + direction * slideWidth, slideWidth),
      duration: 0.3,
      onUpdate: () => {
        if (items && animation) {
          updateProgress(items, animation, items.length, slideWidth);
        }
      },
    });
  };

  const snapX = (value: number, slideWidth: number): number => {
    return gsap.utils.snap(slideWidth, value);
  };

  const resize = () => {
    if (items) {
      gsap.set(proxyRef.current, {
        x: gsap.getProperty(proxyRef.current, "x"),
      });
      if (animation) {
        animation.progress(1);
      }
    }
  };

  return (
    <div className="relative overflow-hidden">
      <div ref={carouselRef} className="flex">
        <div className="carousel-item w-full flex-none">
          <Image
            src="/images/church.jpg"
            alt="Image 1"
            width={200}
            height={200}
            layout="responsive"
          />
        </div>
        <div className="carousel-item w-full flex-none">
          <Image
            src="/images/church.jpeg"
            alt="Image 2"
            width={200}
            height={200}
            layout="responsive"
          />
        </div>
        <div className="carousel-item w-full flex-none">
          <Image
            src="/images/27.webp"
            alt="Image 3"
            width={200}
            height={200}
            layout="responsive"
          />
        </div>
        {/* Add more items as needed */}
      </div>
      <div className="controls absolute inset-x-0 bottom-0 flex justify-between p-4">
        <button
          ref={prevButtonRef}
          className="rounded bg-gray-700 p-2 text-white"
        >
          Prev
        </button>
        <button
          ref={nextButtonRef}
          className="rounded bg-gray-700 p-2 text-white"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CarouselP;
