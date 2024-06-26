import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import api from "../services/api";

const EditNote = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const history = useHistory();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await api.get(`/notes/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTitle(response.data.title);
        setDescription(response.data.description);
        setCategory(response.data.category);
      } catch (error) {
        console.error("Failed to fetch note:", error);
      }
    };

    fetchNote();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await api.patch(
        `/notes/${id}`,
        { title, description, category },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      history.push("/notes");
    } catch (error) {
      console.error("Failed to update note:", error);
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
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default EditNote;
