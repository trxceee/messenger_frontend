"use client";

import {
  userApi,
  UserType,
  VisibilityField,
  WhoCanSeen,
  WhoCanSeeLabels,
} from "@/entities";
import { CheckboxCircle, UserSettingsHeaderConstructor } from "@/shared";
import { FC } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

interface Props {
  field: VisibilityField;
  data: UserType;
}

const VisibilitySettings: FC<Props> = ({
  field,
  data,
}) => {
  const t = useTranslations();

  const elements = Object.values(WhoCanSeen) as WhoCanSeen[];

  const [setVisibility] = userApi.useSetVisibilityMutation();

  const handleClick = (whoCanSee: WhoCanSeen) => {
    setVisibility({ field, whoCanSee });
  };

  return (
    <div className="z-1233 flex flex-col h-screen text-text-default w-full">
      <motion.div
        exit={{ opacity: 0, scale: 0.8, x: -300 }}
        initial={{ opacity: 0, scale: 0.8, x: -300 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ duration: 0.2 }}
        className="w-full"
      >
        <UserSettingsHeaderConstructor
          backUI="userSettingsPrivacy"
          title="settings.privacyAndSecurity.title"
          typeHeader="default"
        />

        <div className="flex flex-col gap-1 px-3">
          <p className="text-icon ml-5">
            {t(`settings.privacyAndSecurity.privacyWhoCanSee.${field}`)}
          </p>

          {elements.map((el) => (
            <CheckboxCircle
              key={el}
              content={t(WhoCanSeeLabels[el])}
              onClick={() => handleClick(el)}
              isActive={el === data[field]}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default VisibilitySettings;
