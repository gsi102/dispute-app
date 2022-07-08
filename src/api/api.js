import * as axios from "axios";

const serverName = "http://localhost:3003";

const instance = axios.create({
  baseURL: serverName,
  withCredentials: true,
});

// May be not needed soon
const getMessagesLocation = (flag) => {
  let target = flag.match(/^(.*?)Messages/);
  return (target = target[1].toUpperCase());
};

export const messagesAPI = {
  getMessages: (flag) => {
    return instance.get(`/messages/${flag}`).then((response) => response);
  },
  deleteAndReturnOrLikeMessage: (messageID, flag, type) => {
    return instance
      .patch(`/messages/${flag}/${messageID}`, {
        type: type,
      })
      .then((response) => response.data);
  },
  newMessage: (flag, userID, userLogin, messageInput) => {
    return instance
      .post(`/messages/${flag}`, {
        userID,
        userLogin,
        messageInput,
      })
      .then((response) => response);
  },
};

export const usersAPI = {
  signIn: (loginInput, passwordInput) => {
    return instance
      .post(`/sign-in`, {
        login: loginInput,
        password: passwordInput,
      })
      .then((response) => response);
  },
  signUp: (credentials) => {
    return instance
      .post(`/sign-up`, credentials)
      .then((response) => response.status);
  },
};
