import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import EmojiPicker from "emoji-picker-react";
import { IoMdSend } from "react-icons/io";

const ChatInput = ({ handleSendMsg, currentChat, mobile = false }) => {
  const wrapperRef = useRef(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    setMsg("");
  }, [currentChat]);

  function useOutsideAlerter(ref) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setShowEmojiPicker(false);
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }
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

  useOutsideAlerter(wrapperRef);
  return (
    <Container>
      <div className="button-container">
        <div ref={wrapperRef} className="emoji-container">
          <div className="emoji" onClick={handleEmojiPickerHideShow}>
            😃
          </div>
          {showEmojiPicker && (
            <EmojiPicker
              Theme="dark"
              onEmojiClick={handleEmojiClick}
              width={mobile && "80vw"}
            />
          )}
        </div>
      </div>
      <form className="input-container" onSubmit={(e) => sendChat(e)}>
        <input
          type="text"
          placeholder="Type your message here..."
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
  padding: 0.1rem 2rem 0.1rem 0.5rem;
  padding-bottom: 0.3rem;
  @media screen and (max-width: 991px) {
    border-bottom-left-radius: 0.5rem;
    border-bottom-right-radius: 0.5rem;
  }
  @media screen and (max-width: 767px) {
    grid-template-columns: 15% 85%;
    padding: 0.1rem 0.5rem 0.1rem 0.5rem;
  }
  @media screen and (min-width: 768px) and (max-width: 991px) {
    grid-template-columns: 10% 90%;
  }
  .button-container {
    display: flex;
    align-items: center;
    color: var(--white-font);
    gap: 1rem;
    @media screen and (min-width: 768px) and (max-width: 991px) {
      padding-left: 0.5rem;
    }
    .emoji-container {
      position: relative;

      .emoji {
        font-size: 1.5rem;
        @media screen and (min-width: 768px) and (max-width: 991px) {
          font-size: 2.5rem;
        }
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
    @media screen and (max-width: 767px) {
      gap: 0.4rem;
    }
    @media screen and (min-width: 768px) and (max-width: 991px) {
      padding-left: 0.5rem;
    }
    input {
      background-color: #ffffff34;
      width: 90%;
      /* background-color: transparent; */
      border-radius: 2rem;
      color: var(--white-font);
      border: none;
      padding-left: 1rem;
      font-size: 1.2rem;
      max-height: 3rem;
      overflow-wrap: break-word;
      &::selection {
        background-color: var(--border-and-hover-color);
      }
      &:focus {
        outline: none;
      }
      @media screen and (max-width: 767px) {
        ::placeholder {
          font-size: 0.8rem;
        }
        font-size: 0.8rem;
      }
    }
    button {
      cursor: pointer;
      padding: 0.3rem 1rem;
      border-radius: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: var(--button-primary-color);
      border: none;
      svg {
        font-size: 2rem;
        color: var(--white-font);
      }
      @media screen and (max-width: 767px) {
        padding: 0.3rem 1rem;
        svg {
          font-size: 1.5rem;
        }
      }
    }
  }
`;

export default ChatInput;
