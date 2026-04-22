import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Chat, Message } from "../types/chatsTypes";
import { RootState } from "@/app";

interface IChatsState {
  myDms: Chat[];
  editMessage: Message | null;
  currentChat: Chat | null;
  isFullScreenChat: boolean;
  isFilesModalOpen: boolean;
  dropFiles: Array<File>;
  chatImages: { images: Array<string>; startIndex: number };
  isImagesPreview: boolean;
}

const initialState: IChatsState = {
  myDms: [],
  editMessage: null,
  currentChat: null,
  isFullScreenChat: false,
  isFilesModalOpen: false,
  dropFiles: [],
  chatImages: { images: [], startIndex: 0 },
  isImagesPreview: false,
};

// helpers

const moveChatToTop = (state: IChatsState, chatId: string) => {
  const index = state.myDms.findIndex((c) => c.id === chatId);
  if (index > 0) {
    const [chat] = state.myDms.splice(index, 1);
    state.myDms.unshift(chat);
  }
};

const getChat = (state: IChatsState, chatId: string) =>
  state.myDms.find((c) => c.id === chatId);

const updateMessageInChat = (chat: Chat | undefined, message: Message) => {
  if (!chat?.messages) return;
  const index = chat.messages.findIndex((m) => m.id === message.id);
  if (index !== -1) {
    chat.messages[index] = message;
  }
};

const deleteMessageFromChat = (chat: Chat | undefined, messageId: string) => {
  if (!chat?.messages) return;
  chat.messages = chat.messages.filter((m) => m.id !== messageId);
};

const markMessagesRead = (chat: Chat | undefined, messageIds: string[]) => {
  if (!chat?.messages) return;
  chat.messages.forEach((msg) => {
    if (messageIds.includes(msg.id)) {
      msg.isRead = true;
    }
  });
};

export const chatsSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    setNewDm: (state, action: PayloadAction<Chat | Chat[]>) => {
      const chats = Array.isArray(action.payload)
        ? action.payload
        : [action.payload];

      chats.forEach((chatPayload) => {
        const messages =
          chatPayload.messages?.filter((m) => !m.deletedAt) ?? [];

        const existing = state.myDms.find((c) => c.id === chatPayload.id);

        if (existing) {
          Object.assign(existing, {
            ...chatPayload,
            messages,
          });

          const index = state.myDms.findIndex((c) => c.id === chatPayload.id);
          if (index > 0) {
            const [chat] = state.myDms.splice(index, 1);
            state.myDms.unshift(chat);
          }
        } else {
          state.myDms.unshift({
            ...chatPayload,
            messages,
          });
        }
      });
    },

    setCurrentChat: (state, action: PayloadAction<Chat>) => {
      state.currentChat = action.payload;
    },

    closeCurrentChat: (state) => {
      state.currentChat = null;
    },

    //  messages

    addNewMessage: (
      state,
      action: PayloadAction<{ chatId: string; message: Message }>,
    ) => {
      const { chatId, message } = action.payload;
      if (message.deletedAt) return;

      const chat = getChat(state, chatId);
      chat?.messages?.push(message);

      if (state.currentChat?.id === chatId) {
        state.currentChat.messages.push(message);
      }

      moveChatToTop(state, chatId);
    },

    updateMessage: (
      state,
      action: PayloadAction<{ chatId: string; message: Message }>,
    ) => {
      const { chatId, message } = action.payload;
      if (message.deletedAt) return;

      updateMessageInChat(getChat(state, chatId), message);

      if (state.currentChat?.id === chatId) {
        updateMessageInChat(state.currentChat, message);
      }
    },

    editMessage: (state, action: PayloadAction<Message>) => {
      const message = action.payload;

      updateMessageInChat(getChat(state, message.chatId), message);

      if (state.currentChat?.id === message.chatId) {
        updateMessageInChat(state.currentChat, message);
      }
    },

    deleteMessage: (
      state,
      action: PayloadAction<{ chatId: string; messageId: string }>,
    ) => {
      const { chatId, messageId } = action.payload;

      deleteMessageFromChat(getChat(state, chatId), messageId);

      if (state.currentChat?.id === chatId) {
        deleteMessageFromChat(state.currentChat, messageId);
      }
    },

    readMessage: (
      state,
      action: PayloadAction<{ chatId: string; messageIds: string[] }>,
    ) => {
      const { chatId, messageIds } = action.payload;

      markMessagesRead(getChat(state, chatId), messageIds);

      if (state.currentChat?.id === chatId) {
        markMessagesRead(state.currentChat, messageIds);
      }
    },

    //  editing

    setEditMessage: (state, action: PayloadAction<Message>) => {
      state.editMessage = action.payload;
    },

    removeEditingMessage: (state) => {
      state.editMessage = null;
    },

    //  chat

    deleteChat: (state, action: PayloadAction<string>) => {
      const chatId = action.payload;
      state.myDms = state.myDms.filter((chat) => chat.id !== chatId);

      if (state.currentChat?.id === chatId) {
        state.currentChat = null;
      }
    },

    //  online status

    setUserOnline: (state, action: PayloadAction<string>) => {
      const userId = action.payload;

      const update = (chat: Chat) => {
        chat.members?.forEach((m) => {
          if (m.userId === userId && m.user) {
            m.user.isOnline = true;
          }
        });
      };

      state.myDms.forEach(update);
      if (state.currentChat) update(state.currentChat);
    },

    setUserOffline: (state, action: PayloadAction<{ userId: string }>) => {
      const { userId } = action.payload;

      const update = (chat: Chat) => {
        chat.members?.forEach((m) => {
          if (m.userId === userId && m.user) {
            m.user.isOnline = false;
            m.user.lastSeen = Date.now();
          }
        });
      };

      state.myDms.forEach(update);
      if (state.currentChat) update(state.currentChat);
    },

    setIsFullScreenChat: (state, action: PayloadAction<boolean>) => {
      state.isFullScreenChat = action.payload;
    },

    // files
    setFilesModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isFilesModalOpen = action.payload;
    },

    setDropFiles: (state, action: PayloadAction<Array<File>>) => {
      state.dropFiles = action.payload;
    },

    setDropFile: (state, action: PayloadAction<File>) => {
      state.dropFiles = [...state.dropFiles, action.payload];
    },

    clearDropFiles: (state) => {
      state.dropFiles = [];
    },

    removeDropFile: (state, action: PayloadAction<File>) => {
      state.dropFiles = state.dropFiles.filter((f) => f !== action.payload);
    },

    // images

    setChatImages: (
      state,
      action: PayloadAction<{ images: Array<string>; startIndex: number }>,
    ) => {
      state.chatImages = action.payload;
    },
    clearChatImages: (state) => {
      state.chatImages = { images: [], startIndex: 0 };
    },
    setIsImagesPreview: (state, action: PayloadAction<boolean>) => {
      state.isImagesPreview = action.payload;
    },
  },
});

export const chatsReducer = chatsSlice.reducer;

export const {
  setNewDm,
  setCurrentChat,
  setFilesModalOpen,
  closeCurrentChat,
  addNewMessage,
  editMessage,
  deleteMessage,
  deleteChat,
  setUserOnline,
  setUserOffline,
  removeEditingMessage,
  setEditMessage,
  updateMessage,
  readMessage,
  setIsFullScreenChat,
  setDropFiles,
  setDropFile,
  removeDropFile,
  clearDropFiles,
  clearChatImages,
  setIsImagesPreview,
  setChatImages,
} = chatsSlice.actions;

//  selectors

export const getMyDms = (state: RootState) => state.chats.myDms;

export const getCurrentChat = (state: RootState) => state.chats.currentChat;

export const isUserOnline = (userId: string, state: RootState) => {
  const chat = state.chats.myDms.find((chat) =>
    chat.members?.some((m) => m.userId === userId),
  );

  return chat?.members?.find((m) => m.userId === userId)?.user?.isOnline;
};

export const getEditingMessage = (state: RootState) => state.chats.editMessage;
export const getIsFullScreenChat = (state: RootState) =>
  state.chats.isFullScreenChat;
export const getIsFilesModalOpen = (state: RootState) =>
  state.chats.isFilesModalOpen;
export const getDropFiles = (state: RootState) => state.chats.dropFiles;
export const getIsImagesPreview = (state: RootState) =>
  state.chats.isImagesPreview;
export const getChatImages = (state: RootState) => state.chats.chatImages;
