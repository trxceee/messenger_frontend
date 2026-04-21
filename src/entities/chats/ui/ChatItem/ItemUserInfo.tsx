"use client";

import { RenderAvatarElement } from "@/shared";
import { isUserOnline, Message } from "../../model";
import { useAppSelector } from "@/app";
import { useTranslations } from "next-intl";
import { FC } from "react";
import { VolumeX } from "lucide-react";

interface Props {
  userId: string;
  avatar?: string;
  hasAvatar: boolean;
  firstName?: string;
  lastName?: string;
  lastMessage?: Message;
  isCurrentChat: boolean;
  isIgnoreOppent: boolean;
}

const ItemUserInfo: FC<Props> = ({
  avatar,
  firstName,
  hasAvatar,
  lastName,
  userId,
  lastMessage,
  isCurrentChat,
  isIgnoreOppent,
}) => {
  const t = useTranslations();
  const isOnline = useAppSelector((state) => isUserOnline(userId, state));

  return (
    <div className="flex w-full items-center justify-start gap-3">
      <div className="flex items-center justify-center relative">
        <RenderAvatarElement hasAvatar={hasAvatar} size={50} avatar={avatar} />
        {isOnline && (
          <div className="absolute bottom-1 right-0 w-4 aspect-square bg-green-400 border-bg-chat border-2 rounded-full" />
        )}
      </div>
      <div className="flex flex-col items-start justify-center min-w-0">
       <div className="flex items-center justify-start gap-2 min-w-0 w-full">
         <h2 className={`shortText ${isCurrentChat ? "text-white" : "text-text-default"}`}>
          {firstName} {lastName}
        </h2>
        <p>{isIgnoreOppent && <VolumeX size={15} />}</p>
       </div>
        <p
          className={`${isCurrentChat ? "text-white" : "text-icon"} text-[.95rem] shortText`}
        >
          {lastMessage ? lastMessage.text : t("searchUsers.noResult")}
        </p>
      </div>
    </div>
  );
};

export default ItemUserInfo;
