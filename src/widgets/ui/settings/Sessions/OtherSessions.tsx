"use client";

import { Session } from "@/entities";
import { FC } from "react";
import {DeviceDetector} from "./Device";
import { useTranslations } from "next-intl";

interface Props {
  data: Array<Session>;
}

const OtherSessions: FC<
  Props
> = ({ data }) => {
  const t = useTranslations();

  return (
    <div className="flex flex-col gap-3 w-full">
      <p className="text-icon text-md">
        {t("settings.sessionSettings.activeSessions")}
      </p>
      <div className="flex flex-col items-center justify-center gap-3">
        {!data.length && (
          <div className="flex items-center justify-start w-full text-icon text-[.8rem]">
            <p>{t('settings.sessionSettings.noActiveSession')}</p>
          </div>
        )}
        {data.map((el, i) => (
          <DeviceDetector
            key={i}
            sessionId={el.id}
            browser={el.metadata.device.browser}
            city={el.metadata.location.city}
            country={el.metadata.location.country}
            os={el.metadata.device.os}
          />
        ))}
      </div>
    </div>
  );
};

export default OtherSessions;
