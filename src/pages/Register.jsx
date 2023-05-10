import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../components/LogoSVG";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { registerRoute } from "../utils/apiRoutes";

const Register = () => {
  const navigate = useNavigate();
  const [infoForm, setInfoForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  useEffect(() => {
    if (localStorage.getItem("chat-app-user")) {
      navigate("/");
    }
  }, [navigate]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!handleValidationErrors()) return false;
    const { username, email, password } = infoForm;
    try {
      const { data } = await axios.post(registerRoute, {
        username,
        password,
        email,
      });
      localStorage.setItem("chat-app-user", JSON.stringify(data.user));
      // toast.info(data.msg);
      navigate("/");
    } catch (e) {
      toast.error(e.response.data.msg, toastOptions);
    }
  };
  const handleChange = (e) => {
    setInfoForm({ ...infoForm, [e.target.name]: e.target.value });
  };

  const toastOptions = {
    position: "top-right",
    autoClose: 7500,
    pauseOnHover: true,
    theme: "dark",
  };

  const handleValidationErrors = () => {
    const { password, confirmPassword, username, email } = infoForm;
    if (password !== confirmPassword) {
      toast.error("Password and confirm password doesn't match.", toastOptions);
      return false;
    } else if (username.length < 4) {
      toast.error("Username should have at least 4 characters.", toastOptions);
      return false;
    } else if (password.length < 8) {
      toast.error("Password should have at least 8 characters.", toastOptions);
      return false;
    } else if (email === "") {
      toast.error("Email is required.", toastOptions);
      return false;
    }
    return true;
  };
  return (
    <>
      <FormContainer>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="brand">
            <Logo className="logo" />
            <h1>Chatify</h1>
          </div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={(e) => handleChange(e)}
          />
          <button type="submit">Create User</button>
          <span>
            Already have an account? <Link to="/login">Login</Link>
          </span>
        </form>
      </FormContainer>
    </>
  );
};

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: var(--background-primary-color);
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    .logo {
      height: 5rem;
    }
    h1 {
      color: var(--white-font);
      text-transform: uppercase;
    }
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: var(--page-container-color);
    border-radius: 2rem;
    padding: 3rem 5rem;
    input {
      background-color: transparent;
      padding: 1rem;
      border: 0.1rem solid var(--border-and-hover-color);
      color: var(--white-font);
      width: 100%;
      font-size: 1rem;
      &:focus {
        border: 0.1rem solid var(--button-primary-color);
        outline: none;
      }
    }
    button {
      background-color: var(--button-primary-color);
      color: var(--white-font);
      padding: 1rem 2rem;
      border: none;
      font-weight: bold;
      cursor: pointer;
      border-radius: 0.4rem;
      font-size: 1rem;
      text-transform: uppercase;
      transition: 0.5s ease-in-out;
      &:hover {
        background-color: var(--border-and-hover-color);
      }
    }
    span {
      color: var(--white-font);
      /* text-transform:uppercase; */
    }
    a {
      color: var(--border-and-hover-color);
      text-decoration: none;
      font-weight: bold;
    }
  }
`;

export default Register;
