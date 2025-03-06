import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { SettingsContext } from "../../context/SettingsContext";

export default function DeletePage() {
  const { lang } = useContext(SettingsContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [page, setPage] = useState(null);

  useEffect(() => {
    fetch(`/wordpress/wp-json/the-box-admin/v1/pages/${id}`)
      .then((response) => response.json())
      .then((data) => setPage(data))
      .catch((error) => console.error("Error fetching page:", error));
  }, [id]);

  const handleDelete = () => {
    fetch(`/wordpress/wp-json/the-box-admin/v1/pages/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        alert("Page deleted successfully!");
        navigate("/list-pages");
      })
      .catch((error) => console.error("Error deleting page:", error));
  };

  if (!page) return <div>Loading...</div>;

  return (
    <div className="the_box-delete-page">
      <h1>{lang["delete_page"]}</h1>
      <p>
        Are you sure you want to delete <strong>{page.title}</strong>?
      </p>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}