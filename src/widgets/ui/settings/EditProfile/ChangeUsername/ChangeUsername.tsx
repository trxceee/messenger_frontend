"use client";

import { AppInput } from "@/shared";
import { useTranslations } from "next-intl";
import { FC } from "react";

interface Props {
  username: string;
  onChange: (username: string) => void;
}

const ChangeUsername: FC<
  Props
> = ({ username, onChange }) => {
  const t = useTranslations();

  return (
    <div className="flex flex-col items-start justify-center w-full px-5 gap-3">
        <p className="text-icon">{t('register.information.usernameInput')}</p>
      <div className="flex flex-col items-center justify-center gap-5">
        <AppInput
          value={username}
          placeholder={t(
            "settings.editProfileSettings.inputUsernamePlaceholder"
          )}
          onChange={(e) => onChange(e.target.value)}
        />
        <div className="flex flex-col items-start justify-center gap-3">
          <p className="text-icon text-[.8rem]">
            {t("settings.editProfileSettings.usernameSubtext")}
          </p>
          <p className="text-icon text-[.8rem]">
            {t("settings.editProfileSettings.usernameSubtextTwo")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChangeUsername;
