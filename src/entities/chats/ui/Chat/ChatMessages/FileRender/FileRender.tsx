// FileRender.tsx
"use client";

import { byteToMB } from "@/shared";
import { ArrowDownToLine } from "lucide-react";
import { useTranslations } from "next-intl";
import { FC } from "react";

interface Props {
  fileUrl: string;
  fileName: string;
  fileExt: string;
  fileSize: number;
}

const FileRender: FC<Props> = ({
  fileExt,
  fileName,
  fileUrl,
  fileSize,
}) => {
  const t = useTranslations();
  const sizeFile = byteToMB(fileSize);

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = fileUrl;
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <div
      className="flex items-center justify-start flex-1 min-w-0 gap-3 w-full"
    >
      <div
        onClick={handleDownload}
        className="group w-14 h-14 rounded-xl bg-bg-file cursor-pointer hover:opacity-90 duration-300 flex items-center justify-center truncate relative overflow-hidden"
      >
        <p className="text-sm text-white transition-opacity duration-300 group-hover:opacity-0">
          {fileExt}
        </p>
        <ArrowDownToLine
          size={22}
          className="absolute text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />
      </div>
      <div className="flex flex-col items-start justify-center min-w-0 overflow-hidden">
        <p className="text-text-default truncate w-full max-w-45">
          {fileName}
        </p>
        <p className="text-text-default/50 text-sm">
          {sizeFile.size}
          {sizeFile.unit === "MB" ? t("chat.mb") : t("chat.kb")}
        </p>
      </div>
    </div>
  );
};

export default FileRender;
