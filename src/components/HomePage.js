import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div style={styles.container}>
      <h1>Welcome to Note App</h1>
      <div style={styles.buttonContainer}>
        <Link to="/login" style={styles.button}>
          Login
        </Link>
        <Link to="/register" style={styles.button}>
          Register
        </Link>
      </div>
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
  buttonContainer: {
    marginTop: "20px",
  },
  button: {
    margin: "10px",
    padding: "10px 20px",
    textDecoration: "none",
    background: "#007bff",
    color: "#fff",
    borderRadius: "5px",
  },
};

export default HomePage;
