"use client";

import React, { useEffect, useState } from "react";
import { useAuthTelegram } from "@/lib/queries/useAuth";
import { useAuthStore } from "@/contexts/AuthStore";
import { useRouter } from "next/navigation";
import { FaTelegramPlane } from "react-icons/fa";
import { useTranslation } from "@/contexts/LanguageContext";

interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  photo_url?: string;
  auth_date: number;
  hash: string;
}

interface TelegramLoginProps {
  onError?: (error: string) => void;
  className?: string;
}

const TelegramLogin: React.FC<TelegramLoginProps> = ({
  onError,
  className = "bg-[linear-gradient(135deg,#58bbfc,#1e9de6)] flex items-center justify-center size-11 rounded-full hover:opacity-90 transition relative before:absolute cursor-pointer before:size-11 before:rounded-full before:bg-[#1e9de6] before:top-1 before:left-px before:blur-md before:opacity-60 before:-z-10 disabled:opacity-50 disabled:cursor-not-allowed",
}) => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [telegramData, setTelegramData] = useState<TelegramUser | null>(null);
  const telegramMutation = useAuthTelegram();
  const loginStore = useAuthStore((s) => s.login);
  const router = useRouter();

  useEffect(() => {
    // Check if we're in a Telegram Web App
    const isTelegramWebApp =
      typeof window !== "undefined" && (window as any).Telegram?.WebApp;

    if (isTelegramWebApp) {
      const tg = (window as any).Telegram.WebApp;
      tg.ready();

      // Get user data from Telegram Web App
      const user = tg.initDataUnsafe?.user;
      if (user) {
        setTelegramData({
          id: user.id,
          first_name: user.first_name,
          last_name: user.last_name,
          username: user.username,
          photo_url: user.photo_url,
          auth_date: Math.floor(Date.now() / 1000),
          hash: tg.initDataUnsafe?.hash || "telegram_hash",
        });
      }
    }
  }, []);

  const handleTelegramLogin = async () => {
    if (!telegramData) {
      // Fallback to mock data for development/testing
      const mockData: TelegramUser = {
        id: Math.floor(Math.random() * 1000000),
        first_name: "Telegram",
        last_name: "User",
        username: "telegram_user",
        photo_url: "/avatar.png",
        auth_date: Math.floor(Date.now() / 1000),
        hash: "mock_hash_" + Math.random().toString(36).substr(2, 9),
      };

      await performLogin(mockData);
      return;
    }

    await performLogin(telegramData);
  };

  const performLogin = async (userData: TelegramUser) => {
    setIsLoading(true);
    try {
      // Format the data to match TelegramRequest type
      const formattedData = {
        id: userData.id,
        first_name: userData.first_name,
        last_name: userData.last_name || "",
        username: userData.username || "",
        photo_url: userData.photo_url || "/avatar.png",
        auth_date: userData.auth_date,
        hash: userData.hash,
      };

      const response = await telegramMutation.mutateAsync(formattedData);

      // Store token in localStorage for social logins (always remember)
      localStorage.setItem("auth-token", response.access_token);

      // Update auth store
      loginStore(response.user, response.access_token);

      // Redirect to home page
      router.push("/");
    } catch (error: any) {
      console.error("Telegram login error:", error);
      onError?.(
        error.response?.data?.message || t("telegram_login_error")
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleTelegramLogin}
      disabled={isLoading}
      className={className}
    >
      {isLoading ? (
        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
      ) : (
        <FaTelegramPlane className="text-white w-6 h-6" />
      )}
    </button>
  );
};

export default TelegramLogin;
