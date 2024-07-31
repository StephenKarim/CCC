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

export default function AnimatedContent({
  slice,
}: {
  slice: Content.HeroSlice;
}) {
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
      tl.fromTo(".hero__video", { opacity: 0 }, { opacity: 1, duration: 0.5 });
      tl.fromTo(
        ".hero__heading",
        { x: -100 },
        { x: 0, opacity: 1, duration: 1 },"-=0.3"
      );
      tl.fromTo(
        ".hero__button",
        { scale: 1.5 },
        { scale: 1, opacity: 1, duration: 0.5 },
        "-=0.2",
      );
    },
    { scope: container },
  );

  return (
    <div
      className="relative min-h-[100dvh] min-w-[100vw] bg-[#070815]"
      ref={container}
    >
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

      {isFilled.image(slice.primary.image) && (
        <div className="hero__video min-h-[100vh] min-w-[100vw] opacity-0">
          {/* <div className="hero__glow absolute inset-0 -z-10 bg-blue-500/30 opacity-0 blur-2xl filter" /> */}
          <video
            className="hero__video min-h-[100vh] min-w-[100vw] object-cover opacity-0 brightness-[1] contrast-[1.1] saturate-[0.9] filter"
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
      )}
      <div
        className={`${bebasNeue.className} hero__heading absolute inset-0 mt-[25vh] flex h-fit w-[80vw] flex-col items-end rounded-r-lg bg-black bg-opacity-25 p-4 text-right text-3xl font-bold opacity-0 shadow-lg sm:w-[60vw] md:justify-end md:text-5xl lg:text-6xl`}
      >
        {isFilled.richText(slice.primary.heading) && (
          <h1 className="mr-0 md:text-[6.2vh] lg:text-6xl">
            <PrismicText field={slice.primary.heading} />
          </h1>
        )}
        {isFilled.link(slice.primary.button_link) && (
          <ButtonLink
            className="hero__button rounded-lg bg-[#070815] px-[0.8rem] py-1 text-lg opacity-0 sm:text-xl lg:text-3xl"
            field={slice.primary.button_link}
          >
            {slice.primary.button_label}
          </ButtonLink>
        )}
        {/* <h1 className="mr-[9rem] md:ml-3 md:mr-0">Here</h1> */}
      </div>
    </div>
  );
}
