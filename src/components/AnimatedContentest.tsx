"use client";

import ButtonLink from "@/components/ButtonLink";
import StarGrid from "@/components/StarGrid";
import { Content, isFilled } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import {
  PrismicRichText,
  PrismicText,
  SliceComponentProps,
} from "@prismicio/react";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";

import Video from "next-video";
import getStarted from "/videos/get-started.mp4";
import heroVid from "/videos/video.mp4";

import { Russo_One, Dancing_Script, Bebas_Neue } from "next/font/google";

const russoOne = Russo_One({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  weight: ["400"], // Choose weights if needed
  display: "swap", // Optional: Adjust font-display property
});

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"], // Choose weights if needed
  display: "swap", // Optional: Adjust font-display property
});

export default function AnimatedContent() {
  const container = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  gsap.registerPlugin(useGSAP);

  useGSAP(
    () => {
      if (prefersReducedMotion) {
        gsap.set(
          ".hero__heading,.hero__body, .hero__button, .hero__image, .hero__glow",
          { opacity: 1 },
        );
        return;
      }
      const tl = gsap.timeline({ defaults: { ease: "power2.inOut" } });
      tl.fromTo(
        ".hero__video",
        { opacity: 0 },
        { opacity: 1, duration: 1.5 },
        "+=0.3",
      );
      tl.fromTo(
        ".hero__heading",
        { x: -1000 },
        { x: 0, opacity: 1, duration: 1.4 },
      );

      // tl.fromTo(
      //   ".hero__body",
      //   { y: 20 },
      //   { y: 0, opacity: 1, duration: 1.2 },
      //   "-=0.6",
      // );

      // tl.fromTo(
      //   ".hero__imagee",
      //   { y: 0 },
      //   { y: 0, opacity: 1, duration: 1.3, display:"block" },
      //   "+=0.3",
      // );
      tl.fromTo(
        ".hero__glow",
        { scale: 0.5 },
        { scale: 1, opacity: 1, duration: 1.8 },
        "-=1",
      );
      tl.fromTo(
        ".hero__button",
        { scale: 1.5 },
        { scale: 1, opacity: 1, duration: 1.3 },
        "-=0.8",
      );
    },
    { scope: container },
  );

  return (
    <div className="relative min-h-[100dvh] min-w-[100vw]" ref={container}>
      {/* <StarGrid />
    {isFilled.richText(slice.primary.heading) && (
      <h1 className="hero__heading mt-2 text-balance text-center text-5xl font-medium opacity-0 md:text-7xl">
        <PrismicText field={slice.primary.heading} />
      </h1>
    )}
  
    {isFilled.richText(slice.primary.body) && (
      <div className="hero__body mx-auto mt-2 max-w-md text-balance text-[0.85rem] text-slate-300 opacity-0 md:text-[1rem]">
        <PrismicRichText field={slice.primary.body} />
      </div>
    )} */}
      <div className="hero__video min-h-[100vh] min-w-[100vw] opacity-0">
        <div className="hero__glow absolute inset-0 -z-10 bg-blue-500/30 opacity-0" />
        <video
          className="hero__video min-h-[100vh] min-w-[100vw] object-cover opacity-0"
          autoPlay
          loop
          muted
          controls={false}
          playsInline
          poster=""
        >
          <source src="/videos/video.mp4"></source>
        </video>
      </div>
      <div
        className={`${dancingScript.className} hero__heading absolute inset-0 z-10 mt-[25vh] flex h-fit w-[60vw] flex-col items-end rounded-r-lg bg-black bg-opacity-25 p-4 text-right text-4xl font-bold opacity-0 shadow-lg md:flex-row md:justify-end md:text-6xl`}
      >
        <h1 className="mr-0">You`re Welcome</h1>
        <h1 className="mr-[9rem] md:ml-3 md:mr-0">Here</h1>
      </div>
      {/* <button className=" bg-black">text</button> */}
      {/* <div
        className={`hero__button absolute inset-0 z-10 ml-auto mr-[10vw] mt-[25vh] flex h-fit w-fit flex-col items-end rounded-full bg-transparent bg-opacity-70 p-4 text-right font-lora text-xl font-bold opacity-0 md:flex-row md:justify-end md:text-2xl lg:hidden`}
      >
        <button className="bg-black bg-opacity-50  hover:bg-black text-secondary font-bold py-2 px-4 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105">
  Live Streams!
</button>
      </div> */}
      {/* <div className="h-4 w-full bg-background-contrast mt-14">
    </div>
    */}
    </div>
  );
}
