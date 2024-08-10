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

  useEffect(() => {
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1.5, ease: "power1.out" },
    );
  }, []);

  return (
    <Bounded
      ref={sectionRef}
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative flex flex-col py-12"
    >
      {isFilled.richText(slice.primary.heading) && (
        <div className={`${russoOne.className} text-2xl font-normal`}>
          <PrismicRichText field={slice.primary.heading} />
        </div>
      )}

      <div className="flex flex-row-reverse items-center justify-between p-10">
        {isFilled.richText(slice.primary.body) && (
          <div
            className={`${russoOne.className}  prose pl-20 items-center font-light justify-center`}
          >
            <PrismicRichText field={slice.primary.body} />
          </div>
        )}
        {isFilled.image(slice.primary.image) && (
          <PrismicNextImage
            field={slice.primary.image}
            alt=""
            className={clsx(
              "overflow-hidden rounded-2xl opacity-90 shadow-2xl items-center justify-center",
            )}
          />
        )}
      </div>
    </Bounded>
  );
};

export default Mission;
