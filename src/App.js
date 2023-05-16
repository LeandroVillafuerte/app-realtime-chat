import React, { useEffect, useState, createContext } from "react";
import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Chat from "./pages/Chat";
import SetAvatar from "./pages/SetAvatar";
import Home from "./pages/Home";
import About from "./pages/About";
import { ToastContainer } from "react-toastify";

export const CurrentUserContext = createContext(null);

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    if (localStorage.getItem("chat-app-user")) {
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
    } else {
      setCurrentUser(null);
    }
  }, []);
  return (
    <>
      <CurrentUserContext.Provider
        value={{
          currentUser,
          setCurrentUser,
        }}
      >
        <Routes>
          <Route path="/" element={<Home currentUser={currentUser} />} />
          <Route
            path="/register"
            element={<Register setCurrentUser={setCurrentUser} />}
          />
          <Route
            path="/login"
            element={<Login setCurrentUser={setCurrentUser} />}
          />
          <Route
            path="/setAvatar"
            element={<SetAvatar setCurrentUser={setCurrentUser} />}
          />
          <Route path="/chat" element={<Chat currentUser={currentUser} />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<div>Not Found</div>} />
        </Routes>
      </CurrentUserContext.Provider>
      <ToastContainer />

      <footer
        style={{
          position: "absolute",
          bottom: "1rem",
          right: "1rem",
          color: "dimgrey",
        }}
      >
        By Leandro M. Villafuerte 2023 v1.0
      </footer>
    </>
  );
};

export default App;
