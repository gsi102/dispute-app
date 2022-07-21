import React, { useEffect, useState } from "react";
import Participants from "./Participants";
import Dispute from "./Dispute";
import Spectators from "./Spectators";

import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import {
  addMessages,
  updateMessages,
  wsConnectionUpdate,
} from "../../store/reducers/messagesSlice";

const DebatesPage: React.FC = () => {
  const dispatch = useAppDispatch();

  const wsReadyStatus = useAppSelector((state) => state.messages.wsReadyStatus);

  const [wsConnection, setWsConnection] = useState<any>(null);
  useEffect(() => {
    let ws: WebSocket | null = null;

    const openHandler = () => {
      console.log("open WS");
      dispatch(wsConnectionUpdate({ status: "ready" }));
    };
    const closeHandler = () => {
      console.log("close WS");
      dispatch(wsConnectionUpdate({ status: "pending" }));
      setTimeout(createChannel, 3000);
    };
    const cleanUp = (ws: any) => {
      ws.removeEventListener("close", closeHandler);
      ws.removeEventListener("open", openHandler);
      ws.close();
    };

    function createChannel() {
      if (ws !== null) {
        cleanUp(ws);
      }
      ws = new WebSocket(`ws://localhost:3008/`);
      ws.addEventListener("open", openHandler);
      ws.addEventListener("close", closeHandler);
      setWsConnection(ws);
    }
    createChannel();

    return () => {
      cleanUp(ws);
    };
  }, []);

  const messagesListener = useEffect(() => {
    if (wsConnection) {
      wsConnection.addEventListener("message", (e: any) => {
        const data = JSON.parse(e.data)[0];
        const regex = /(.*)\_/;
        const fetchTarget: any = regex.exec(data.id);
        switch (data.type) {
          case "NEW_MESSAGE":
            const newMessage = data;
            dispatch(addMessages({ newMessage, flag: fetchTarget[1] }));
            break;
          case "UPDATE_MESSAGE":
            const updatedMessage = data;
            delete updatedMessage.type;
            dispatch(updateMessages({ updatedMessage, flag: fetchTarget[1] }));
            break;
          default:
          //will never execute
        }
      });
    }
  }, [wsConnection]);

  return (
    <div className="debates-window">
      <Participants test={wsConnection} />
      <Dispute />
      <Spectators />
    </div>
  );
};

export default DebatesPage;
