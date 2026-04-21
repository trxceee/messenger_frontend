"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { CheckboxDefault, UserSettingsHeaderConstructor } from "@/shared";
import { useState } from "react";

const UserOtherSettings = () => {
  const t = useTranslations();
  const [isHide, setIsHide] = useState<boolean>(false);

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
          title="settings.otherSettings.title"
          typeHeader="default"
        />
        <hr className="w-full border-3 border-black/5" />
        <div className="flex flex-col items-center justify-center w-full p-2">
          <CheckboxDefault
            content={t("settings.otherSettings.hideStatus")}
            isActive={isHide}
            onClick={() => setIsHide((prev) => !prev)}
          />
        </div>
      </motion.div>
    </div>
  );
};

export default UserOtherSettings;
