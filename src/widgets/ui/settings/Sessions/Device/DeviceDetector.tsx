"use client";

import { appConfig, ShadowWrapper } from "@/shared";
import { Chromium, CircleMinus } from "lucide-react";
import { FC, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { sessionApi } from "@/entities";

interface Props {
  browser: string;
  os: string;
  country: string;
  city: string;
  sessionId: string;
  isMySession?: boolean;
}

const DeviceDetector: FC<Props> = ({
  browser,
  city,
  country,
  os,
  sessionId,
  isMySession = false,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const t = useTranslations();
  const [position, setPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  const [removeSessionById] = sessionApi.useRemoveSessionByIdMutation();

  const handleClick = async () => {
    await removeSessionById(sessionId);
  };

  return (
    <div
      onContextMenu={(e) => {
        if (!isMySession) {
          e.preventDefault();
          setPosition({ x: e.clientX + 5, y: e.clientY + 5 });
          setIsOpen((prev) => !prev);
        }
      }}
      className={`flex items-center justify-start w-full gap-4 px-3 ${
        isMySession
          ? ""
          : "cursor-pointer hover:bg-hover-checkbox rounded-2xl py-2"
      }`}
    >
      {/* icon */}
      <div className="flex items-center justify-center bg-accent p-1.5 rounded-2xl">
        <Chromium size={27} className="text-white" />
      </div>
      {/* info */}
      <div className="flex flex-col items-start justify-center w-full text-[.95rem]">
        <p>{browser}</p>
        <p>
          {appConfig.NAME()} {appConfig.TYPE_APP()} {appConfig.VERSION()}, {os}
        </p>
        <p className="text-icon text-[.85rem]">
          {isMySession && "-"} {city}, {country}
        </p>
      </div>
      <AnimatePresence>
        {isOpen && (
          <ShadowWrapper
            position={position}
            children={
              <div onClick={handleClick} className="flex items-center justify-start hover:bg-hover-action p-2 px-3 rounded-[10px] duration-500 w-full gap-2 text-myred">
                <CircleMinus size={19} />
                <p>{t("settings.sessionSettings.terminate")}</p>
              </div>
            }
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default DeviceDetector;
