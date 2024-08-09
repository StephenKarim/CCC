import Bounded from "@/components/Bounded";
import ButtonLink from "@/components/ButtonLink";
import { Content, isFilled } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import clsx from "clsx";
import { PiArrowsClockwise, PiGear } from "react-icons/pi";
import { Russo_One } from "next/font/google";

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
      {isFilled.richText(slice.primary.heading) && (
        <PrismicRichText
          field={slice.primary.heading}
          components={{
            heading2: ({ children }) => (
              <h2
                className={`${russoOne.className} bg-background-contrast mb-16 w-full rounded-lg border-sky-600/20 bg-opacity-90 py-4 text-center text-4xl text-shadow-sm md:text-4xl lg:text-5xl`}
              >
                {children}
              </h2>
            ),
          }}
        />
      )}

      <div className="bg-background-contrast grid items-center gap-8 rounded-xl border border-sky-600/20 bg-opacity-90 px-8 py-8 lg:grid-cols-3 lg:gap-0 lg:py-12">
        <div>
          {isFilled.richText(slice.primary.subheading) && (
            <div className={`${russoOne.className} mt-6 text-2xl font-normal`}>
              <PrismicRichText field={slice.primary.subheading} />
            </div>
          )}

          {isFilled.richText(slice.primary.body) && (
            <div className="mt-4 max-w-xl py-4 text-xl font-medium text-foreground">
              <PrismicRichText field={slice.primary.body} />
            </div>
          )}

          {isFilled.link(slice.primary.button_link) && (
            <ButtonLink
              field={slice.primary.button_link}
              className={`${russoOne.className} mt-6`}
            >
              {slice.primary.button_text || "Learn More"}
            </ButtonLink>
          )}
        </div>

        {isFilled.image(slice.primary.image) && (
          <PrismicNextImage
            field={slice.primary.image}
            alt=""
            className={clsx(
              "overflow-hidden rounded-2xl opacity-90 shadow-2xl lg:col-span-2 lg:pt-0",
              "overflow-hidden lg:order-1 xl:translate-x-[15%]",
            )}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        )}
      </div>
    </Bounded>
  );
};

export default Showcase;
