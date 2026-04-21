"use client";

import { useAppDispatch } from "@/app";
import { useFormattedChatDate } from "@/entities/chats/lib";
import { closeCurrentChat, setIsFullScreenChat } from "@/entities/chats/model";
import { closeOtherProfile, UserType } from "@/entities/user";
import { RenderAvatarElement } from "@/shared";
import { ArrowLeft } from "lucide-react";
import { useTranslations } from "next-intl";
import { FC } from "react";

interface Props {
  member: UserType;
}

const ChatUserInfo: FC<Props> = ({ member }) => {
  const t = useTranslations();
  const dispatch = useAppDispatch();
  
  const { avatars, lastName, firstName, lastSeen, isOnline } = member;

  const lastAvatar = avatars.at(-1);
  const lastSeenFormatted = useFormattedChatDate(lastSeen ?? 0);

  const handleCloseCurrentChat = () => {
    dispatch(closeOtherProfile());
    dispatch(setIsFullScreenChat(false));
    dispatch(closeCurrentChat());
  };

  return (
    <div className="flex items-center justify-start w-full gap-3 truncate">
      <div
        onClick={(e) => {
          e.stopPropagation();
          handleCloseCurrentChat();
        }}
        className="resizechat:hidden flex aspect-square cursor-pointer p-2.5 items-center justify-center hover:bg-hover-checkbox bg-transparent rounded-full duration-300 text-icon"
      >
        <ArrowLeft />
      </div>

      {/* инфо юзера */}
      <div className="flex items-center gap-3">
        <RenderAvatarElement
          hasAvatar={!!avatars.length}
          size={40}
          avatar={lastAvatar}
        />
        <div className="flex flex-col items-start justify-center w-full">
          <h2>
            {firstName} {lastName}
          </h2>
          <p className="text-icon text-[0.85rem]">
            {isOnline ? t("settings.online") : lastSeenFormatted}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatUserInfo;
