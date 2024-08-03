// src/components/ButtonLink.tsx

import { PrismicNextLink, PrismicNextLinkProps } from "@prismicio/next";
import clsx from "clsx";

export default function ButtonLink({
  className,
  ...restProps
}: PrismicNextLinkProps) {
  return (
    <PrismicNextLink
      className={clsx(
        "hover:border-black-200/40 bg- relative inline-flex h-fit w-fit rounded-lg border border-black bg-[#F8F8FF] bg-opacity-80 px-2 py-1 text-blue-800 outline-none ring-green-400 transition-colors after:absolute after:inset-0 after:-z-10 after:animate-pulse after:rounded-full after:bg-blue-800 after:bg-opacity-0 after:blur-md after:transition-all after:duration-500 hover:text-yellow-500 after:hover:bg-opacity-15 focus:ring-2",
        className,
      )}
      {...restProps}
    />
  );
}
