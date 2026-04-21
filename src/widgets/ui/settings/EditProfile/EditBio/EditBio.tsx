"use client";

import { useTranslations } from "next-intl";
import { FC } from "react";

interface Props {
  bio: string | null;
  onChange: (bio: string) => void;
}

const EditBio: FC<Props> = ({
  bio,
  onChange,
}) => {
  const t = useTranslations();

  return (
    <div className="flex flex-col items-start justify-center w-full px-5 gap-3">
      <p className="flex items-center justify-between w-full text-icon">
        {t("profile.bio")}{" "}
        <span className="text-[.8rem]">
          ({t("settings.editProfileSettings.maxBioChars")})
        </span>
      </p>
      <div className="flex flex-col items-center justify-center gap-5">
        <textarea
          className="resize-none outline-0 block p-3 px-5 rounded-xl ring-2 ring-input-ring focus:ring-accent duration-300 w-full h-20 text-text-default placeholder:text-icon text-[.9rem]"
          placeholder={t("settings.editProfileSettings.inputBioPlaceholder")}
          value={bio ?? ""}
          onChange={(e) => onChange(e.target.value)}
        />
        <p className="text-icon text-[.8rem]">
          {t("settings.editProfileSettings.bioSubtext")}
        </p>
      </div>
    </div>
  );
};

export default EditBio;
