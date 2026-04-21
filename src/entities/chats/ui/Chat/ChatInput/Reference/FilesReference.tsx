import { LoaderCircle, Smile } from "lucide-react";
import { Dispatch, FC, SetStateAction, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "@/app";
import { getMyData } from "@/entities/user";
import { MyEmojiPicker, Spinner, useSocketConnection } from "@/shared";
import {
  clearDropFiles,
  getCurrentChat,
  handleSendMessage,
  handleUploadFile,
  setFilesModalOpen,
} from "@/entities/chats/model";
import { useTranslations } from "next-intl";

interface Props {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  files: Array<File>;
}

const FilesReference: FC<Props> = ({ setValue, value, files }) => {
  const t = useTranslations();

  const dispatch = useAppDispatch();

  const userId = useAppSelector(getMyData).id ?? '';
  const socket = useSocketConnection(userId);
  const currentChat = useAppSelector(getCurrentChat);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isSpin, setIsSpin] = useState<boolean>(false);

  if (!currentChat) return <Spinner />;

  const handleUploadFiles = async (files: Array<File>) => {
    return Promise.all(files.map((file) => handleUploadFile(file)));
  };

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    setIsOpen(false);

    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();

      setIsSpin(true);

      const uploadedFiles = await handleUploadFiles(files);

      handleSendMessage(
        socket,
        value.trim(),
        setValue,
        currentChat.id ?? "",
        uploadedFiles,
      );

      setIsSpin(false);
      dispatch(setFilesModalOpen(false));
      dispatch(clearDropFiles());
    }
  };

  return (
    <div className="flex w-full items-center justify-between gap-3">
      <Smile
        onClick={() => setIsOpen((prev) => !prev)}
        className="text-icon-input cursor-pointer hover:text-accent duration-300"
      />

      <div className="w-full relative">
        <AnimatePresence>
          {!value && (
            <motion.label
              htmlFor="inputForMessage"
              initial={{ x: 30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 30, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute left-0 top-0 origin-left pointer-events-none text-input-placeholder"
            >
              {t("chat.messagePlaceholder")}
            </motion.label>
          )}
        </AnimatePresence>

        <input
          id="inputForMessage"
          type="text"
          maxLength={1000}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          autoComplete="off"
          className="outline-0 w-full bg-transparent"
        />
      </div>

      <AnimatePresence>
        {isSpin && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="text-accent right-0"
          >
            <LoaderCircle size={25} className="animate-spin" />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && <MyEmojiPicker setValue={setValue} />}
      </AnimatePresence>
    </div>
  );
};

export default FilesReference;
