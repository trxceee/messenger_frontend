"use client";

import { useAppSelector } from "@/app";
import CallOffer from "./Status/CallOffer";
import { FC, RefObject } from "react";
import { getMyData } from "@/entities/user";
import CallActive from "./Status/CallActive";
import { getCallData, getCallStatus } from "@/entities/chats";
import { motion } from "framer-motion";
import { modalDefault } from "@/shared";

interface Props {
  closeCall: () => void;
  createAnswer: (data: RTCSessionDescriptionInit, callerUserId: string) => void;
  localVideoRef: RefObject<HTMLVideoElement | null>;
  remoteVideoRef: RefObject<HTMLVideoElement | null>;
}

const CallModal: FC<Props> = ({
  closeCall,
  createAnswer,
  localVideoRef,
  remoteVideoRef,
}) => {
  const callStatus = useAppSelector(getCallStatus);
  const callData = useAppSelector(getCallData);

  const myId = useAppSelector(getMyData).id;
  return (
    <motion.div
      variants={modalDefault}
      initial="initial"
      animate="animate"
      exit="initial"
      layout
      transition={{ duration: 0.2, layout: { duration: 0.2 } }}
      className="flex items-center justify-center bg-bg-modal rounded-3xl min-w-80 max-w-250 p-7 gap-5 shadow-[0_0px_20px_-8px_rgba(0,0,0,0.8)] backdrop-blur-xl"
    >
      {callStatus === "offer" && callData.userId !== myId && (
        <CallOffer closeCall={closeCall} createAnswer={createAnswer} />
      )}
      {((callStatus === "offer" && callData.userId === myId) ||
        callStatus === "active") && (
        <CallActive
          closeCall={closeCall}
          localVideoRef={localVideoRef}
          remoteVideoRef={remoteVideoRef}
        />
      )}
    </motion.div>
  );
};

export default CallModal;
