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
  const [users, setUsers] = useState([]); // Ensure users is an array
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [usersWithNotes, setUsersWithNotes] = useState([]);

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
            users: selectedUsers,
          },
        });
        setNotes(Array.isArray(response.data.notes) ? response.data.notes : []);
        setTotalPages(response.data.totalPages);
        setCurrentPage(response.data.currentPage);
        setUsersWithNotes(response.data.usersWithNotes);
      } catch (error) {
        console.error("Failed to fetch notes:", error);
        setNotes([]); // Set an empty array on error
      }
    };

    fetchNotes();
  }, [currentPage, sort, search, filters, selectedUsers]);

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

  const handleUserChange = (e) => {
    const value = e.target.value;
    if (value === "all") {
      setSelectedUsers([]); // Clear selected users when "Select All" is chosen
    } else {
      setSelectedUsers([value]);
    }
  };

  const handleSelectAllUsers = () => {
    setSelectedUsers(users.map((user) => user._id)); // Select all users
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get("/users");
        const userData = Array.isArray(response.data)
          ? response.data
          : [response.data];
        setUsers(userData);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div style={styles.container}>
      <h2>Notes</h2>
      <div style={styles.filters}>
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={handleSearchChange}
          style={styles.input}
        />
        <select
          name="sort"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          style={styles.input}
        >
          <option value="createdAt">Sort by Creation Date</option>
          <option value="updatedAt">Sort by Update Date</option>
          <option value="title">Sort by Title</option>
          <option value="category">Sort by Category</option>
        </select>
        <div style={styles.dateFilterContainer}>
          <label style={styles.label}>Creation Date From:</label>
          <input
            type="date"
            name="creationDateFrom"
            value={filters.creationDateFrom}
            onChange={handleFilterChange}
            style={styles.input}
          />
          <label style={styles.label}>Creation Date To:</label>
          <input
            type="date"
            name="creationDateTo"
            value={filters.creationDateTo}
            onChange={handleFilterChange}
            style={styles.input}
          />
        </div>
        <div style={styles.dateFilterContainer}>
          <label style={styles.label}>Update Date From:</label>
          <input
            type="date"
            name="updateDateFrom"
            value={filters.updateDateFrom}
            onChange={handleFilterChange}
            style={styles.input}
          />
          <label style={styles.label}>Update Date To:</label>
          <input
            type="date"
            name="updateDateTo"
            value={filters.updateDateTo}
            onChange={handleFilterChange}
            style={styles.input}
          />
        </div>
        <div style={styles.categoryContainer}>
          <label style={styles.label}>Category:</label>
          <input
            type="text"
            name="category"
            value={filters.category}
            onChange={handleFilterChange}
            style={styles.input}
          />
        </div>
        <div style={styles.userSelectContainer}>
          <label style={styles.label}>User:</label>
          <select
            onChange={handleUserChange}
            value={selectedUsers.length === 0 ? "all" : selectedUsers[0]}
            style={styles.input}
          >
            <option value="all">Select All</option>
            {users.map((user) => (
              <option key={user._id} value={user._id}>
                {user.username}
              </option>
            ))}
          </select>
          <button onClick={handleSelectAllUsers} style={styles.button}>
            Select All Users with Notes
          </button>
        </div>
      </div>
      <div style={styles.actions}>
        <button onClick={() => navigate("/categories")} style={styles.button}>
          Manage Categories
        </button>
        <Link to="/notes/create" style={styles.button}>
          Create Note
        </Link>
      </div>
      <ul style={styles.list}>
        {Array.isArray(notes) && notes.length > 0 ? (
          notes.map((note) => (
            <li key={note._id} style={styles.listItem}>
              <h3>{note.title}</h3>
              <p>{note.description}</p>
              <small style={styles.category}>
                Category: {note.category.name}
              </small>
              <div style={styles.actions}>
                <Link to={`/notes/edit/${note._id}`} style={styles.button}>
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(note._id)}
                  style={{ ...styles.button, background: "#dc3545" }}
                >
                  Delete
                </button>
              </div>
            </li>
          ))
        ) : (
          <li style={styles.listItem}>No notes available</li>
        )}
      </ul>
      <div style={styles.pagination}>
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
          style={styles.button}
        >
          Previous
        </button>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
          style={styles.button}
        >
          Next
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    background: "#f0f0f0",
  },
  filters: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    marginBottom: "20px",
  },
  dateFilterContainer: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  categoryContainer: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  input: {
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    marginBottom: "10px",
  },
  button: {
    padding: "10px 20px",
    background: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    textDecoration: "none",
    cursor: "pointer",
    marginBottom: "10px",
    marginRight: "10px",
  },
  list: {
    listStyle: "none",
    padding: 0,
  },
  listItem: {
    background: "#fff",
    margin: "10px 0",
    padding: "20px",
    borderRadius: "5px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  actions: {
    display: "flex",
    gap: "10px",
    marginTop: "10px",
  },
  pagination: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "20px",
  },
  category: {
    fontSize: "1.1em",
    fontWeight: "bold",
  },
  userSelectContainer: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  label: {
    marginRight: "10px",
  },
};

export default NoteList;
