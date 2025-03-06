import React, { createContext, useState, useEffect } from 'react';
import en from "../locales/en.json";
import fa from "../locales/fa.json";
const translations = {
  en,
  fa,
};

export const SettingsContext = createContext();

export function SettingsProvider({ children }) {
  const [language, setLanguage] = useState(localStorage.getItem('the_box-admin-language') || 'en');
  const [theme, setTheme] = useState(localStorage.getItem('the_box-admin-theme') || 'light');
  const [lang, setLang] = useState(translations[language || 'en']);

  useEffect(() => {
    localStorage.setItem('the_box-admin-language', language);
    localStorage.setItem('the_box-admin-theme', theme);
    document.getElementById('the_box-admin-dashboard').setAttribute('dir', language === 'fa' ? 'rtl' : 'ltr')
    setLang(translations[language || 'en']);
    document.body.className = theme;
  }, [language, theme]);

  return (
    <SettingsContext.Provider value={{ language, setLanguage, theme, setTheme, lang }}>
      {children}
    </SettingsContext.Provider>
  );
}
