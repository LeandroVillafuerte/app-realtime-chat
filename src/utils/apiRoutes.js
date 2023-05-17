export const host = process.env.REACT_APP_HOST ||"http://localhost:5500"

// "https://chatify-api-vjqn.onrender.com";

export const registerRoute = `${host}/api/auth/register`;
export const loginRoute = `${host}/api/auth/login`;
export const setAvatarRoute = `${host}/api/auth/setavatar`;
export const allUsersRoute = `${host}/api/auth/allUsers`;
export const addContactRoute = `${host}/api/auth/addcontact`;

export const sendMessageRoute = `${host}/api/messages/addmsg`;
export const getAllMessagesRoute = `${host}/api/messages/getmsg`;
