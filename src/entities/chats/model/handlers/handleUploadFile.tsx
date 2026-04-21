import { makeStore } from "@/app";
import { chatsApi } from "../../api";
import {
  appNotification,
  isErrorWithMessage,
  isErrorWithMessageAndType,
} from "@/shared";
import { InfoIcon } from "lucide-react";

export const handleUploadFile = async (
  file: File,
): Promise<{ fileName: string; fileSize: number; fileUrl: string }> => {
  try {
    const { fileName, fileSize, fileUrl } = await makeStore
      .dispatch(chatsApi.endpoints.fileUpload.initiate(file))
      .unwrap();
    return { fileName, fileSize, fileUrl };
  } catch (error) {
    if (isErrorWithMessageAndType(error)) {
      appNotification({
        icon: <InfoIcon size={24} className="text-icon" />,
        text: error.data.message,
      });
    } else if (isErrorWithMessage(error)) {
      const msg = Array.isArray((error as any).data?.message ?? error.message)
        ? ((error as any).data?.message ?? error.message)[0]
        : ((error as any).data?.message ?? error.message);
      appNotification({
        icon: <InfoIcon size={24} className="text-icon" />,
        text: msg,
      });
    }
    throw error;
  }
};
