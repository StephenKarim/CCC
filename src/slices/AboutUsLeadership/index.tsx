import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `AboutUsLeadership`.
 */
export type AboutUsLeadershipProps =
  SliceComponentProps<Content.AboutUsLeadershipSlice>;

/**
 * Component for "AboutUsLeadership" Slices.
 */
const AboutUsLeadership = ({ slice }: AboutUsLeadershipProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      Placeholder component for about_us_leadership (variation:{" "}
      {slice.variation}) Slices
    </section>
  );
};

export default AboutUsLeadership;
