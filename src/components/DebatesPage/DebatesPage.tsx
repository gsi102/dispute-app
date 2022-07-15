import React, { useEffect } from "react";
import Participants from "./Participants";
import Dispute from "./Dispute";
import Spectators from "./Spectators";

import { useAppDispatch } from "../../hooks/hooks";
import { addMessages } from "../../store/reducers/messagesSlice";

const DebatesPage: React.FC = () => {
  const wsConnection = new WebSocket(`ws://localhost:3008/`);
  const dispatch = useAppDispatch();
  const newMessagesListener = useEffect(() => {
    wsConnection.addEventListener("message", (e) => {
      const data = JSON.parse(e.data);
      const newMessage = data[0];
      const regex = /(.*)\_/;
      const fetchTarget: any = regex.exec(newMessage.id);
      dispatch(addMessages({ newMessage, flag: fetchTarget[1] }));
    });
  }, []);

  return (
    <div className="debates-window">
      <Participants />
      <Dispute />
      <Spectators />
    </div>
  );
};

export default DebatesPage;
