import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import LeftSide from "./LeftSide";
import Footer from "./Footer";

import { useAppDispatch } from "../hooks/hooks";
import { addMessages, updateMessages } from "../store/reducers/messagesSlice";
import { wsConnectFunction } from "../api/wsConnection";
import { addDisputes } from "../store/reducers/disputesSlice";

const Layout: React.FC = () => {
  const dispatch = useAppDispatch();
  const [wsConnection, setWsConnection] = useState<any>(null);

  useEffect(() => {
    wsConnectFunction(dispatch, setWsConnection);
  }, []);

  const messagesListener = useEffect(() => {
    if (wsConnection) {
      wsConnection.addEventListener("message", (e: any) => {
        const data = JSON.parse(e.data)[0];
        const regex = /(.*)\_/;
        const target: any = regex.exec(data.target);

        switch (data.type) {
          case "NEW_MESSAGE":
            const newMessage = data;
            dispatch(addMessages({ newMessage, flag: target[1] }));
            break;
          case "UPDATE_MESSAGE":
            const updatedMessage = data;
            delete updatedMessage.type;
            dispatch(updateMessages({ updatedMessage, flag: target[1] }));
            break;
          case "NEW_DISPUTE":
            const newDispute = data;
            dispatch(addDisputes({ newDispute }));
            break;
          default:
          //will never execute
        }
      });
    }
  }, [wsConnection]);

  return (
    <div className="wrapper">
      <Header />
      <LeftSide />
      <div className="outlet">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
