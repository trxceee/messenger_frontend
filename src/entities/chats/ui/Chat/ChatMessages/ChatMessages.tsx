"use client";

import { FC, useEffect, useRef } from "react";
import { useAppSelector } from "@/app";
import { getCurrentChat } from "@/entities/chats/model";
import ChatMessagesItem from "./ChatMessagesItem";
import { Spinner } from "@/shared";

interface Props {
  userId: string;
}

const ChatMessages: FC<Props> = ({ userId }) => {
  const currentChat = useAppSelector(getCurrentChat);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [currentChat?.messages]);

  if (!currentChat) return <Spinner />;

  return (
    <div
      ref={containerRef}
      className="flex flex-col w-full max-w-170 h-screen p-3 overflow-y-auto hidden-scroll"
    >
      <div className="mt-auto flex flex-col gap-2">
        {[...currentChat.messages]
          .sort(
            (a, b) =>
              new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
          )
          .map((el) => (
            <ChatMessagesItem
              key={el.id}
              message={el}
              attachments={el.attachments}
              createdAt={el.createdAt}
              isMy={userId !== el.senderId}
            />
          ))}
      </div>
    </div>
  );
};

export default ChatMessages;
