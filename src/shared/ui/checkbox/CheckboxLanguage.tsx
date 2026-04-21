"use client";

import { createRipple } from "@/shared/model";
import { FC } from "react";

interface ICheckboxLanguage {
  isActive: boolean;
  onClick: () => void;
  content: string;
  contentEn: string;
}

const CheckboxLanguage: FC<ICheckboxLanguage> = ({
  content,
  isActive,
  onClick,
  contentEn,
}) => {
  return (
    <div
    data-testid="checkbox-language"
      onClick={(e) => {
        onClick(), createRipple(e);
      }}
      className="relative overflow-hidden hover:bg-hover-checkbox rounded-2xl px-5 py-2 flex items-center justify-start gap-5 cursor-pointer w-full"
    >
      {/* checkbox */}
      <div
        className={`w-5 h-5 rounded-full flex items-center justify-center border-2 ${
          isActive ? "border-accent" : "border-border-checkbox"
        }`}
      >
        {isActive && <div className="w-2.5 h-2.5 bg-accent rounded-full"></div>}
      </div>
      <div className="flex flex-col items-start justify-center">
        <p>{content}</p>
        <p className="text-[.9rem] text-icon">{contentEn}</p>
      </div>
    </div>
  );
};

export default CheckboxLanguage;
