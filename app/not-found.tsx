"use client";

import React from "react";
import { RiArrowDropLeftLine } from "react-icons/ri";
import MainButton from "@/components/elements/MainButton";
import Image from "next/image";
import { useTranslation } from "@/contexts/LanguageContext";
import { useRouter } from "next/navigation";

const NotFound = () => {
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <main className="max-w-2xl mx-auto">
      <div className="flex flex-col items-center py-20">
        <div className="text-center mb-14">
          <h1 className="text-4xl md:text-[174px] text-brand-primary dark:text-white font-bold antialiased">
            404
          </h1>
          <p className="text-brand-secondary">{t("not_found_title")}</p>
        </div>
        <MainButton
          onClick={() => router.push("/")}
          className="before:content-[''] before:absolute before:left-0 before:top-2 before:w-full before:h-full before:bg-brand-btn before:rounded-2xl before:opacity-40 before:blur-lg before:-z-10"
          icon={<RiArrowDropLeftLine className="font-extrabold size-6" />}
        >
          {t("not_found_back_home")}
        </MainButton>
        <div className="flex items-center gap-10 mt-[60px]">
          <div className="flex flex-col items-center">
            <Image src="/telegram.png" alt="Left" width={58} height={58} />
            <h3 className="font-semibold dark:text-white mt-3.5">
              {t("contacts_telegram")}
            </h3>

            <button className="flex items-center justify-center max-w-[140px] w-full bg-white text-brand-primary cursor-pointer mt-[18px] text-sm leading-4 font-bold rounded-lg border border-brand-gray text-nowrap px-4 h-11">
              {t("contacts_go_to_chat")} &#8250;
            </button>
          </div>
          <div className="flex flex-col items-center">
            <Image src="/whatsapp.png" alt="Left" width={58} height={58} />
            <h3 className="font-semibold dark:text-white mt-3.5">
              {t("contacts_whatsapp")}
            </h3>

            <button className="flex items-center justify-center max-w-[140px] w-full bg-white text-brand-primary cursor-pointer mt-[18px] text-sm leading-4 font-bold rounded-lg border border-brand-gray text-nowrap px-4 h-11">
              {t("contacts_go_to_chat")} &#8250;
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
