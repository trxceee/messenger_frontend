import { Paperclip, Smile } from "lucide-react";
import {
  ChangeEvent,
  Dispatch,
  FC,
  SetStateAction,
  useRef,
  useState,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "@/app";
import { getMyData } from "@/entities/user";
import { MyEmojiPicker, Spinner, useSocketConnection } from "@/shared";
import {
  getCurrentChat,
  handleSendMessage,
  setDropFile,
  setFilesModalOpen,
} from "@/entities/chats/model";
import { useTranslations } from "next-intl";

interface Props {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}

const InputReference: FC<Props> = ({ setValue, value }) => {
  const t = useTranslations();

  const userId = useAppSelector(getMyData).id ?? '';
  const socket = useSocketConnection(userId);
  const currentChat = useAppSelector(getCurrentChat);

  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  if (!currentChat) return <Spinner />;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    setIsOpen(false);
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(socket, value.trim(), setValue, currentChat.id ?? "");
    }
  };

  // input

  const inputRef = useRef<HTMLInputElement>(null);

  const handleAddFile = () => {
    inputRef.current?.click();
  };

  const handleChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    dispatch(setDropFile(file));
    dispatch(setFilesModalOpen(true));
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

      <Paperclip
        className="text-icon-input cursor-pointer hover:text-accent duration-300"
        onClick={handleAddFile}
      />
      <input type="file" className="hidden" ref={inputRef} onChange={handleChangeFile} />

      <AnimatePresence>
        {isOpen && <MyEmojiPicker setValue={setValue} />}
      </AnimatePresence>
    </div>
  );
};

export default InputReference;
