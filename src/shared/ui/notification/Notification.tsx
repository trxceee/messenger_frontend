"use client";

import toast, { Toast } from "react-hot-toast";
import { useTranslations } from "next-intl";
import { CSSProperties } from "react";

type NotificationProps = {
  content: string;
};

const NotificationComponent = ({ content }: NotificationProps) => {
  const t = useTranslations();

  return (
    <div className="flex items-center justify-start space-x-2 backdrop-blur-2xl bg-bg-rect border border-border-rect rounded-[10px] p-3">
      <div className="flex flex-col items-start justify-start">
        <p className="text-white text-[0.9rem]">{t("notify.title")}!</p>
        <p className="text-[0.8rem] text-text-main/70 leading-4.5">{content}</p>
      </div>
    </div>
  );
};

export const Notification = (content: string) => {
  toast.custom((t: Toast) => {
    const animationStyle: CSSProperties = {
      opacity: t.visible ? 1 : 0,
      transform: t.visible ? 'translateX(0)' : 'translateX(100%)',
      transition: 'opacity 0.3s ease, transform 0.3s ease',
    };

    return (
      <div style={animationStyle}>
        <NotificationComponent content={content} />
      </div>
    );
  });
};
