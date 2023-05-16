import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import ChatInput from "./ChatInput";
import axios from "axios";
import { getAllMessagesRoute, sendMessageRoute } from "../utils/apiRoutes";
import Messages from "./Messages";

const ChatContainer = ({
  currentChat,
  currentUser,
  socket,
  mobile = false,
}) => {
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const scrollRef = useRef();

  useEffect(() => {
    async function getMessages() {
      const response = await axios.get(
        `${getAllMessagesRoute}/${currentUser._id}/${currentChat._id}`
      );
      if (!ignore) {
        setMessages(response.data.projectMessages);
      }
    }
    if (currentChat) {
      getMessages();
    }
    let ignore = false;

    return () => {
      ignore = true;
      setMessages([]);
    };
  }, [currentChat, currentUser]);

  const handleSendMsg = async (msg) => {
    await axios.post(sendMessageRoute, {
      from: currentUser._id,
      to: currentChat._id,
      message: msg,
    });
    socket.current.emit("send-msg", {
      to: currentChat._id,
      from: currentUser._id,
      message: msg,
    });
    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg });
    setMessages(msgs);
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-receive", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, [socket]);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behaviour: "smooth" });
  }, [messages]);
  return (
    <Container>
      {currentChat ? (
        <>
          <div className="chat-header">
            <div className="user-details">
              <div className="avatar">
                <img
                  src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
                  alt="avatar"
                />
              </div>
              <div className="username">
                <h3>{currentChat.username}</h3>
              </div>
            </div>
          </div>
          <Messages
            messages={messages}
            scrollRef={scrollRef}
            currentChat={currentChat}
          />
          <ChatInput
            mobile={mobile}
            currentChat={currentChat}
            handleSendMsg={handleSendMsg}
          />
        </>
      ) : (
        ""
      )}
    </Container>
  );
};

const Container = styled.div`
  padding-top: 1rem;
  display: grid;
  grid-template-rows: 10% 78% 12%;
  gap: 0.1rem;
  overflow: hidden;
  @media screen and (max-width: 767px) {
    grid-template-rows: 13% 72% 15%;
  }
  @media screen and (min-width: 768px) and (max-width: 991px) {
    grid-template-rows: 12% 73% 15%;
  }
  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    @media screen and (max-width: 767px) {
      padding: 0 1rem;
      align-items:flex-end;
    }
    @media screen and (min-width: 768px) and (max-width: 991px) {
      padding: 0 1.5rem;
      align-items:flex-end;
    }
    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
      .avatar {
        img {
          height: 3rem;
          @media screen and (min-width: 768px) and (max-width: 991px) {
            height: 5rem;
          }
        }
      }
      .username {
        h3 {
          color: var(--white-font);
        }
      }
    }
  }
`;

export default ChatContainer;
