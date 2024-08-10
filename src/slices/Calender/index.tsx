import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `Calender`.
 */
export type CalenderProps = SliceComponentProps<Content.CalenderSlice>;

/**
 * Component for "Calender" Slices.
 */
const Calender = ({ slice }: CalenderProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      Placeholder component for calender (variation: {slice.variation}) Slices
    </section>
  );
};

export default Calender;
