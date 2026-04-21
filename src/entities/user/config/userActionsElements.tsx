import { CirclePlus, CircleUser, FileUser, Plus, Settings } from "lucide-react";
import { appConfig, ReturnedTypesActionsElement } from "@/shared";
import { openComponent } from "../model";
import { AppDispatch } from "@/app/store/store";

const baseAction: Omit<ReturnedTypesActionsElement, "icon" | "title" | "onClick"> = {
  isMain: false,
  isFull: true
};

export const userActionsElements = (dispatch: AppDispatch): Array<ReturnedTypesActionsElement> => [
  {
    ...baseAction,
    icon: <Plus size={20} className="text-icon" />,
    title: "chat.actionsPopup.addAccount",
    isMain: true,
    onClick: () => window.open("/add"),
  },
  {
    ...baseAction,
    icon: <CircleUser size={20} className="text-icon" />,
    title: "chat.actionsPopup.myProfile",
    onClick: () => dispatch(openComponent("myProfile")),
  },
  {
    ...baseAction,
    icon: <Settings size={20} className="text-icon" />,
    title: "chat.actionsPopup.settings",
    onClick: () => dispatch(openComponent("userSettings")),
  },
  {
    ...baseAction,
    icon: <FileUser size={20} className="text-icon" />,
    title: "chat.actionsPopup.contacts",
    onClick: () => dispatch(openComponent("userContacts")),
  },
  {
    ...baseAction,
    icon: <CirclePlus size={20} className="text-icon" />,
    title: "chat.actionsPopup.installApp",
    onClick: () => window.open(appConfig.APP_LINK()),
  },
];
