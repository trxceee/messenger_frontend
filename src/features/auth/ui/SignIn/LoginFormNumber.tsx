"use client";

import { SignInType } from "@/entities";
import { handleAuthUser, schemaSignIn } from "@/features";
import {
  Button,
  DefaultInput,
  isErrorWithMessageAndType,
  OTPInput,
} from "@/shared";
import { zodResolver } from "@hookform/resolvers/zod";
import { KeyRound, Smartphone } from "lucide-react";
import { useTranslations } from "next-intl";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

const LoginFormNumber = () => {
  const router = useRouter();
  const params = useParams();
  const t = useTranslations();

  const [whoVisible, setWhoVisible] = useState<"code" | "password" | null>(
    null,
  );

  const { register, handleSubmit, watch, setValue } = useForm<SignInType>({
    resolver: zodResolver(schemaSignIn),
  });

  const onSubmit = async (data: SignInType) => {
    try {
      await handleAuthUser({
        number: data.number,
        cloudPassword: data.cloudPassword,
        code: data.code,
      });
      router.replace(`/${params.locale}/c`);
    } catch (error) {
      if (isErrorWithMessageAndType(error)) {
        if (error.data.type === "NON_CODE") {
          setWhoVisible("code");
        } else if (error.data.type === "NON_PASSWORD") {
          setWhoVisible("password");
        }
      }
    }
  };
  const code = watch("code");
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-col gap-5"
    >
      {!whoVisible ? (
        <DefaultInput
          {...register("number", { required: true })}
          placeholder={t("auth.phoneInput")}
          type="number"
          icon={<Smartphone size={22} />}
        />
      ) : whoVisible === "code" ? (
        <OTPInput
          value={code}
          onChange={(v) => setValue("code", v.toUpperCase())}
          numInputs={6}
          placeholder="1A2B3C"
        />
      ) : (
        <div className="flex flex-col w-full items-center justify-center">
          <DefaultInput
            {...register("cloudPassword")}
            placeholder={t("auth.password.passwordInput")}
            type="password"
            icon={<KeyRound size={22} />}
          />
        </div>
      )}

      {/* buttons */}
      <div className="flex flex-col items-center justify-center gap-3 w-full">
        <Button
          buttonType="ternary"
          type="submit"
          text={
            !whoVisible
              ? t("buttons.buttonSendCode")
              : t("buttons.buttonContinue")
          }
        />
        <Button
          buttonType="secondary"
          type="button"
          onClick={() => router.back()}
          text={t("buttons.buttonBack")}
        />
      </div>
    </form>
  );
};

export default LoginFormNumber;
