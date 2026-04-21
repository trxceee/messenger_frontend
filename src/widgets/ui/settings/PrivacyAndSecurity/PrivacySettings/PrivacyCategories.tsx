"use client";

import { useAppDispatch } from "@/app";
import { userApi } from "@/entities";
import { createRipple } from "@/shared";
import { userSecuritySettingsCategoriesConfig } from "@/widgets/config";
import { useTranslations } from "next-intl";
import { FC, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CircleOff } from "lucide-react";

interface Props {
  cloudPassword: boolean;
  email: string | null;
  blockedUsers: number;
}

const PrivacyCategories: FC<Props> = ({
  cloudPassword,
  email,
  blockedUsers,
}) => {
  const dispatch = useAppDispatch();
  const elements = userSecuritySettingsCategoriesConfig(dispatch);

  const t = useTranslations();

  // remove password handler
  const [removePassoword] = userApi.useRemovePassowrdMutation();
  const handleClick = async () => {
    setIsOpen(false);
    await removePassoword();
  };

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [position, setPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  return (
    <div className="flex flex-col items-center justify-center w-full">
      {elements.map((el, i) => (
        <div
          onClick={(e) => {
            createRipple(e);
            if (el.isCloudPassword && cloudPassword) {
              e.preventDefault();
              setPosition({ x: e.clientX + 5, y: e.clientY + 5 });
              setIsOpen((prev) => !prev);
            } else {
              el.onClick();
            }
          }}
          onContextMenu={(e) => {
            if (el.isCloudPassword && cloudPassword) {
              createRipple(e);
              e.preventDefault();
              setPosition({ x: e.clientX + 5, y: e.clientY + 5 });
              setIsOpen((prev) => !prev);
            }
          }}
          key={i}
          className={`relative overflow-hidden hover:bg-hover-checkbox rounded-2xl px-5 py-1.5 flex items-center justify-start gap-5 cursor-pointer w-full`}
        >
          {el.icon}
          <div className="flex flex-col items-start justify-between w-full">
            <p>{t(el.title)}</p>
            {el.isCloudPassword ? (
              <p className="text-icon text-[.9rem]">
                {cloudPassword
                  ? t("settings.privacyAndSecurity.enabled")
                  : t("settings.privacyAndSecurity.disabled")}
              </p>
            ) : el.isLinkEmail ? (
              <p className="text-icon text-[.9rem]">
                {email ? email : t("settings.privacyAndSecurity.notLinked")}
              </p>
            ) : (
              <p className="text-icon text-[.9rem]">
                {t("settings.privacyAndSecurity.blockedUsers")}: {blockedUsers}
              </p>
            )}
          </div>
        </div>
      ))}
      <AnimatePresence>
        {/* remove cloudPassword */}
        {isOpen && (
          <motion.div
            exit={{ opacity: 0, scale: 0.9 }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            style={{ top: position.y, left: position.x }}
            className="fixed p-0.5 backdrop-blur-lg rounded-xl text-myred w-max shadow-[0_0px_30px_-8px_rgba(0,0,0,0.8)] z-50 cursor-pointer"
          >
            <div
              onClick={handleClick}
              className="flex items-center justify-start hover:bg-hover-action p-2 px-3 rounded-[10px] duration-500 w-full gap-2"
            >
              <CircleOff size={19} />
              <p>{t("settings.privacyAndSecurity.disableCloudPassword")}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PrivacyCategories;
