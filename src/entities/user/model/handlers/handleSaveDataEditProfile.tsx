import { makeStore } from "@/app";
import {
  appNotification,
  isErrorWithMessage,
  isErrorWithMessageAndType,
} from "@/shared";
import { userApi } from "../../api";
import { SetStateAction } from "react";
import { InfoIcon } from "lucide-react";

type Form = {
  firstName: string;
  lastName: string;
  username: string;
  bio: string;
  birthday: string;
};

export const handleSaveDataEditProfile = async (
  dirty: Record<keyof Form, boolean>,
  form: Form,
  setDirty: (value: SetStateAction<Record<keyof Form, boolean>>) => void,
) => {
  try {
    if (dirty.firstName || dirty.lastName) {
      await makeStore
        .dispatch(
          userApi.endpoints.setName.initiate({
            firstName: form.firstName,
            lastName: form.lastName,
          }),
        )
        .unwrap();
    }
    if (dirty.username) {
      await makeStore
        .dispatch(userApi.endpoints.changeUsername.initiate(form.username))
        .unwrap();
    }
    if (dirty.bio) {
      await makeStore
        .dispatch(userApi.endpoints.setBio.initiate(form.bio))
        .unwrap();
    }
    if (dirty.birthday) {
      await makeStore
        .dispatch(userApi.endpoints.setBirthday.initiate(form.birthday))
        .unwrap();
    }
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

  setDirty({
    firstName: false,
    lastName: false,
    username: false,
    bio: false,
    birthday: false,
  });
};
