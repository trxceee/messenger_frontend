"use client";

import { useAppDispatch, useAppSelector } from "@/app";
import {
  clearDropFiles,
  getDropFiles,
  setDropFile,
  setDropFiles,
  setFilesModalOpen,
} from "@/entities/chats/model";
import { ShadowWrapper } from "@/shared";
import { AnimatePresence } from "framer-motion";
import { EllipsisVertical, Plus, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { ChangeEvent, MouseEvent, useRef, useState } from "react";

const Header = () => {
  const t = useTranslations();
  const dispatch = useAppDispatch();
  const files = useAppSelector(getDropFiles);

  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);
  const [position, setPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  const handleOpenMenu = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    setPosition({ x: rect.right - 200, y: rect.bottom + 10 });
    setIsOpenMenu((prev) => !prev);
  };

  // input

  const inputRef = useRef<HTMLInputElement>(null);

  const handleAddFile = () => {
    inputRef.current?.click();
    setIsOpenMenu(false);
  };

  const handleChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    dispatch(setDropFile(file));
  };

  return (
    <>
      <header className="flex w-full justify-between items-center relative">
        <div className="flex items-center justify-start w-full gap-3">
          <div
            onClick={() => {
              dispatch(setFilesModalOpen(false));
              dispatch(clearDropFiles());
            }}
            className="iconHoverEffect"
          >
            <X size={22} className="text-icon" />
          </div>
          <p className="text-text-default font-medium text-lg">
            {files.length}{" "}
            {t(
              `chat.files.${files.length === 1 ? "filesOne" : files.length > 1 && files.length < 5 ? "filesFew" : "filesMany"}`,
            )}
          </p>
        </div>

        {/* manage */}
        <div
          onClick={(e) => handleOpenMenu(e)}
          className="iconHoverEffect text-icon"
        >
          <EllipsisVertical size={22} />
        </div>
      </header>

      <input
        type="file"
        className="hidden"
        ref={inputRef}
        onChange={(e) => handleChangeFile(e)}
      />
      <AnimatePresence>
        {isOpenMenu && (
          <ShadowWrapper
            position={position}
            children={
              <div
                onClick={handleAddFile}
                className="flex items-center justify-start hover:bg-hover-action p-2 px-3 rounded-[10px] duration-500 w-full gap-2"
              >
                <Plus size={19} />
                <p className="text-[.95rem]">{t("chat.files.featFile")}</p>
              </div>
            }
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
