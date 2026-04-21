"use client";

import { Button } from "@/shared";
import { Redo } from "lucide-react";
import { useTranslations } from "next-intl";
import { Dispatch, FC, ReactNode, SetStateAction } from "react";

interface ICompletePane {
  icon: ReactNode;
  title: string;
  desc: string;
  setWhoVisible: Dispatch<
    SetStateAction<"email" | "birthday" | "password" | null>
  >;
  tag: "email" | "birthday" | "password";
}

const CompletePane: FC<ICompletePane> = ({
  desc,
  icon,
  setWhoVisible,
  title,
  tag,
}) => {
  const t = useTranslations();

  return (
    <div className="flex flex-row items-center5 justify-between w-full">
      {/* left */}
      <div className="flex flex-row items-center justify-center gap-4">
        <div className="flex items-center justify-center p-3.25 bg-linear-to-b from-accent/60 to-accent/15 rounded-2xl">
          {icon}
        </div>
        <div className="flex flex-col items-start justify-center">
          <h3 className="text-white">{t(title)}</h3>
          <p className="text-[0.85rem] text-btn-text/50 line-clamp-1">
            {t(desc)}
          </p>
        </div>
      </div>

      {/* right */}
      <Button
        buttonType="secondary"
        iconStart={<Redo size={22} />}
        onClick={() => setWhoVisible(tag)}
        className="p-3.25 aspect-square rounded-2xl w-max"
      />
    </div>
  );
};

export default CompletePane;
