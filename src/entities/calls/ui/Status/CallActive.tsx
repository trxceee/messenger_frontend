"use client";

import { FC, RefObject, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/shared";
import { HeadphoneOff, Headphones } from "lucide-react";

interface Props {
  localVideoRef: RefObject<HTMLVideoElement | null>;
  remoteVideoRef: RefObject<HTMLVideoElement | null>;
  closeCall: () => void;
}

const CallActive: FC<Props> = ({
  closeCall,
  localVideoRef,
  remoteVideoRef,
}) => {
  const t = useTranslations();

  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [hasRemoteStream, setHasRemoteStream] = useState<boolean>(false);

  useEffect(() => {
    const handleUnload = () => closeCall();
    window.addEventListener("beforeunload", handleUnload);
    return () => window.removeEventListener("beforeunload", handleUnload);
  }, []);

  useEffect(() => {
    const video = remoteVideoRef.current;
    if (!video) return;

    const handleCanPlay = () => setHasRemoteStream(true);
    video.addEventListener("canplay", handleCanPlay);
    return () => video.removeEventListener("canplay", handleCanPlay);
  }, [remoteVideoRef.current]);

  return (
    <div className="flex flex-col gap-5 items-center justify-center w-full">
      <div className="flex flex-col lg:flex-row items-center lg:items-start justify-start w-full gap-5 relative">
        <video
          playsInline
          autoPlay
          muted={isMuted}
          ref={remoteVideoRef}
          className={`scale-x-[-1] w-full lg:min-w-200 rounded-xl ${!hasRemoteStream ? "hidden" : ""}`}
        />
        {!hasRemoteStream && (
          <div className="w-full min-w-200 flex items-center justify-center aspect-video bg-bg-chat-active rounded-xl">
            <p className="text-white m-5">{t("chat.call.waiting")}</p>
          </div>
        )}
        <video
          playsInline
          muted
          autoPlay
          ref={localVideoRef}
          className="absolute w-[20%] left-10 bottom-5 rounded-xl scale-x-[-1] object-cover"
        />
      </div>
      {hasRemoteStream && (
        <Button
          buttonType="secondary"
          iconStart={isMuted ? <Headphones /> : <HeadphoneOff />}
          onClick={() => setIsMuted((prev) => !prev)}
        />
      )}
      <Button
        buttonType="secondary"
        onClick={closeCall}
        text={t("chat.call.endCall")}
      />
    </div>
  );
};

export default CallActive;
