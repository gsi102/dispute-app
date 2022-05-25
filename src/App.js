import React from "react";
import Participants from "./components/Participants.jsx";
import Dispute from "./components/Dispute.jsx";
import Spectators from "./components/Spectators.jsx";

import "./styles/App.css";

function App() {
  return (
    <div className="App">
      <Participants />
      <Dispute />
      <Spectators />
    </div>
  );
}

export default App;
