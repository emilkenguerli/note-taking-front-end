import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

const NoteList = () => {
  const [notes, setNotes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sort, setSort] = useState("createdAt");
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    creationDateFrom: "",
    creationDateTo: "",
    updateDateFrom: "",
    updateDateTo: "",
    category: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await api.get("/notes", {
          params: {
            page: currentPage,
            limit: 10,
            sort,
            search,
            filters,
          },
        });
        setNotes(response.data.notes || []);
        setTotalPages(response.data.totalPages);
        setCurrentPage(response.data.currentPage);
      } catch (error) {
        console.error("Failed to fetch notes:", error);
        setNotes([]); // Set an empty array on error
      }
    };

    fetchNotes();
  }, [currentPage, sort, search, filters]);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/notes/${id}`);
      setNotes(notes.filter((note) => note._id !== id));
    } catch (error) {
      console.error("Failed to delete note:", error);
    }
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div>
      <h2>Notes</h2>
      <div>
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={handleSearchChange}
        />
        <select
          name="sort"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="createdAt">Sort by Creation Date</option>
          <option value="updatedAt">Sort by Update Date</option>
          <option value="title">Sort by Title</option>
          <option value="category">Sort by Category</option>
        </select>
        <div>
          <label>Creation Date From:</label>
          <input
            type="date"
            name="creationDateFrom"
            value={filters.creationDateFrom}
            onChange={handleFilterChange}
          />
          <label>Creation Date To:</label>
          <input
            type="date"
            name="creationDateTo"
            value={filters.creationDateTo}
            onChange={handleFilterChange}
          />
        </div>
        <div>
          <label>Update Date From:</label>
          <input
            type="date"
            name="updateDateFrom"
            value={filters.updateDateFrom}
            onChange={handleFilterChange}
          />
          <label>Update Date To:</label>
          <input
            type="date"
            name="updateDateTo"
            value={filters.updateDateTo}
            onChange={handleFilterChange}
          />
        </div>
        <div>
          <label>Category:</label>
          <input
            type="text"
            name="category"
            value={filters.category}
            onChange={handleFilterChange}
          />
        </div>
      </div>
      <button onClick={() => navigate("/categories")}>Manage Categories</button>
      <Link to="/notes/create">Create Note</Link>
      <ul>
        {Array.isArray(notes) && notes.length > 0 ? (
          notes.map((note) => (
            <li key={note._id}>
              <h3>{note.title}</h3>
              <p>{note.description}</p>
              <small>Category: {note.category}</small>
              <Link to={`/notes/edit/${note._id}`}>Edit</Link>
              <button onClick={() => handleDelete(note._id)}>Delete</button>
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
