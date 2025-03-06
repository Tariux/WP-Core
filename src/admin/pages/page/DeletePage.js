import React, { useContext, useEffect, useState } from "react";
import { SettingsContext } from "../../context/SettingsContext";
import SelectPage from "../../components/SelectPage";

export default function DeletePage() {
  const { lang, theme } = useContext(SettingsContext);
  const [pageId, setPageId] = useState(null);

  function updatePageId(e) {
    e.preventDefault();
    const id = e.target.value;
    setPageId(id);
  }

  const handleDelete = (e) => {
    e.preventDefault();
    if (!pageId) {
      alert("Please select a page to delete.");
      return;
    }
    fetch(`http://localhost/wordpress/wp-json/the-box-admin/v1/pages/${pageId}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        alert("Page deleted successfully!");
      })
      .catch((error) => console.error("Error deleting page:", error));
  };


  return (
    <div className={`the_box-create-page ${theme === 'dark' ? 'dark' : ''}`}>
    <h1 className="the_box-create-page__title">{lang["delete_page"] || 'Delete Page'}</h1>
    <h1>{lang["delete_page"]}</h1>
    <SelectPage onPageSelect={updatePageId} />
      <p>
        Are you sure you want to delete <strong>{}</strong>?
      </p>
      <button onClick={handleDelete}>Delete</button>
  </div>
  );
}