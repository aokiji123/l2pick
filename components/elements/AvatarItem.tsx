"use client";

import Image from "next/image";
import React, { useRef, useState } from "react";
import MainButton from "./MainButton";
import { DownloadIcon } from "@/icons";
import { User } from "@/lib/types/user";
import { useUploadUserAvatar } from "@/lib/queries/useUser";
import { toast } from "sonner";
import { useTranslation } from "@/contexts/LanguageContext";

type AvatarItemProps = {
  user?: User;
};

const AvatarItem = ({ user }: AvatarItemProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const uploadAvatarMutation = useUploadUserAvatar();
  const { t } = useTranslation();

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (!allowedTypes.includes(file.type)) {
      toast.error(t("avatar_file_type_error"));
      return;
    }

    // Validate file size (2MB max)
    const maxSize = 2 * 1024 * 1024; // 2MB in bytes
    if (file.size > maxSize) {
      toast.error(t("avatar_file_size_error"));
      return;
    }

    setIsUploading(true);

    try {
      await uploadAvatarMutation.mutateAsync(file);
      toast.success(t("avatar_upload_success"));

      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error("Error uploading avatar:", error);
      toast.error(t("avatar_upload_error"));
    } finally {
      setIsUploading(false);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col gap-2 sm:flex-row items-center sm:justify-between">
      <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
        <div className="size-16 sm:size-24 rounded-2xl overflow-hidden relative">
          <Image
            className="object-cover absolute size-full"
            src={user?.avatar || "/avatar.png"}
            fill
            alt="avatar"
          />
        </div>
        <div className="flex-1 text-center sm:text-left">
          <h3 className="text-brand-primary dark:text-white font-extrabold sm:mb-2 truncate lg:max-w-[200px]">
            {user?.name || t("avatar_loading")}
          </h3>

          <p className="text-xs text-[#5e6a76] dark:text-brand-slate-gray">
            {t("avatar_registration")}{" "}
            <span className="font-bold text-brand-primary dark:text-white truncate max-w-[200px]">
              {user?.created_at
                ? new Date(user.created_at).toLocaleDateString("ru-RU")
                : t("avatar_loading")}
            </span>
          </p>
          <p className="text-xs text-[#5e6a76] dark:text-brand-slate-gray truncate lg:max-w-[150px]">
            {t("avatar_ip")}{" "}
            <span className="font-bold text-brand-primary dark:text-white">
              {user?.ip || t("avatar_loading")}
            </span>
          </p>
          <p className="text-xs text-[#5e6a76] dark:text-brand-slate-gray truncate lg:max-w-[150px]">
            {t("avatar_email")}{" "}
            <span className="font-bold text-brand-primary dark:text-white">
              {user?.email || t("avatar_loading")}
            </span>
          </p>
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png"
        onChange={handleFileChange}
        className="hidden"
      />

      <MainButton
        className="!max-w-[170px] w-full text-nowrap rounded-xl gap-2 !text-xs font-bold !max-h-11 flex-1 !px-2"
        icon={<DownloadIcon />}
        onClick={handleUploadClick}
        disabled={isUploading || uploadAvatarMutation.isPending}
      >
        {isUploading || uploadAvatarMutation.isPending
          ? t("my_servers_loading")
          : t("avatar_upload")}
      </MainButton>
    </div>
  );
};

export default AvatarItem;
