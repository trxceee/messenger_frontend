"use client";

import { motion } from "framer-motion";
import UserPrivacyAndSecuritySettingsBlockedUsersPain from "./BlockedUsersElement";
import { useTranslations } from "next-intl";
import { UserSettingsHeaderConstructor } from "@/shared";
import { UserType } from "@/entities";
import { FC } from "react";

interface Props {
  data: UserType
}

const BlockedUsers: FC<Props> = ({data}) => {
  const t = useTranslations();

  return (
    <div className="z-1233 flex flex-col items-center justify-start h-screen overflow-y-auto text-text-default scrollbar-thin w-full">
      <motion.div
        exit={{ opacity: 0, scale: 0.8, x: -300 }}
        initial={{ opacity: 0, scale: 0.8, x: -300 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ duration: 0.2 }}
        className="w-full flex flex-col items-center justify-start"
      >
        <UserSettingsHeaderConstructor
          backUI={"userSettingsPrivacy"}
          title="settings.privacyAndSecurity.blockedUsers"
          typeHeader="default"
        />
        <div className="flex flex-col items-start justify-center w-full p-2 px-3 gap-1">
          {data.blockedUsers.length ? (
            data.blockedUsers.map((el, i) => (
              <UserPrivacyAndSecuritySettingsBlockedUsersPain
                key={i}
                userId={el}
              />
            ))
          ) : (
            <p className="text-icon text-[.9rem]">
              {t("settings.privacyAndSecurity.blockListEmpty")}
            </p>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default BlockedUsers;
