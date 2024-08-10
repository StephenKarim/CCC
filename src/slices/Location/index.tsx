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
      className="py-12 bg-gray-100"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">
            Where to find us?
          </h2>
          <p className="mt-2 text-gray-600">
            We welcome you to join us at our location. Find us easily using the map below.
          </p>
        </div>

        <div className="flex justify-center">
          <div className="w-full md:w-3/4 lg:w-1/2 shadow-lg rounded-lg overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3925.305505833968!2d-61.427808324057665!3d10.31741728980483!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8c35f37a8765f541%3A0x71013ec5a9c2089c!2sCovenant%20City%20Church!5e0!3m2!1sen!2stt!4v1723327811735!5m2!1sen!2stt"
              width="600"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-96 md:h-[450px]"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Location;
