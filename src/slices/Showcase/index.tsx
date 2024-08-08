import Bounded from "@/components/Bounded";
import ButtonLink from "@/components/ButtonLink";
import { Content } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import clsx from "clsx";
import { PiArrowsClockwise, PiGear } from "react-icons/pi";

import { Russo_One, Dancing_Script, Bebas_Neue } from "next/font/google";

const russoOne = Russo_One({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const icons = {
  gear: <PiGear />,
  cycle: <PiArrowsClockwise />,
};

/**
 * Props for `Showcase`.
 */
export type ShowcaseProps = SliceComponentProps<Content.ShowcaseSlice>;

/**
 * Component for "Showcase" Slices.
 */
const Showcase = ({ slice }: ShowcaseProps): JSX.Element => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="ios:bg-scroll relative bg-[url('/images/27.webp')] bg-cover bg-fixed bg-center px-4 py-14 first:pt-10 md:px-6 md:py-20 lg:py-24"
    >
      {/* <AnimatedContent>
        </AnimatedContent> */}
      <PrismicRichText
        field={slice.primary.heading}
        components={{
          heading2: ({ children }) => (
            <h2
              className={`${russoOne.className} w-full rounded-lg border-sky-600/20 bg-gray-200 bg-opacity-90 py-4 text-center text-4xl text-shadow-sm md:text-4xl lg:text-5xl`}
            >
              {children}
            </h2>
          ),
        }}
      />
      <div className="mt-16 grid items-center gap-8 rounded-xl border border-sky-600/20 bg-gray-200 bg-opacity-90 px-8 py-8 lg:grid-cols-3 lg:gap-0 lg:py-12">
        <div>
          <div className={`${russoOne.className} mt-6 text-2xl font-normal`}>
            <PrismicRichText field={slice.primary.subheading} />
          </div>

          <div className="mt-4 max-w-xl py-4 text-xl font-medium text-[#333]">
            <PrismicRichText field={slice.primary.body} />
          </div>

          <ButtonLink
            field={slice.primary.button_link}
            className={`${russoOne.className} mt-6`}
          >
            {slice.primary.button_text || "Learn More"}
          </ButtonLink>
        </div>

        <PrismicNextImage
          field={slice.primary.image}
          alt=""
          className={clsx(
            "opacity-90 shadow-2xl lg:col-span-2 lg:pt-0 rounded-2xl",

            "lg:order-1 lg:translate-x-[15%]",
          )}
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
    </Bounded>
  );
};

export default Showcase;
