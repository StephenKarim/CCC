import Bounded from "@/components/Bounded";
import { asText, Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { Russo_One } from "next/font/google";
import clsx from "clsx";

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
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="px-4 py-14 first:pt-10 md:px-6 md:py-20 lg:py-24 bg-opacity-15"
      // className="bg-[url('/images/I1.jpg')] bg-fixed bg-cover" {/* bg-[#F5F5DC] bg-[#7ec2dd] text-[#333333]*/}
    >
      <PrismicRichText
        field={slice.primary.heading}
        components={{
          heading2: ({ children }) => (
            <h2
            className={`${russoOne.className} py-2 backdrop-blur-sm text-balance w-full rounded-lg text-center text-4xl text-shadow-sm md:text-4xl lg:text-5xl`}
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
      <div className=" px-4 py-14 first:pt-10 md:px-6 md:py-20 lg:py-24 bg-opacity-15 ">

      <div className="mx-auto mt-6 max-w-md text-balance text-center">
        <PrismicRichText field={slice.primary.body} />
      </div>

      <div className="mt-8 grid max-w-5xl grid-rows-[auto_auto_auto] gap-8 md:grid-cols-3 md:gap-10">
        {slice.primary.bento_box.map((item) => (
          <div
          className={clsx(
            "row-span-3 grid grid-rows-subgrid gap-4 rounded-lg border border-gray-300 p-[0.8rem] shadow-2xl",
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
              className="max-h-36 w-auto justify-center items-center"
              />
          </div>
        ))}
      </div>
        </div>
    </Bounded>
  );
};

export default Bento;
