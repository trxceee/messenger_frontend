"use client";

import { AnimatePresence } from "framer-motion";
import { FC, MouseEvent, useState } from "react";
import MessagePopup from "./MessagePopup/MessagePopup";
import { Attachment, Message } from "@/entities/chats/model";
import { useTranslations } from "next-intl";
import { Check, CheckCheck } from "lucide-react";
import FileRender from "./FileRender/FileRender";
import ImageRender from "./FileRender/ImageRender";
import { IMAGE_EXTENSIONS } from "@/shared";

interface Props {
  message: Message;
  attachments?: Array<Attachment>;
  isMy: boolean;
  createdAt: Date;
}

const ChatMessagesItem: FC<Props> = ({ isMy, message, createdAt, attachments }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const handleOnClick = (e: MouseEvent<HTMLDivElement>) => {
    if (isMy) {
      e.preventDefault();
      setPosition({ x: e.clientX + 5, y: e.clientY + 5 });
      setIsOpen((prev) => !prev);
    }
  };

  const imageUrls = attachments
    ?.filter((a) => IMAGE_EXTENSIONS.has(a.fileExt))
    .map((a) => a.uuidURI) ?? [];

  const nonImageAttachments = attachments?.filter(
    (a) => !IMAGE_EXTENSIONS.has(a.fileExt)
  ) ?? [];

  return (
    <div className={`flex text-text-default w-full ${isMy ? "justify-end" : "justify-start"}`}>
      <div className={`flex flex-col w-full ${isMy ? "items-end" : "items-start"} gap-2`}>

        {imageUrls.length > 0 && (
          <ImageRender images={imageUrls} isMy={isMy} />
        )}

        {nonImageAttachments.length > 0 && (
          <div
            className={`messageItemWrapper ${isMy ? "rounded-2xl bg-bg-chat-accent" : "rounded-2xl bg-bg-chat"} ${isMy ? "items-end" : "items-start"} gap-2`}
          >
            {nonImageAttachments.map((file, index) => (
              <FileRender
                key={index}
                fileName={file.fileName}
                fileExt={file.fileExt}
                fileSize={file.fileSize}
                fileUrl={file.uuidURI}
              />
            ))}
          </div>
        )}

        <div
          onContextMenu={handleOnClick}
          className={`messageItemWrapper relative ${isMy ? "rounded-bl-2xl bg-bg-chat-accent" : "rounded-br-2xl bg-bg-chat"} ${isMy ? "items-end" : "items-start"}`}
        >
          <p>{message.text}</p>
          <MessageStats createdAt={createdAt} isMy={isMy} message={message} />
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <MessagePopup setIsOpen={setIsOpen} position={position} message={message} />
        )}
      </AnimatePresence>
    </div>
  );
};

const MessageStats: FC<Props> = ({ createdAt, isMy, message }) => {
  const t = useTranslations();

  return (
    <div className={`flex w-full gap-1 items-center justify-end ${!isMy ? "text-text-time" : "text-text-time-my"}`}>
      {!!message.editedAt && (
        <p className="text-[.75rem] shrink-0">{t("chat.isEdited")}</p>
      )}
      <p className="text-[.75rem] shrink-0">
        {new Date(createdAt).toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" })}
      </p>
      {isMy && (message.isRead ? <CheckCheck size={16} /> : <Check size={16} />)}
    </div>
  );
};

export default ChatMessagesItem;