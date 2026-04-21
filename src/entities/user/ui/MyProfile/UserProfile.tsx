"use client";

import { motion } from "framer-motion";
import { useTranslations } from "use-intl";
import { RenderAvatarElement, UserSettingsHeaderConstructor } from "@/shared";
import { Dispatch, FC, SetStateAction } from "react";
import { UserType } from "../../model";
import UserProfileLastAvatars from "./UserProfileLastAvatars";
import UserDataShortInfo from "../ShortInfo/UserDataShortInfo";

interface IUserProfile {
  data: UserType;
  setOpenedAvatar: Dispatch<SetStateAction<string | null>>;
}

const UserProfile: FC<IUserProfile> = ({ data, setOpenedAvatar }) => {
  const t = useTranslations();

  return (
    <div className="z-1233 flex flex-col items-center justify-start gap-5 h-screen overflow-y-auto text-text-default scrollbar-thin w-full">
      <motion.div
        exit={{ opacity: 0, scale: 0.8, x: -300 }}
        initial={{ opacity: 0, scale: 0.8, x: -300 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ duration: 0.2 }}
        className="w-full flex flex-col items-center justify-start"
      >
        <UserSettingsHeaderConstructor
          backUI={null}
          title="profile.title"
          typeHeader="profile"
        />
        <div className="w-full flex flex-col items-start justify-center p-2 gap-3">
          {/* avatar */}
          <div className="flex flex-col items-center w-full gap-3 cursor-pointer p-3">
            <RenderAvatarElement
              hasAvatar={!!data.avatars.length}
              size={130}
              avatar={data.avatars[data.avatars.length - 1]}
            />
            <div className="flex flex-col items-center justify-center text-center">
              <p className="text-xl">
                {data.firstName} {data.lastName}
              </p>
              <p className="text-icon text-[.85rem]">
                {t("settings.online")}
              </p>
            </div>
          </div>

          {/* short infop */}
          <UserDataShortInfo
            number={data.number}
            username={data.username}
            bio={data.bio}
            email={data.email}
          />

          <hr className="w-full border-3 border-black/5" />

          <UserProfileLastAvatars setOpenedAvatar={setOpenedAvatar} avataras={data.avatars} />
        </div>
      </motion.div>
    </div>
  );
};

export default UserProfile;
