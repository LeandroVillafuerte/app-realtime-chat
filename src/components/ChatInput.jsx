import React, { useState } from "react";
import styled from "styled-components";
import EmojiPicker from "emoji-picker-react";
import { IoMdSend } from "react-icons/io";
import { BsEmojiSmileFill } from "react-icons/bs";
// import { Theme } from 'emoji-picker-react';

const ChatInput = ({ handleSendMsg }) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [msg, setMsg] = useState("");

  const handleEmojiPickerHideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiClick = (emoji) => {
    setMsg(msg + emoji.emoji);
  };

  const sendChat = (e) => {
    e.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg("");
    }
  };

  return (
    <Container>
      <div className="button-container">
        <div className="emoji">
          <BsEmojiSmileFill onClick={handleEmojiPickerHideShow} />
          {showEmojiPicker && (
            <EmojiPicker Theme="dark" onEmojiClick={handleEmojiClick} />
          )}
        </div>
      </div>
      <form className="input-container" onSubmit={(e) => sendChat(e)}>
        <input
          type="text"
          placeholder="type your message here."
          value={msg}
          onClick={() => setShowEmojiPicker(false)}
          onChange={(e) => setMsg(e.target.value)}
        />
        <button className="submit">
          <IoMdSend />
        </button>
      </form>
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-columns: 5% 95%;
  align-items: center;
  background-color: var(--page-container-color);
  padding: 0 2rem;
  padding-bottom: 0.3rem;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    padding: 0 1rem;
    gap: 1rem;
  }
  .button-container {
    display: flex;
    align-items: center;
    color: var(--white-font);
    gap: 1rem;
    .emoji {
      position: relative;
      svg {
        font-size: 1.5rem;
        color: #ffd225;
        cursor: pointer;
      }
      .EmojiPickerReact.epr-dark-theme {
        color: blue;
      }
      .EmojiPickerReact {
        position: absolute;
        top: -30rem;
        border-color: var(--border-and-hover-color);
        --epr-bg-color: #181316;
        --epr-category-label-bg-color: #181316;
        --epr-hover-bg-color: var(--border-and-hover-color);
        .epr-body::-webkit-scrollbar {
          background-color: #181316;
          width: 5px;
          &-thumb {
            background-color: var(--border-and-hover-color);
          }
        }
      }
    }
  }
  .input-container {
    width: 100%;
    border-radius: 2rem;
    display: flex;
    gap: 2rem;
    background-color: #ffffff34;
    input {
      width: 90%;
      background-color: transparent;
      color: var(--white-font);
      border: none;
      padding-left: 1rem;
      font-size: 1.2rem;
      &::selection {
        background-color: var(--border-and-hover-color);
      }
      &:focus {
        outline: none;
      }
    }
    button {
      padding: 0.3rem 2rem;
      border-radius: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: var(--button-primary-color);
      border: none;
      @media screen and (min-width: 720px) and (max-width: 1080px) {
        padding: 0.3rem 1rem;
        svg {
          font-size: 1rem;
        }
      }
      svg {
        font-size: 2rem;
        color: var(--white-font);
      }
    }
  }
`;

export default ChatInput;
