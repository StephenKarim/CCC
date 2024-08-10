"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Bounded from "@/components/Bounded";
import { Content, isFilled } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { cn } from "@/lib/utils"; // Assuming you have a utility for conditional classes
import clsx from "clsx";
import { Russo_One, Dancing_Script, Bebas_Neue } from "next/font/google";

const russoOne = Russo_One({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

/**
 * Props for `Mission`.
 */
export type MissionProps = SliceComponentProps<Content.MissionSlice>;

/**
 * Component for "Mission" Slices.
 */
const Mission = ({ slice }: MissionProps): JSX.Element => {
  const sectionRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   gsap.fromTo(
  //     sectionRef.current,
  //     { opacity: 0, y: 50 },
  //     { opacity: 1, y: 0, duration: 1.5, ease: "power1.out" },
  //   );
  // }, []);

  return (
    <Bounded
      ref={sectionRef}
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="lg:grid-cols grid items-center gap-8 rounded-xl border border-sky-600/20 bg-opacity-90 px-8 py-8 lg:gap-0 lg:py-12"
    >
      {isFilled.richText(slice.primary.heading) && (
        <div
          className={`${russoOne.className} mt-[2rem] text-3xl font-normal md:text-4xl`}
        >
          <PrismicRichText field={slice.primary.heading} />
        </div>
      )}

      <div className="flex flex-col items-center justify-between p-5 lg:flex-row">
        {isFilled.richText(slice.primary.body) && (
          <div
            className={`mb-[3rem] mt-[2rem] max-w-[95vw] text-justify text-balance text-xl font-medium text-foreground md:max-w-[85vw] lg:max-w-[50vw] lg:mr-[4rem]`}
          >
            <PrismicRichText field={slice.primary.body} />
          </div>
        )}
        {isFilled.image(slice.primary.image) && (
          <PrismicNextImage
            field={slice.primary.image}
            alt=""
            className="aspect-square max-w-[60vw] rounded-2xl opacity-90 shadow-2xl md:max-w-[50vw] lg:max-w-[30vw] xl:max-w-[25rem]"
            sizes=""
          />
        )}
      </div>
    </Bounded>
  );
};

export default Mission;
