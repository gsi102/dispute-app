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

  updateMessage: (id, user, flag, textContainer, type) => {
    return instance
      .patch(`/messages/${flag}/${id}`, {
        user,
        textContainer,
        type,
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
    return instance.post(`/sign-up`, credentials).then((response) => response);
  },
  fetchUsers: (searchByLogin) => {
    let safeLogin = encodeURIComponent(searchByLogin);
    if (safeLogin === "")
      return { status: 204, statusText: "Input field is empty" };
    return instance.get(`/users/${safeLogin}`).then((response) => response);
  },
};

export const disputesAPI = {
  createNewDispute: (senderParticipant, invitedParticipant) => {
    const newDisputeData = {
      senderParticipant,
      invitedParticipant,
    };
    return instance
      .post(`/create-dispute`, newDisputeData)
      .then((response) => response);
  },
};
