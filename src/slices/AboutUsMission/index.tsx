import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `AboutUsMission`.
 */
export type AboutUsMissionProps =
  SliceComponentProps<Content.AboutUsMissionSlice>;

/**
 * Component for "AboutUsMission" Slices.
 */
const AboutUsMission = ({ slice }: AboutUsMissionProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      Placeholder component for about_us_mission (variation: {slice.variation})
      Slices
    </section>
  );
};

export default AboutUsMission;
