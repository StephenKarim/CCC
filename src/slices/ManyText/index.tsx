import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `ManyText`.
 */
export type ManyTextProps = SliceComponentProps<Content.ManyTextSlice>;

/**
 * Component for "ManyText" Slices.
 */
const ManyText = ({ slice }: ManyTextProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      Placeholder component for many_text (variation: {slice.variation}) Slices
    </section>
  );
};

export default ManyText;
