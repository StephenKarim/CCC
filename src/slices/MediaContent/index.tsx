"use client"
import React, { useState } from "react";
import Bounded from "@/components/Bounded";
import { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `MediaContent`.
 */
export type MediaContentProps = SliceComponentProps<Content.MediaContentSlice>;

/**
 * Component for "MediaContent" Slices.
 */
const MediaContent = ({ slice }: MediaContentProps): JSX.Element => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null,
  );

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
  };

  const handleCloseModal = () => {
    setSelectedImageIndex(null);
  };

  return (
    <>
      <Bounded
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        className="py-12"
      >
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {slice.primary.medialinks.map((item, index) => (
            <div key={index} className="group">
              {/* Render the image */}
              {item.image && item.image.url && (
                <div
                  className="relative cursor-pointer overflow-hidden rounded-lg shadow-lg"
                  onClick={() => handleImageClick(index)}
                >
                  <PrismicNextImage
                    field={item.image}
                    className="transform transition-transform duration-300 ease-in-out group-hover:scale-105"
                  />
                </div>
              )}

              {/* Render the title */}
              {item.title && (
                <div className="mt-4 text-center text-lg font-semibold">
                  {item.title}
                </div>
              )}
            </div>
          ))}
        </div>
      </Bounded>

      {/* Modal for displaying the larger image */}
      {selectedImageIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
          onClick={handleCloseModal}
        >
          <div className="relative">
            <PrismicNextImage
              field={slice.primary.medialinks[selectedImageIndex].image}
              className="max-h-screen max-w-full rounded-lg"
            />
            <button
              className="absolute right-2 top-2 rounded-full bg-black bg-opacity-50 p-1 text-3xl text-white"
              onClick={handleCloseModal}
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default MediaContent;
