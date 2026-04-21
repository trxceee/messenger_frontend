"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/shared";
import { appConfig } from "@/shared";
import { useParams, useRouter } from "next/navigation";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const HeroTitle = () => {
  const t = useTranslations();
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  return (
    <div
      data-aos="zoom-out"
      className="flex flex-col items-start justify-center gap-5 w-full max-w-100"
    >
      <div className="flex flex-col items-start justify-center gap-1">
        <h1 className="text-2xl text-white">{appConfig.NAME()}  —</h1>
        <p className="text-white text-[.8rem]">{t("home.heroDesc")}</p>
      </div>
      <div className="flex flex-col items-center justify-center gap-3 w-full">
        <Button
          onClick={() => router.push(`/${params.locale}/register`)}
          text={t("buttons.buttonSignUp")}
          buttonType="ternary"
        />
        <Button
          buttonType="secondary"
          onClick={() => router.push(`/${params.locale}/auth`)}
          text={t("buttons.buttonIHaveAccount")}
        />
      </div>
    </div>
  );
};

export default HeroTitle;
