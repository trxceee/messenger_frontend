"use client";

import { FC, useEffect, useRef, useState } from "react";
import { useAppSelector } from "@/app";
import { getCurrentChat } from "@/entities/chats/model";
import ChatMessagesItem from "./ChatMessagesItem";
import { Spinner } from "@/shared";
import { ArrowDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

interface Props {
  userId: string;
}

const ChatMessages: FC<Props> = ({ userId }) => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const currentChat = useAppSelector(getCurrentChat);
  const containerRef = useRef<HTMLDivElement>(null);
  const wasAtBottomRef = useRef<boolean>(true);

  const handleScrolBottom = (behavior: "auto" | "smooth") => {
    const el = containerRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior });
  };

  useEffect(() => {
    if (!currentChat?.messages.length) return;

    const lastMessage = currentChat.messages.at(-1);
    const isMyMessage = lastMessage?.senderId !== userId;

    if (isMyMessage || wasAtBottomRef.current) {
      requestAnimationFrame(() => {
        handleScrolBottom("auto");
      });
    }
  }, [currentChat?.messages.at(-1)?.id]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleScroll = () => {
      const atBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 30;
      setIsScrolled(!atBottom);
      wasAtBottomRef.current = atBottom;
    };

    el.addEventListener("scroll", handleScroll);
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  if (!currentChat) return <Spinner />;

  return (
    <div
      ref={containerRef}
      className="flex flex-col w-full h-screen p-3 overflow-y-auto hidden-scroll"
    >
      <div className="mt-auto flex flex-col gap-2 max-w-170 mx-auto w-full">
        {[...currentChat.messages]
          .sort(
            (a, b) =>
              new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
          )
          .map((el) => (
            <div className="w-full" key={el.id}>
              <ChatMessagesItem
                message={el}
                attachments={el.attachments}
                createdAt={el.createdAt}
                isMy={userId !== el.senderId}
              />
            </div>
          ))}
      </div>

      <AnimatePresence>
        {isScrolled && (
          <motion.div
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="absolute flex-col items-center justify-center p-3 rounded-full bg-bg-chat bottom-20 left-1/2 -translate-x-1/2 z-123123 text-icon cursor-pointer hover:bg-accent hover:text-white duration-300"
            onClick={() => handleScrolBottom("smooth")}
          >
            <ArrowDown />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatMessages;