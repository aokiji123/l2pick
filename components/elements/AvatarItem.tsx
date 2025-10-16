import Image from "next/image";
import React, { useRef, useState } from "react";
import MainButton from "./MainButton";
import { DownloadIcon } from "@/icons";
import { User } from "@/lib/types/user";
import { useUploadUserAvatar } from "@/lib/queries/useUser";
import { toast } from "sonner";

type AvatarItemProps = {
  user?: User;
};

const AvatarItem = ({ user }: AvatarItemProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const uploadAvatarMutation = useUploadUserAvatar();

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (!allowedTypes.includes(file.type)) {
      toast.error("Разрешены только файлы JPG, JPEG и PNG");
      return;
    }

    // Validate file size (2MB max)
    const maxSize = 2 * 1024 * 1024; // 2MB in bytes
    if (file.size > maxSize) {
      toast.error("Размер файла не должен превышать 2MB");
      return;
    }

    setIsUploading(true);

    try {
      await uploadAvatarMutation.mutateAsync(file);
      toast.success("Аватар успешно загружен!");

      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error("Error uploading avatar:", error);
      toast.error("Ошибка при загрузке аватара");
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
            {user?.name || "Loading..."}
          </h3>

          <p className="text-xs text-[#5e6a76] dark:text-brand-slate-gray">
            Регистрация:{" "}
            <span className="font-bold text-brand-primary dark:text-white truncate max-w-[200px]">
              {user?.created_at
                ? new Date(user.created_at).toLocaleDateString("ru-RU")
                : "Loading..."}
            </span>
          </p>
          <p className="text-xs text-[#5e6a76] dark:text-brand-slate-gray truncate lg:max-w-[150px]">
            IP:{" "}
            <span className="font-bold text-brand-primary dark:text-white">
              {user?.ip || "Loading..."}
            </span>
          </p>
          <p className="text-xs text-[#5e6a76] dark:text-brand-slate-gray truncate lg:max-w-[150px]">
            Email:{" "}
            <span className="font-bold text-brand-primary dark:text-white">
              {user?.email || "Loading..."}
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
          ? "Загрузка..."
          : "Загрузить аватар"}
      </MainButton>
    </div>
  );
};

export default AvatarItem;
