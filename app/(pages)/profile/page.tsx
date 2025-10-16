"use client";
import MenuSidebar from "@/components/common/MenuSidebar";
import MobileMenu from "@/components/common/MobileMenu";
import AvatarItem from "@/components/elements/AvatarItem";
import CustomTable from "@/components/elements/CustomTable";
import { useGetUser } from "@/lib/queries/useAuth";
import { useGetUserVotes } from "@/lib/queries/useVotes";
import { useChangeUserPassword } from "@/lib/queries/useUser";
import { ChangeUserPassword } from "@/lib/types/user";
import React, { useState } from "react";
import { toast } from "sonner";

// Utility function to format date from ISO string to DD.MM.YYYY
const formatDate = (isoString: string): string => {
  const date = new Date(isoString);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
};

const Profile = () => {
  const { data: user, isLoading, error } = useGetUser();
  const { data: votes } = useGetUserVotes();
  const changePasswordMutation = useChangeUserPassword();

  const [formData, setFormData] = useState<ChangeUserPassword>({
    old_password: "",
    new_password: "",
    new_password_confirmation: "",
  });

  const [errors, setErrors] = useState<Partial<ChangeUserPassword>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<ChangeUserPassword> = {};

    if (!formData.old_password.trim()) {
      newErrors.old_password = "Введите старый пароль";
    }

    if (!formData.new_password.trim()) {
      newErrors.new_password = "Введите новый пароль";
    } else if (formData.new_password.length < 6) {
      newErrors.new_password = "Пароль должен содержать минимум 6 символов";
    }

    if (!formData.new_password_confirmation.trim()) {
      newErrors.new_password_confirmation = "Повторите новый пароль";
    } else if (formData.new_password !== formData.new_password_confirmation) {
      newErrors.new_password_confirmation = "Пароли не совпадают";
    }

    if (formData.old_password === formData.new_password) {
      newErrors.new_password = "Новый пароль должен отличаться от старого";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange =
    (field: keyof ChangeUserPassword) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));

      // Clear error when user starts typing
      if (errors[field]) {
        setErrors((prev) => ({
          ...prev,
          [field]: undefined,
        }));
      }
    };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      await changePasswordMutation.mutateAsync(formData);
      toast.success("Пароль успешно изменен!");

      // Reset form
      setFormData({
        old_password: "",
        new_password: "",
        new_password_confirmation: "",
      });
    } catch (error) {
      console.error("Error changing password:", error);
      toast.error("Ошибка при изменении пароля");
    }
  };

  const votesData =
    votes?.map((vote) => ({
      id: vote.id,
      serverName: vote.server.announce_name,
      ip: vote.ip_address,
      date: formatDate(vote.created_at),
    })) || [];

  return (
    <>
      <MobileMenu />
      <div className="flex items-stretch min-h-screen">
        <MenuSidebar />
        <div className="w-full flex-1 bg-white dark:bg-brand-main-dark rounded-2xl lg:rounded-l-none">
          <div className="grid grid-cols-1 xl:grid-cols-2 items-stretch min-h-full">
            <div className="max-h-[938px] h-full overflow-y-auto scroll-style gap-5 divide-y divide-brand-slate-gray/30 ">
              <div className="grid grid-cols-1 items-start justify-start py-6 px-3 md:px-6 ">
                {isLoading ? (
                  <div className="flex flex-col gap-2 sm:flex-row items-center sm:justify-between">
                    <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
                      <div className="size-16 sm:size-24 rounded-2xl bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
                      <div className="flex-1 text-center sm:text-left space-y-2">
                        <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                        <div className="h-3 w-40 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                        <div className="h-3 w-36 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                ) : error ? (
                  <div className="flex items-center justify-center p-8">
                    <div className="text-center">
                      <p className="text-red-500 mb-2">
                        Ошибка загрузки профиля
                      </p>
                      <p className="text-sm text-gray-500">
                        Попробуйте обновить страницу
                      </p>
                    </div>
                  </div>
                ) : (
                  <AvatarItem user={user} />
                )}
              </div>
              {/* change password */}
              <div className="w-full py-6 px-3 md:px-6">
                <h3 className="text-sm font-bold text-brand-primary mb-6">
                  Смена пароля
                </h3>
                <form onSubmit={handleSubmit} className="w-full space-y-5">
                  <div>
                    <label className="block text-xs font-bold text-brand-primary dark:text-white mb-2">
                      Введите старый пароль
                    </label>
                    <input
                      type="password"
                      value={formData.old_password}
                      onChange={handleInputChange("old_password")}
                      className={`w-full h-11 px-5 rounded-xl border ${
                        errors.old_password
                          ? "border-red-500"
                          : "border-[#d7dfe4] dark:border-[#21252f]"
                      } bg-brand-gray-3 dark:bg-brand-dark text-xs text-brand-primary dark:text-white font-medium placeholder:text-brand-secondary outline-none dark:placeholder:text-[#535967]`}
                      placeholder="******************"
                    />
                    {errors.old_password && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.old_password}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-brand-primary dark:text-white mb-2">
                      Придумайте новый пароль
                    </label>
                    <input
                      type="password"
                      value={formData.new_password}
                      onChange={handleInputChange("new_password")}
                      className={`w-full h-11 px-5 rounded-xl border ${
                        errors.new_password
                          ? "border-red-500"
                          : "border-[#d7dfe4] dark:border-[#21252f]"
                      } bg-brand-gray-3 dark:bg-brand-dark text-xs text-brand-primary dark:text-white font-medium placeholder:text-brand-secondary outline-none dark:placeholder:text-[#535967]`}
                      placeholder="******************"
                    />
                    {errors.new_password && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.new_password}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-brand-primary dark:text-white mb-2">
                      Повторите пароль
                    </label>
                    <input
                      type="password"
                      value={formData.new_password_confirmation}
                      onChange={handleInputChange("new_password_confirmation")}
                      className={`w-full h-11 px-5 rounded-xl border ${
                        errors.new_password_confirmation
                          ? "border-red-500"
                          : "border-[#d7dfe4] dark:border-[#21252f]"
                      } bg-brand-gray-3 dark:bg-brand-dark text-xs text-brand-primary dark:text-white font-medium placeholder:text-brand-secondary outline-none dark:placeholder:text-[#535967]`}
                      placeholder="******************"
                    />
                    {errors.new_password_confirmation && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.new_password_confirmation}
                      </p>
                    )}
                  </div>
                  <button
                    type="submit"
                    disabled={changePasswordMutation.isPending}
                    className="w-full bg-brand-btn cursor-pointer hover:bg-brand-btn/90 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl px-4 h-12 flex items-center justify-center gap-2 text-sm font-extrabold transition-colors relative z-10 before:absolute before:size-full before:bg-brand-btn before:top-0 before:left-px before:blur-md before:opacity-60 before:-z-10 mt-6"
                  >
                    {changePasswordMutation.isPending
                      ? "ИЗМЕНЕНИЕ..."
                      : "ИЗМЕНИТЬ ПАРОЛЬ"}
                  </button>
                </form>
              </div>
            </div>
            <div className="flex-1 pt-[26px] px-3 md:px-6 pb-8 border-t xl:border-t-0 xl:border-l border-brand-slate-gray/30">
              <h2 className="font-bold text-brand-primary dark:text-white mb-6">
                Мои голоса за серверы L2
              </h2>

              <div className="max-h-[868px] h-full bg-brand-gray-2 dark:bg-brand-dark border border-[#d7dee5] dark:border-[#21252f] dark:text-[#646d78] rounded-2xl px-5 py-4">
                <CustomTable data={votesData} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
