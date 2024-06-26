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
        setCategory(response.data.category._id);
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
    <div style={styles.container}>
      <h2>Edit Note</h2>
      <form onSubmit={handleUpdate} style={styles.form}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={styles.input}
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ ...styles.input, height: "100px" }}
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={styles.input}
        >
          <option value="">Select a category</option>
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
        <button type="submit" style={styles.button}>
          Update
        </button>
      </form>
      <button
        onClick={handleDelete}
        style={{ ...styles.button, background: "#dc3545" }}
      >
        Delete
      </button>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    background: "#f0f0f0",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "300px",
  },
  input: {
    margin: "10px",
    padding: "10px",
    width: "100%",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "10px 20px",
    background: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    margin: "10px 0",
  },
};

export default EditNote;
