import React from "react";
import * as axios from "axios";
import MessageItem from "./MessageItem.jsx";

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // messages: useSelector((state) => state.messages.showMessages[props.flag])
      messages: [],
    };
  }

  componentDidMount() {
    axios
      .get("https://social-network.samuraijs.com/api/1.0/users")
      .then((response) => {
        this.setState({ messages: [...response.data.items] });
      });
  }

  render() {
    if (this.state.messages[0]) {
      return (
        <div className="chat">
          {this.state.messages.map((message) => (
            <MessageItem message={message} key={message.id} />
          ))}
        </div>
      );
    }
  }
}

export default Chat;
