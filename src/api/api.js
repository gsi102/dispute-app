import * as axios from "axios";

const serverName = "http://localhost:3003";

const instance = axios.create({
  baseURL: serverName,
  withCredentials: true,
});

export const messagesAPI = {
  getMessages: (flag) => {
    return instance.get(`/messages/${flag}`).then((response) => response);
  },
<<<<<<< HEAD
  deleteAndReturnOrLikeMessage: (id, flag, textContainer, type) => {
=======
  
  updateMessage: (id, user, flag, textContainer, type) => {
>>>>>>> eacb4b1 (big update, work on likes logic, work w/ server)
    return instance
      .patch(`/messages/${flag}/${id}`, {
        textContainer: textContainer,
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
