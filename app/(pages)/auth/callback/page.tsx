"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthStore } from "@/contexts/AuthStore";
import { useAuthProviderCallback } from "@/lib/queries/useAuth";
import { Provider } from "@/lib/types/auth";
import { PiCheckFatFill } from "react-icons/pi";

const AuthCallback = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const loginStore = useAuthStore((s) => s.login);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  // Get provider from URL or default to discord
  const provider = (searchParams.get("provider") || "discord") as Provider;

  const callbackQuery = useAuthProviderCallback(provider);

  useEffect(() => {
    const handleCallback = async () => {
      try {
        setIsLoading(true);

        // Call the callback API
        const response = await callbackQuery.refetch();

        if (response.data) {
          // Store token in localStorage for social logins (always remember)
          localStorage.setItem("auth-token", response.data.access_token);

          // Update auth store
          loginStore(response.data.user, response.data.access_token);

          // Redirect to home page
          router.push("/");
        } else {
          throw new Error("No data received from callback");
        }
      } catch (error: any) {
        console.error("OAuth callback error:", error);
        setError("Ошибка авторизации. Попробуйте еще раз.");
      } finally {
        setIsLoading(false);
      }
    };

    handleCallback();
  }, [provider, loginStore, router, callbackQuery]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-light dark:bg-brand-dark">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-brand-btn border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-brand-primary dark:text-white text-lg font-medium">
            Завершение авторизации...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-light dark:bg-brand-dark">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-brand-primary dark:text-white mb-4">
            Ошибка авторизации
          </h1>
          <p className="text-brand-secondary mb-6">{error}</p>
          <button
            onClick={() => router.push("/auth")}
            className="bg-brand-btn text-white px-6 py-3 rounded-lg font-medium hover:opacity-90 transition"
          >
            Вернуться к авторизации
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-light dark:bg-brand-dark">
      <div className="text-center">
        <PiCheckFatFill className="text-green-500 text-6xl mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-brand-primary dark:text-white mb-4">
          Авторизация успешна!
        </h1>
        <p className="text-brand-secondary">
          Перенаправление на главную страницу...
        </p>
      </div>
    </div>
  );
};

export default AuthCallback;
