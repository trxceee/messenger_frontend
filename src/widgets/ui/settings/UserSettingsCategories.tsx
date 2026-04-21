"use client";

import { useAppDispatch } from "@/app";
import { createRipple, i18nPattern, TLocales } from "@/shared";
import { userSettingsCategoriesConfig } from "@/widgets/config";
import { useLocale, useTranslations } from "next-intl";

const UserSettingsCategories = () => {
  const dispatch = useAppDispatch();
  const elements = userSettingsCategoriesConfig(dispatch);
  const t = useTranslations();
  const locale = useLocale();
  return (
    <div className="flex flex-col items-center justify-center w-full">
      {elements.map((el, i) => (
        <div
          onClick={(e) => {
            el.onClick();
            createRipple(e);
          }}
          key={i}
          className="relative overflow-hidden hover:bg-hover-checkbox rounded-2xl px-5 py-4 flex items-center justify-start gap-5 cursor-pointer w-full"
        >
          {el.icon}
          <div className="flex items-center justify-between w-full">
            <p>{t(el.title)}</p>
            {el.isLanguage && (
              <p className="text-icon text-[.9rem]">
                {i18nPattern(locale as TLocales).orig}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserSettingsCategories;
