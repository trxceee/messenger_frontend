"use client";

import { userApi } from "@/entities";
import { RenderAvatarElement, ShadowWrapper, Spinner } from "@/shared";
import { FC, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CircleOff } from "lucide-react";
import { useTranslations } from "next-intl";

interface Props {
  userId: string;
}

const BlockedUsersElement: FC<Props> = ({ userId }) => {
  const t = useTranslations();

  const { data, isLoading } = userApi.useGetUserDataQuery({ id: userId });
  const [unBlock] = userApi.useUnBlockUsersMutation();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [position, setPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  if (isLoading || !data) {
    return <Spinner />;
  }
  return (
    <div
      onContextMenu={(e) => {
        e.preventDefault();
        setPosition({ x: e.clientX + 5, y: e.clientY + 5 });
        setIsOpen((prev) => !prev);
      }}
      onClick={(e) => {
        e.preventDefault();
        setPosition({ x: e.clientX + 5, y: e.clientY + 5 });
        setIsOpen((prev) => !prev);
      }}
      className="flex items-center justify-center w-full hover:bg-hover-checkbox rounded-2xl p-3 cursor-pointer gap-5 text-text-default"
    >
      <RenderAvatarElement
        hasAvatar={!!data.avatars?.length}
        size={55}
        avatar={data.avatars ? data.avatars[data.avatars.length - 1] : ""}
      />
      <div className="flex flex-col items-start justify-center w-full min-w-0">
        <p className="text-[1.1rem] shortText">
          {data.firstName} {data.lastName}
        </p>
        <p className="text-icon text-[.9rem] shortText">@{data.username}</p>
      </div>
      <AnimatePresence>
        {isOpen && (
          <ShadowWrapper
            position={position}
            children={
              <div
                onClick={async () => await unBlock(userId)}
                className="flex items-center justify-start hover:bg-hover-action p-2 px-3 rounded-[10px] duration-500 w-full gap-2 text-myred"
              >
                <CircleOff size={19} />
                <p>{t("settings.privacyAndSecurity.unblock")}</p>
              </div>
            }
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default BlockedUsersElement;
