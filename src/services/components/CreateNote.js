import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import api from "../services/api";

const CreateNote = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const history = useHistory();

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await api.post(
        "/notes",
        { title, description, category },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      history.push("/notes");
    } catch (error) {
      console.error("Failed to create note:", error);
    }
  };

  return (
    <div>
      <h2>Create Note</h2>
      <form onSubmit={handleCreate}>
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
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CreateNote;
