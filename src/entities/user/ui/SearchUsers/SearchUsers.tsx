"use client";

import { FC, MouseEvent, useEffect } from "react";
import { motion } from "framer-motion";
import {
  createRipple,
  useSocketConnection,
  RenderAvatarElement,
  Spinner,
  useDebounce,
} from "@/shared";
import { userApi } from "@/entities/user/api";
import { chatsApi, setCurrentChat, setNewDm } from "@/entities/chats";
import { useTranslations } from "next-intl";
import { useAppDispatch, useAppSelector } from "@/app";
import { getMyData } from "../../model";

interface Props {
  searchText: string;
  handleCloseSearch: () => void;
}

const SearchUsers: FC<Props> = ({ searchText, handleCloseSearch }) => {
  const t = useTranslations();
  const userId = useAppSelector(getMyData).id ?? '';

  const dispatch = useAppDispatch();
  const debouncedSearchText = useDebounce(searchText, 500);
  
  const [searchTrigger, { data, isLoading }] = userApi.useLazySearchUserQuery();
  const [getDm] = chatsApi.useLazyGetDmQuery();

  const socket = useSocketConnection(userId);

  const handleClick = async (
    e: MouseEvent<HTMLDivElement>,
    targetId: string,
  ) => {
    createRipple(e);

    const chat = await getDm(targetId).unwrap();

    dispatch(setCurrentChat(chat));
    dispatch(setNewDm(chat));

    socket.emit("joinChat", {
      chatId: chat.id,
    });

    handleCloseSearch();
  };

  useEffect(() => {
    if (!debouncedSearchText) return;
    searchTrigger(debouncedSearchText);
  }, [debouncedSearchText, searchTrigger]);

  if (isLoading) return <Spinner />;

  return (
    <motion.div
      exit={{ opacity: 0 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      className="z-1233 flex flex-col items-center justify-start gap-5 h-screen overflow-y-auto text-text-default scrollbar-thin w-full"
    >
      {data?.length ? (
        <div className="flex flex-col items-start justify-center w-full gap-3 px-3 text-icon">
          <p className="font-medium">{t("searchUsers.globalSearch")}:</p>
          <div className="flex flex-col w-full items-center justify-center">
            {data.map((data) => (
              <div
                key={data.id}
                className="flex items-center justify-center w-full hover:bg-hover-checkbox rounded-2xl p-3 cursor-pointer gap-5 text-text-default overflow-hidden relative"
                onClick={(e) => handleClick(e, data.id)}
              >
                <RenderAvatarElement
                  hasAvatar={!!data.avatars?.length}
                  size={55}
                  avatar={data.avatars[data.avatars.length - 1]}
                />
                <div className="flex flex-col items-start justify-center w-full">
                  <p className="text-[1.1rem]">
                    {data.firstName} {data.lastName}
                  </p>
                  <p className="text-icon text-[.9rem]">
                    @{data.username}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-icon px-3">{t("searchUsers.noResult")}</p>
      )}
    </motion.div>
  );
};

export default SearchUsers;
