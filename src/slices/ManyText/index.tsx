import Bounded from "@/components/Bounded";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { FaFacebook, FaYoutube } from "react-icons/fa";

/**
 * Props for ManyText.
 */
export type ManyTextProps = SliceComponentProps<Content.ManyTextSlice>;

/**
 * Component for "ManyText" Slices.
 */
const ManyText = ({ slice }: ManyTextProps): JSX.Element => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="bg-gray-50 py-12"
    >
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-gray-800">Contact</h2>
          <p className="mt-2 text-gray-600">
            We're here to help and answer any questions you might have.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="flex flex-col items-center">
            <h3 className="mb-4 text-xl font-semibold text-gray-700">
              Get in Touch
            </h3>
            <p className="text-gray-600">
              <strong>Phone:</strong> +1 (800) 123-4567
            </p>
            <p className="mt-2 text-gray-600">
              <strong>Email:</strong> contact@yourdomain.com
            </p>
          </div>

          <div className="flex flex-col items-center">
            <h3 className="mb-4 text-xl font-semibold text-gray-700">
              Follow Us
            </h3>
            <div className="flex space-x-6">
              <a
                href="https://www.facebook.com/yourpage"
                target="_blank"
                rel="noopener noreferrer"
                className="text-3xl text-gray-600 hover:text-blue-600"
                aria-label="Facebook"
              >
                <FaFacebook />
              </a>
              <a
                href="https://www.youtube.com/yourchannel"
                target="_blank"
                rel="noopener noreferrer"
                className="text-3xl text-gray-600 hover:text-red-600"
                aria-label="YouTube"
              >
                <FaYoutube />
              </a>
            </div>
          </div>
        </div>
      </div>
    </Bounded>
  );
};

export default ManyText;
