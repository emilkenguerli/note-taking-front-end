import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get("/categories", {
          params: { page: currentPage, limit: 10 },
        });
        setCategories(response.data.categories);
        setTotalPages(response.data.totalPages);
        setCurrentPage(response.data.currentPage);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchCategories();
  }, [currentPage]);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/categories/${id}`);
      setCategories(categories.filter((category) => category._id !== id));
    } catch (error) {
      console.error("Failed to delete category:", error);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Categories</h2>
      <Link to="/categories/create" style={styles.button}>
        Create Category
      </Link>
      <ul style={styles.list}>
        {categories.map((category) => (
          <li key={category._id} style={styles.listItem}>
            <h3>{category.name}</h3>
            <p>{category.description}</p>
            <div style={styles.actions}>
              <Link
                to={`/categories/edit/${category._id}`}
                style={styles.button}
              >
                Edit
              </Link>
              <button
                onClick={() => handleDelete(category._id)}
                style={styles.button}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div style={styles.pagination}>
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
          style={styles.button}
        >
          Previous
        </button>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
          style={styles.button}
        >
          Next
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    background: "#f0f0f0",
  },
  list: {
    listStyle: "none",
    padding: 0,
  },
  listItem: {
    background: "#fff",
    margin: "10px 0",
    padding: "20px",
    borderRadius: "5px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  actions: {
    display: "flex",
    gap: "10px",
  },
  button: {
    padding: "10px 20px",
    background: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    textDecoration: "none",
    cursor: "pointer",
  },
  pagination: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "20px",
  },
};

export default CategoryList;
