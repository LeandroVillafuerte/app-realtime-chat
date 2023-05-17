import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { allUsersRoute, host } from "../utils/apiRoutes";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import ChatContainer from "../components/ChatContainer";
import { io } from "socket.io-client";
import { AiFillHome } from "react-icons/ai";
import Logout from "../components/Logout";
import { Link } from "react-router-dom";
import { useMediaQuery } from "../custom-hooks/hooks";
import { IoArrowBackCircleSharp } from "react-icons/io5";

const Chat = ({ currentUser }) => {
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState();
  const navigate = useNavigate();
  const socket = useRef();
  const { Desktop, Tablet, Mobile } = useMediaQuery();

  useEffect(() => {
    if (!localStorage.getItem("chat-app-user")) {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);

  // async function getContacts() {
  //   setContacts([]);
  //   const contactsDB = await axios.get(`${allUsersRoute}/${currentUser._id}`);
  //   setContacts(contactsDB.data.users);
  // }

  useEffect(() => {
    if (currentUser) {
      if (currentUser.isAvatarImageSet) {
        async function getContacts() {
          setContacts([]);
          const contactsDB = await axios.get(
            `${allUsersRoute}/${currentUser._id}`
          );
          if (!ignore) {
            setContacts(contactsDB.data.users);
          }
        }
        let ignore = false;
        getContacts();
        return () => {
          ignore = true;
        };
      } else {
        navigate("/setavatar");
      }
    }
  }, [currentUser, navigate]);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  const DesktopChildren = () => (
    <div className="container">
      <span className="home">
        <Link to="/">
          <AiFillHome />
        </Link>
        <Logout type="icon" />
      </span>
      {currentUser ? (
        <Contacts
          contacts={contacts}
          currentUser={currentUser}
          changeChat={handleChatChange}
          setContacts={setContacts}
          socket={socket}
        />
      ) : (
        ""
      )}
      {currentChat ? (
        <ChatContainer
          currentChat={currentChat}
          currentUser={currentUser}
          socket={socket}
        />
      ) : (
        <Welcome hasContacts={contacts.length > 0 ? true : false} />
      )}
    </div>
  );

  const ResponsiveChildren = () => (
    <div className="mobile-container">
      <span className="home">
        {currentChat ? (
          <div onClick={() => handleChatChange(null)} className="back-btn">
            <IoArrowBackCircleSharp />
          </div>
        ) : (
          ""
        )}
        <Link to="/">
          <AiFillHome />
        </Link>
        <Logout type="icon" />
      </span>
      {currentChat ? (
        <ChatContainer
          currentChat={currentChat}
          currentUser={currentUser}
          socket={socket}
          mobile={true}
        />
      ) : (
        <>
          {currentUser ? (
            <Contacts
              contacts={contacts}
              currentUser={currentUser}
              changeChat={handleChatChange}
              setContacts={setContacts}
              socket={socket}
            />
          ) : (
            ""
          )}
        </>
      )}
    </div>
  );

  return (
    <>
      <Container>
        <Desktop>
          <DesktopChildren />
        </Desktop>
        <Tablet>
          <ResponsiveChildren />
        </Tablet>
        <Mobile>
          <ResponsiveChildren />
        </Mobile>
      </Container>
    </>
  );
};

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: var(--background-primary-color);

  .container {
    height: 85vh;
    width: 85vw;
    background-color: var(--chat-container-color);
    display: grid;
    grid-template-columns: 25% 75%;
    border-radius: 0.5rem;
    position: relative;
  }
  .mobile-container {
    height: 85vh;
    width: 85vw;
    background-color: var(--chat-container-color);
    display: grid;
    border-radius: 0.5rem;
    position: relative;
    @media screen and (max-width: 767px) {
      margin-top:2rem;
      margin-bottom: 3rem;
    }
  }

  .home {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    position: absolute;
    height: 2rem;
    top: 1rem;
    right: 1rem;
    @media screen and (max-width: 767px) {
      gap: 2rem;
      font-size: 2rem;
    }
    svg {
      cursor: pointer;
      color: var(--white-font);
      @media screen and (min-width: 768) and (max-width: 991px) {
        font-size: 2.5rem;
      }
    }
  }
  .container div:first-child {
    border-top-left-radius: 0.5rem;
    border-bottom-left-radius: 0.5rem;
  }
  .container div:last-child {
    border-bottom-right-radius: 0.5rem;
  }
`;

export default Chat;
