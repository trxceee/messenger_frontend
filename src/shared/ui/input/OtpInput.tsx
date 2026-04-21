'use client'

import type { FC } from "react";
import { OtpInput } from "reactjs-otp-input";

interface IOTPInput {
  value?: string;
  onChange: (v: string) => void;
  numInputs: number;
  placeholder: string;
}

const OTPInput: FC<IOTPInput> = ({
  onChange,
  value,
  numInputs,
  placeholder,
  ...props
}) => {
  return (
    <OtpInput
      {...props}
      value={value}
      onChange={onChange}
      numInputs={numInputs}
      placeholder={placeholder}
      containerStyle="flex items-center w-full justify-start space-x-3 text-text-main cursor-pointer"
      inputStyle={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        outline: "0",
        width: "100%",
        aspectRatio: "1/1",
        backgroundColor:
          "linear-gradient(to bottom, var(--accent-color), rgba(0,0,0,0.1))",
        backdropFilter: "blur(20px)",
        borderRadius: "0.75rem",
        border:
          "2px solid color-mix(in srgb, var(--accent-color) 5%, transparent)",
        textAlign: "center",
        fontSize: "1.5rem",
      }}
      focusStyle={{
        border:
          "2px solid color-mix(in srgb, var(--accent-color) 35%, transparent)",
      }}
    />
  );
};

export default OTPInput;
