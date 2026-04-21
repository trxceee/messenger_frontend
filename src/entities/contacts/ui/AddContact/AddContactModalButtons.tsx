"use client";

import { Button } from "@/shared";
import { useTranslations } from "next-intl";
import { FC } from "react";

interface Props {
  closeCallback: () => void;
  submitCallback: () => void;
}

const AddContactModalButtons: FC<Props> = ({
  closeCallback,
  submitCallback,
}) => {
  const t = useTranslations();

  return (
    <div className="flex w-full gap-3 items-center justify-center">
      <Button
        buttonType="secondary"
        onClick={closeCallback}
        type="button"
        text={t("buttons.buttonBack")}
      />
      <Button
        buttonType="secondary"
        onClick={submitCallback}
        type="submit"
        text={t("buttons.buttonSave")}
      />
    </div>
  );
};

export default AddContactModalButtons;
