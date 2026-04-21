"use client";

import { useAppDispatch } from "@/app";
import { removeDropFile } from "@/entities/chats/model";
import { byteToMB } from "@/shared";
import { BrushCleaning } from "lucide-react";
import { useTranslations } from "next-intl";
import { FC, useMemo } from "react";

interface Props {
  file: File;
}

const FileItem: FC<Props> = ({ file }) => {
  const t = useTranslations();
  const dispatch = useAppDispatch();

  const extFile = file.name.split(".").pop();
  const isImage = file.type.startsWith("image/");
  const previewUrl = useMemo(() => URL.createObjectURL(file), [file]);
  const sizeFile = useMemo(() => byteToMB(file.size), [file]);

  const handleRemoveFile = () => {
    dispatch(removeDropFile(file));
  };

  return (
    <div className="flex w-full items-center justify-between">
      <div className="flex items-center justify-start flex-1 min-w-0 gap-3">
        {/* preview */}
        <div className="flex items-center justify-start gap-3">
          {isImage ? (
            <img
              src={previewUrl}
              alt={file.name}
              className="h-12 w-12 rounded-md object-cover aspect-square shrink-0"
            />
          ) : (
            <div className="w-12 h-12 rounded-md bg-accent flex items-center justify-center truncate">
              <p className="text-sm text-white">{extFile}</p>
            </div>
          )}
        </div>
        <div className="flex flex-col items-start justify-center min-w-0 overflow-hidden">
          <p className="text-text-default text-lg truncate w-full">
            {file.name}
          </p>
          <p className="text-icon text-sm">
            {sizeFile.size}
            {sizeFile.unit === "MB" ? t("chat.mb") : t("chat.kb")}
          </p>
        </div>
      </div>

      {/* delete */}
      <div
        onClick={handleRemoveFile}
        className="iconHoverEffect text-icon shrink-0"
      >
        <BrushCleaning size={20} />
      </div>
    </div>
  );
};

export default FileItem;
