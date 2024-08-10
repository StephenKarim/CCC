"use client";
import Bounded from "@/components/Bounded";
import { createClient } from "@/prismicio";
import { Content, isFilled, asText } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import {
  PrismicRichText,
  PrismicText,
  SliceComponentProps,
} from "@prismicio/react";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import {
  Russo_One,
  Dancing_Script,
  Bebas_Neue,
  Roboto,
} from "next/font/google";

const russoOne = Russo_One({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"], // Choose weights if needed
  display: "swap", // Optional: Adjust font-display property
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400"], // Choose weights if needed
  display: "swap", // Optional: Adjust font-display property
});

/**
 * Props for `Testimonial`.
 */
export type TestimonialProps = SliceComponentProps<Content.TestimonialSlice>;

/**
 * Component for "Testimonial" Slices.
 */
const Testimonial = ({ slice }: TestimonialProps): JSX.Element => {
  const pathname = usePathname();
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="ios:bg-scroll relative bg-[url('/images/27.webp')] bg-cover bg-fixed bg-center px-4 py-14 text-shadow-lg first:pt-10 md:px-6 md:py-20 lg:py-24"
    >
      <h2
        className={`${russoOne.className} ${pathname === "/aboutus" ? "max-w-[55rem]" : ""} pt-7 grid bg-background-contrast w-full rounded-lg border border-sky-600/20 bg-opacity-90 py-4 text-center text-4xl text-shadow md:text-4xl lg:text-5xl`}
      >
        <PrismicRichText field={slice.primary.heading} />
        <div
            className={`${russoOne.className} my-[2rem] text-balance text-2xl justify-center items-center text-center font-light text-shadow-sm`}
          >
            <PrismicText field={slice.primary.body} />
          </div>
      </h2>
      
      <div className="bg-background-contrast mt-16 grid items-center gap-8 rounded-xl border border-sky-600/20 bg-opacity-90 px-8 py-8 lg:gap-0 lg:py-12">
        <div
          className={`${pathname === "/aboutus" ? "p-10" : ""} flex flex-col items-center justify-center`}
        >        

          <div className="grid gap-16">
            {slice.primary.testimonials.map((item, index) => (
              <div
                key={asText(item.title)}
                className="relative grid gap-4 opacity-85 transition-opacity duration-300 hover:cursor-pointer hover:opacity-100 md:grid-cols-2 md:gap-8 lg:grid-cols-3"
              >
                <div className="col-span-1 flex flex-col items-center justify-center gap-4">
                  <h3
                    className={`${russoOne.className} mt-6 text-4xl font-normal`}
                  >
                    <PrismicText field={item.title} />
                  </h3>
                  <div className="mt-4 text-balance px-1 pb-4 text-xl font-medium">
                    <PrismicRichText field={item.body} />
                  </div>
                  {/* <PrismicNextLink
                    document={testimonial}
                    className="after:absolute after:inset-0 hover:underline"
                    >
                    Read <PrismicText field={testimonial.data.company} /> Case
                    Study
                    </PrismicNextLink> */}
                </div>
                <PrismicNextImage
                  field={item.image}
                  quality={100}
                  alt=""
                  className={clsx(
                    "m-auto max-h-[20rem]  w-auto lg:col-span-2",
                    `${pathname === "/aboutus" ? "rounded-full" : "rounded-xl"}`,
                    index % 2 && "md:-order-1",
                  )}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Bounded>
  );
};

export default Testimonial;
