import React, { useContext, useEffect, useState } from "react";
import { SettingsContext } from "../../context/SettingsContext";

export default function ReadPage() {
  const [page, setPage] = useState(null);
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState([]);
  const { lang } = useContext(SettingsContext);

  useEffect(() => {
    fetch("https://192.168.1.10/wordpress/wp-json/the-box-admin/v1/pages")
      .then((response) => response.json())
      .then((data) => { 
        setPages(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching pages:", error);
        setLoading(false);
      });
  }, []);
  
  function loadPage(e) {
    const id = e.target.value;
    fetch(`https://192.168.1.10/wordpress/wp-json/the-box-admin/v1/pages/${id}`)
      .then((response) => response.json())
      .then((data) => setPage(data))
      .catch((error) => console.error("Error fetching page:", error));
  }

  if (loading) {
    return <div className="the_box-loading">Loading...</div>;
  }

  return (
    <div className="the_box-read-page">
      <div className="the_box-read-page__select-container">
        <select
          className="the_box-read-page__select"
          onChange={(e) => {
            loadPage(e);
          }}
        >
          <option value="">Select a page</option>
          {pages.map((value, index) => {
            return (
              <option key={index} value={value.id}>
                {value.title}
              </option>
            );
          })}
        </select>
      </div>
      
      {page && (
        <div className="the_box-read-page__content">
          <h1 className="the_box-read-page__title">{lang["read_page"]}</h1>
          <h2 className="the_box-read-page__subtitle">{page.title}</h2>
          <div className="the_box-read-page__text">{page.content}</div>
        </div>
      )}
    </div>
  );
}
