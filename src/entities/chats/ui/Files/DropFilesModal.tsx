"use client";

import Header from "./Header/Header";
import FileItem from "./Item/FileItem";
import { motion } from "framer-motion";
import ChatFilesInput from "../Chat/ChatInput/ChatFilesInput";
import { getDropFiles } from "../../model";
import { useAppSelector } from "@/app";

const DropFilesModal= () => {
  const files = useAppSelector(getDropFiles);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      className="flex bg-bg-chat rounded-2xl p- w-full p-2 px-3 max-w-100 flex-col gap-3 max-h-110"
    >
      <Header />
      <div className="flex flex-col items-center justify-start gap-2 w-full pb-2 scrollbar-thin overflow-y-auto">
        {files.map((file, idx) => (
          <FileItem file={file} key={idx} />
        ))}
      </div>

      <ChatFilesInput files={files} />
    </motion.div>
  );
};

export default DropFilesModal;
