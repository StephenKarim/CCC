// src/components/ButtonLink.tsx

import { PrismicNextLink, PrismicNextLinkProps } from "@prismicio/next";
import clsx from "clsx";
import { Russo_One, Dancing_Script, Bebas_Neue } from "next/font/google";

const russoOne = Russo_One({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});
{
  /* bg-[#F5F5DC] bg-[#7ec2dd] text-[#333333]*/
}
export default function ButtonLink({
  className,
  ...restProps
}: PrismicNextLinkProps) {
  return (
    <PrismicNextLink
      className={clsx(
        `${russoOne.className}`,
        "hover:border-black-200/40 border border-[#333] bg- relative inline-flex h-fit w-fit rounded-lg bg-white bg-opacity-60 px-2 py-1 text-[#333333] outline-none ring-blue-800 transition-colors after:absolute after:inset-0 after:-z-10 after:animate-pulse after:rounded-full after:bg-blue-600 after:bg-opacity-0 after:blur-md after:transition-all after:duration-500 hover:text-sky-700 after:hover:bg-opacity-15 focus:ring-2",
        className,
      )}
      {...restProps}
    />
  );
}
