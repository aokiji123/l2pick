"use client";
import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { RiMenu2Line } from "react-icons/ri";
import { MenuContent } from "./MenuSidebar";
import { useTranslation } from "@/contexts/LanguageContext";

const MobileMenu = () => {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className="lg:hidden w-full mb-3 cursor-pointer flex items-center justify-center gap-2 bg-brand-btn-gray-3 text-white text-sm h-10 border border-brand-btn-gray-3 rounded-xl transition-all duration-200">
        <RiMenu2Line className="text-lg stroke-1" />
        {t("mobile_menu")}
      </SheetTrigger>
      <SheetContent
        className="bg-brand-main border-none w-full"
        side="left"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <SheetHeader>
          <SheetTitle className="sr-only">title</SheetTitle>
        </SheetHeader>
        <div className="max-h-screen overflow-y-auto scroll-style">
          <MenuContent onLogout={() => setOpen(false)} />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
