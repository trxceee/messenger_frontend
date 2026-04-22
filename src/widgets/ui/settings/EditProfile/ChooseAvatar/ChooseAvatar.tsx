"use client";

import { userApi } from "@/entities";
import { Camera } from "lucide-react";
import Image from "next/image";
import { FC, useRef } from "react";

interface Props {
  avatar?: string;
  size: number;
}

const ChooseAvatar: FC<Props> = ({ avatar, size }) => {
  const [featAvatar] = userApi.useFeatAvatarMutation();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChangeAvatar = async (file: File) => {
    if (!file) return;
    if (!["image/png", "image/jpeg"].includes(file.type)) {
      console.log("Неверный формат изображения.");
      return;
    }
    await featAvatar(file);
  };

  return (
    <div
      onClick={() => inputRef.current?.click()}
      style={{
        width: size,
        height: size,
        background: avatar ? "none" : "var(--color-accent)",
      }}
      className={`flex aspect-square rounded-full items-center justify-center cursor-pointer hover:opacity-80 duration-300`}
    >
      {avatar && (
        <Image
          src={avatar}
          alt="avatar"
          loading="lazy"
          width={size}
          height={size}
          className="rounded-full object-cover aspect-square opacity-65"
        />
      )}
      <Camera size={50} className="absolute text-white" />
      <input
        ref={inputRef}
        type="file"
        className="hidden"
        onChange={(e) =>
          e.target.files?.[0] && handleChangeAvatar(e.target.files[0])
        }
      />
    </div>
  );
};

export default ChooseAvatar;
