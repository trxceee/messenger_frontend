"use client";

import { FC, InputHTMLAttributes, ReactNode } from "react";

interface IDefaultInput extends InputHTMLAttributes<HTMLInputElement> {
  icon?: ReactNode;
  classNameDiv?: string;
}
const SearchInput: FC<IDefaultInput> = ({
  className,
  classNameDiv,
  icon,
  ...props
}) => {
  return (
    <div
      className={`${
        classNameDiv ? classNameDiv : ""
      } flex items-center justify-center gap-2.5 px-2.5 py-2 bg-hover-checkbox backdrop-blur-xl rounded-full ring-2 ring-input-ring focus-within:ring-accent duration-500 w-full text-text-default`}
    >
      {icon}
      <input
        {...props}
        className={`${
          className ? className : ""
        } text-text-default outline-none flex-1 placeholder:text-input-placeholder w-full`}
      />
    </div>
  );
};

export default SearchInput;