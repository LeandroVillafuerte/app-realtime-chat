import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { BiPowerOff } from "react-icons/bi";
import { CurrentUserContext } from "../App";
import ButtonLink from "./ButtonLink";

const Logout = ({ type }) => {
  const { setCurrentUser } = useContext(CurrentUserContext);
  const navigate = useNavigate();
  const handleClick = async () => {
    localStorage.clear();
    setCurrentUser(null);
    navigate("/");
  };
  return (
    <>
      {type === "icon" && (
        <Button onClick={handleClick}>
          <BiPowerOff />
        </Button>
      )}
      {
        type === "button" && (
          <ButtonLink  to="/">
            <span onClick={handleClick} style={{display:"flex", gap:"0.2rem", alignItems:"center",justifyContent:"center"}}>
            Log out <BiPowerOff style={{fontSize:"1.3rem",color:"var(--font-white)"}} />
            </span>
          </ButtonLink>
        )
      }
    </>
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
    color: var(--white-font);
  }
`;

export default Logout;
