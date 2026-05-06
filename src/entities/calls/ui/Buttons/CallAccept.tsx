"use client";

import { useAppDispatch, useAppSelector } from "@/app";
import { changeCallStatus, getCallData } from "@/entities/chats";
import { Phone } from "lucide-react";
import { FC } from "react";

interface Props {
  onClick: () => void;
}

const CallAccept: FC<Props> = ({ onClick }) => {
  const dispatch = useAppDispatch();
  const callData = useAppSelector(getCallData);
  return (
    <button
      onClick={() => {
        onClick();
        dispatch(changeCallStatus({ data: callData, status: "active" }));
      }}
      className="bg-accent rounded-full p-4 hover:opacity-70 duration-300 cursor-pointer text-white"
    >
      <Phone size={22} />
    </button>
  );
};

export default CallAccept;
