"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { Content, asLink, isFilled } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import ButtonLink from "@/components/ButtonLink";
import { MdMenu, MdClose } from "react-icons/md";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { PrismicText } from "@prismicio/react";
import { RiCrossLine } from "react-icons/ri";
import { GiGlobe } from "react-icons/gi";
import { Russo_One } from "next/font/google";
import gsap from "gsap";
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

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024) {
        setOpen(false);
      }
    };

    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);

      handleResize();

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) {
      gsap.set(
        ".hero__heading, .hero__body, .hero__button, .hero__image, .hero__glow",
        { opacity: 1 }
      );
      return;
    }
    const tl = gsap.timeline({ defaults: { ease: "power2.inOut" } });

    tl.fromTo(
      ".header__heading",
      { opacity: 0 },
      { opacity: 1, duration: 1, delay: 0.5 }
    );
    tl.fromTo(
      ".header__menu",
      { x: 100 },
      { x: 0, opacity: 1, duration: 1.2 },
      "-=1.0"
    );
    tl.fromTo(".header__news", {}, { opacity: 1, duration: 1.2 }, "-=1.0");
    tl.fromTo(
      ".header__newss",
      { xPercent: 100 },
      { xPercent: -100, opacity: 1, duration: 15, repeat: -1, ease: "linear" },
      "-=1.0"
    );
  }, [prefersReducedMotion]);

  return (
    <nav
      className={`${russoOne.className} header__heading absolute z-10 h-[80px] w-full bg-[#7ec2dd] bg-opacity-95 p-2 text-[#333333] opacity-0 md:h-[90px]`}
      aria-label="Main"
      ref={container}
    >
      <div
        className={`${open ? "fixed z-50" : ""} mx-auto flex flex-col justify-between py-2 font-medium opacity-95 lg:flex-row lg:items-center`}
      >
        <div className="flex items-center justify-between">
          <Link href="/" className={`z-50`} onClick={() => setOpen(false)}>
            <span className="sr-only">Covenant City Church Home Page</span>
            <div
              className={`${russoOne.className} flex flex-row text-balance text-center text-2xl font-medium md:text-3xl`}
            >
              <div className="-mt-[0.1rem] ml-[2rem] flex flex-col">
                <RiCrossLine
                  color="#333333"
                  className="-ml-2 h-[1.5rem] w-auto opacity-95 md:h-[1.8rem]"
                />
                <GiGlobe
                  color="#333333"
                  className="-ml-2 -mt-[1rem] h-[2.4rem] w-auto opacity-95 md:h-[2.6rem]"
                />
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
            </div>
          </Link>

          <button
            type="button"
            className={`z-50 ${open ? "hidden" : "block p-2 text-3xl lg:hidden"}`}
            aria-expanded={open}
            onClick={() => setOpen(true)}
          >
            <MdMenu className="fixed right-[1.5rem] top-[1.7rem] rounded-sm bg-[#7ec2dd] bg-opacity-60 backdrop-blur-3xl md:top-[1.8rem]" />
            <span className="sr-only">Open menu</span>
          </button>
        </div>
        {/* Mobile Nav */}
        <div
          className={clsx(
            "ga-4 fixed bottom-0 left-0 right-0 top-0 z-40 flex flex-col items-end bg-[#7ec2dd] bg-opacity-[1] pr-4 pt-14 transition-transform duration-300 ease-in-out motion-reduce:transition-none lg:hidden",
            open ? "translate-x-0" : "translate-x-[100%]"
          )}
        >
          <button
            type="button"
            className="fixed right-4 top-4 mb-4 block p-2 text-3xl z-50 lg:hidden"
            aria-expanded={open}
            onClick={() => setOpen(false)}
          >
            <MdClose />
            <span className="sr-only">Close menu</span>
          </button>

          <div className="z-50 grid justify-items-end gap-8">
            {settings.data.navigation.map((item) => {
              if (item.cta_button) {
                return (
                  <ButtonLink
                    className="text-xl"
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
                  className="block px-3 text-xl first:mt-8"
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
        <ul className="header__menu hidden gap-6 text-lg opacity-0 lg:flex">
          {settings.data.navigation.map((item) => {
            if (item.cta_button) {
              return (
                <li key={item.label}>
                  <ButtonLink
                    className=""
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
      {isFilled.richText(settings.data.news) && (
        <div
          className={`header__news left-0 -mt-[0.5rem] flex max-h-[1.5rem] items-center justify-end overflow-hidden rounded-sm bg-white bg-opacity-70 opacity-0 z-50`}
        >
          <div
            className={`${open ? "fixed z-50 mt-[10rem] text-center italic text-[#800000] sm:w-[75vw]" : "sm:w-[80vw]"} header__newss max-h-[1.5rem] w-[100vw] overflow-hidden text-nowrap md:w-[75vw] lg:w-[70vw] xl:w-[65w] 2xl:w-[60vw]`}
          >
            <PrismicText field={settings.data.news} />
          </div>
        </div>
      )}
    </nav>
  );
}
