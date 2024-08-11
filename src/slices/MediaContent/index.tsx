"use client";
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
      <section
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        className="py-12"
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {slice.primary.medialinks.map((item, index) => (
            <div
              key={index}
              className="group relative cursor-pointer overflow-hidden rounded-lg shadow-lg"
              onClick={() => handleImageClick(index)}
            >
              {item.image && item.image.url && (
                <PrismicNextImage
                  field={item.image}
                  className="h-auto w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                />
              )}

              {item.title && (
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 py-2 text-center text-lg font-semibold text-white">
                  {item.title}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {selectedImageIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
          onClick={handleCloseModal}
        >
          <div className="relative w-full max-w-3xl">
            <PrismicNextImage
              field={slice.primary.medialinks[selectedImageIndex].image}
              className="max-h-screen max-w-full rounded-lg"
            />
            <button
              className="absolute right-2 top-2 rounded-full bg-black bg-opacity-50 p-1 text-3xl text-white"
              onClick={handleCloseModal}
            >              
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default MediaContent;
