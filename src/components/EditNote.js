import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

const EditCategory = () => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await api.get(`/categories/${id}`);
        setName(response.data.name);
        setDescription(response.data.description);
      } catch (error) {
        console.error("Failed to fetch category:", error);
      }
    };

    fetchCategory();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await api.patch(`/categories/${id}`, { name, description });
      navigate("/categories");
    } catch (error) {
      console.error("Failed to update category:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/categories/${id}`);
      navigate("/categories");
    } catch (error) {
      console.error("Failed to delete category:", error);
    }
  };

  return (
    <div>
      <h2>Edit Category</h2>
      <form onSubmit={handleUpdate}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">Update</button>
      </form>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default EditCategory;
