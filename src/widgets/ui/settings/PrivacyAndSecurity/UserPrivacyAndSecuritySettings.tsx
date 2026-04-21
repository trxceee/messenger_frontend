"use client";

import { motion } from "framer-motion";
import { UserSettingsHeaderConstructor } from "@/shared";
import { UserType } from "@/entities";
import { FC } from "react";
import {VisibilityCategories} from "./VisibilitySettings";
import {PrivacyCategories} from "./PrivacySettings";

interface IUserPrivacyAndSecuritySettings {
  data: UserType
}

const UserPrivacyAndSecuritySettings: FC<IUserPrivacyAndSecuritySettings> = ({data}) => {

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
          backUI={"userSettings"}
          title="settings.privacyAndSecurity.title"
          typeHeader="default"
        />
        <div className="flex flex-col items-start justify-center w-full p-2 px-3 gap-3">
          <PrivacyCategories
            cloudPassword={!!data.cloudPassword}
            email={data.email}
            blockedUsers={data.blockedUsers.length}
          />
          <hr className="w-full border-3 border-black/5" />
          <VisibilityCategories data={data} />
        </div>
      </motion.div>
    </div>
  );
};

export default UserPrivacyAndSecuritySettings;
