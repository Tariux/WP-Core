import React, { useContext } from "react";
import { SettingsContext } from "../context/SettingsContext";

export default function Landing() {
  const { lang } = useContext(SettingsContext);
  return (
    <div className="the_box-landing">
      <h1>{lang['welcome_message']} 👋</h1>
      <p>{lang['welcome_message_sub']}</p>
    </div>
  );
}
