import { BrushCleaning, Pencil } from "lucide-react";
import { AppDispatch } from "@/app/store/store";
import { Message, setEditMessage } from "@/entities/chats";
import { ReturnedTypesActionsElement } from "@/shared";
import { Dispatch, SetStateAction } from "react";
import { Socket } from "socket.io-client";
import { handleDeleteMessage } from "../model";

export const messagePopupElements = (
  dispatch: AppDispatch,
  message: Message,
  setIsOpen: Dispatch<SetStateAction<boolean>>,
  socket: Socket,
): Array<ReturnedTypesActionsElement> => [
  {
    icon: <Pencil size={20} className="text-icon" />,
    title: "chat.editMsg",
    isMain: true,
    isFirst: true,
    onClick: () => {
      dispatch(setEditMessage(message));
      setIsOpen(false);
    },
  },
  {
    icon: <BrushCleaning size={20} />,
    title: "chat.deleteMsg",
    isRed: true,
    isLast: true,
    onClick: () => {
      handleDeleteMessage(socket, message.id);
      setIsOpen(false);
    },
  },
];
