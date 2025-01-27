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
          item.case_study.id,
        );
      }
    }),
  );
  return (
    // <div className="bg-black opacity-80">
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={`${roboto.className} bg-[url('/images/27.webp')] bg-cover bg-fixed bg-center px-4 py-14 text-secondary first:pt-10 md:px-6 md:py-20 lg:py-24`}
    >
      <h2
        className={`${russoOne.className} max-w-2xl text-balance p-4 text-center text-5xl font-medium md:text-7xl`}
      >
        <PrismicRichText field={slice.primary.heading} />
      </h2>
      <div className="mt-16 grid items-center gap-8 rounded-xl border border-blue-50/20 bg-gradient-to-b from-slate-50/15 to-slate-50/5 px-8 py-8 backdrop-blur-sm lg:gap-0 lg:py-12">
        <div className="z-10 flex flex-col items-center justify-center">
          <div className="mx-auto mt-6 max-w-md text-balance text-center text-2xl lg:text-3xl">
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
                        index % 2 && "md:-order-1",
                      )}
                    ></PrismicNextImage>
                  </div>
                ),
            )}
          </div>
        </div>
      </div>
    </Bounded>
    // </div>
  );
};

export default CaseStudies;
