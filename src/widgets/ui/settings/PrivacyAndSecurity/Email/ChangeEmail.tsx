"use client";

import { useTranslations } from "next-intl";
import { AppInput } from "@/shared";
import { FC, useState } from "react";
import { handleChangeEmail } from "@/entities";

interface Props {
  cloudPassword: boolean;
}

const ChangeEmail: FC<Props> = ({ cloudPassword }) => {
  const t = useTranslations();
  const [data, setData] = useState<{
    email: string;
    password: string;
  }>({
    email: "",
    password: "",
  });
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        await handleChangeEmail({
          newEmail: data.email,
          cloudPassword: data.password,
        });
      }}
      className="flex flex-col items-center justify-center w-full px-5 gap-5"
    >
      <AppInput
        type="email"
        value={data.email}
        placeholder={t("settings.privacyAndSecurity.linkEmailInputPlaceholder")}
        onChange={(e) =>
          setData((prev) => ({ ...prev, email: e.target.value }))
        }
      />
      {cloudPassword && (
        <AppInput
          type="password"
          value={data.password}
          placeholder={t(
            "settings.privacyAndSecurity.cloudPasswordInputPlaceholder",
          )}
          onChange={(e) =>
            setData((prev) => ({ ...prev, password: e.target.value }))
          }
        />
      )}

      <button
        type="submit"
        className="flex w-full cursor-pointer hover:opacity-85 duration-500 text-[.9rem] rounded-xl bg-linear-to-b from-secondary to-accent p-3 py-3 items-center justify-center"
      >
        <p>{t("settings.privacyAndSecurity.changeEmail")}</p>
      </button>
      <p className="text-icon text-[.8rem]">
        {t("settings.privacyAndSecurity.linkEmailSubtext")}
      </p>
    </form>
  );
};

export default ChangeEmail;
