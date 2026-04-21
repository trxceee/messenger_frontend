"use client";

import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { useAppSelector } from "@/app";
import { getCurrentChat, getEditingMessage } from "@/entities/chats/model";
import EditMessage from "./EditMessage/EditMessage";
import InputReference from "./Reference/InputReference";

const ChatInput = () => {
  const [value, setValue] = useState<string>("");
  const currentChat = useAppSelector(getCurrentChat);
  const editingMessage = useAppSelector(getEditingMessage);

  useEffect(() => {
    if (editingMessage && currentChat?.id === editingMessage.chatId) {
      setValue(editingMessage.text);
    } else {
      setValue("");
    }
  }, [editingMessage, currentChat?.id]);

  return (
    <div className="flex w-full items-center justify-center gap-3">
      <div className="flex flex-col w-full items-end backdrop-blur-xl p-3 gap-3 px-4 rounded-2xl bg-bg-chat">
        <AnimatePresence>{editingMessage && <EditMessage />}</AnimatePresence>

        <InputReference setValue={setValue} value={value} />
      </div>
    </div>
  );
};

export default ChatInput;
