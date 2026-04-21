"use client";

import { motion } from "framer-motion";
import { useAppDispatch } from "@/app";
import { ActionsElement, appConfig } from "@/shared";
import { RenderAvatarElement } from "@/shared";
import { FC } from "react";
import { userActionsElements } from "../../../../entities/user/config";
import { openComponent, UserType } from "../../../../entities/user/model";

interface IActionsPopup {
  data: UserType;
}

const ActionsPopup: FC<IActionsPopup> = ({ data }) => {
  const dispatch = useAppDispatch();

  const actions = userActionsElements(dispatch);

  return (
    <motion.div
      exit={{ opacity: 0, scale: 0.9 }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.1 }}
      className="flex flex-col items-center justify-center p-1.5 font-medium max-w-60 shadow-wrapper paddingPopup"
    >
      {/* user short info */}
      <div
        onClick={() => dispatch(openComponent("myProfile"))}
        className="flex items-center w-full gap-3 cursor-pointer hover:bg-hover-action p-2 rounded-[10px] duration-300"
      >
        <RenderAvatarElement
          hasAvatar={!!data.avatars.length}
          size={24}
          avatar={data.avatars[data.avatars.length - 1]}
        />

        <p className="text-[.9rem] truncate min-w-0">
          {data.firstName} {data.lastName}
        </p>
      </div>

      <hr className="w-full border border-black/5" />

      {actions.filter(el => el.isMain).map((el, i) => (
        <ActionsElement key={i} {...el} />
      ))}

      <hr className="w-full border border-black/5" />

      {actions.filter(el => !el.isMain).map((el, i) => (
        <ActionsElement key={i} {...el} />
      ))}

      <p className="text-[.8rem] text-icon">
        {appConfig.NAME()} {appConfig.TYPE_APP()} {appConfig.VERSION()}
      </p>
    </motion.div>
  );
};

export default ActionsPopup;
