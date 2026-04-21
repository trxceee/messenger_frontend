"use client";

import { FC, useState } from "react";
import FilesReference from "./Reference/FilesReference";

interface Props {
  files: Array<File>;
}

const ChatFilesInput: FC<Props> = ({ files }) => {
  const [value, setValue] = useState<string>("");

  return (
    <div className="flex w-full items-center justify-center gap-3">
      <div className="flex flex-col w-full items-end backdrop-blur-xl p-3 gap-3 px-4 rounded-2xl bg-bg-chat">
        <FilesReference
          setValue={setValue}
          value={value}
          files={files}
        />
      </div>
    </div>
  );
};

export default ChatFilesInput;
