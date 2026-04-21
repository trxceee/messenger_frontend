"use client";

import { UserType } from "@/entities";
import { UserSettingsHeaderConstructor } from "@/shared";
import { motion } from "framer-motion";
import { FC } from "react";
import ChangeEmail from "./ChangeEmail";
import SetEmail from "./SetEmail";

interface Props {
  data: UserType
}

const PrivacyEmail: FC<Props> = ({data}) => {
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
          title={
            !!data.email
              ? "settings.privacyAndSecurity.changeEmail"
              : "settings.privacyAndSecurity.linkEmailToAccount"
          }
          typeHeader="default"
        />
        <div className="flex flex-col items-start justify-center w-full p-2 px-2 gap-3">
          {!!data.email ? (
            <ChangeEmail
              cloudPassword={!!data.cloudPassword}
            />
          ) : (
            <SetEmail />
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default PrivacyEmail;
