import React, { useEffect, useState } from "react";
import api from "../services/api";

const NoteList = () => {
  const [notes, setNotes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await api.get("/notes", {
          params: { page: currentPage },
        });
        console.log("API response:", response.data); // Log the response to see its structure
        setNotes(response.data.notes || []);
        setTotalPages(response.data.totalPages);
        setCurrentPage(response.data.currentPage);
      } catch (error) {
        console.error("Failed to fetch notes:", error);
        setNotes([]); // Set an empty array on error
      }
    };

    fetchNotes();
  }, [currentPage]);

  return (
    <div>
      <h2>Notes</h2>
      <ul>
        {Array.isArray(notes) && notes.length > 0 ? (
          notes.map((note) => (
            <li key={note._id}>
              <h3>{note.title}</h3>
              <p>{note.description}</p>
              <small>Category: {note.category}</small>
            </li>
          ))
        ) : (
          <li>No notes available</li>
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

export default NoteList;
