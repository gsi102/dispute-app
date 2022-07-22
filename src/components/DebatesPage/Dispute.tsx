import React from "react";
import { useDispatch } from "react-redux";
import SearchField from "../SearchField";
import Chat from "../Chat/Chat";
import SendMessageForm from "../Chat/SendMessageForm";
import { useAppSelector, useAppDispatch } from "../../hooks/hooks";
import { searchMessages } from "../../store/reducers/messagesSlice";

const Dispute: React.FC = function() {

  const flag = useAppSelector((state) => state.messages.flagSource.disputeChat);
  const dispatch = useAppDispatch();
  const searchCallback = (searchByText: string) => {
    dispatch(searchMessages({ searchByText, flag }));
  };

  return (
    <div className="dispute">
      <div className="chatField">
        <SearchField searchCallback={searchCallback} />
        <p>Welcome to debates!</p>
        <Chat flag={flag} />
      </div>
      <SendMessageForm flag={flag} />
    </div>
  );
};

export default Dispute;
