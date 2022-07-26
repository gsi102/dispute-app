import React from "react";
import SearchField from "../SearchField";
import Chat from "../Chat/Chat";
import SendMessageForm from "../Chat/SendMessageForm";
import { useAppSelector, useAppDispatch } from "../../hooks/hooks";
import { searchMessages } from "../../store/reducers/messagesSlice";

const Dispute: React.FC<any> = function(props) {
  const disputeID = props.disputeID;
  const dispatch = useAppDispatch();
  const flag = useAppSelector((state) => state.messages.flagSource.disputeChat);

  // const currentUserLogin = useAppSelector(
  //   (state) => state.users.userData.login
  // );
  // const fetchedDisputes = useAppSelector(
  //   (state: any) => state.disputes.fetchedDisputes
  // );
  // const currentDisputeID = useAppSelector(
  //   (state: any) => state.disputes.currentDispute.id
  // );

  // const senderParticipant = useAppSelector(
  //   (state) => state.disputes.currentDispute.senderParticipant
  // );
  // const invitedParticipant = useAppSelector(
  //   (state) => state.disputes.currentDispute.invitedParticipant
  // );

  const searchCallback = (searchByText: string) => {
    dispatch(searchMessages({ searchByText, flag }));
  };

  return (
    <div className="dispute">
      <div className="chatField">
        <SearchField searchCallback={searchCallback} />
        <p>Welcome to debates!</p>
        <Chat flag={flag} disputeID={disputeID} />
      </div>
      <SendMessageForm flag={flag} disputeID={disputeID} />
    </div>
  );
};

export default Dispute;
