"use client";
import Bounded from "@/components/Bounded";
import { Content, isFilled } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { Russo_One } from "next/font/google";
import { Merriweather } from "next/font/google";
import { PrismicNextLink } from "@prismicio/next";
import { FaHome } from "react-icons/fa"; // Using FaHome from react-icons
import { usePathname } from "next/navigation";

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
  const pathname = usePathname();
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={` ${pathname === "/programs" ? "" : ""} relative mt-[80px] w-full border-b-2 border-background bg-background-contrast bg-opacity-95 bg-cover bg-fixed bg-top shadow-2xl ios:bg-scroll md:text-4xl lg:text-5xl`}
    >
      <div className="relative flex flex-col items-center justify-center p-8 text-center">
        {isFilled.richText(slice.primary.heading) && (
          <h1
            className={`${russoOne.className} mb-4 pt-3 text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl`}
          >
            <PrismicRichText field={slice.primary.heading} />
          </h1>
        )}
        {/* {isFilled.richText(slice.primary.body) && (
          <div
            className={`py-2 text-xl font-bold text-foreground`}
          >
            <PrismicRichText field={slice.primary.body} />
          </div>
        )} */}

        {/* Breadcrumb Navigation */}
        <div className="mt-4 flex items-center space-x-2 text-sm text-foreground">
          <PrismicNextLink
            href="/"
            className="group relative flex items-center no-underline"
          >
            <FaHome className="h-5 w-5 text-sky-600" aria-hidden="true" />
            <span className="relative ml-1">
              <span className="relative">
                Home
                <span className="absolute bottom-0 left-0 h-[1px] w-full origin-left scale-x-0 bg-foreground transition-transform duration-500 ease-out group-hover:scale-x-100"></span>
              </span>
            </span>
          </PrismicNextLink>
          <span>/</span>
          <span>
            {" "}
            <PrismicRichText field={slice.primary.heading} />
          </span>
        </div>
      </div>
    </Bounded>
  );
};

export default PageHero;
