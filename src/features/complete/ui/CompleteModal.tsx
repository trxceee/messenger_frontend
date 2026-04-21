"use client";

import { Button, DefaultButton, DefaultInput } from "@/shared";
import { useTranslations } from "next-intl";
import { SetStateAction, Dispatch, useState, FC } from "react";
import { IUserCompleteData, setCompleteData } from "@/entities";
import { Calendar1, KeyRound, Mail } from "lucide-react";
import { useAppDispatch } from "@/app";

interface ICompleteModal {
  setWhoVisible: Dispatch<
    SetStateAction<"email" | "birthday" | "password" | null>
  >;
  whoVisible: "email" | "birthday" | "password";
}

const CompleteModal: FC<ICompleteModal> = ({ whoVisible, setWhoVisible }) => {
  const [value, setValue] = useState("");
  const dispatch = useAppDispatch();
  const setData = (data: string, field: keyof IUserCompleteData) =>
    dispatch(setCompleteData({ data, field }));
  const t = useTranslations();

  const handleSave = async () => {
    setData(value, whoVisible);
    setWhoVisible(null);
  };

  const inputType =
    whoVisible === "birthday"
      ? "date"
      : whoVisible === "password"
        ? "password"
        : "email";

  const inputIcon =
    whoVisible === "birthday" ? (
      <Calendar1 size={22} />
    ) : whoVisible === "password" ? (
      <KeyRound size={22} />
    ) : (
      <Mail size={22} />
    );

  const inputPlaceholder =
    whoVisible === "birthday"
      ? t("profileComplete.birthdayTitle")
      : whoVisible === "password"
        ? t("profileComplete.passwordTitle")
        : t("profileComplete.emailTitle");

  return (
    <form
      onSubmit={handleSave}
      className="flex flex-col items-center justify-center w-full gap-10"
    >
      <DefaultInput
        icon={inputIcon}
        type={inputType}
        placeholder={inputPlaceholder}
        value={value}
        onChange={(e) => setValue(e.target.value.toString())}
      />
      <div className="flex flex-col gap-4 w-full">
        <Button
          buttonType="ternary"
          type="submit"
          text={t("buttons.buttonSave")}
          className="p-2.5"
        />
        <Button
          buttonType="secondary"
          type="button"
          text={t("buttons.buttonBack")}
          onClick={() => setWhoVisible(null)}
        />
      </div>
    </form>
  );
};

export default CompleteModal;
