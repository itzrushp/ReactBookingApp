import React, { useContext, useState } from "react";
import "./login.css";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    dispatch({ type: "LOGIN_START" });

    try {
      const res = await axios.post(
        "http://localhost:8800/api/auth/login",
        credentials
      );
      // console.log("Login response data:", res.data); // Confirm response
      // console.log("Storing in localStorage...");
  
      localStorage.setItem("user", JSON.stringify(res.data)); 
  
      // console.log("Stored in localStorage:", localStorage.getItem("user")); // Check if it's set
  
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });

      navigate("/");
    } catch (err) {
      dispatch({
        type: "LOGIN_FAILURE",
        payload: err.response?.data || "Something went wrong",
      });
      console.error("Login failed:", err);
    }
  };

  return (
    <div className="login">
      <div className="lContainer">
        <input
          type="text"
          placeholder="Username"
          id="username"
          onChange={handleChange}
          className="lInput"
        />

        <input
          type="password"
          placeholder="Password"
          id="password"
          onChange={handleChange}
          className="lInput"
        />

        <button
          disabled={loading}
          onClick={handleClick}
          className="lButton"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {error && <span className="errorMsg">{error.message || error}</span>}
      </div>
    </div>
  );
};

export default Login;
