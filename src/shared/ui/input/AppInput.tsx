"use client";

import { FC, InputHTMLAttributes, ReactNode } from "react";

interface IAppInput extends InputHTMLAttributes<HTMLInputElement> {
  icon?: ReactNode;
  classNameDiv?: string;
}
const AppInput: FC<IAppInput> = ({
  className,
  classNameDiv,
  icon,
  ...props
}) => {
  return (
    <div
      className={`${
        classNameDiv ? classNameDiv : ""
      } flex items-center justify-center gap-2.5 p-3 px-5 rounded-xl ring-2 ring-input-ring focus-within:ring-accent duration-500 w-full text-text-default`}
    >
      {icon}
      <input
        {...props}
        className={`${
          className ? className : ""
        } text-text-default outline-none flex-1 placeholder:text-input-placeholder w-full text-[.9rem]`}
      />
    </div>
  );
};

export default AppInput;