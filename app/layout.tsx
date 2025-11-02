import type { Metadata } from "next";
import "./globals.css";
import Image from "next/image";
import Footer from "@/components/common/Footer";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import QueryProvider from "@/components/providers/QueryProvider";
import { AppLoadingProvider } from "@/components/providers/AppLoadingProvider";
import { FilterProvider } from "@/contexts/FilterContext";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "L2pick",
  description: "L2pick",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-brand-light dark:bg-brand-dark max-w-screen overflow-x-hidden">
        <QueryProvider>
          <FilterProvider>
            <ThemeProvider
              attribute="data-theme"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <AppLoadingProvider>
                <Image
                  src="/left.png"
                  alt="Left"
                  width={1658}
                  height={900}
                  className=" absolute top-0 left-0 z-0 w-[1658px] h-auto mix-blend-mode"
                />
                <Image
                  src="/right.png"
                  alt="Right"
                  width={1487}
                  height={999}
                  className=" absolute top-0 right-0 z-0 w-[1487px] h-auto dark:mix-blend-mode"
                />
                <div className="relative z-10">
                  {children}
                  <Footer />
                </div>
                <Toaster richColors position="top-right" />
              </AppLoadingProvider>
            </ThemeProvider>
          </FilterProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
