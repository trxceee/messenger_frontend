"use client";

import { BrushCleaning, Gift } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRef, FC, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { userApi } from "@/entities";

interface Props {
  birthday: string;
  onChange: (birthday: string) => void;
}

const SetBirthday: FC<
  Props
> = ({ birthday, onChange }) => {
  const [deleteBirthday] = userApi.useDeleteBirthdayMutation();

  const t = useTranslations();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [position, setPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  const inputRef = useRef<HTMLInputElement>(null);

  const handleClickRef = () => {
    inputRef.current?.showPicker?.();
  };

  const handleClick = async () => {
    await deleteBirthday();
  };

  return (
    <div
      className="flex items-center justify-center w-full"
      onContextMenu={(e) => {
        e.preventDefault();
        setPosition({ x: e.clientX + 5, y: e.clientY + 5 });
        setIsOpen((prev) => !prev);
      }}
    >
      <div className="relative w-full" onClick={handleClickRef}>
        <div className="relative hover:bg-hover-checkbox rounded-2xl px-5 py-4 flex items-center justify-start gap-5 cursor-pointer w-full">
          <Gift className="text-icon" />
          <p className="pointer-events-none text-text-default">
            {birthday
              ? new Date(birthday).toLocaleDateString("ru-RU")
              : t("profile.birthday")}
          </p>
          <input
            ref={inputRef}
            type="date"
            value={birthday ? birthday.split("T")[0] : ""}
            onChange={(e) => onChange(e.target.value)}
            className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
          />
        </div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            exit={{ opacity: 0, scale: 0.9 }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            style={{ top: position.y, left: position.x }}
            className="fixed p-0.5 backdrop-blur-lg rounded-xl w-max text-myred shadow-[0_0px_30px_-8px_rgba(0,0,0,0.8)] z-50 cursor-pointer"
          >
            <div
              onClick={handleClick}
              className="flex items-center justify-start hover:bg-hover-action p-2 px-3 rounded-[10px] duration-500 w-full gap-2"
            >
              <BrushCleaning className="text-myred" size={19} />
              <p>{t("settings.editProfileSettings.removeDateOfBirth")}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SetBirthday;
