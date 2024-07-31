import Bounded from "@/components/Bounded";
import { createClient } from "@/prismicio";
import { Content, isFilled } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import {
  PrismicRichText,
  PrismicText,
  SliceComponentProps,
} from "@prismicio/react";
import clsx from "clsx";

import { Russo_One, Dancing_Script, Bebas_Neue, Roboto} from "next/font/google";

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
 * Props for `CaseStudies`.
 */
export type CaseStudiesProps = SliceComponentProps<Content.CaseStudiesSlice>;

/**
 * Component for "CaseStudies" Slices.
 */
const CaseStudies = async ({
  slice,
}: CaseStudiesProps): Promise<JSX.Element> => {
  const client = createClient();

  const caseStudies = await Promise.all(
    slice.primary.case_study.map(async (item) => {
      if (isFilled.contentRelationship(item.case_study)) {
        return await client.getByID<Content.CaseStudyDocument>(
          item.case_study.id
        );
      }
    })
  );
  return (
    // <div className="bg-black opacity-80">
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={`${roboto.className} bg-[url('/images/I3.jpg')] bg-fixed bg-cover text-white`}
    >
<div className=" bg-black bg-opacity-40 rounded-xl p-4">
  
<div className="flex flex-col items-center justify-center z-10">

      <h2 className="max-w-2xl text-balance text-center text-5xl font-medium md:text-7xl p-4">
        <PrismicRichText field={slice.primary.heading} />
      </h2>

      <div className="mx-auto mt-6 max-w-md text-balance text-center ">
        <PrismicRichText field={slice.primary.body} />
      </div>

      <div className="mt-20 grid gap-16">
        {caseStudies.map(
          (caseStudy, index) =>
            caseStudy && (
              <div
              key={caseStudy.id}
              className="relative grid gap-4 opacity-85 transition-opacity duration-300 hover:cursor-pointer hover:opacity-100 md:grid-cols-2 md:gap-8 lg:grid-cols-3"
              >
                <div className="col-span-1 flex flex-col justify-center gap-4">
                  <h3 className="text-4xl">
                    <PrismicText field={caseStudy.data.company} />
                  </h3>
                  <div className="max-w-md"></div>
                  <PrismicRichText field={caseStudy.data.description} />
                  {/* <PrismicNextLink
                    document={caseStudy}
                    className="after:absolute after:inset-0 hover:underline"
                    >
                    Read <PrismicText field={caseStudy.data.company} /> Case
                    Study
                    </PrismicNextLink> */}
                </div>
                <PrismicNextImage
                  field={caseStudy.data.logo_image}
                  quality={100}
                  alt=""
                  className={clsx(
                    "rounded-xl lg:col-span-2",
                    index % 2 && "md:-order-1"
                  )}
                  ></PrismicNextImage>
              </div>
            )
          )}
      </div>
          </div>
          </div>
    </Bounded>
          // </div>
  );
};

export default CaseStudies;
