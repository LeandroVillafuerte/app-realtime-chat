import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import loader from "../assets/coffees-americano.gif";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { setAvatarRoute } from "../utils/apiRoutes";

const SetAvatar = () => {
  const navigate = useNavigate();
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState();
  const toastOptions = {
    position: "top-right",
    autoClose: 7500,
    pauseOnHover: true,
    theme: "dark",
  };
  const setProfilePicture = async () => {
    if (selectedAvatar === undefined) {
      toast.error("Please select an avatar.", toastOptions);
    } else {
      const user = await JSON.parse(localStorage.getItem("chat-app-user"));
      const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
        image: avatars[selectedAvatar],
      });
      if (data.isAvatarImageSet) {
        user.isAvatarImageSet = true;
        user.avatarImage = data.avatarImage;
        localStorage.setItem("chat-app-user", JSON.stringify(user));
        toast.success("Avatar image updated.", toastOptions);
        navigate("/");
      } else {
        toast.error("Error setting avatar. Please try again", toastOptions);
      }
    }
  };

  useEffect(() => {
    async function fetchAvatars() {
      const images = await axios.get(setAvatarRoute);
      if (!ignore) {
        setAvatars(images.data.avatars);
        setIsLoading(false);
      }
    }
    let ignore = false;
    fetchAvatars();
    return () => {
      ignore = true;
    };
  }, []);

  useEffect(() => {
    if (!localStorage.getItem("chat-app-user")) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <>
      <Container>
        {isLoading ? (
          <img src={loader} alt="loader" className="loader" />
        ) : (
          <>
            <div className="title-container">
              <h1>Pick an avatar as your profile picture</h1>
            </div>
            <div className="avatars">
              {avatars.map((avatar, index) => {
                return (
                  <div
                    className={`avatar ${
                      selectedAvatar === index ? "selected" : ""
                    }`}
                    key={"avatar" + index}
                  >
                    <img
                      src={`data:image/svg+xml;base64,${avatar}`}
                      alt="avatar"
                      onClick={() => setSelectedAvatar(index)}
                    />
                  </div>
                );
              })}
            </div>
            <button className="submit-btn" onClick={setProfilePicture}>
              Set as Profile Picture
            </button>
          </>
        )}
        ;
      </Container>
    </>
  );
};

export default SetAvatar;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
  background-color: var(--background-primary-color);
  height: 100vh;
  width: 100vw;
  .loader {
    max-inline-size: 100%;
  }
  .title-container {
    h1 {
      color: var(--white-font);
    }
  }
  .avatars {
    display: flex;
    flex-direction: row;
    gap: 2rem;
    .avatar {
      border: 0.4rem solid transparent;
      padding: 0.4rem;
      border-radius: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.5s ease-in-out;
      img {
        height: 6rem;
      }
    }
    .selected {
      border: 0.4rem solid var(--border-and-hover-color);
    }
  }
  button {
    background-color: var(--button-primary-color);
    color: var(--white-font);
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    transition: 0.5s ease-in-out;
    &:hover {
      background-color: var(--border-and-hover-color);
    }
  }
`;
