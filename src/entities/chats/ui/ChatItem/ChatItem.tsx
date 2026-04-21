"use client";

import { useAppSelector } from "@/app";
import { createRipple } from "@/shared";
import { FC, MouseEvent } from "react";
import { getCurrentChat, Message } from "../../model";
import { getListIgnoredUsers, getMyData } from "@/entities/user";
import ItemUserInfo from "./ItemUserInfo";
import { useFormattedChatDate } from "../../lib";
import { VolumeOff } from "lucide-react";

interface Props {
  hasAvatar: boolean;
  avatar?: string;
  messages: Array<Message>;
  firstName?: string;
  lastName?: string;
  onClick: () => void;
  onContextMenu: (e: MouseEvent<HTMLDivElement>) => void;
  userId: string;
  chatId: string;
}

const ChatItem: FC<Props> = ({
  hasAvatar,
  avatar,
  firstName,
  lastName,
  messages,
  onClick,
  onContextMenu,
  userId,
  chatId,
}) => {
  const myUserId = useAppSelector(getMyData).id ?? "";
  const lastMessage = messages.at(-1);
  const noReadMessages = messages.filter(
    (msg) => msg.senderId !== myUserId && !msg.isRead,
  );
  const formattedCreatedTime = useFormattedChatDate(
    new Date(lastMessage?.createdAt ?? new Date()).getTime() ?? 0,
  );
  const isIgnoreOppent = useAppSelector(getListIgnoredUsers).includes(userId);
  const currentChat = useAppSelector(getCurrentChat);
  const isCurrentChat = currentChat?.id === chatId;

  return (
    <div
      onClick={(e) => {
        (onClick(), createRipple(e));
      }}
      onContextMenu={(e) => {
        e.preventDefault();
        onContextMenu(e);
      }}
      className={`flex w-full items-start justify-between cursor-pointer relative rounded-2xl p-2.5 overflow-hidden text-text-default gap-3
        ${isCurrentChat ? "bg-bg-chat-active" : "hover:bg-hover-checkbox"}`}
    >
      <div className="flex-1 min-w-0">
        <ItemUserInfo
          avatar={avatar}
          firstName={firstName}
          hasAvatar={hasAvatar}
          lastName={lastName}
          lastMessage={lastMessage}
          userId={userId}
          isCurrentChat={isCurrentChat}
          isIgnoreOppent={isIgnoreOppent}
        />
      </div>

      <div className="flex flex-col items-end justify-center gap-2 shrink-0 text-white">
        {messages.length ? (
          <p className={`${!isCurrentChat && "text-icon"} text-[.65rem]`}>
            {formattedCreatedTime}
          </p>
        ) : null}
        {noReadMessages.length ? (
          <p className="flex text-white items-center justify-center rounded-full bg-accent p-[1.5px] px-2 text-[.85rem]">
            {noReadMessages.length}
          </p>
        ) : null}
      </div>
    </div>
  );
};

export default ChatItem;
