import MobileFilterSidebar from "@/components/common/MobileFilterSidebar";
import SearchSidebar from "@/components/common/SearchSidebar";
import ServersSection from "@/components/elements/ServersSection";

export default function Home() {
  return (
    <>
      <MobileFilterSidebar />
      <div className="flex items-stretch min-h-screen">
        <SearchSidebar />
        <div className="w-full flex-1 bg-white dark:bg-brand-main-dark rounded-2xl lg:rounded-l-none p-3 lg:p-4">
          <ServersSection />
        </div>
      </div>
    </>
  );
}
