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
}
export default function ButtonLink({
  className,
  ...restProps
}: PrismicNextLinkProps) {
  return (
    <PrismicNextLink
      className={clsx(
        `${russoOne.className}`,
        "hover:border-black-200/40 bg- bg-background-contrast relative inline-flex h-fit w-fit rounded-lg border border-[#333] bg-opacity-60 px-2 py-1 text-foreground outline-none ring-blue-800 transition-colors after:absolute after:inset-0 after:-z-10 after:animate-pulse after:rounded-full after:bg-blue-600 after:bg-opacity-0 after:blur-md after:transition-all after:duration-500 hover:text-sky-700 after:hover:bg-opacity-15 focus:ring-2",
        className,
      )}
      {...restProps}
    />
  );
}
