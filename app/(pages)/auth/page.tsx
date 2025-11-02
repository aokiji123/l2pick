"use client";
import SearchSidebar from "@/components/common/SearchSidebar";
import React, { useState } from "react";
import { FaDiscord, FaGoogle } from "react-icons/fa6";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Image from "next/image";
import { PiCheckFatFill } from "react-icons/pi";
import MainButton from "@/components/elements/MainButton";
import { FaTelegramPlane } from "react-icons/fa";
import { useAuthStore } from "@/contexts/AuthStore";
import { useRouter } from "next/navigation";
import MobileFilterSidebar from "@/components/common/MobileFilterSidebar";
import { useLogin, useRegister } from "@/lib/queries/useAuth";
import { LoginRequest, RegisterRequest, Provider } from "@/lib/types/auth";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axiosInstance from "@/lib/api";
import TelegramLogin from "@/components/elements/TelegramLogin";
import { useTranslation } from "@/contexts/LanguageContext";

const Auth = () => {
  const router = useRouter();
  const loginStore = useAuthStore((s) => s.login);
  const { t } = useTranslation();

  // Login form state
  const [loginData, setLoginData] = useState<LoginRequest>({
    email: "",
    password: "",
    remember_me: false,
  });

  // Register form state
  const [registerData, setRegisterData] = useState<RegisterRequest>({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  // Error states
  const [loginError, setLoginError] = useState<string>("");
  const [registerError, setRegisterError] = useState<string>("");

  // Loading states
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const [isRegisterLoading, setIsRegisterLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<string | null>(null);

  // TanStack Query mutations
  const loginMutation = useLogin();
  const registerMutation = useRegister();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    setIsLoginLoading(true);

    try {
      const response = await loginMutation.mutateAsync(loginData);

      // Store token based on remember_me
      if (loginData.remember_me) {
        localStorage.setItem("auth-token", response.access_token);
      } else {
        sessionStorage.setItem("auth-token", response.access_token);
      }

      // Update auth store
      loginStore(response.user, response.access_token);
      router.push("/");
    } catch (error: any) {
      setLoginError(error.response?.data?.message || t('auth_error'));
    } finally {
      setIsLoginLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegisterError("");

    // Validate passwords match
    if (registerData.password !== registerData.password_confirmation) {
      setRegisterError(t('passwords_not_match'));
      return;
    }

    setIsRegisterLoading(true);

    try {
      const response = await registerMutation.mutateAsync({
        name: registerData.name,
        email: registerData.email,
        password: registerData.password,
        password_confirmation: registerData.password_confirmation,
      });

      // Store token (default to localStorage for new registrations)
      localStorage.setItem("auth-token", response.access_token);

      // Update auth store
      loginStore(response.user, response.access_token);
      router.push("/");
    } catch (error: any) {
      setRegisterError(error.response?.data?.message || t('registration_error'));
    } finally {
      setIsRegisterLoading(false);
    }
  };

  const handleSocialLogin = async (provider: string) => {
    // Handle Discord and Google OAuth
    setSocialLoading(provider);
    try {
      // Get the redirect URL from the API
      const redirectResponse = await axiosInstance.get(
        `/auth/${provider}/redirect`
      );

      // Redirect to the OAuth provider
      if (redirectResponse.data?.url) {
        window.location.href = redirectResponse.data.url;
      } else {
        throw new Error("No redirect URL received");
      }
    } catch (error: any) {
      console.error(`${provider} login error:`, error);
      setLoginError(`${t('auth_error_via_provider')} ${provider}`);
      setSocialLoading(null);
    }
  };

  const handleTelegramError = (error: string) => {
    setLoginError(error);
  };

  return (
    <>
      <MobileFilterSidebar />
      <div className="flex items-stretch min-h-screen">
        <SearchSidebar />
        <div className="w-full flex-1 bg-white dark:bg-brand-main-dark rounded-2xl lg:rounded-l-none p-3 lg:p-4">
          <div className="relative z-50 w-full max-w-[424px] mx-auto translate-y-28 bg-white dark:bg-brand-main rounded-2xl shadow-lg flex flex-col items-center">
            <Image
              src="/auth-left.png"
              alt="Left"
              width={128}
              height={185}
              className="absolute -top-10 -left-5 -z-10"
            />
            <Image
              src="/auth-right.png"
              alt="Left"
              width={123}
              height={182}
              className="absolute bottom-0 -right-14 -z-10"
            />
            <Tabs
              defaultValue="auth"
              className="w-full relative z-40 bg-[#f7f9f9] dark:bg-brand-main-dark rounded-t-2xl border border-[#f0f4f5] dark:border-brand-btn-gray"
            >
              <TabsList className="w-full flex mb-8 bg-white dark:bg-brand-main rounded-t-2xl">
                <TabsTrigger
                  value="auth"
                  className="flex-1 h-16 py-3 text-[#3b404d] dark:text-white font-extrabold rounded-none border-b border-r border-[#f0f4f5] dark:border-brand-btn-gray"
                >
                  {t('auth_tab_title')}
                </TabsTrigger>
                <TabsTrigger
                  value="register"
                  className="flex-1 h-16 py-3 text-[#3b404d] dark:text-white font-extrabold rounded-none border-b border-[#f0f4f5] dark:border-brand-btn-gray"
                >
                  {t('register_tab_title')}
                </TabsTrigger>
              </TabsList>

              {/* Login Form */}
              <TabsContent className="min-h-96" value="auth">
                <form
                  onSubmit={handleLogin}
                  className="w-full px-6 py-8 space-y-4"
                >
                  <div className="space-y-4">
                    <div>
                      <Label
                        htmlFor="login-email"
                        className="text-sm font-medium text-[#3b404d] dark:text-white"
                      >
                        {t('email_label')}
                      </Label>
                      <Input
                        id="login-email"
                        type="email"
                        value={loginData.email}
                        onChange={(e) =>
                          setLoginData({ ...loginData, email: e.target.value })
                        }
                        className="mt-1 w-full"
                        placeholder={t('email_placeholder')}
                        required
                      />
                    </div>

                    <div>
                      <Label
                        htmlFor="login-password"
                        className="text-sm font-medium text-[#3b404d] dark:text-white"
                      >
                        {t('password_label')}
                      </Label>
                      <Input
                        id="login-password"
                        type="password"
                        value={loginData.password}
                        onChange={(e) =>
                          setLoginData({
                            ...loginData,
                            password: e.target.value,
                          })
                        }
                        className="mt-1 w-full"
                        placeholder={t('password_placeholder_login')}
                        required
                      />
                    </div>

                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="remember-me"
                        checked={loginData.remember_me}
                        onChange={(e) =>
                          setLoginData({
                            ...loginData,
                            remember_me: e.target.checked,
                          })
                        }
                        className="rounded border-gray-300"
                      />
                      <Label
                        htmlFor="remember-me"
                        className="text-sm text-[#3b404d] dark:text-white"
                      >
                        {t('remember_me')}
                      </Label>
                    </div>
                  </div>

                  {loginError && (
                    <div className="text-red-500 text-sm text-center">
                      {loginError}
                    </div>
                  )}

                  <MainButton
                    type="submit"
                    disabled={isLoginLoading}
                    className="w-full text-sm md:text-xl !px-5 before:absolute before:size-full before:bg-brand-btn before:top-1 before:left-px before:blur-md before:opacity-60 before:-z-10 mx-auto"
                  >
                    {isLoginLoading ? t('logging_in') : t('login_button')}
                  </MainButton>
                </form>
              </TabsContent>

              {/* Register Form */}
              <TabsContent className="min-h-96" value="register">
                <form
                  onSubmit={handleRegister}
                  className="w-full px-6 py-8 space-y-4"
                >
                  <div className="space-y-4">
                    <div>
                      <Label
                        htmlFor="register-name"
                        className="text-sm font-medium text-[#3b404d] dark:text-white"
                      >
                        {t('name_label')}
                      </Label>
                      <Input
                        id="register-name"
                        type="text"
                        value={registerData.name}
                        onChange={(e) =>
                          setRegisterData({
                            ...registerData,
                            name: e.target.value,
                          })
                        }
                        className="mt-1 w-full"
                        placeholder={t('name_placeholder')}
                        required
                      />
                    </div>

                    <div>
                      <Label
                        htmlFor="register-email"
                        className="text-sm font-medium text-[#3b404d] dark:text-white"
                      >
                        {t('email_label')}
                      </Label>
                      <Input
                        id="register-email"
                        type="email"
                        value={registerData.email}
                        onChange={(e) =>
                          setRegisterData({
                            ...registerData,
                            email: e.target.value,
                          })
                        }
                        className="mt-1 w-full"
                        placeholder={t('email_placeholder')}
                        required
                      />
                    </div>

                    <div>
                      <Label
                        htmlFor="register-password"
                        className="text-sm font-medium text-[#3b404d] dark:text-white"
                      >
                        {t('password_label')}
                      </Label>
                      <Input
                        id="register-password"
                        type="password"
                        value={registerData.password}
                        onChange={(e) =>
                          setRegisterData({
                            ...registerData,
                            password: e.target.value,
                          })
                        }
                        className="mt-1 w-full"
                        placeholder={t('password_placeholder_register')}
                        required
                      />
                    </div>

                    <div>
                      <Label
                        htmlFor="register-confirm-password"
                        className="text-sm font-medium text-[#3b404d] dark:text-white"
                      >
                        {t('confirm_password_label')}
                      </Label>
                      <Input
                        id="register-confirm-password"
                        type="password"
                        value={registerData.password_confirmation}
                        onChange={(e) =>
                          setRegisterData({
                            ...registerData,
                            password_confirmation: e.target.value,
                          })
                        }
                        className="mt-1 w-full"
                        placeholder={t('confirm_password_placeholder')}
                        required
                      />
                    </div>
                  </div>

                  {registerError && (
                    <div className="text-red-500 text-sm text-center">
                      {registerError}
                    </div>
                  )}

                  <MainButton
                    type="submit"
                    disabled={isRegisterLoading}
                    className="w-full text-sm md:text-xl !px-5 before:absolute before:size-full before:bg-brand-btn before:top-1 before:left-px before:blur-md before:opacity-60 before:-z-10 mx-auto"
                  >
                    {isRegisterLoading
                      ? t('registering')
                      : t('register_button')}
                  </MainButton>
                </form>
              </TabsContent>

              {/* Commented out password recovery message */}
              {/* <TabsContent className="min-h-96 flex items-center justify-center" value="auth">
                <div className="w-full flex flex-col items-center justify-center px-4 gap-4">
                  <h3 className="text-xl font-extrabold text-center text-brand-primary dark:text-white leading-5">
                    Пароль успешно восстановлен
                  </h3>
                  <p className="text-brand-secondary text-sm text-center font-medium">
                    Теперь можете перейти к авторизации
                  </p>
                  <MainButton
                    onClick={handleSimpleLogin}
                    className="text-sm md:text-xl !px-5 before:absolute before:size-full before:bg-brand-btn before:top-1 before:left-px before:blur-md before:opacity-60 before:-z-10"
                  >
                    ПЕРЕЙТИ К АВТОРИЗАЦИИ
                  </MainButton>
                </div>
              </TabsContent> */}

              <div className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 -z-10">
                <PiCheckFatFill className="text-[#eeefef] dark:text-brand-main size-40" />
              </div>
            </Tabs>

            {/* Social Login */}
            <div className="w-full h-24 flex flex-wrap items-center justify-center sm:justify-between sm:gap-2 relative z-10 bg-white dark:bg-brand-main rounded-b-2xl -translate-y-px border border-t-0 border-[#f0f4f5] dark:border-brand-btn-gray px-4 md:px-6 lg:px-8">
              <p className="text-[#3b404d] text-sm font-medium">
                {t('login_via')}
              </p>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => handleSocialLogin("discord")}
                  disabled={socialLoading !== null}
                  className="bg-[linear-gradient(135deg,#7ca0f1,#586beb)] flex items-center justify-center size-11 rounded-full hover:opacity-90 transition relative before:absolute cursor-pointer before:size-11 before:rounded-full before:bg-[#586beb] before:top-1 before:left-px before:blur-md before:opacity-60 before:-z-10 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {socialLoading === "discord" ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <FaDiscord className="text-white w-6 h-6" />
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => handleSocialLogin("google")}
                  disabled={socialLoading !== null}
                  className="bg-[linear-gradient(135deg,#ff8400,#ff4a00)] flex items-center justify-center size-11 rounded-full hover:opacity-90 transition relative before:absolute cursor-pointer before:size-11 before:rounded-full before:bg-[#ff4a00] before:top-1 before:left-px before:blur-md before:opacity-60 before:-z-10 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {socialLoading === "google" ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <FaGoogle className="text-white w-6 h-6" />
                  )}
                </button>
                <TelegramLogin
                  onError={handleTelegramError}
                  className="bg-[linear-gradient(135deg,#58bbfc,#1e9de6)] flex items-center justify-center size-11 rounded-full hover:opacity-90 transition relative before:absolute cursor-pointer before:size-11 before:rounded-full before:bg-[#1e9de6] before:top-1 before:left-px before:blur-md before:opacity-60 before:-z-10 disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Auth;
