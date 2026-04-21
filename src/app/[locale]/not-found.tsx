"use client";

import { Button, ShaderDarkVeil } from "@/shared";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

export default function NotFoundPage() {
  const t = useTranslations();
  const router = useRouter();

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  return (
    <div className="flex flex-col items-center justify-center mx-auto h-screen w-full p-5">
      <div className="w-full h-screen fixed top-0 left-0 -z-10">
        <ShaderDarkVeil
          speed={2}
          hueShift={0}
          noiseIntensity={0.1}
          scanlineFrequency={3.8}
          scanlineIntensity={1}
          warpAmount={1}
        />
      </div>
      <h1 className="absolute inset-0 w-full h-screen flex items-center justify-center text-[38rem] text-accent/3">
        404
      </h1>
      <div
        data-aos="zoom-out"
        className="flex flex-col gap-5 w-full items-center justify-center"
      >
        <div className="flex flex-col items-center justify-center w-full text-center gap-5">
          <h1 className="text-7xl bg-clip-text text-transparent bg-linear-to-b from-accent/70 to-accent/20">
            {t("notFound.title")}
          </h1>
          <p className="max-w-120 text-[.8rem] text-btn-text/50">
            {t("notFound.desc")}
          </p>
        </div>
        <Button
          buttonType="ternary"
          text={t("buttons.buttonHome")}
          className="p-2.5 w-full max-w-70"
          onClick={() => router.push("/")}
        />
      </div>
    </div>
  );
}
