import React from "react";
import styled from "styled-components";
import Logo from "./LogoSVG";

const Welcome = ({ currentUser }) => {
  return (
    <Container>
      <Logo className="logo"/>{" "}
      <h1>
        Welcome, <span>{currentUser?.username}!</span>
      </h1>
      <h3>Please select a chat.</h3>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: white;
  .logo {
    height: 20rem;
  }
  span {
    color: var(--primary-color);
  }
`;

export default Welcome;
