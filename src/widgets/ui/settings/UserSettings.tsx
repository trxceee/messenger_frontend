"use client";

import { UserDataShortInfo, UserType } from "@/entities";
import { motion } from "framer-motion";
import UserSettingsCategories from "./UserSettingsCategories";
import { useRouter } from "next/navigation";
import { ReceiptText } from "lucide-react";
import { useLocale } from "next-intl";
import { useTranslations } from "use-intl";
import {
  createRipple,
  RenderAvatarElement,
  UserSettingsHeaderConstructor,
} from "@/shared";
import { FC } from "react";

interface IUserSettings {
  data: UserType;
}

const UserSettings: FC<IUserSettings> = ({ data }) => {
  const t = useTranslations();
  const router = useRouter();
  const locale = useLocale();

  return (
    <div className="flex flex-col items-center justify-start gap-5 h-screen overflow-y-auto text-text-default scrollbar-thin w-full">
      <motion.div
        exit={{ opacity: 0, scale: 0.8, x: -300 }}
        initial={{ opacity: 0, scale: 0.8, x: -300 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ duration: 0.2 }}
        className="w-full flex flex-col items-center justify-start"
      >
        <UserSettingsHeaderConstructor
          backUI={null}
          title="chat.actionsPopup.settings"
          typeHeader="settings"
        />
        {/* avatar & names */}
        <div className="w-full flex flex-col items-center justify-center p-2 gap-3">
          <div className="flex flex-col items-center w-full gap-3 cursor-pointer p-3">
            <RenderAvatarElement
              hasAvatar={!!data.avatars.length}
              size={130}
              avatar={data.avatars[data.avatars.length - 1]}
            />
            <div className="flex flex-col items-center justify-center text-center">
              <p className="text-xl">
                {data.firstName} {data.lastName}
              </p>
              <p className="text-icon text-[.85rem]">
                {t("settings.online")}
              </p>
            </div>
          </div>

          <UserDataShortInfo
            number={data.number}
            username={data.username}
            bio={data.bio}
            email={data.email}
          />
          <hr className="w-full border-3 border-black/5" />
          <UserSettingsCategories />
          <hr className="w-full border-3 border-black/5" />

          {/* terms of use */}
          <div
            onClick={(e) => {
              createRipple(e);
              router.push(`/${locale}/terms`);
            }}
            className="relative overflow-hidden hover:bg-hover-checkbox rounded-2xl px-5 py-4 flex items-center justify-start gap-5 cursor-pointer w-full"
          >
            <ReceiptText className={"text-icon"} />
            <p>{t("settings.termOfUse")}</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default UserSettings;
