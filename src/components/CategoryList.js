import React, { useEffect, useState } from "react";
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
        setCategories(response.data.categories || []);
        setTotalPages(response.data.totalPages);
        setCurrentPage(response.data.currentPage);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
        setCategories([]);
      }
    };

    fetchCategories();
  }, [currentPage]);

  return (
    <div>
      <h2>Categories</h2>
      <ul>
        {categories.length > 0 ? (
          categories.map((category) => (
            <li key={category._id}>
              <h3>{category.name}</h3>
              <p>{category.description}</p>
            </li>
          ))
        ) : (
          <li>No categories available</li>
        )}
      </ul>
      <div>
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Previous
        </button>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CategoryList;
