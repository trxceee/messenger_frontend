import { AppDispatch } from "@/app";
import { openComponent } from "@/entities";
import { KeyRound, Mail, UserLock } from "lucide-react";

export const userSecuritySettingsCategoriesConfig = (dispatch: AppDispatch) => [
  {
    icon: <UserLock className="text-icon" size={26} />,
    title: "settings.privacyAndSecurity.blockedUsers",
    onClick: () => dispatch(openComponent("blockedUsers")),
  },
  {
    icon: <KeyRound className="text-icon" size={26} />,
    title: "settings.privacyAndSecurity.cloudPassword",
    onClick: () => dispatch(openComponent("cloudPassword")),
    isCloudPassword: true,
  },
  {
    icon: <Mail className="text-icon" size={26} />,
    title: "settings.privacyAndSecurity.linkEmail",
    onClick: () => dispatch(openComponent("userEmail")),
    isLinkEmail: true,
  },
];
