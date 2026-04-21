"use client";

import type { ButtonHTMLAttributes, FC, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  buttonType: "primary" | "secondary" | "ternary";
  text?: string;
  iconStart?: ReactNode;
  iconLast?: ReactNode;
}

const Button: FC<IButton> = ({
  iconStart,
  iconLast,
  buttonType,
  className,
  text,
  ...props
}) => {
  const baseStyles = () => {
    switch (buttonType) {
      case "primary":
        return "hover:opacity-85 duration-500 text-[.9rem] bg-linear-to-b from-secondary to-accent p-3";
      case "secondary":
        return "ring-2 ring-border-rect cursor-pointer opacity-40 duration-500 hover:opacity-100";
      case "ternary":
        return "backdrop-blur-2xl px-2.5 gap-2 text-white bg-linear-to-tr from-accent/25 via-button/70 to-accent/25 ring-3 ring-accent/20 overflow-hidden duration-500 hover:opacity-85 transition-opacity before:absolute before:top-4 before:left-1/2 before:-translate-x-1/2 before:w-[100px] before:h-[100px] before:rounded-md before:bg-gradient-to-b before:from-accent/10 before:blur-xl disabled:cursor-not-allowed";
    }
  };
  return (
    <button
      {...props}
      className={twMerge(
        baseStyles(),
        "w-full flex items-center justify-center cursor-pointer disabled:cursor-not-allowed p-2.5 rounded-xl",
        className,
      )}
    >
      {iconStart}
      <p>{text}</p>
      {iconLast}
    </button>
  );
};

export default Button;
