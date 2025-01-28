/* eslint-disable import/no-unresolved */
import { TranslationsMenuProps } from "~/constants/types";
import { Dropdown } from "../Dropdown/Dropdown";
import { useTranslation } from "react-i18next";
import React from "react";
import { mainLanguage } from "~/constants/general";

export const TranslationsMenu = () => {
  const { i18n } = useTranslation();
  const [, setLanguage] = React.useState(mainLanguage);

  const handleLanguageChange = (key: string, value: string) => {
    if (key) {
      i18n.changeLanguage(key);
    }
    setLanguage(value);
  };

  return (
    <Dropdown
      {...TranslationsMenuProps}
      setSelection={(key: string, value: string) =>
        handleLanguageChange(key, value)
      }
    />
  );
};
