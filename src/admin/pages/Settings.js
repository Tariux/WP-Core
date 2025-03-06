import React, { useContext } from "react";
import { SettingsContext } from "../../context/SettingsContext";
export default function Settings() {
  const { language, setLanguage, theme, setTheme, lang } = useContext(SettingsContext);

  return (
    <div className="the_box-admin-settings">
      <h1>{lang['settings']}</h1>
      
      <div className="settings-section">
        <h2>{lang['language']}</h2>
        <select 
          value={language} 
          onChange={(e) => setLanguage(e.target.value)}
          className="settings-select"
        >
          <option value="en">English</option>
          <option value="fa">فارسی</option>
        </select>
      </div>

      <div className="settings-section">
        <h2>{lang['theme']}</h2>
        <select 
          value={theme} 
          onChange={(e) => setTheme(e.target.value)}
          className="settings-select"
        >
          <option value="light">{lang['light']}</option>
          <option value="dark">{lang['dark']}</option>
        </select>
      </div>
    </div>
  );
}
