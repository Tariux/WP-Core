import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SettingsContext } from "../../context/SettingsContext";

export default function UpdatePage() {
  const { lang } = useContext(SettingsContext);
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    fetch(`/wordpress/wp-json/the-box-admin/v1/pages/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setTitle(data.title);
        setContent(data.content);
      })
      .catch((error) => console.error("Error fetching page:", error));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`/wordpress/wp-json/the-box-admin/v1/pages/${id}`, {
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
    <div className="the_box-update-page">
      <h1>{lang["update_page"]}</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <button type="submit">Update</button>
      </form>
    </div>
  );
}