import React from "react";
import styled from "styled-components";
import ButtonBack from "../components/ButtonBack";
import { AiFillGithub } from "react-icons/ai";
import { SiLinkedin } from "react-icons/si";
import { MdContentCopy } from "react-icons/md";
import { MdOutlineMail } from "react-icons/md";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const About = () => {
  const toastOptions = {
    position: "top-right",
    autoClose: 1500,
    pauseOnHover: true,
    theme: "dark",
  };
  const handleCopyClopboard = () => {
    toast.info("Copied to clipboard", toastOptions);
  };
  return (
    <Container>
      <div className="content">
        <ButtonBack className="back" url="/" />
        <header>
          <h1>Hi! thanks for visiting my app 🙋‍♂️</h1>
        </header>
        <section className="presentation">
          <p>
            I'm Leandro Villafuerte, an Industrial Engineer and Full-Stack
            Developer with experience in web application development. I'm
            pleased to introduce you to a web application I have created using
            the MERN stack (MongoDB, Express, React, Node.js), which is a
            real-time chat.
          </p>
          <p>
            This application allows users to register and connect with other
            users in a real-time chat environment. Using technologies like
            MongoDB, Express, React, and Node.js, I have developed a simple
            platform for instant communication. Also it's full responsive for
            mobile and tablet! I invite you to check it out ✨.
          </p>
        </section>
        <section className="contact">
          <p>
            If you're interested in learning more about this application or
            exploring my portfolio, I invite you to visit my LinkedIn profile
            and my GitHub repository.
            <div className="github">
            <AiFillGithub />
              <Link to="https://www.github.com/LeandroVillafuerte" target="_blank">
                www.github.com/LeandroVillafuerte
              </Link>
              <MdContentCopy
                onClick={() => {
                  navigator.clipboard.writeText(
                    "https://www.github.com/LeandroVillafuerte"
                  );
                  handleCopyClopboard();
                }}
              />
            </div>
            <div className="linkedin">
              <SiLinkedin />
              <Link to="https://www.linkedin.com/in/leandrovillafuerte" target="_blank">
                www.linkedin.com/in/leandrovillafuerte
              </Link>
              <MdContentCopy
                onClick={() => {
                  navigator.clipboard.writeText(
                    "https://www.linkedin.com/in/leandrovillafuerte"
                  );
                  handleCopyClopboard();
                }}
              />
            </div>
          </p>
          <p>
            I'm excited to continue creating innovative solutions and taking on
            new challenges in web development. If you have any questions or are
            interested in collaborating on future projects, feel free to contact
            me via email at
            <div className="mail">
              <MdOutlineMail />
              <span href="leandrovillafu@gmail.com">leandrovillafu@gmail.com</span>
              <MdContentCopy
                onClick={() => {
                  navigator.clipboard.writeText("leandrovillafu@gmail.com");
                  handleCopyClopboard();
                }}
              />
            </div>
          </p>
          <p>
            I look forward to the opportunity to connect with you and discuss
            more about my experience and projects! 💼
          </p>
        </section>
      </div>
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
    max-width: 90vw;
    overflow-y: scroll;
    background-color: var(--page-container-color);
    border-radius: 2rem;
    padding: 3rem 5rem;
    position: relative;
    display: flex;
    gap: 1rem;
    flex-direction: column;
    font-size: 1rem;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        border-radius: 1rem;
        width: 0.1rem;
      }
    }
    @media screen and (max-width: 767px) {
      height: 90%;
      padding: 3rem 1.5rem;
      width: 95%;
      margin-bottom:3rem;
    }
    @media screen and (min-width: 768px) and (max-width: 991px) {
      font-size: 1rem;
    }
    .back {
      position: absolute;
      top: 1.5rem;
      left: 1.5rem;
      @media screen and (max-width: 767px) {
        top: 0.5rem;
        left: 0.5rem;
        font-size: 2rem;
      }
      @media screen and (min-width: 768px) and (max-width: 991px) {
        font-size: 2rem;
      }
    }
    header h1 {
      padding-bottom: 1rem;
    }
    a {
      text-decoration: none;
      color: var(--white-font);
    }
    section {
      p {
        padding: 0.2rem 0;
        div {
          padding-top: 1rem;
          padding-left: 2rem;
          @media screen and (max-width: 767px) {
            padding: 0.4rem 0;
            font-size: 0.8rem;
          }
          display: flex;
          gap: 0.5rem;
          align-items: center;
          svg {
            cursor: pointer;
          }
        }
      }
    }
  }
`;

export default About;
