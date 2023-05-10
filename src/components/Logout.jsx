import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { BiPowerOff } from "react-icons/bi";
import { CurrentUserContext } from "../App";

const Logout = () => {
  const { setCurrentUser } = useContext(CurrentUserContext);
  const navigate = useNavigate();
  const handleClick = async () => {
    localStorage.clear();
    setCurrentUser(null)
    navigate("/");
  };
  return (
    <Button onClick={handleClick}>
      <BiPowerOff />
    </Button>
  );
};

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background-color: var(--button-primary-color);
  border: none;
  cursor: pointer;
  svg {
    font-size: 1.3rem;
    color: #ebe7ff;
  }
`;

export default Logout;
