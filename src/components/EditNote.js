import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

const EditNote = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [isPublic, setIsPublic] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await api.get(`/notes/${id}`);
        setTitle(response.data.title);
        setDescription(response.data.description);
        setCategory(response.data.category);
        setIsPublic(response.data.public);
      } catch (error) {
        console.error("Failed to fetch note:", error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await api.get("/categories");
        setCategories(response.data.categories);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchNote();
    fetchCategories();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await api.patch(`/notes/${id}`, {
        title,
        description,
        category,
        public: isPublic,
      });
      navigate("/notes");
    } catch (error) {
      console.error("Failed to update note:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/notes/${id}`);
      navigate("/notes");
    } catch (error) {
      console.error("Failed to delete note:", error);
    }
  };

  return (
    <div>
      <h2>Edit Note</h2>
      <form onSubmit={handleUpdate}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>
        <label>
          <input
            type="checkbox"
            checked={isPublic}
            onChange={(e) => setIsPublic(e.target.checked)}
          />
          Public
        </label>
        <button type="submit">Update</button>
      </form>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default EditNote;
