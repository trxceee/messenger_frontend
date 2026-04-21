"use client";

import { useTranslations } from "next-intl";
import { FC, ReactNode } from "react";

interface Props {
  icon: ReactNode;
  title: string;
  onClick: () => void;
  isRed?: boolean;
  isFirst?: boolean;
  isLast?: boolean;
  isFull?: boolean;
}

const ActionsElement: FC<Props> = ({
  icon,
  title,
  onClick,
  isRed,
  isFirst,
  isLast,
  isFull,
}) => {
  const t = useTranslations();

  return (
    <div
      onClick={onClick}
      className={`flex items-center w-full gap-3 cursor-pointer hover:bg-hover-action p-2 px-3 duration-300 ${isRed ? "text-myred" : ""} ${isFull ? "rounded-[10px]" : isFirst ? "rounded-t-[10px]" : isLast ? "rounded-b-[10px]" : ""}`}
    >
      {icon}
      <p className="text-[.9rem]">{t(title)}</p>
    </div>
  );
};

export default ActionsElement;
