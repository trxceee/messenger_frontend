"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { AppInput, Button, UserSettingsHeaderConstructor } from "@/shared";
import { useState } from "react";
import { handleSetPassword } from "@/entities";

const SetCloudPassword = () => {
  const t = useTranslations();
  const [passwords, setPasswords] = useState<{
    password: string;
    confirmPassword: string;
  }>({
    confirmPassword: "",
    password: "",
  });

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
          title="settings.privacyAndSecurity.cloudPasswordCreate"
          typeHeader="default"
        />
        <div className="flex flex-col items-start justify-center w-full p-2 px-2 gap-3">
          <div className="flex flex-col items-center justify-center w-full px-5 gap-5">
            <AppInput
              type="password"
              value={passwords?.password}
              placeholder={t(
                "settings.privacyAndSecurity.cloudPasswordInputPlaceholder",
              )}
              onChange={(e) =>
                setPasswords((prev) => ({ ...prev, password: e.target.value }))
              }
            />
            <AppInput
              type="password"
              value={passwords?.confirmPassword}
              placeholder={t(
                "settings.privacyAndSecurity.cloudConfirmPasswordInputPlaceholder",
              )}
              onChange={(e) =>
                setPasswords((prev) => ({
                  ...prev,
                  confirmPassword: e.target.value,
                }))
              }
            />
            <Button
              buttonType="primary"
              onClick={async () =>
                await handleSetPassword({
                  confirmPassword: passwords.confirmPassword,
                  password: passwords.password,
                })
              }
              text={t("settings.privacyAndSecurity.cloudPasswordCreate")}
            />
            <p className="text-white/50 text-[.8rem]">
              {t("settings.privacyAndSecurity.createCloudPasswordSubtext")}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SetCloudPassword;
