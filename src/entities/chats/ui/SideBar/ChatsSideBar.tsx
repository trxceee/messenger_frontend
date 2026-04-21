"use client";

import { FC, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ChatItem from "../ChatItem/ChatItem";
import { Chat, setCurrentChat } from "@/entities/chats/model";
import { useAppDispatch, useAppSelector } from "@/app";
import ActionPopup from "./ActionPopup/ActionPopup";
import { Spinner } from "@/shared";
import {
  closeOtherProfile,
  getMyData,
  getOtherProfileStatus,
} from "@/entities/user";

interface Props {
  myDms: Chat[];
}

const ChatsSideBar: FC<Props> = ({ myDms }) => {
  const dispatch = useAppDispatch();
  const userId = useAppSelector(getMyData).id;
  const otherProfileComponent = useAppSelector(
    getOtherProfileStatus,
  ).openComponent;

  const [chatId, setChatId] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [position, setPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  const handleOnClick = (chat: Chat) => {
    if (!!otherProfileComponent) {
      dispatch(closeOtherProfile());
    }
    dispatch(setCurrentChat(chat));
  };

  return (
    <motion.div
      exit={{ opacity: 0, scale: 0.8, y: 50 }}
      initial={{ opacity: 0, scale: 0.8, y: 50 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="flex flex-col w-full p-2"
    >
      {myDms.map((chat) => {
        const user = chat.members.find((m) => m.userId !== userId)?.user;
        if (!user) return <Spinner />;
        const lastAvatar = user.avatars.at(-1);

        return (
          <ChatItem
            onContextMenu={(e) => {
              setIsOpen((prev) => !prev);
              setPosition({ x: e.clientX + 5, y: e.clientY + 5 });
              setChatId(chat.id);
            }}
            userId={user.id}
            messages={
              chat.messages.length
                ? [...chat.messages].sort(
                    (a, b) =>
                      new Date(a.createdAt).getTime() -
                      new Date(b.createdAt).getTime(),
                  )
                : []
            }
            onClick={() => handleOnClick(chat)}
            key={chat.id}
            firstName={user.firstName}
            lastName={user.lastName}
            avatar={lastAvatar}
            chatId={chat.id}
            hasAvatar={!!user.avatars.length}
          />
        );
      })}

      <AnimatePresence>
        {isOpen && (
          <ActionPopup
            chatId={chatId}
            position={position}
            setIsOpen={setIsOpen}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ChatsSideBar;
