"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { THEME_CONFIG } from "@/widgets/config";
import { CheckboxCircle, UserSettingsHeaderConstructor } from "@/shared";
import { useAppDispatch, useAppSelector } from "@/app";
import { getCurrentTheme } from "@/entities";

const UserGeneralSettings = () => {
  const t = useTranslations();
  const dispatch = useAppDispatch();
  const elements = THEME_CONFIG(dispatch);
  const currentTheme = useAppSelector(getCurrentTheme);

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
          title="settings.generalSettings.title"
          typeHeader="default"
        />
        <div className="flex flex-col items-start justify-center w-full p-2 px-3 gap-3">
          <div className="w-full flex flex-col items-start justify-center gap-3">
            <p className="text-icon text-md ml-5">
              {t("settings.generalSettings.theme")}
            </p>
            <div className="flex flex-col items-center justify-center w-full">
              {elements.map((el, i) => (
                <CheckboxCircle
                  key={i}
                  content={t(el.title)}
                  isActive={currentTheme === el.tag.theme}
                  onClick={el.onClick}
                />
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default UserGeneralSettings;
