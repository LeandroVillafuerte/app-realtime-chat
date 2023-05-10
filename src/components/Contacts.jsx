import React, { useState } from "react";
import styled from "styled-components";
import Logo from "./LogoSVG";
import { useNavigate } from "react-router-dom";
import { IoMdPersonAdd } from "react-icons/io";
import { Link } from "react-router-dom";

const Contacts = ({ contacts, currentUser, changeChat }) => {
  const navigate = useNavigate();
  const [currentSelected, setCurrentSelected] = useState();
  const currentUserName = currentUser.username;
  const currentUserImage = currentUser.avatarImage;

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };

  return (
    <>
      {currentUserImage && currentUserName && (
        <Container>
          <div className="current-user">
            <span>
              <div className="avatar">
                <Link to="/setavatar">
                  <img
                    src={`data:image/svg+xml;base64,${currentUserImage}`}
                    alt="avatar"
                  />
                </Link>
              </div>
              <div className="username">
                <h2>{currentUserName}</h2>
              </div>
            </span>
          </div>
          <div className="add-contact">
            <button>
              <span>
                Add Contact <IoMdPersonAdd />
              </span>
            </button>
          </div>
          <div className="contacts">
            {contacts?.map((contact, index) => {
              return (
                <div
                  className={`contact ${
                    index === currentSelected ? "selected" : ""
                  }`}
                  key={"contact" + index}
                  onClick={() => changeCurrentChat(index, contact)}
                >
                  <div className="avatar">
                    <img
                      src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                      alt="avatar"
                    />
                  </div>
                  <div className="username">
                    <h3>{contact.username}</h3>
                  </div>
                </div>
              );
            })}
          </div>
          <div onClick={() => navigate("/")} className="brand">
            <Logo className="logo" />
            <h3>Chatify</h3>
          </div>
        </Container>
      )}
    </>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 10% 70% 10%;
  overflow: hidden;
  background-color: var(--page-container-color);
  .current-user {
    background-color: var(--primary-color);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 1rem;
    padding-right: 1rem;
    span {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 1rem;
    }
    .avatar {
      img {
        height: 1.8rem;
        max-inline-size: 100%;
      }
    }
    .home {
      height: 2rem;
      svg {
        cursor: pointer;
        color: var(--white-font);
      }
    }
    .username {
      h2 {
        color: var(--white-font);
      }
    }
    @media screen and (max-width: 1080px) {
      gap: 0.5rem;
      .username {
        h2 {
          font-size: 1rem;
        }
      }
    }
  }
  .add-contact {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    max-height: 10%;
    button {
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: var(--button-primary-color);
      color: var(--white-font);
      padding: 0.5rem 1rem;
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
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.3rem;
        color: var(--white-font);
      }
    }
  }
  .contacts {
    padding-top: 0.8rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        border-radius: 1rem;
        width: 0.1rem;
      }
    }
    .contact {
      background-color: #ffffff39;
      min-height: 4rem;
      width: 90%;
      cursor: pointer;
      border-radius: 0.5rem;
      padding: 0.4rem;
      gap: 1rem;
      align-items: center;
      display: flex;
      transition: 0.5s ease-in-out;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: var(--white-font);
        }
      }
    }
    .selected {
      background-color: var(--border-and-hover-color);
    }
  }
  .brand {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    cursor: pointer;
    .logo {
      height: 2rem;
    }
    h3 {
      color: var(--white-font);
      text-transform: uppercase;
    }
  }
`;

export default Contacts;
