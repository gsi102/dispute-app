import React from "react";
import SearchField from "../SearchField";
import Chat from "../Chat/Chat";
import SendMessageForm from "../Chat/SendMessageForm";
import { useAppSelector, useAppDispatch } from "../../hooks/hooks";
import { searchMessages } from "../../store/reducers/messagesSlice";

import styles from "../../styles/App.module.css";

const Dispute: React.FC<any> = function(props) {
  const disputeID = props.disputeID;
  const dispatch = useAppDispatch();
  const flag = useAppSelector((state) => state.messages.flagSource.disputeChat);
  const currentDispute: any = useAppSelector(
    (state) => state.disputes.currentDispute
  );
  const currentUserLogin = useAppSelector(
    (state) => state.users.userData.login
  );
  const senderParticipant = currentDispute.senderParticipant;
  const invitedParticipant = currentDispute.invitedParticipant;

  const searchCallback = (searchByText: string) => {
    dispatch(searchMessages({ searchByText, flag }));
  };

  return (
    <div className={styles.dispute}>
      <div className={styles.chatField}>
        <SearchField searchCallback={searchCallback} />
        <p>Welcome to debates!</p>
        <Chat flag={flag} disputeID={disputeID} />
      </div>
      {currentUserLogin === senderParticipant ||
      currentUserLogin === invitedParticipant ? (
        <SendMessageForm flag={flag} disputeID={disputeID} />
      ) : (
        ""
      )}
    </div>
  );
};

export default Dispute;
