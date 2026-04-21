"use client";

import { useAppDispatch } from "@/app";
import { IIsOpenUIComponent, openComponent } from "@/entities/user";
import { SearchInput } from "@/shared";
import { ArrowLeft, Equal, Search } from "lucide-react";
import { useTranslations } from "next-intl";
import { Dispatch, FC, SetStateAction } from "react";

interface ILeftSideBarSearch {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  searchText: string;
  setSearchText: Dispatch<SetStateAction<string>>;
  isOpenSearchUsers: IIsOpenUIComponent;
}

const LeftSideBarSearch: FC<ILeftSideBarSearch> = ({
  setIsOpen,
  setSearchText,
  searchText,
  isOpenSearchUsers,
}) => {
  const t = useTranslations();
  const dispatch = useAppDispatch();

  const handleClick = () => {
    if (isOpenSearchUsers === 'searchUsers') {
      setSearchText('');
      dispatch(openComponent(null));
    } else {
      setIsOpen((prev) => !prev);
    }
  };

  return (
    <div className="flex w-full items-center justify-between p-3 gap-3">
      <div
        onClick={handleClick}
        className="flex p-1.5 items-center justify-center cursor-pointer hover:bg-hover-checkbox bg-transparent rounded-full"
      >
        {isOpenSearchUsers === 'searchUsers' ? (
          <ArrowLeft className="text-icon" />
        ) : (
          <Equal className="text-icon" />
        )}
      </div>
      <SearchInput
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        onClick={() => dispatch(openComponent("searchUsers"))}
        icon={<Search className="text-input-placeholder" size={22} />}
        placeholder={t("chat.searchPlaceholder")}
      />
    </div>
  );
};

export default LeftSideBarSearch;
