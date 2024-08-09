import Bounded from "@/components/Bounded";
import { Content } from "@prismicio/client";
import { PrismicText, SliceComponentProps } from "@prismicio/react";
import PlainLogo from "./PlainLogo";
import ButtonLink from "@/components/ButtonLink";
import { Russo_One, Dancing_Script, Bebas_Neue } from "next/font/google";
import { RiCrossLine } from "react-icons/ri";
import { GiGlobe } from "react-icons/gi";

const russoOne = Russo_One({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});
/**
 * Props for `CallToAction`.
 */
export type CallToActionProps = SliceComponentProps<Content.CallToActionSlice>;

/**
 * Component for "CallToAction" Slices.
 */
const CallToAction = ({ slice }: CallToActionProps): JSX.Element => (
  <Bounded
    data-slice-type={slice.slice_type}
    data-slice-variation={slice.variation}
    className="ios:bg-scroll relative min-h-[60vh] border-t-2 border-background bg-[url('/images/call.webp')] bg-cover bg-fixed bg-center px-4 py-32 text-center font-medium text-secondary first:pt-10 md:px-6 md:py-40 lg:py-24"
  >
    {/* <div className="-mt-[3rem] h-4 w-[99vw] bg-background"></div> */}
    {/* <div className="glow absolute -z-10 aspect-square w-full max-w-sm rounded-full bg-blue-500/50 blur-[160px] filter" /> */}
    <div className="flex flex-col rounded-lg bg-gray-200 bg-opacity-60 p-5">
      <div className="mx-auto max-w-[5rem] items-center justify-center rounded-lg bg-background bg-opacity-90 p-4 md:rounded-xl">
        <div className="ml-[0.5rem] flex flex-col items-center justify-center">
          <RiCrossLine
            color="#333333"
            className="-ml-2 h-[1.5rem] w-auto opacity-90 md:h-[1.8rem]"
          />
          <GiGlobe
            color="#333333"
            className="-ml-2 -mt-[1rem] h-[2.4rem] w-auto opacity-90 md:h-[2.6rem]"
          />
          {/* <FcGlobe  className="-ml-2 -mt-[2.05rem] md:-mt-[2.3rem]  h-[1.35rem] w-auto md:h-[1.5rem] opacity-95"/> */}
        </div>
      </div>
      <div
        className={`${russoOne.className} mx-auto mt-8 max-w-xl items-center justify-center p-2 text-4xl uppercase text-foreground text-shadow-lg md:text-3xl lg:text-4xl`}
      >
        <PrismicText field={slice.primary.heading} />
      </div>
      <ButtonLink
        field={slice.primary.button_link}
        className="mx-auto mt-6 items-center justify-center bg-opacity-85"
      >
        {slice.primary.button_text || "Learn More"}
      </ButtonLink>
    </div>
  </Bounded>
);

export default CallToAction;
