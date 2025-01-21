import { TranslationsMenuProps } from "~/contants/types";
import { Dropdown } from "../Dropdown/Dropdown";
import { useTranslation } from "react-i18next";
import React from "react";
import { languages, mainLanguage } from "~/contants/general";

export const TranslationsMenu = () => {
  const { i18n } = useTranslation();
  const [language, setLanguage] = React.useState(mainLanguage);

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
