"use client";

import { createRipple } from "@/shared/model";
import { Check } from "lucide-react";
import { FC } from "react";

interface ICheckboxDefault {
  isActive: boolean;
  onClick: () => void;
  content: string;
}

const CheckboxDefault: FC<ICheckboxDefault> = ({
  content,
  isActive,
  onClick,
}) => {
  return (
    <div
      onClick={(e) => {
        onClick(), createRipple(e);
      }}
      className="relative overflow-hidden hover:bg-hover-checkbox rounded-2xl px-5 py-3 flex items-center justify-start gap-5 cursor-pointer w-full"
    >
      {/* checkbox */}
      <div
        className={`w-5 h-5 rounded-md flex items-center justify-center ${!isActive ? 'border-2 border-border-checkbox' : ''}`}
      >
        {isActive && <div className="w-5 h-5 bg-accent rounded-md flex items-center justify-center"><Check size={17} className="text-white" /></div>}
      </div>
      <p>{content}</p>
    </div>
  );
};

export default CheckboxDefault;
