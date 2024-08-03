import WordMark from "@/components/WordMark";
import { createClient } from "@/prismicio";
import { isFilled } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import { PrismicText } from "@prismicio/react";
import { Russo_One } from "next/font/google";
import Link from "next/link";
import { GiGlobe } from "react-icons/gi";
import { RiCrossLine } from "react-icons/ri";

const russoOne = Russo_One({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});


export default async function Footer() {
  const client = createClient();
  const settings = await client.getSingle("settings");
  return (
    <footer className={`${russoOne.className} flex flex-col items-center justify-between gap-6 border-t border-slate-600 px-8 py-7 md:flex-row bg-[#F5F5F5] text-gray-700 opacity-95`}>
      <Link href="/" className="z-50 mr-10" >
            <span className="sr-only">Covenant City Church Home Page</span>
            <div
              className={` header__heading flex flex-row text-balance text-center text-2xl font-medium md:text-3xl`}
            >
              <div className="-mt-[0.1rem] ml-[2rem] flex flex-col">
                <RiCrossLine
                  color="black"
                  className="-ml-2 h-[1.5rem] w-auto opacity-60 md:h-[1.8rem]"
                />
                <GiGlobe
                  color="black"
                  className="-ml-2 -mt-[1rem] h-[2.4rem] w-auto opacity-60 md:h-[2.6rem]"
                />
                {/* <FcGlobe  className="-ml-2 -mt-[2.05rem] md:-mt-[2.3rem]  h-[1.35rem] w-auto md:h-[1.5rem] opacity-95"/> */}
              </div>

              <div className="ml-[0.5rem] flex-col">
                {isFilled.richText(settings.data.logo_label_top) && (
                  <h2 className="-mb-[0.8rem] text-left">
                    <PrismicText field={settings.data.logo_label_top} />
                  </h2>
                )}
                {isFilled.richText(settings.data.logo_label_bot) && (
                  <h2 className="text-[1.2rem] font-medium not-italic md:text-[1.5rem]">
                    <PrismicText field={settings.data.logo_label_bot} />
                  </h2>
                )}
              </div>
              {/* bg-gradient-to-b from-yellow-100 to-yellow-500 bg-clip-text not-italic text-transparent */}
            </div>
          </Link>
      <nav aria-label="Footer">
        <ul className="flex gap-6 text-2xl">
          {settings.data.navigation
            .filter(
              (_, index) =>
                index === 0 || index === settings.data.navigation.length - 1,
            )
            .map((item) => (
              <li key={item.label}>
                <PrismicNextLink
                  className="inline-flex min-h-11 items-center"
                  field={item.link}
                >
                  {item.label}
                </PrismicNextLink>
              </li>
            ))}
        </ul>
      </nav>
    </footer>
  );
}
