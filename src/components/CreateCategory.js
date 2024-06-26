import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const CreateCategory = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await api.post("/categories", { name, description });
      navigate("/categories");
    } catch (error) {
      console.error("Failed to create category:", error);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Create Category</h2>
      <form onSubmit={handleCreate} style={styles.form}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={styles.input}
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ ...styles.input, height: "100px" }}
        />
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
};

export default CreateCategory;
