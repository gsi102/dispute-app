import * as axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3003",
  withCredentials: true,
});

export const messagesAPI = {
  getMessages: (fetchTarget) => {
    return instance
      .get(`/messages/${fetchTarget}`)
      .then((response) => response);
  },

  updateMessage: (id, currentUser, updateTarget, textContainer, type) => {
    return instance
      .patch(`/messages/${updateTarget}/${id}`, {
        currentUser,
        textContainer,
        type,
      })
      .then((response) => response.data);
  },
  newMessage: (fetchTarget, userID, userLogin, messageInput) => {
    return instance
      .post(`/messages/${fetchTarget}`, {
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
    return instance.post(`/sign-up`, credentials).then((response) => {
      const responseData = { data: response.data, status: response.status };
      return responseData;
    });
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
    return instance.post(`/create-dispute`, newDisputeData).then((response) => {
      const responseData = { data: response.data, status: response.status };
      return responseData;
    });
  },
  getAllDisputes: () => {
    return instance.get(`/disputes`).then((response) => {
      const responseData = { data: response.data, status: response.status };
      return responseData;
    });
  },
  getCurrentDispute: (disputeID) => {
    return instance.get(`/disputes/${disputeID}`).then((response) => {
      const responseData = { data: response.data, status: response.status };
      return responseData;
    });
  },
};
