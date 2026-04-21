"use client";

import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/app";
import { useSocketConnection } from "@/shared";
import { Message } from "../types/chatsTypes";
import {
  addNewMessage,
  deleteMessage,
  editMessage,
  getCurrentChat,
  readMessage,
} from "../stores/chatsSlice";
import { getListIgnoredUsers } from "@/entities/user";

export function useMessageSocket(userId: string) {
  const dispatch = useAppDispatch();
  const currentChat = useAppSelector(getCurrentChat);
  const ignoredUsers = useAppSelector(getListIgnoredUsers);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioInChatRef = useRef<HTMLAudioElement | null>(null);
  const currentChatRef = useRef(currentChat);

  useEffect(() => {
    audioRef.current = new Audio("/sounds/message.mp3");
    audioInChatRef.current = new Audio("/sounds/messageInChat.mp3");
  }, []);

  useEffect(() => {
    currentChatRef.current = currentChat;
  }, [currentChat]);

  useEffect(() => {
    if (!userId) return;

    const socket = useSocketConnection(userId);

    const handleAddMessage = (message: Message) => {
      console.log("📨 message received:", message.id, message.text);

      const isValidUser = message.senderId !== userId;
      const isInCurrentChat = currentChatRef.current?.id === message.chatId;
      if (message.isBlocked && message.senderId !== userId) return;
      const isMuted = ignoredUsers.includes(message.senderId);

      if (!isMuted && isValidUser) {
        if (isInCurrentChat) {
          audioInChatRef.current?.play();
        } else {
          audioRef.current?.play();
        }
      }
      dispatch(addNewMessage({ chatId: message.chatId, message }));
    };

    const handleEditMessage = (message: Message) => {
      dispatch(editMessage(message));
    };

    const handleDeleteMessage = (message: Message) => {
      dispatch(
        deleteMessage({ chatId: message.chatId, messageId: message.id }),
      );
    };

    const handleIsReadMessage = ({
      chatId,
      messageIds,
    }: {
      chatId: string;
      messageIds: Array<string>;
    }) => {
      console.log("handleIsReadMessage");
      dispatch(readMessage({ chatId, messageIds }));
    };

    socket.on("message:created", handleAddMessage);
    socket.on("message:edited", handleEditMessage);
    socket.on("message:deleted", handleDeleteMessage);
    socket.on("message:isread", handleIsReadMessage);

    return () => {
      socket.off("message:created", handleAddMessage);
      socket.off("message:edited", handleEditMessage);
      socket.off("message:deleted", handleDeleteMessage);
      socket.off("message:isread", handleIsReadMessage);
    };
  }, [userId, dispatch, ignoredUsers]);
}
