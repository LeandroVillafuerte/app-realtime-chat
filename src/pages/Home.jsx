import React from "react";
import styled from "styled-components";
import Logout from "../components/Logout";
import LogoSVG from "../components/LogoSVG";
import ButtonLink from "../components/ButtonLink";
import {IoChatboxEllipsesOutline} from 'react-icons/io5'
import { RxAvatar } from "react-icons/rx";

const Home = ({ currentUser }) => {
  return (
    <Container>
      <section className="content">
        <section className="brand">
          <h1>Chatify</h1>
          <LogoSVG />
        </section>
        <section className="description">
          <article>
            Welcome to my personal project! Feel free to contact me for any
            suggestion :)
          </article>
          <article>Start creating an account and adding contacts.</article>
        </section>
        <section className="options">
          <ButtonLink to="/about">About 🙋🏻‍♂️</ButtonLink>
          {!currentUser && (
            <>
              <ButtonLink to="/login">Log in 💎</ButtonLink>
              <ButtonLink to="/register">Register 📝</ButtonLink>
            </>
          )}
          {currentUser && (
            <>
              <ButtonLink to="/chat"><span>Go to chat</span> <span><IoChatboxEllipsesOutline/></span></ButtonLink>
              <ButtonLink to="/setavatar"><span>Profile Img</span><span><RxAvatar/></span></ButtonLink>
            </>
          )}
          {currentUser && <Logout type="button"/>}
        </section>
      </section>
    </Container>
  );
};

const Container = styled.div`
  background-color: var(--background-primary-color);
  height: 100vh;
  width: 100vw;
  color: var(--white-font);
  display: flex;
  justify-content: center;
  align-items: center;
  .content {
    height: fit-content;
    background-color: var(--page-container-color);
    border-radius: 2rem;
    padding: 3rem 5rem;
  }
  .brand {
    display: flex;
    gap: 1rem;
    align-items: center;
    justify-content: center;
    svg {
      height: 5rem;
    }
    h1{
      font-size:2rem;
    }
  }
  .description{
    display:flex;
    flex-direction:column;
    gap: 1rem;
    margin-bottom:2rem;

  }
  .options {
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 1rem;
  }
  button{
    a{
    display:flex;
    flex-direction:row;
    align-items:center;
    justify-content:center;
    gap: 0.5rem;
    svg{
    font-size:1.2rem;
    }
  }
}
`;

export default Home;
