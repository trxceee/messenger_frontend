"use client";

import { AppInput, RenderAvatarElement } from "@/shared";
import { Dispatch, FC, SetStateAction, useState } from "react";
import { motion } from "framer-motion";
import { modalDefault } from "@/shared";
import { useTranslations } from "next-intl";
import AddContactModalButtons from "./AddContactModalButtons";
import { handleAddContact } from "../../model";

interface Props {
  avatar?: string;
  username: string;
  firstName?: string;
  lastName?: string;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const AddContactModal: FC<Props> = ({
  username,
  avatar,
  firstName,
  lastName,
  setIsOpen,
}) => {
  const t = useTranslations();

  const [values, setValues] = useState<{ firstname: string; lastname: string }>(
    {
      firstname: firstName ?? "",
      lastname: lastName ?? "",
    },
  );

  return (
    <motion.div
      variants={modalDefault}
      initial="initial"
      animate="animate"
      exit="initial"
      layout
      transition={{ duration: 0.2 }}
      onClick={(e) => e.stopPropagation()}
      className="flex flex-col items-center justify-center bg-bg-modal rounded-3xl w-full max-w-100 p-7 gap-5 shadow-[0_0px_20px_-8px_rgba(0,0,0,0.8)] backdrop-blur-xl"
    >
      {/* info */}
      <div className="flex w-full items-center justify-start gap-4">
        <RenderAvatarElement hasAvatar={!!avatar} size={60} avatar={avatar} />
        <div className="flex flex-col items-start justify-center">
          <p className="text-xl">
            {firstName} {lastName}
          </p>
          <p className="text-xl text-[.95rem] text-icon">@{username}</p>
        </div>
      </div>

      <form
        className="flex flex-col w-full items-center justify-start gap-5"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="flex flex-col gap-3 items-center justify-center w-full">
          <AppInput
            placeholder={t(
              "settings.editProfileSettings.inputFirstNamePlaceholder",
            )}
            onChange={(e) =>
              setValues((prev) => ({ ...prev, firstname: e.target.value }))
            }
            value={values.firstname}
          />
          <AppInput
            placeholder={t(
              "settings.editProfileSettings.inputLastNamePlaceholder",
            )}
            onChange={(e) =>
              setValues((prev) => ({ ...prev, lastname: e.target.value }))
            }
            value={values.lastname}
          />
        </div>
        <AddContactModalButtons
          closeCallback={() => setIsOpen(false)}
          submitCallback={() =>
            handleAddContact({
              username,
              setIsOpen,
              firstName: values.firstname,
              lastName: values.lastname,
            })
          }
        />
      </form>
    </motion.div>
  );
};

export default AddContactModal;
