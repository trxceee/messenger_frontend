import { CircleSlash, Trash, Volume2, VolumeOff } from "lucide-react";
import { AppDispatch } from "@/app/store/store";
import { chatsApi } from "@/entities/chats";
import { userApi } from "../api";
import { ReturnedTypesActionsElement } from "@/shared";
import { ignoreUser, unignoreUser } from "../model";

export const userActionsMenuElements = (
  dispatch: AppDispatch,
  chatId: string,
  userId: string,
  isBlocked: boolean,
  isMuted: boolean,
): Array<ReturnedTypesActionsElement> => [
  {
    icon: <CircleSlash size={20} className="text-icon" />,
    title: isBlocked ? "chat.user.unblockUser" : "chat.user.blockUser",
    isMain: true,
    isFirst: true,
    onClick: () => {
      if (isBlocked) {
        dispatch(userApi.endpoints.unBlockUsers.initiate(userId));
      } else {
        dispatch(userApi.endpoints.blockUsers.initiate(userId));
      }
    },
  },
  {
    icon: isMuted ? (
      <Volume2 size={20} className="text-icon" />
    ) : (
      <VolumeOff size={20} className="text-icon" />
    ),
    title: isMuted ? "chat.user.unmuteUser" : "chat.user.muteUser",
    isMain: true,
    onClick: () => {
      if (isMuted) {
        dispatch(unignoreUser(userId));
      } else {
        dispatch(ignoreUser(userId));
      }
    },
  },
  {
    icon: <Trash size={20} />,
    title: "chat.deleteChat",
    isRed: true,
    isLast: true,
    onClick: () => dispatch(chatsApi.endpoints.deleteChat.initiate(chatId)),
  },
];
