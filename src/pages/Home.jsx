import React from "react";
import styled from "styled-components";
import Logout from "../components/Logout";
import LogoSVG from "../components/LogoSVG";
import ButtonLink from "../components/ButtonLink";

const Home = ({ currentUser }) => {
  return (
    <Container>
      <section className="content">
        <section className="brand">
          <h1>Chatify</h1>
          <LogoSVG />
        </section>
        <section className="options">
          <article>
            Welcome to my personal project! Feel free to contact me for any
            suggestion :)
          </article>
          <article>Start creating an account and adding contacts.</article>
          <ButtonLink to="/about">About 🙋🏻‍♂️</ButtonLink>
          {!currentUser && (
            <>
              <ButtonLink to="/login">Log in 💎</ButtonLink>
              <ButtonLink to="/register">Register 📝</ButtonLink>
            </>
          )}
          {currentUser &&<><ButtonLink to="/chat">Go to chat ✨</ButtonLink><ButtonLink to="/setavatar">profile img 🖼</ButtonLink></>
          }
          {currentUser && <Logout />}
        </section>
      </section>
    </Container>
  );
};

const Container = styled.div`
  background-color: #080420;
  height: 100vh;
  width: 100vw;
  color: var(--white-font);
  display: flex;
  justify-content: center;
  .content {
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 3rem 5rem;
    margin: 2rem 2rem;
  }
  .brand {
    display: flex;
    gap: 1rem;
    align-items: center;
    justify-content: center;
    svg {
      height: 5rem;
    }
  }
  .options {
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 1rem;
  }
`;

export default Home;
