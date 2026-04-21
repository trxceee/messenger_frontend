"use client";

import { useTranslations } from "next-intl";
import type { FC } from "react";

interface INotificationStructure {
  content: string;
}

const NotificationStructure: FC<INotificationStructure> = ({ content }) => {

  const t = useTranslations();

  return (
    <div className="flex items-center justify-start space-x-2">
      <div className="flex flex-col items-start justify-start">
        <p className="text-white text-[.9rem]">{t('notify.title')}!</p>
        <p className="text-[.8rem] text-text-main/70 leading-4.5">{content}</p>
      </div>
    </div>
  );
};

export default NotificationStructure;
