"use client";

import { SignUpType } from "@/entities";
import { handleRegisterUser, schemaSignUp } from "@/features";
import {
  Button,
  DefaultInput,
  FieldInput,
  isErrorWithMessageAndType,
  OTPInput,
} from "@/shared";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleUserRound, Smartphone } from "lucide-react";
import { useTranslations } from "next-intl";
import { useParams, useRouter } from "next/navigation";
import { Dispatch, FC, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";

interface IRegisterFormNumber {
  setIsVisible: Dispatch<SetStateAction<boolean>>;
}

const RegisterFormNumber: FC<IRegisterFormNumber> = ({ setIsVisible }) => {
  const router = useRouter();
  const t = useTranslations();
  const params = useParams();

  const [whoVisible, setWhoVisible] = useState<"code" | "info" | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<SignUpType>({
    resolver: zodResolver(schemaSignUp),
  });

  const onSubmit = async (data: SignUpType) => {
    try {
      await handleRegisterUser({
        number: data.number,
        firstName: data.firstName,
        lastName: data.lastName,
        username: data.username,
        code: data.code,
      });
      setIsVisible(true);
    } catch (error) {
      if (isErrorWithMessageAndType(error)) {
        if (error.data.type === "NON_CODE") {
          setWhoVisible("code");
        } else if (error.data.type === "NON_INFO") {
          setWhoVisible("info");
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
        <>
          <FieldInput<SignUpType>
            errors={errors}
            input={
              <DefaultInput
                {...register("username")}
                placeholder={t("register.information.usernameInput")}
                type="text"
                icon={<CircleUserRound size={22} />}
              />
            }
            field="username"
          />
          <DefaultInput
            {...register("firstName")}
            placeholder={t("register.information.firstNameInput")}
            type="text"
            icon={<CircleUserRound size={22} />}
          />
          <DefaultInput
            {...register("lastName")}
            placeholder={t("register.information.lastNameInput")}
            type="text"
            icon={<CircleUserRound size={22} />}
          />
        </>
      )}

      {/* buttons */}
      <div className="flex flex-col items-center text-center justify-center gap-3 w-full">
        <Button
          type="submit"
          buttonType="ternary"
          text={
            !whoVisible
              ? t("buttons.buttonSendCode")
              : t("buttons.buttonContinue")
          }
          className="w-full p-2.5"
        />
        <Button
          type="button"
          buttonType="secondary"
          onClick={() => router.back()}
          text={t("buttons.buttonBack")}
        />
        <p className="text-[.8rem] text-btn-text/50">
          {t("register.agreeWith")}{" "}
          <Link
            href={`/${params.locale}/terms`}
            className="cursor-pointer text-accent hover:opacity-70 duration-500"
          >
            {t("pagesTitle.termsOfUse")}
          </Link>
        </p>
      </div>
    </form>
  );
};

export default RegisterFormNumber;
