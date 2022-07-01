import * as axios from "axios";
import { serverName } from "../store/store";

const server = serverName.toString();

const instance = axios.create({
  baseURL: server,
  withCredentials: true,
});

const getMessagesLocation = (flag) => {
  let target = flag.match(/^(.*?)Messages/);
  return (target = target[1].toUpperCase());
};

export const messagesAPI = {
  getMessages: (flag) => {
    return instance
      .get(`/messages/${getMessagesLocation(flag)}`)
      .then((response) => response.data);
  },
  deleteAndReturnOrLikeMessage: (messageIndex, flag, type) => {
    return instance
      .patch(`/messages/${getMessagesLocation(flag)}/${messageIndex}`, {
        type: type,
      })
      .then((response) => response.data);
  },

  newMessage: (flag, messageInput, postfixForId) => {
    const newMessageFactory = function() {
      const date = new Date();
      function dateTransform(dateValue) {
        return ((dateValue < 10 ? "0" : "") + dateValue).toString();
      }

      let newMessage = {
        dateHh: dateTransform(date.getHours()),
        dateMm: dateTransform(date.getMinutes()),
        dateFull: date.toString(),
        id: "",
        name: "someName",
        text: messageInput,
        deletedText: "",
        deleted: false,
        likes: null,
      };
      // Setting likes only for disputeMessages
      if (flag.search(/^[d]/) === 0) newMessage.likes = 0;
      // Setting correct id
      newMessage.id = flag + "_" + postfixForId;
      return newMessage;
    };

    return instance
      .post(`/messages/${getMessagesLocation(flag)}`, newMessageFactory(), {
        withCredentials: true,
      })
      .then((response) => response.data);
  },
};

export const usersAPI = {
  signIn: (userId, passwordInput) => {
    return instance
      .post(`/users/${userId}`, {
        password: passwordInput,
      })
      .then((response) => response.status);
  },
  signUp: (credentials) => {
    return instance
      .post(`/sign-up`, credentials)
      .then((response) => response.status);
  },
};
