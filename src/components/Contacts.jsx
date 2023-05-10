import React, { useState } from "react";
import styled from "styled-components";
import Logo from "./LogoSVG";

const Contacts = ({ contacts, currentUser, changeChat }) => {
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
          <div className="brand">
            <Logo className="logo"/>
            <h3>Chatify</h3>
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
          <div className="current-user">
            <div className="avatar">
              <img
                src={`data:image/svg+xml;base64,${currentUserImage}`}
                alt="avatar"
              />
            </div>
            <div className="username">
              <h2>{currentUserName}</h2>
            </div>
          </div>
        </Container>
      )}
    </>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 75% 15%;
  overflow: hidden;
  background-color: var(--page-container-color);
  .brand {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    .logo {
      height: 2rem;
    }
    h3 {
      color: var(--white-font);
      text-transform: uppercase;
    }
  }
  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    .contact {
      background-color: #ffffff39;
      min-height: 5rem;
      width: 90%;
      cursor: pointer;
      border-radius: 0.2rem;
      padding: 0.4rem;
      gap: 1rem;
      align-items: center;
      display: flex;
      transition: 0.5s ease-in-out;
      &::-webkit-scrollbar {
        width: 0.2rem;
        &-thumb {
          background-color: #ffffff39;
          border-radius: 1rem;
          width: 0.1rem;
        }
      }
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
  .current-user {
    background-color: var(--primary-color);
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    .avatar {
      img {
        height: 4rem;
        max-inline-size: 100%;
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
`;

export default Contacts;
