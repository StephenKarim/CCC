"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Bounded from "@/components/Bounded";
import { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { cn } from "@/lib/utils"; // Assuming you have a utility for conditional classes

/**
 * Props for `Mission`.
 */
export type MissionProps = SliceComponentProps<Content.MissionSlice>;

/**
 * Component for "Mission" Slices.
 */
const Mission = ({ slice }: MissionProps): JSX.Element => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="py-12"
    >
      <div className="text-center">
        <h2 className="mb-4 text-3xl font-bold text-gray-800">
          <PrismicRichText field={slice.primary.heading} />
        </h2>
        <div
          className={cn(
            "mx-auto max-w-2xl text-lg text-gray-600",
            slice.primary.body ? "mb-8" : "",
          )}
        >
          <PrismicRichText field={slice.primary.body} />
        </div>
      </div>    
    </Bounded>
  );
};

export default Mission;
