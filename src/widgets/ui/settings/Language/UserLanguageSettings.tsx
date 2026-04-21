"use client";

import { motion } from "framer-motion";
import {
  CheckboxLanguage,
  i18nPattern,
  routing,
  TLocales,
  UserSettingsHeaderConstructor,
} from "@/shared";
import { useTranslations } from "next-intl";
import { useLocaleSwitch } from "@/app/providers/LocaleContext";

const UserLanguageSettings = () => {
  const locales = routing.locales;
  const { locale, switchLocale } = useLocaleSwitch();
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
          backUI={"userSettings"}
          title="settings.languageSettings.title"
          typeHeader="default"
        />
        <hr className="w-full border-3 border-black/5" />
        <div className="flex flex-col items-center justify-center w-full p-2">
          <div className="w-full flex flex-col items-start justify-center gap-3">
            <p className="text-icon text-md ml-5">
              {t("settings.languageSettings.interfaceLanguage")}
            </p>
            <div className="w-full flex flex-col items-start justify-center gap-1">
              {locales.map((el, i) => (
                <CheckboxLanguage
                  key={i}
                  content={i18nPattern(el).orig}
                  contentEn={i18nPattern(el).en}
                  isActive={el === locale}
                  onClick={() => switchLocale(el)}
                />
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default UserLanguageSettings;
