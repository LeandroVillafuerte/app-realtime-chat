import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { allUsersRoute } from "../utils/apiRoutes";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import ChatContainer from "../components/ChatContainer";

const Chat = () => {
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState();
  const [currentChat, setCurrentChat] = useState();
  const navigate = useNavigate();

  //TODO pasar el user por props desde arriba.
  useEffect(() => {
    if (!localStorage.getItem("chat-app-user")) {
      navigate("/login");
    } else {
      async function getCurrentUser() {
        setCurrentUser(null);
        const user = await JSON.parse(localStorage.getItem("chat-app-user"));
        if (!ignore) {
          setCurrentUser(user);
        }
      }
      let ignore = false;
      getCurrentUser();
      return () => {
        ignore = true;
      };
    }
  }, [navigate]);

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

  return (
    <Container>
      <div className="container">
        {currentUser ? (
          <Contacts
            contacts={contacts}
            currentUser={currentUser}
            changeChat={handleChatChange}
          />
        ) : (
          ""
        )}
        {currentChat ? (
          <ChatContainer currentChat={currentChat} currentUser={currentUser} />
        ) : (
          <Welcome currentUser={currentUser} />
        )}
      </div>
    </Container>
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
  background-color: #131324;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
    @media screen and (max-width: 720px) {
      grid-template-columns: 40% 60%;
    }
  }
`;

export default Chat;
