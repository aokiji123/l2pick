"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FaPowerOff } from "react-icons/fa";
import { GrServerCluster } from "react-icons/gr";
import { HiSpeakerphone } from "react-icons/hi";
import { IoSettings } from "react-icons/io5";
import { LuUserRound } from "react-icons/lu";
import { useAuthStore } from "@/contexts/AuthStore";
import { useLogout } from "@/lib/queries/useAuth";
import { useTranslation } from "@/contexts/LanguageContext";

const MenuSidebar = () => {
  return (
    <aside className="hidden bg-brand-main lg:flex flex-col w-[267px] rounded-2xl rounded-r-none py-5">
      <MenuContent />
    </aside>
  );
};

export const MenuContent = ({ onLogout }: { onLogout?: () => void } = {}) => {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuthStore();
  const logoutMutation = useLogout();
  const { t } = useTranslation();

  const menuItems = [
    {
      title: t("menu_profile"),
      icon: (
        <LuUserRound className="text-lg font-bold stroke-3 !fill-transparent" />
      ),
      href: "/profile",
    },
    {
      title: t("menu_my_servers"),
      icon: <GrServerCluster className=" font-bold" />,
      href: "/my-servers",
    },
    {
      title: t("menu_banners"),
      icon: <HiSpeakerphone className="text-lg font-bold" />,
      href: "/banners",
    },
    {
      title: t("menu_api"),
      icon: <IoSettings className="text-lg font-bold" />,
      href: "/checking",
    },
  ];

  const handleLogout = async () => {
    try {
      await logoutMutation.mutateAsync();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      logout();
      if (onLogout) {
        onLogout();
      }
      router.push("/");
    }
  };

  return (
    <>
      {menuItems.map((item, idx) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={idx}
            href={item.href}
            className={`relative flex items-center gap-2.5 h-12 px-8 font-bold transition ${
              isActive
                ? "text-white bg-brand-btn-gray-3 [&>svg]:stroke-brand-btn [&>svg]:fill-brand-btn before:absolute before:h-full before:w-1 before:bg-brand-btn before:left-0"
                : "text-white hover:text-white hover:bg-brand-btn-gray-3"
            }`}
          >
            {item.icon}
            <span>{item.title}</span>
          </Link>
        );
      })}
      <button
        onClick={handleLogout}
        className="relative flex items-center gap-2.5 h-12 px-8 font-bold transition text-white hover:text-white hover:bg-brand-btn-gray-3"
      >
        <FaPowerOff className="text-lg font-bold" />
        <span>{t("menu_logout")}</span>
      </button>
    </>
  );
};

export default MenuSidebar;
