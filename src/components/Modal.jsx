import React from "react";
import styled from "styled-components";
import { RiCloseLine } from "react-icons/ri";

const Modal = ({ setIsOpen, title, actionBtnLabel, form, children }) => {
  return (
    <Container>
      <div className="darkBG" onClick={() => setIsOpen(false)} />
      <div className="centered">
        <div className="modal">
          <div className="modalHeader">
            <h5 className="heading">{title}</h5>
          </div>
          <button className="closeBtn" onClick={() => setIsOpen(false)}>
            <RiCloseLine style={{ marginBottom: "-3px" }} />
          </button>
          <div className="modalContent">{children}</div>
          <div className="modalActions">
            <div className="actionsContainer">
              <button form={form} type="submit" className="actionBtn" >
                {actionBtnLabel}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

const Container = styled.div`
  .darkBG {
    background-color: rgba(0, 0, 0, 0.5);
    width: 100vw;
    height: 100vh;
    z-index: 0;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    position: absolute;
  }

  .centered {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .modal {
    min-width: 25vw;
    /* height: 30vh; */
    background: var(--modal-bg);
    color: var(--white-font);
    z-index: 10;
    border-radius: 16px;
    box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.04);
  }

  .modalHeader {
    height: 3rem;
    /* background: white; */
    overflow: hidden;
    border-top-left-radius: 16px;
    border-top-right-radius: 16px;
  }

  .heading {
    margin: 0;
    padding: 1rem;
    padding-top: 1rem;
    color: var(--white-font);
    font-weight: 500;
    font-size: 18px;
    text-align: center;
  }

  .modalContent {
    padding: 10px;
    padding-bottom:2rem;
    font-size: 14px;
    color: var(--white-font);
    text-align: center;
  }

  .modalActions {
    padding-bottom:1rem;
    margin-bottom: 10px;
    width: 100%;
  }

  .actionsContainer {
    display: flex;
    justify-content: space-around;
    align-items: center;
    button {
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: var(--button-primary-color);
      color: var(--white-font);
      border: none;
      font-weight: bold;
      cursor: pointer;
      border-radius: 0.4rem;
      font-size: 1rem;
      text-transform: uppercase;
      transition: 0.5s ease-in-out;
      min-width: 7rem;
      height:2rem;
      &:hover {
        background-color: var(--border-and-hover-color);
      }
      span {
        color: var(--white-font);
      }
    }
  }

  .closeBtn {
    cursor: pointer;
    font-weight: 500;
    padding: 4px 8px;
    border-radius: 8px;
    border: none;
    font-size: 18px;
    color: var(--font-white);
    background: var(--button-primary-color);
    transition: all 0.25s ease;
    box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.06);
    position: absolute;
    right: 0;
    top: 0;
    align-self: flex-end;
    margin-top: 0.5rem;
    margin-right: 0.5rem;
  }

  .closeBtn:hover {
    background-color: var(--border-and-hover-color);
    box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.04);
  }
`;

export default Modal;
