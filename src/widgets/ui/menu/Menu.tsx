"use client";

import { AnimatePresence } from "framer-motion";
import { ChatMessages, getCurrentChat, getMyData, userApi } from "@/entities";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/app";
import { useResizingSlice, setWidth, handleMouseMove } from "@/features";
import MenuCompoonent from "./MenuCompoonent";
import RightSideBar from "./RightSideBar/RightSideBar";
import { Spinner } from "@/shared";
import {
  getIsFullScreenChat,
  setIsFullScreenChat,
  useChatSocket,
  useMessageSocket,
} from "@/entities/chats/model";
import { handleKeyDown } from "@/widgets/model";

const MIN_WIDTH = 300;
const MAX_WIDTH = 680;

const Menu = () => {
  const userId = useAppSelector(getMyData).id ?? '';
  const { data, isLoading } = userApi.useGetMeQuery();

  // getters
  const width = useAppSelector(useResizingSlice.selectors.selectWidth);
  const currentChat = useAppSelector(getCurrentChat);
  const isFullScreenChat = useAppSelector(getIsFullScreenChat);

  // setters
  const dispatch = useAppDispatch();

  const setResizeValue = (v: number) => dispatch(setWidth({ width: v }));
  const isResizing = useRef<boolean>(false);

  useMessageSocket(userId);
  useChatSocket(userId);

  useEffect(() => {
    const handleMouseUp = () => {
      isResizing.current = false;
    };
    const handleMouseMoveWrapper = (e: MouseEvent) => {
      handleMouseMove(e, isResizing, MIN_WIDTH, MAX_WIDTH, setResizeValue);
    };
    window.addEventListener("mousemove", handleMouseMoveWrapper);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMoveWrapper);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  useEffect(() => {
    const listener = (e: KeyboardEvent) => handleKeyDown(e);
    window.addEventListener("keydown", listener);
    return () => window.removeEventListener("keydown", listener);
  }, []);

  useEffect(() => {
    const mediaWhenShort = window.matchMedia("(max-width: 50rem)");

    const update = () => {
      if (!currentChat) {
        dispatch(setIsFullScreenChat(false));
        return;
      }

      dispatch(setIsFullScreenChat(mediaWhenShort.matches));
    };

    update();

    mediaWhenShort.addEventListener("change", update);

    return () => {
      mediaWhenShort.removeEventListener("change", update);
    };
  }, [currentChat, dispatch]);

  if (isLoading || !data) {
    return <Spinner />;
  }

  return (
    <div className="flex w-full items-center justify-start h-screen relative">
      {!isFullScreenChat && (
        <div
          style={{ width }}
          className={`items-center justify-center w-full h-screen bg-bg-chat relative flex shrink-0`}
        >
          <AnimatePresence>
            <MenuCompoonent data={data} />
          </AnimatePresence>

          <div
            onMouseDown={() => (isResizing.current = true)}
            className="w-0.5 bg-line self-stretch cursor-e-resize"
          ></div>
        </div>
      )}
      {!!currentChat && <ChatMessages />}
      <RightSideBar />
    </div>
  );
};

export default Menu;
