import React, { useContext, useEffect, useState } from "react";
import { SettingsContext } from "../../context/SettingsContext";

export default function ListPages() {
  const { lang, theme } = useContext(SettingsContext);
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://192.168.1.10/wordpress/wp-json/the-box-admin/v1/pages")
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

  if (loading) {
    return (
      <div>
        <p>{lang['loading'] || "Loading..."}</p>
      </div>
    );
  }

  return (
    <div>
      {pages.map((page) => (
        <div key={page.id}>
          <h2>{page.title}</h2>
          <hr />
          <p>{page.content}</p>
        </div>
      ))}
    </div>
  );
}