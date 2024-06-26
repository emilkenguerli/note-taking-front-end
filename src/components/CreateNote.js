import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const CreateNote = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [isPublic, setIsPublic] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get("/categories");
        setCategories(response.data.categories);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await api.post("/notes", {
        title,
        description,
        category,
        public: isPublic,
      });
      navigate("/notes");
    } catch (error) {
      console.error("Failed to create note:", error);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Create Note</h2>
      <form onSubmit={handleCreate} style={styles.form}>
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
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>
        <label style={styles.checkboxLabel}>
          <input
            type="checkbox"
            checked={isPublic}
            onChange={(e) => setIsPublic(e.target.checked)}
          />
          Public
        </label>
        <button type="submit" style={styles.button}>
          Create
        </button>
      </form>
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
  },
  checkboxLabel: {
    margin: "10px",
    display: "flex",
    alignItems: "center",
  },
};

export default CreateNote;
