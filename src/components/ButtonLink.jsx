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
  min-width: 12rem;
  &:hover {
    background-color: var(--border-and-hover-color);
  }
  span {
    color: var(--white-font);
  }
  a {
    color: var(--border-and-hover-color);
    text-decoration: none;
    font-weight: bold;
  }
`;

export default ButtonLink;
