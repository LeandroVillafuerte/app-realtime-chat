import React from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";

const Messages = ({ messages, scrollRef }) => {
  return (
    <Container>
      <div className="chat-messages">
        {messages?.map((message, i) => (
          <div ref={scrollRef} key={uuidv4()}>
            <div
              className={`message ${message.fromSelf ? "sended" : "received"}`}
            >
              <div className="content">
                <p>{message.message}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
};

const Container = styled.div`
  .chat-messages {
    width:100%;
    height:100%;
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;

    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .message {
      display: flex;
      align-items: center;
      .content {
        max-width: 40%;
        overflow-wrap: break-word;
        padding: 1rem;
        font-size: 1.1rem;
        border-radius: 1rem;
        color: #d1d1d1;
      }
    }
    .sended {
      justify-content: flex-end;
      .content {
        background-color: var(--chat-bubble-send);
      }
    }
    .received {
      justify-content: flex-start;
      .content {
        background-color: var(--chat-bubble-received);
      }
    }
  }
`;

export default Messages;
