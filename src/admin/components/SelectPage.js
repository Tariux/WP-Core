import React, { useEffect, useState } from "react";

export default function SelectPage({ onPageSelect = () => {} }) {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost/wordpress/wp-json/the-box-admin/v1/pages")
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
    return <div className="the_box-loading">Loading...</div>;
  }

  return (
      <select
        className="the_box-read-page__select"
        onChange={(e) => onPageSelect(e)}
      >
        <option value="">Select a page</option>
        {pages.map((value, index) => (
          <option key={index} value={value.id}>
            {value.title}
          </option>
        ))}
      </select>
  );
}