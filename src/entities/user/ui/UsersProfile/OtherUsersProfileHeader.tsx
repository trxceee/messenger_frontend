"use client";

import { useAppDispatch } from "@/app";
import { Pencil, UserRoundPlus, X } from "lucide-react";
import { useTranslations } from "next-intl";
import {
  closeOtherProfile,
  setOpenComponentOtherUsersProfile,
  userApi,
} from "@/entities";
import { Dispatch, FC, SetStateAction } from "react";
import { Spinner } from "@/shared";

interface Props {
  username: string;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const OtherUsersProfileHeader: FC<Props> = ({ username, setIsOpen }) => {
  // actions
  const dispatch = useAppDispatch();

  const t = useTranslations();
  const { data, isLoading } = userApi.useIsMyContactQuery(username);

  if (isLoading) {
    return <Spinner/>;
  }

  return (
    <header className="flex w-full justify-between items-center text-icon sticky top-0 bg-bg-chat z-123123123 p-2 px-3">
      <div className="flex items-center justify-center gap-3">
        {/* back */}
        <div
          onClick={() => dispatch(closeOtherProfile())}
          className="iconHoverEffect"
        >
          <X size={22} />
        </div>
        <h1 className="text-text-default font-medium text-xl">
          {t("otherProfile.title")}
        </h1>
      </div>

      <div className="flex gap-1 items-center justify-center relative">
        {/* contact actions */}
        <div
          onClick={() =>
            data
              ? dispatch(
                  setOpenComponentOtherUsersProfile({
                    username,
                    openComponent: "editContact",
                  }),
                )
              : setIsOpen(true)
          }
          className="iconHoverEffect"
        >
          {data ? <Pencil size={22} /> : <UserRoundPlus size={22} />}
        </div>
      </div>
    </header>
  );
};
export default OtherUsersProfileHeader;
