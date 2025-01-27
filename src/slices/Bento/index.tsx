"use client";
import Bounded from "@/components/Bounded";
import { asText, Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { Russo_One } from "next/font/google";
import clsx from "clsx";
import { usePathname } from "next/navigation";

const russoOne = Russo_One({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});
/**
 * Props for `Bento`.
 */
export type BentoProps = SliceComponentProps<Content.BentoSlice>;

/**
 * Component for "Bento" Slices.
 */
const Bento = ({ slice }: BentoProps): JSX.Element => {
  const pathname = usePathname();
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="bg-opacity-15 px-4 pt-14 first:pt-10 md:px-6 md:pt-16 lg:pt-24"
    >
      <PrismicRichText
        field={slice.primary.heading}
        components={{
          heading2: ({ children }) => (
            <h2
              className={`${russoOne.className} w-full items-center text-balance rounded-lg py-2 text-center text-4xl backdrop-blur-sm text-shadow-sm md:text-4xl lg:text-5xl`}
            >
              {children}
            </h2>
          ),
          em: ({ children }) => (
            <em className="bg-gradient-to-b from-[#F5F5DC] to-[#87CEEB] bg-clip-text not-italic text-transparent">
              {children}
            </em>
          ),
        }}
      />
      <div className="bg-opacity-15 px-4 py-14 first:pt-10 md:px-6 md:py-20 lg:py-24">
        <div
          className={`${pathname === "/aboutus" ? "-mt-[3rem]" : ""} text-balance text-center text-2xl`}
        >
          <PrismicRichText field={slice.primary.body} />
        </div>

        <div
          className={`${pathname === "/aboutus" ? "mt-[8rem]" : "mt-8"} grid max-w-5xl grid-rows-[auto_auto_auto] gap-8 md:grid-cols-3 md:gap-10`}
        >
          {slice.primary.bento_box.map((item) => (
            <div
              className={clsx(
                "row-span-3 grid grid-rows-subgrid items-center gap-4 rounded-lg border border-gray-300 p-[1rem] shadow-2xl",
                item.wide ? "md:col-span-2" : "md:col-span-1",
              )}
              key={asText(item.title)}
            >
              <h3 className={`${russoOne.className} text-2xl`}>
                <PrismicRichText field={item.title} />
              </h3>
              <div className="max-w-md text-balance font-medium">
                <PrismicRichText field={item.body} />
              </div>

              <PrismicNextImage
                field={item.image}
                alt=""
                className="max-h-36 w-auto items-center justify-center rounded-xl"
              />
            </div>
          ))}
        </div>
      </div>
    </Bounded>
  );
};

export default Bento;
