import React, { useContext, useState } from "react";
import { SettingsContext } from "../../context/SettingsContext";

export default function CreatePage() {
  const { lang, theme } = useContext(SettingsContext);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://192.168.1.10/wordpress/wp-json/the-box-admin/v1/pages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, content }),
    })
      .then((response) => response.json())
      .then((data) => alert("Page created successfully!"))
      .catch((error) => console.error("Error creating page:", error));
  };

  return (
    <div className={`the_box-create-page ${theme === 'dark' ? 'dark' : ''}`}>
      <h1 className="the_box-create-page__title">{lang["create_page"] || 'Create Page'}</h1>
      <form className="the_box-create-page__form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="the_box-input the_box-create-page__input"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          className="the_box-textarea the_box-create-page__textarea"
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <button type="submit" className="the_box-button the_box-button--primary the_box-create-page__button">
          {lang["create"] || 'Create'}
        </button>
      </form>
    </div>
  );
}