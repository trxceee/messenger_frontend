"use client";

import { userApi } from "@/entities/user";
import { RenderAvatarElement, Spinner } from "@/shared";
import { FC } from "react";
import CallReject from "../Buttons/CallReject";
import CallAccept from "../Buttons/CallAccept";
import { useAppSelector } from "@/app";
import { getCallData } from "@/entities/chats";
import { useTranslations } from "next-intl";

interface Props {
  closeCall: () => void;
  createAnswer: (data: RTCSessionDescriptionInit, callerUserId: string) => void;
}

const CallOffer: FC<Props> = ({ closeCall, createAnswer }) => {
  const t = useTranslations()
  const callData = useAppSelector(getCallData);

  const { data, isLoading } = userApi.useGetUserDataQuery({
    id: callData.userId,
  });
  if (isLoading || !data) return <Spinner />;
  return (
    <div className="flex flex-col items-center justify-center gap-5">
      {/* информация о том, кто звонит */}
      <div className="flex flex-col items-center w-full gap-3 p-3 text-white">
        <RenderAvatarElement
          hasAvatar={!!data.avatars?.length}
          size={130}
          avatar={data.avatars?.at(-1)}
        />
        <div className="flex flex-col items-center justify-center text-center">
          <p className="text-xl">
            {data.firstName} {data.lastName}
          </p>
          <p className="text-icon text-[.85rem]">{t("chat.call.callsYou")}</p>
        </div>
      </div>

      {/* кнопки для принятия или отклонения */}
      <div className="flex w-full items-center justify-center gap-5">
        <CallAccept
          onClick={async () => await createAnswer(callData.data!, callData.userId)}
        />
        <CallReject onClick={closeCall} />
      </div>
    </div>
  );
};

export default CallOffer;
