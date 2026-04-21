"use client";

import { handleDeleteChat } from "@/entities/chats/model";
import { ShadowWrapper } from "@/shared";
import { Trash } from "lucide-react";
import { useTranslations } from "next-intl";
import { Dispatch, FC, SetStateAction } from "react";

interface Props {
  position: { x: number; y: number };
  setIsOpen: Dispatch<SetStateAction<boolean>>
  chatId: string;
}

const ActionPopup: FC<Props> = ({ position, chatId, setIsOpen }) => {
  const t = useTranslations();

  return (
    <ShadowWrapper
      position={position}
      children={
       <div
        onClick={() => {
          handleDeleteChat(chatId);
          setIsOpen(false)
        }}
        className="flex items-center justify-start hover:bg-hover-action p-2 px-3 rounded-[10px] duration-500 w-full gap-2 text-myred"
      >
        <Trash size={19} />
        <p className="text-[.95rem]">{t("chat.deleteChat")}</p>
      </div>
      }
    />
  );
};

export default ActionPopup;
