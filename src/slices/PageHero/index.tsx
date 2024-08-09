import Bounded from "@/components/Bounded";
import { Content, isFilled } from "@prismicio/client";
import { PrismicText, SliceComponentProps } from "@prismicio/react";
import { Russo_One } from "next/font/google";
import { Merriweather } from "next/font/google";

const russoOne = Russo_One({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

/**
 * Props for `PageHero`.
 */
export type PageHeroProps = SliceComponentProps<Content.PageHeroSlice>;

/**
 * Component for "PageHero" Slices.
 */
const PageHero = ({ slice }: PageHeroProps): JSX.Element => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="ios:bg-scroll relative mt-[80px] w-full bg-cover bg-fixed bg-center border-b-4 shadow-2xl border-background"
      style={{ backgroundImage: `url(${slice.primary.image.url})` }}
    >
      <div className="relative flex flex-col items-center justify-center p-8 text-center">
        {isFilled.richText(slice.primary.heading) && (
          <h1
            className={`${russoOne.className} mb-4 text-4xl font-bold text-foreground sm:text-5xl lg:text-6xl`}
          >
            <PrismicText field={slice.primary.heading} />
          </h1>
        )}
        {isFilled.richText(slice.primary.body) && (
          <p
            className={`text-xl font-medium max-w-3xl text-foreground sm:text-xl lg:text-2xl`}
          >
            <PrismicText field={slice.primary.body} />
          </p>
        )}
      </div>

      <div className="absolute inset-0 z-0 bg-black opacity-50"></div>
    </Bounded>
  );
};

export default PageHero;
