import * as axios from "axios";

const serverName = "http://localhost:3003";

const instance = axios.create({
  baseURL: serverName,
  withCredentials: true,
});

const getMessagesLocation = (flag) => {
  let target = flag.match(/^(.*?)Messages/);
  return (target = target[1].toUpperCase());
};

export const messagesAPI = {
  getMessages: (flag) => {
    return instance.get(`/messages/${flag}`).then((response) => response);
  },
  deleteAndReturnOrLikeMessage: (messageIndex, flag, type) => {
    return instance
      .patch(`/messages/${getMessagesLocation(flag)}/${messageIndex}`, {
        type: type,
      })
      .then((response) => response.data);
  },
  newMessage: (flag, userID, userLogin, messageInput) => {
    return instance
      .post(`/messages/${getMessagesLocation(flag)}`, {
        flag,
        userID,
        userLogin,
        messageInput,
      })
      .then((response) => response.data);
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
