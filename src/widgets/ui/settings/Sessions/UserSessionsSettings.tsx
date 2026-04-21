"use client";

import { motion } from "framer-motion";
import { sessionApi } from "@/entities";
import { Spinner, UserSettingsHeaderConstructor } from "@/shared";
import ThisSession from "./ThisSession";
import OtherSessions from "./OtherSessions";

const UserSessionsSettings = () => {
  const { data: dataSessions, isLoading: isLoadingSessions } =
    sessionApi.useGetMyAccountSessionsQuery();
  const { data, isLoading } = sessionApi.useGetMySessionQuery();

  if (isLoading || !data || !dataSessions || isLoadingSessions) {
    return <Spinner/>;
  }

  return (
    <div className="z-1233 flex flex-col items-center justify-start h-screen overflow-y-auto text-text-default scrollbar-thin w-full">
      <motion.div
        exit={{ opacity: 0, scale: 0.8, x: -300 }}
        initial={{ opacity: 0, scale: 0.8, x: -300 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ duration: 0.2 }}
        className="w-full flex flex-col items-center justify-start"
      >
        <UserSettingsHeaderConstructor
          backUI={"userSettings"}
          title="settings.sessionSettings.devices"
          typeHeader="default"
        />

        <div className="flex flex-col items-start justify-center w-full p-2 px-3 gap-3">
          <ThisSession data={data} />
          <hr className="w-full border-3 border-black/5" />
          <OtherSessions data={dataSessions} />
        </div>
      </motion.div>
    </div>
  );
};
export default UserSessionsSettings;
