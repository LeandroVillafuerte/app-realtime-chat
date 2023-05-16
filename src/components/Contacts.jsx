import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Logo from "./LogoSVG";
import { useNavigate } from "react-router-dom";
import { IoMdPersonAdd } from "react-icons/io";
import { Link } from "react-router-dom";
import Modal from "./Modal";
import { toast } from "react-toastify";
import axios from "axios";
import { addContactRoute } from "../utils/apiRoutes";

const Contacts = ({
  contacts,
  currentUser,
  changeChat,
  socket,
  setContacts,
}) => {
  const navigate = useNavigate();
  const [currentSelected, setCurrentSelected] = useState();
  const currentUserName = currentUser.username;
  const currentUserImage = currentUser.avatarImage;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addUserInput, setAddUserInput] = useState("");

  useEffect(() => {
    if (socket.current) {
      socket.current.on("contact-receive", (contact) => {
        setContacts([...contacts, contact]);
      });
    }
  }, [socket, contacts, setContacts]);

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };

  const handleChange = (e) => {
    e.preventDefault();
    setAddUserInput(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!handleValidationErrors()) return false;
    try {
      const { data } = await axios.post(addContactRoute, {
        currentUserId: currentUser._id,
        newContact: addUserInput,
      });
      socket.current.emit("contact-added", {
        to: data.updatedContact._id,
        from: currentUser._id,
        contact: data.updatedUser,
      });
      setContacts([...contacts, data.updatedContact]);
      setIsModalOpen(false);
      toast.info(data.msg);
    } catch (e) {
      toast.error(e.response.data.msg, toastOptions);
    }
  };

  const toastOptions = {
    position: "top-right",
    autoClose: 7500,
    pauseOnHover: true,
    theme: "dark",
  };

  const handleValidationErrors = () => {
    if (addUserInput === "") {
      toast.error("Username or Email is required.", toastOptions);
      return false;
    }
    return true;
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
            <button
              className="add-contact-btn"
              onClick={() => setIsModalOpen(true)}
            >
              <span>
                Add Contact <IoMdPersonAdd />
              </span>
            </button>
            {isModalOpen && (
              <Modal
                title="Add user"
                actionBtnLabel="Add user"
                setIsOpen={setIsModalOpen}
                handleSubmit={handleSubmit}
                form={"adduser"}
              >
                <form id="adduser" onSubmit={(e) => handleSubmit(e)}>
                  <p>Please type the username or email of your new contact.</p>
                  <input
                    type="text"
                    placeholder="username or email..."
                    name="username-email"
                    min="3"
                    onChange={(e) => handleChange(e)}
                  />
                </form>
              </Modal>
            )}
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
  @media screen and (max-width: 767px) {
    grid-template-rows: 17% 15% 58% 10%;
  }
  @media screen and (min-width: 768px) and (max-width: 991px) {
    grid-template-rows: 14% 12% 64% 10%;
  }
  @media screen and (max-width: 991px) {
    border-radius: 0.5rem;
  }
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
      @media screen and (max-width: 767px) {
        padding-top: 0.5rem;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        gap: 0;
      }
      @media screen and (min-width: 768px) and (max-width: 991px) {
        align-self: flex-end;
        padding-bottom: 1rem;
        padding-left: 1rem;
        gap: 1.5rem;
      }
    }
    .avatar {
      img {
        height: 1.8rem;
        max-inline-size: 100%;
        @media screen and (max-width: 767px) {
          height: 3rem;
        }
        @media screen and (min-width: 768px) and (max-width: 991px) {
          height: 4rem;
        }
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
        @media screen and (max-width: 991px) {
          font-size: 2rem;
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
    @media screen and (max-width: 991px) {
      padding-top: 3.5rem;
    }
    button.add-contact-btn {
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
      @media screen and (max-width: 991px) {
        font-size: 1.5rem;
      }
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

  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 2rem;
    padding: 0 1rem;
    input {
      background-color: rgba(0, 0, 0, 0.2);
      padding: 1rem;
      border: 0.1rem solid var(--border-and-hover-color);
      color: var(--white-font);
      width: 100%;
      font-size: 1rem;
      &:focus {
        border: 0.1rem solid var(--button-primary-color);
        outline: none;
      }
    }
  }
`;

export default Contacts;
