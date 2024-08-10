import { SliceComponentProps } from "@prismicio/react";
import { Content } from "@prismicio/client";
import { FaUser, FaDonate, FaHandsHelping, FaPhone } from "react-icons/fa";

/**
 * Props for `Founder`.
 */
export type FounderProps = SliceComponentProps<Content.FounderSlice>;

/**
 * Component for "Founder" Slices.
 */
const Founder = ({ slice }: FounderProps): JSX.Element => {
  return (
    <section className={`about-one ${slice.primary.heading || ""} py-16`}>
    
    </section>
  );
};

export default Founder;
