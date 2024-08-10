import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `Location`.
 */
export type LocationProps = SliceComponentProps<Content.LocationSlice>;

/**
 * Component for "Location" Slices.
 */
const Location = ({ slice }: LocationProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      Placeholder component for location (variation: {slice.variation}) Slices
    </section>
  );
};

export default Location;
