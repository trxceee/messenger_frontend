import { useAppSelector } from "@/app";
import {
  EditContact,
  getOtherProfileStatus,
  OtherUsersProfile,
} from "@/entities";
import { AnimatePresence, motion } from "framer-motion";

const RightSideBar = () => {
  const isOpenOtherOsersProfile = useAppSelector(getOtherProfileStatus);

  return (
    <AnimatePresence mode="wait">
      {!!isOpenOtherOsersProfile.openComponent && (
        <>
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: "0%" }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.25 }}
            layout
            className="fixed right-0 top-0 z-1231231234 h-screen max-w-100 w-full bg-bg-chat overflow-y-auto text-text-default scrollbar-thin otherprofile:border-l border-line shadow-[0_0px_30px_-8px_rgba(0,0,0,0.8)]"
          >
            {(() => {
              switch (isOpenOtherOsersProfile.openComponent) {
                case "userProfile":
                  return (
                    <OtherUsersProfile
                      username={isOpenOtherOsersProfile.username}
                    />
                  );
                case "editContact":
                  return <EditContact username={isOpenOtherOsersProfile.username} />;
                default:
                  return null;
              }
            })()}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default RightSideBar;
