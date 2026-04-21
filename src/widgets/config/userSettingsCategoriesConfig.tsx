import { AppDispatch } from "@/app";
import { openComponent } from "@/entities";
import {
  BrickWallShield,
  Languages,
  MonitorSmartphone,
  Settings,
  Workflow,
} from "lucide-react";

export const userSettingsCategoriesConfig = (dispatch: AppDispatch) => [
  {
    icon: <Settings className="text-icon shrink-0" size={26} />,
    title: "settings.generalSettings.title",
    onClick: () => dispatch(openComponent("userSettingsGeneral")),
  },
  {
    icon: <MonitorSmartphone className="text-icon shrink-0" size={26} />,
    title: "settings.sessionSettings.title",
    onClick: () => dispatch(openComponent("userSettingsSessions")),
  },
  {
    icon: <BrickWallShield className="text-icon shrink-0" size={26} />,
    title: "settings.privacyAndSecurity.title",
    onClick: () => dispatch(openComponent("userSettingsPrivacy")),
  },
  {
    icon: <Languages className="text-icon shrink-0" size={26} />,
    title: "settings.languageSettings.title",
    onClick: () => dispatch(openComponent("userSettingsLanguage")),
    isLanguage: true,
  },
  {
    icon: <Workflow className="text-icon shrink-0" size={26} />,
    title: "settings.otherSettings.title",
    onClick: () => dispatch(openComponent("userSettingsOther")),
  },
];
