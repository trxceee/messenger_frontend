"use client";

import { DragEvent, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { EllipsisVertical, X } from "lucide-react";

import { useAppDispatch, useAppSelector } from "@/app";
import {
  getCurrentChat,
  getDropFiles,
  getIsFilesModalOpen,
  getIsImagesPreview,
} from "@/entities/chats/model";
import {
  getMyData,
  openComponent,
  selectOpenComponent,
  setOpenComponentOtherUsersProfile,
  UserActionsMenu,
} from "@/entities/user";
import {
  DrogOnDrop,
  ModalConstructor,
  Spinner,
  useSocketConnection,
} from "@/shared";
import ChatInput from "./ChatInput/ChatInput";
import ChatMessages from "./ChatMessages/ChatMessages";
import ChatUserInfo from "./ChatUserInfo/ChatUserInfo";
import DropFilesModal from "../Files/DropFilesModal";
import { ImageViewer } from "@/widgets";

const Chat = () => {
  const dispatch = useAppDispatch();

  const me = useAppSelector(getMyData);
  const currentChat = useAppSelector(getCurrentChat);
  const whoIsOpenWithUi = useAppSelector(selectOpenComponent);
  const isImagesPreview = useAppSelector(getIsImagesPreview);

  const socket = useSocketConnection(me.id ?? "");

  const unreadMessageIds =
    currentChat?.messages
      .filter((msg) => !msg.isRead && msg.senderId !== me.id)
      .map((msg) => msg.id) ?? [];

  useEffect(() => {
    if (!currentChat) return;

    if (unreadMessageIds.length > 0) {
      socket.emit("readMessages", {
        messageIds: unreadMessageIds,
        chatId: currentChat.id,
      });
    }
  }, [currentChat, currentChat?.messages, me.id, socket]);

  if (!currentChat) return <Spinner />;

  const otherMember = currentChat.members?.find(
    (m) => m.userId !== me.id,
  )?.user;
  if (!otherMember) return <Spinner />;

  const { id: otherUserId, username } = otherMember;

  const handleOpenProfile = () => {
    dispatch(
      setOpenComponentOtherUsersProfile({
        openComponent: "userProfile",
        username,
      }),
    );
  };

  const toggleUserActionsMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(
      openComponent(
        whoIsOpenWithUi === "userActionsMenu" ? null : "userActionsMenu",
      ),
    );
  };

  // dragging

  const [isDrag, setIsDrag] = useState<boolean>(false);
  const files = useAppSelector(getDropFiles);

  const handleOnDragStart = (e: DragEvent<HTMLDivElement>) => {
    if (files.length > 0) return;
    e.preventDefault();
    setIsDrag(true);
  };

  const handleOnDragLeave = (e: DragEvent<HTMLDivElement>) => {
    if (files.length > 0) return;
    e.preventDefault();
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setIsDrag(false);
    }
  };

  // modal

  const isFilesModalOpen = useAppSelector(getIsFilesModalOpen);

  return (
    <div
      onDragStart={(e) => handleOnDragStart(e)}
      onDragOver={(e) => handleOnDragStart(e)}
      onDragLeave={(e) => handleOnDragLeave(e)}
      className="flex flex-col items-center justify-between h-screen w-full text-text-default relative"
    >
      <div
        onClick={handleOpenProfile}
        className="flex w-full items-center justify-between bg-bg-chat p-1.5 px-3 cursor-pointer"
      >
        <ChatUserInfo member={otherMember} />

        <div
          onClick={toggleUserActionsMenu}
          className="iconHoverEffect text-icon"
        >
          <EllipsisVertical size={22} />
        </div>
      </div>

      <motion.div
        layout
        className="relative flex flex-col flex-1 w-full items-center justify-between gap-5 py-5 overflow-y-auto"
      >
        <ChatMessages userId={otherUserId} />
        <AnimatePresence initial={false}>
          {!me.blockedUsers.includes(otherMember.id) && (
            <motion.div
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 0, opacity: 0 }}
              initial={{ y: 20, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="flex w-full items-center justify-center px-5 max-w-175"
            >
              <ChatInput />
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {whoIsOpenWithUi === "userActionsMenu" && <UserActionsMenu />}
          {isDrag && <DrogOnDrop setIsDrag={setIsDrag} />}
          {files.length > 0 && isFilesModalOpen && (
            <ModalConstructor content={<DropFilesModal />} />
          )}
          {isImagesPreview && <ModalConstructor content={<ImageViewer />} />}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Chat;
