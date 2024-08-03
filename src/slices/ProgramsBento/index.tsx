import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `ProgramsBento`.
 */
export type ProgramsBentoProps =
  SliceComponentProps<Content.ProgramsBentoSlice>;

/**
 * Component for "ProgramsBento" Slices.
 */
const ProgramsBento = ({ slice }: ProgramsBentoProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      Placeholder component for programs_bento (variation: {slice.variation})
      Slices
    </section>
  );
};

export default ProgramsBento;
