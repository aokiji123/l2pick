"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaDiscord,
  FaTelegramPlane,
  FaTwitch,
  FaYoutube,
} from "react-icons/fa";
import { useTranslation } from "@/contexts/LanguageContext";

type NavItem = { label: string; href: string };

const Footer = () => {
  const pathname = usePathname();
  const { t } = useTranslation();

  const mainLinks: NavItem[] = [
    { label: t("footer_home"), href: "/" },
    { label: t("footer_contacts"), href: "/contacts" },
    { label: t("footer_about"), href: "/about" },
    { label: t("rules_title"), href: "/rules" },
  ];

  const infoLinks: NavItem[] = [
    { label: t("footer_placement"), href: "/placement" },
    { label: t("contacts_faq"), href: "/faqs" },
    { label: t("footer_sitemap"), href: "/sitemap" },
    { label: t("footer_cookies"), href: "/cookies" },
    { label: t("footer_terms"), href: "/terms" },
    { label: t("footer_privacy"), href: "/privacy" },
  ];

  const linkClass = (href: string) => {
    const isActive = pathname === href;
    return [
      "transition-colors text-[#B4B8C3] leading-5",
      isActive ? "text-brand-btn" : "hover:text-gray-300",
    ].join(" ");
  };

  return (
    <footer className="bg-brand-main dark:bg-brand-main-dark py-14 ">
      <div
        className={`max-w-[1364px] xl:w-[90%] mx-auto flex flex-col-reverse md:flex-row items-start justify-between gap-10 md:gap-5 px-4 xl:px-2`}
      >
        {/* left */}
        <div className="flex items-start justify-between md:justify-start gap-12 w-full md:w-fit lg:gap-[74px]">
          <div>
            <h3 className="text-lg text-white font-bold uppercase mb-4">
              {t("footer_main")}
            </h3>
            <ul className="space-y-2">
              {mainLinks.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className={linkClass(href)}
                    aria-current={pathname === href ? "page" : undefined}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column - ИНФОРМАЦИЯ */}
          <div>
            <h3 className="text-lg text-white font-bold uppercase mb-4">
              {t("footer_information")}
            </h3>
            <ul className="space-y-2">
              {infoLinks.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className={linkClass(href)}
                    aria-current={pathname === href ? "page" : undefined}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {/* right */}
        <div className="flex flex-col md:items-end w-full">
          <div className="text-white text-3xl font-extrabold uppercase mb-1">
            <span>l2pick.</span>
            <span className="text-brand-btn">com</span>
          </div>
          <h2 className="text-[17px] leading-7 text-white font-bold">
            {t("announcements")}
          </h2>

          <div className="mt-18">
            <div className="flex text-center gap-5">
              <Link
                className="flex items-center justify-center size-9 rounded-lg bg-brand-btn-gray hover:bg-brand-btn"
                href={"#"}
              >
                <FaYoutube className="text-white text-xl" />
              </Link>
              <Link
                className="flex items-center justify-center size-9 rounded-lg bg-brand-btn-gray hover:bg-brand-btn"
                href={"#"}
              >
                <FaDiscord className="text-white text-xl" />
              </Link>
              <Link
                className="flex items-center justify-center size-9 rounded-lg bg-brand-btn-gray hover:bg-brand-btn"
                href={"#"}
              >
                <FaTelegramPlane className="text-white text-xl" />
              </Link>
              <Link
                className="flex items-center justify-center size-9 rounded-lg bg-brand-btn-gray hover:bg-brand-btn"
                href={"#"}
              >
                <FaTwitch className="text-white text-xl" />
              </Link>
            </div>
            <p className="hidden md:block mt-5 text-[15px] text-right text-[#575b66]">
              © 2012-2025 L2pick.com
            </p>
          </div>
        </div>
      </div>
      <p className="md:hidden mt-5 text-[15px] text-center text-[#575b66]">
        © 2012-2025 L2pick.com
      </p>
    </footer>
  );
};

export default Footer;
