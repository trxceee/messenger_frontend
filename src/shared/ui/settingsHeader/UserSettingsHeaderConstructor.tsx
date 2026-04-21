"use client";

import { useAppDispatch } from "@/app";
import { handleLogout } from "@/features";
import { AnimatePresence } from "framer-motion";
import { ArrowLeft, EllipsisVertical, LogOut, Pencil } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import { useLocale } from "next-intl";
import { closeAll, openComponent, IIsOpenUIComponent } from "@/entities";
import ShadowWrapper from "../wrappers/ShadowWrapper";

interface IUserSettingsHeaderConstructor {
  title: string;
  backUI: IIsOpenUIComponent;
  typeHeader: "settings" | "profile" | "default";
}

const UserSettingsHeaderConstructor: FC<IUserSettingsHeaderConstructor> = ({
  backUI,
  title,
  typeHeader,
}) => {
  // actions
  const dispatch = useAppDispatch();

  const t = useTranslations();
  const router = useRouter();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [position, setPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  const locale = useLocale();

  const handleClick = async () => {
    await handleLogout();
    await router.replace(`/${locale}`);
  };

  return (
    <header className="flex w-full justify-between items-center text-icon sticky top-0 bg-bg-chat p-2 px-3 z-1221">
      <div className="flex items-center justify-center gap-3">
        {/* back */}
        <div
          onClick={() =>
            dispatch(backUI === null ? closeAll() : openComponent(backUI))
          }
          className="iconHoverEffect"
        >
          <ArrowLeft size={22} />
        </div>
        <h1 className="text-text-default font-medium text-xl">
          {t(title)}
        </h1>
      </div>

      {(() => {
        switch (typeHeader) {
          case "settings":
            return (
              <div className="flex gap-1 items-center justify-center relative">
                {/* editprofile */}
                <div
                  onClick={() => dispatch(openComponent("editProfile"))}
                  className="iconHoverEffect"
                >
                  <Pencil size={22} />
                </div>
                {/* logout */}
                <div
                  onClick={(e) => {
                    setPosition({ x: e.clientX - e.clientX / 2 + 5, y: e.clientY + 30 });
                    setIsOpen((prev) => !prev);
                  }}
                  className="iconHoverEffect"
                >
                  <EllipsisVertical size={22} />
                </div>
              </div>
            );
          case "profile":
            return (
              <div className="flex gap-1 items-center justify-center relative">
                {/* editprofile */}
                <div
                  onClick={() => dispatch(openComponent("editProfile"))}
                  className="iconHoverEffect"
                >
                  <Pencil size={22} />
                </div>
              </div>
            );
          case "default":
          default:
            break;
        }
      })()}
      {/* popup */}
      <AnimatePresence>
        {isOpen && (
          <ShadowWrapper
            position={position}
            children={
              <div
                onClick={handleClick}
                className="flex items-center justify-start hover:bg-hover-action p-2 px-3 rounded-[10px] duration-500 w-full gap-2"
              >
                <LogOut className="text-icon" size={19} />
                <p className="text-[.95rem]">{t("settings.logout")}</p>
              </div>
            }
          />
        )}
      </AnimatePresence>
    </header>
  );
};

export default UserSettingsHeaderConstructor;
