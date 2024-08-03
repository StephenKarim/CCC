import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `AboutUsStory`.
 */
export type AboutUsStoryProps = SliceComponentProps<Content.AboutUsStorySlice>;

/**
 * Component for "AboutUsStory" Slices.
 */
const AboutUsStory = ({ slice }: AboutUsStoryProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      Placeholder component for about_us_story (variation: {slice.variation})
      Slices
    </section>
  );
};

export default AboutUsStory;
