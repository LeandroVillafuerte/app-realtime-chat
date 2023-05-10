import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const ButtonLink = ({ to, children }) => {
  return (
    <Container>
      <Link to={to}>{children}</Link>
    </Container>
  );
};

const Container = styled.button`
  display:flex;
  align-items:center;
  justify-content:center;
  background-color: var(--button-primary-color);
  color: var(--white-font);

  border: none;
  font-weight: bold;
  cursor: pointer;
  border-radius: 0.4rem;
  font-size: 1rem;
  text-transform: uppercase;
  transition: 0.5s ease-in-out;
  min-width: 12rem;
  &:hover {
    background-color: var(--border-and-hover-color);
  }
  span {
    color: var(--white-font);
  }
  a {
    width:100%;
    height:100&;
    padding: 1rem 2rem;
    color: var(--white-font);
    text-decoration: none;
    font-weight: bold;
  }
`;

export default ButtonLink;
