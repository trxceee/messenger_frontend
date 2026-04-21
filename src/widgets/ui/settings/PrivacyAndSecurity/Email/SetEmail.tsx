"use client";

import { useTranslations } from "next-intl";
import { AppInput, Button } from "@/shared";
import { useState } from "react";
import { handleSetEmail } from "@/entities";

const SetEmail = () => {
  const t = useTranslations();
  const [email, setEmail] = useState<string>("");
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        await handleSetEmail(email);
      }}
      className="flex flex-col items-center justify-center w-full px-5 gap-5"
    >
      <AppInput
        type="email"
        value={email}
        placeholder={t("settings.privacyAndSecurity.linkEmailInputPlaceholder")}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Button
        buttonType="primary"
        type="submit"
        text={t("settings.privacyAndSecurity.linkEmailToAccount")}
      />
      <p className="text-icon text-[.8rem]">
        {t("settings.privacyAndSecurity.linkEmailSubtext")}
      </p>
    </form>
  );
};

export default SetEmail;
