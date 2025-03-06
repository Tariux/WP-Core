import React, { useContext, useEffect, useState } from "react";
import { SettingsContext } from "../../context/SettingsContext";
import SelectPage from "../components/SelectPage";

export default function ReadPage() {
  const [page, setPage] = useState(null);
  const { lang } = useContext(SettingsContext);

  function loadPage(e) {
    e.preventDefault();

    const id = e.target.value;
    fetch(`http://localhost/wordpress/wp-json/the-box-admin/v1/pages/${id}`)
      .then((response) => response.json())
      .then((data) => setPage(data))
      .catch((error) => console.error("Error fetching page:", error));
  }


  return (
    <div className="the_box-read-page">
      <div className="the_box-read-page__select-container">
        <SelectPage onPageSelect={loadPage} />
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
