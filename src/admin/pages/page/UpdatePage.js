import React, { useContext, useEffect, useState } from "react";
import { SettingsContext } from "../../context/SettingsContext";
import SelectPage from "../../components/SelectPage";

export default function UpdatePage() {
  const { lang,  theme } = useContext(SettingsContext);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [pageId, setPageId] = useState(null);

  function fetchPage(e) {
    const id = e.target.value;
    setPageId(id);
    fetch(`http://localhost/wordpress/wp-json/the-box-admin/v1/pages/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setTitle(data.title);
        setContent(data.content);
      })
      .catch((error) => console.error("Error fetching page:", error));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!pageId) {
      alert("Please select a page to update.");
      return;
    }
    fetch(`http://localhost/wordpress/wp-json/the-box-admin/v1/pages/${pageId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, content }),
    })
      .then((response) => response.json())
      .then((data) => alert("Page updated successfully!"))
      .catch((error) => console.error("Error updating page:", error));
  };

  return (
    <div className={`the_box-create-page ${theme === 'dark' ? 'dark' : ''}`}>
    <h1 className="the_box-create-page__title">{lang["update_page"] || 'Update Page'}</h1>
    <form className="the_box-create-page__form" onSubmit={handleSubmit}>
      <SelectPage onPageSelect={fetchPage} />
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
        {lang["update"] || 'Update'}
      </button>
    </form>
  </div>
  );
}