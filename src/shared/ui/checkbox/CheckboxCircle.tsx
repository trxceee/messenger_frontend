"use client";

import { createRipple } from "@/shared/model";
import { FC } from "react";

interface ICheckboxCircle {
  isActive: boolean;
  onClick?: () => void;
  content: string;
}

const CheckboxCircle: FC<ICheckboxCircle> = ({
  content,
  isActive,
  onClick,
}) => {
  return (
    <div
      onClick={(e) => {
        onClick && onClick(), createRipple(e);
      }}
      className="relative overflow-hidden hover:bg-hover-checkbox rounded-2xl px-5 py-3 flex items-center justify-start gap-5 cursor-pointer w-full"
    >
      {/* checkbox */}
      <div
        className={`w-5 h-5 rounded-full flex items-center justify-center border-2 ${
          isActive ? "border-accent" : "border-border-checkbox"
        }`}
      >
        {isActive && <div className="w-2.5 h-2.5 bg-accent rounded-full"></div>}
      </div>
      <p>{content}</p>
    </div>
  );
};
export default CheckboxCircle;
