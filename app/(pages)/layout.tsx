"use client";
import Header from "@/components/common/Header";
import Info from "@/components/common/Info";
import Image from "next/image";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="max-w-[1456px] mx-auto px-1 sm:px-4 xl:px-2 pt-32 md:pt-52 lg:pt-64">
      <Image
        src="/bg-right-1.png"
        alt="Left"
        width={216}
        height={553}
        className="hidden lg:block absolute top-[480px] right-0 z-10"
      />
      <div className={`xl:w-[94%] mx-auto`}>
        <Header />
        <div className="relative z-50">
          <Image
            src="/bg-left-1.png"
            alt="Left"
            width={123}
            height={354}
            className="hidden lg:block absolute top-40 -left-10 -z-10"
          />
          <Image
            src="/bg-left-2.png"
            alt="Left"
            width={123}
            height={182}
            className="hidden lg:block absolute -top-1 -left-14 -z-10"
          />
          <Image
            src="/bg-top.png"
            alt="Left"
            width={185}
            height={128}
            className="hidden lg:block absolute -top-8 left-72 -z-10"
          />
          <Image
            src="/bg-right-2.png"
            alt="Left"
            width={111}
            height={145}
            className="hidden lg:block absolute top-1 -right-10 -z-10"
          />
          {children}
        </div>
        <Info />
      </div>
    </main>
  );
}
