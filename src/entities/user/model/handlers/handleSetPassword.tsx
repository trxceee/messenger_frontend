import { makeStore } from "@/app";
import { userApi } from "../../api";
import {
  appNotification,
  isErrorWithMessage,
  isErrorWithMessageAndType,
} from "@/shared";
import { openComponent } from "../store/userUiSlice";
import { InfoIcon } from "lucide-react";

export const handleSetPassword = async ({
  confirmPassword,
  password,
}: {
  confirmPassword: string;
  password: string;
}) => {
  try {
    await makeStore
      .dispatch(
        userApi.endpoints.setPassword.initiate({ confirmPassword, password }),
      )
      .unwrap();
    await makeStore.dispatch(openComponent("userSettingsPrivacy"));
  } catch (error: unknown) {
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
  }
};
