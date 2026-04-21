"use client";

import { File } from "lucide-react";
import { useTranslations } from "next-intl";
import { Dispatch, DragEvent, FC, SetStateAction, useState } from "react";
import { motion } from "framer-motion";
import { readEntry, setDropFiles, setFilesModalOpen } from "@/entities";
import { useAppDispatch } from "@/app";

interface Props {
  setIsDrag: Dispatch<SetStateAction<boolean>>;
}

const DrogOnDrop: FC<Props> = ({ setIsDrag }) => {
  const t = useTranslations();
  
  const dispatch = useAppDispatch();
  const [isHover, setIsHover] = useState<boolean>(false);

  const handleOnDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsHover(true);
  };

  const handleOnDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setIsHover(false);
    }
  };

  const handleOnDrop = async (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDrag(false);
    dispatch(setFilesModalOpen(true));
    const files = await Promise.all(
      Array.from(e.dataTransfer.items)
        .map((item) => item.webkitGetAsEntry())
        .filter(Boolean)
        .map((entry) => readEntry(entry!)),
    ).then((r) => r.flat());
    dispatch(setDropFiles(files));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      onDragOver={(e) => handleOnDragOver(e)}
      onDragLeave={(e) => handleOnDragLeave(e)}
      onDrop={(e) => handleOnDrop(e)}
      className="absolute inset-5 max-w-200 bg-bg-chat rounded-2xl flex items-center justify-center flex-col mx-auto p-5"
    >
      <div
        className={`w-full h-full marchingAntsNotActive cursor-pointer flex items-center justify-center flex-col gap-7 duration-200 ${isHover ? "marchingAntsAnimate marchingAntsIsActive text-accent" : "text-icon-input"}`}
      >
        <File size={90} />
        <h1 className="text-xl">{t("chat.dragHere")}</h1>
      </div>
    </motion.div>
  );
};

export default DrogOnDrop;
