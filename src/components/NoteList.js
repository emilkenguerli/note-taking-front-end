import React, { useEffect, useState } from "react";
import api from "../services/api";

const NoteList = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await api.get("/notes", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setNotes(response.data.notes);
      } catch (error) {
        console.error("Failed to fetch notes:", error);
      }
    };

    fetchNotes();
  }, []);

  return (
    <div>
      <h2>Notes</h2>
      <ul>
        {notes.map((note) => (
          <li key={note._id}>
            <h3>{note.title}</h3>
            <p>{note.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NoteList;
