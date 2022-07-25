import { wsConnectionUpdate } from "../store/reducers/messagesSlice";

export const wsConnectFunction = (dispatch: any, setWsConnection: any) => {
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
    console.log("cleaned!");
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
};
