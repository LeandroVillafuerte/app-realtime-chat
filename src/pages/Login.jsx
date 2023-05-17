import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../components/LogoSVG";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { loginRoute } from "../utils/apiRoutes";
import ButtonBack from "../components/ButtonBack";
import spinner from "../assets/tail-spin.svg";
const Login = ({ setCurrentUser }) => {
  const [logging, setLogging] = useState(false);
  const navigate = useNavigate();
  const [infoForm, setInfoForm] = useState({
    username: "",
    password: "",
  });
  useEffect(() => {
    if (localStorage.getItem("chat-app-user")) {
      navigate("/");
    }
  }, [navigate]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!handleValidationErrors()) return false;
    setLogging(true);
    toast.info("This may take a while.");
    const { username, password } = infoForm;
    try {
      const { data } = await axios.post(loginRoute, {
        username,
        password,
      });
      localStorage.setItem("chat-app-user", JSON.stringify(data.user));
      setCurrentUser(data.user);
      toast.info(data.msg);
      setLogging(false);
      navigate("/");
    } catch (e) {
      toast.error(e.response.data.msg, toastOptions);
      setLogging(false);
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
    const { password, username } = infoForm;
    if (username === "") {
      toast.error("Username is required.", toastOptions);
      return false;
    }
    if (password === "") {
      toast.error("Password is required.", toastOptions);
      return false;
    }
    return true;
  };
  return (
    <>
      <FormContainer>
        <form onSubmit={(e) => handleSubmit(e)}>
          <ButtonBack />
          <div className="brand">
            <Logo className="img" />
            <h1>Chatify</h1>
          </div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            min="3"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          {logging ? (
            <button className="spinner">
              <img src={spinner} alt="spinner" className="spinner" />
            </button>
          ) : (
            <button type="submit">Log in</button>
          )}
          <button>
            <Link to="/register">Register</Link>
          </button>
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
  .back {
    position: absolute;
    top: 2rem;
    left: 2rem;
    @media screen and (max-width: 767px) {
      font-size: 3rem;
    }
  }
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    .img {
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
    position: relative;
    @media screen and (max-width: 767px) {
      padding: 3rem 4rem;
      margin-bottom: 3rem;
    }
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
    .spinner {
      padding: 0.5rem 2rem;
      img {
        padding:0;
        height: 2rem;
      }
    }
    span {
      color: var(--white-font);
      /* text-transform:uppercase; */
    }
    a {
      color: var(--white-font);
      text-decoration: none;
      font-weight: bold;
    }
  }
`;

export default Login;
