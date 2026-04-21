"use client";

import { useAppDispatch } from "@/app";
import { ArrowLeft } from "lucide-react";
import { useTranslations } from "next-intl";
import { setOpenComponentOtherUsersProfile } from "@/entities";
import { FC } from "react";

interface Props {
  username: string;
}

const EditContactHeader: FC<Props> = ({ username }) => {
  // actions
  const dispatch = useAppDispatch();

  const t = useTranslations();

  return (
    <header className="flex w-full justify-between items-center text-icon sticky top-0 bg-bg-chat z-123123123 p-2 px-3">
      <div className="flex items-center justify-center gap-3">
        {/* back */}
        <div
          onClick={() =>
            dispatch(
              setOpenComponentOtherUsersProfile({
                openComponent: "userProfile",
                username,
              }),
            )
          }
          className="iconHoverEffect"
        >
          <ArrowLeft size={22} />
        </div>
        <h1 className="text-text-default font-medium text-xl">
          {t("editContact.title")}
        </h1>
      </div>
    </header>
  );
};

export default EditContactHeader;
