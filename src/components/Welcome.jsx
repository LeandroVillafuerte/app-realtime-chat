import React from "react";
import styled from "styled-components";
import Logo from "./LogoSVG";

const Welcome = () => {
  return (
    <Container>
      <Logo className="logo"/>{" "}
      <h3>Select a contact to start chatting.</h3>
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
