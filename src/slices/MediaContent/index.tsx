import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `MediaContent`.
 */
export type MediaContentProps = SliceComponentProps<Content.MediaContentSlice>;

/**
 * Component for "MediaContent" Slices.
 */
const MediaContent = ({ slice }: MediaContentProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      Placeholder component for media_content (variation: {slice.variation})
      Slices
    </section>
  );
};

export default MediaContent;
