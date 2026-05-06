"use client";

import { useAppDispatch, useAppSelector } from "@/app";
import { changeCallStatus, getCallData } from "@/entities/chats";
import { X } from "lucide-react";
import { FC } from "react";

interface Props {
  onClick: () => void;
}

const CallReject: FC<Props> = ({ onClick }) => {
  const dispatch = useAppDispatch();
  const callData = useAppSelector(getCallData);
  return (
    <button
      onClick={() => {
        onClick();
        dispatch(changeCallStatus({ status: "closed", data: callData }));
      }}
      className="bg-red-500 rounded-full p-4 hover:opacity-70 duration-300 cursor-pointer text-white"
    >
      <X size={22} />
    </button>
  );
};

export default CallReject;
