"use client";

import { FC, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import SwapUsersAvatarsLines from "./SwapUsersAvatarsLines";
import SwapUsersAvatarsArrows from "./SwapUsersAvatarsArrows";
import SwapUsersAvatarsCurrentAvatar from "./SwapUsersAvatarsCurrentAvatar";
import { useFormattedChatDate } from "@/entities/chats/lib";

interface Props {
  hasAvatar: boolean;
  avatars?: string[];
  size: number;
  firstName: string;
  lastName: string;
  isOnline: boolean;
  lastSeen: number;
}

const SwapUsersAvatars: FC<Props> = ({
  hasAvatar,
  avatars,
  size,
  firstName,
  lastName,
  isOnline,
  lastSeen
}) => {
  const t = useTranslations();
  const [isFull, setIsFull] = useState<boolean>(false);

  const [currentImage, setCurrentImage] = useState<number>(
    avatars ? avatars.length - 1 : 0,
  );
  
  const lastSeenDate = useFormattedChatDate(lastSeen);

  return (
    <div className={`flex w-full flex-col ${isFull ? "" : "pt-4"}`}>
      {hasAvatar ? (
        <motion.div
          className="w-full flex flex-col justify-center gap-3"
          style={{
            alignItems: isFull ? "flex-start" : "center",
            paddingTop: isFull ? 0 : "16px",
          }}
        >
          {/* avatar switcher */}
          <AnimatePresence>
            {isFull && (
              <>
                <SwapUsersAvatarsLines
                  currentImage={currentImage}
                  setCurrentImage={setCurrentImage}
                  avatars={avatars}
                />

                <SwapUsersAvatarsArrows
                  currentImage={currentImage}
                  setCurrentImage={setCurrentImage}
                  avatars={avatars}
                />
              </>
            )}
          </AnimatePresence>

          {/* current avatar */}
          <SwapUsersAvatarsCurrentAvatar
            currentImage={currentImage}
            isFull={isFull}
            setIsFull={setIsFull}
            size={size}
            avatars={avatars}
          />
          {/* names & status */}
          <motion.div
            layout
            className={`flex flex-col justify-center px-3 relative`}
            style={{
              alignItems: isFull ? "flex-start" : "center",
              textAlign: isFull ? "start" : "center",
            }}
            transition={{ layout: { duration: 0.2 } }}
          >
            <p className="text-xl">
              {firstName} {lastName}
            </p>
            <p className="text-icon text-[.85rem]">{isOnline ? t('settings.online') : lastSeenDate}</p>
          </motion.div>
        </motion.div>
      ) : (
        <div className="flex w-full flex-col items-center justify-center pt-4 gap-3">
          <div
            style={{ width: size }}
            className="relative flex flex-col items-center justify-center mx-auto"
          >
            <div
              style={{ width: size }}
              className="aspect-square bg-linear-190 from-accent to-accent/20 rounded-full"
            ></div>
          </div>
          <div className={`flex flex-col justify-center items-center relative`}>
            <p className="text-xl">
              {firstName} {lastName}
            </p>
            <p className="text-icon text-[.85rem]">{isOnline ? t('settings.online') : lastSeenDate}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SwapUsersAvatars;
