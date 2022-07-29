import React from "react";
import Chat from "../Chat/Chat";
import SendMessageForm from "../Chat/SendMessageForm";
import { useAppSelector } from "../../hooks/hooks";

import styles from "../../styles/App.module.css";

const Spectators: React.FC<any> = function(props) {
  const isAuth = useAppSelector((state) => state.users.isAuth);
  const flag = useAppSelector(
    (state) => state.messages.flagSource.spectatorChat
  );
  const disputeID = props.disputeID;

  return (
    <div className={styles.spectators}>
      <div className={styles.chatField}>
        <p> Welcome to spec chat!</p>
        <Chat flag={flag} disputeID={disputeID} />
      </div>
      {isAuth ? <SendMessageForm flag={flag} disputeID={disputeID} /> : ""}
    </div>
  );
};
export default Spectators;
