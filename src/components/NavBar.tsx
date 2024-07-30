"use client";

import { useState } from "react";
import Link from "next/link";
import { Content, asLink } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import ButtonLink from "@/components/ButtonLink";
import WordMark from "@/components/WordMark";
import { MdMenu, MdClose } from "react-icons/md";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { PrismicRichText } from "@prismicio/react";
import { PiCrossBold } from "react-icons/pi";
import { Russo_One } from "next/font/google";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";

const russoOne = Russo_One({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

type NavBarProps = {
  settings: Content.SettingsDocument;
};

export default function NavBar({ settings }: NavBarProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const container = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  gsap.registerPlugin(useGSAP);

  useGSAP(
    () => {
      if (prefersReducedMotion) {
        gsap.set(
          ".hero__heading,.hero__body, .hero__button, .hero__image, .hero__glow",
          { opacity: 1 },
        );
        return;
      }
      const tl = gsap.timeline({ defaults: { ease: "power2.inOut" } });

      tl.fromTo(
        ".header__heading",
        { scale: 0.5 },
        { scale: 1, opacity: 1, duration: 1.4 },
      );
      tl.fromTo(
        ".header__menu",
        { y: -20 },
        { y: 0, opacity: 1, duration: 1.2 },
        "-=0.6",
      );
      // tl.fromTo(
      //   ".hero__button",
      //   { scale: 1.5 },
      //   { scale: 1, opacity: 1, duration: 1.3 },
      //   "-=0.8",
      // );
      // tl.fromTo(
      //   ".hero__image",
      //   { y: -100 },
      //   { y: 0, opacity: 1, duration: 1.3 },
      //   "+=0.3",
      // );
      // tl.fromTo(
      //   ".hero__imagee",
      //   { y: 0 },
      //   { y: 0, opacity: 1, duration: 1.3, display:"block" },
      //   "+=0.3",
      // );
      // tl.fromTo(
      //   ".hero__glow",
      //   { scale: 0.5 },
      //   { scale: 1, opacity: 1, duration: 1.8 },
      //   "-=1",
      // );
    },
    { scope: container },
  );

  return (
    <nav
      className="lg-:py-6 fixed z-10 w-full px-4 py-4 lg:px-6 "
      aria-label="Main"
      ref={container}
    >
      <div className=" mx-auto flex flex-col justify-between py-2 font-medium text-white opacity-95 lg:flex-row lg:items-center">
        <div className="flex items-center justify-between header__heading opacity-0" >
          <Link href="/" className="z-50" onClick={() => setOpen(false)}>
            <span className="sr-only">Covenant City Church Home Page</span>
            <div
              className={`${russoOne.className} header__heading flex flex-row text-balance text-center text-2xl font-medium md:text-4xl`}
            >
              <PiCrossBold className="-ml-2 h-[3.7rem] w-auto md:h-[4.6rem]" />
              <div className="flex-col">
                <h2 className="text-left">Covenant</h2>
                <em className="-mt-2 text-[1.2rem] font-medium not-italic md:text-[1.8rem]">
                  City Church
                </em>
              </div>
              {/* bg-gradient-to-b from-yellow-100 to-yellow-500 bg-clip-text not-italic text-transparent */}
            </div>
          </Link>

          <button
            type="button"
            className="block p-2 text-3xl text-white lg:hidden"
            aria-expanded={open}
            onClick={() => setOpen(true)}
          >
            <MdMenu />
            <span className="sr-only">Open menu</span>
          </button>
        </div>
        {/* Mobile Nav */}
        <div
          className={clsx(
            "ga-4 fixed bottom-0 left-0 right-0 top-0 z-40 flex flex-col items-end bg-[#070815] pr-4 pt-14 transition-transform duration-300 ease-in-out motion-reduce:transition-none lg:hidden",
            open ? "translate-x-0" : "translate-x-[100%]",
          )}
        >
          <button
            type="button"
            className="fixed right-4 top-4 mb-4 block p-2 text-3xl text-white lg:hidden"
            aria-expanded={open}
            onClick={() => setOpen(false)}
          >
            <MdClose />
            <span className="sr-only">Close menu</span>
          </button>

          <div className="z-20 grid justify-items-end gap-8">
            {settings.data.navigation.map((item) => {
              if (item.cta_button) {
                return (
                  <ButtonLink
                    key={item.label}
                    field={item.link}
                    onClick={() => setOpen(false)}
                    aria-current={
                      pathname.includes(asLink(item.link) as string)
                        ? "page"
                        : undefined
                    }
                  >
                    {item.label}
                  </ButtonLink>
                );
              }
              return (
                <PrismicNextLink
                  key={item.label}
                  className="block px-3 text-3xl first:mt-8"
                  field={item.link}
                  onClick={() => setOpen(false)}
                  aria-current={
                    pathname.includes(asLink(item.link) as string)
                      ? "page"
                      : undefined
                  }
                >
                  {item.label}
                </PrismicNextLink>
              );
            })}
          </div>
        </div>

        {/* Desktop Nav */}
        <ul className="hidden gap-6 lg:flex header__menu opacity-0 ">
          {settings.data.navigation.map((item) => {
            if (item.cta_button) {
              return (
                <li key={item.label}>
                  <ButtonLink
                    field={item.link}
                    aria-current={
                      pathname.includes(asLink(item.link) as string)
                        ? "page"
                        : undefined
                    }
                  >
                    {item.label}
                  </ButtonLink>
                </li>
              );
            }

            return (
              <li key={item.label}>
                <PrismicNextLink
                  field={item.link}
                  className="inline-flex min-h-11 items-center"
                  aria-current={
                    pathname.includes(asLink(item.link) as string)
                      ? "page"
                      : undefined
                  }
                >
                  {item.label}
                </PrismicNextLink>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
