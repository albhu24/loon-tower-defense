import React from "react";
import Map from "./components/Map.js";
import { WebSocketContext } from "./Context.js";
import { useEffect } from "react";
const App = () => {
  const socket = new WebSocket("ws://localhost:7777");
  // const socket = new WebSocket("wss://pronto-challenge.ngrok.app/33/ws");
  console.log(socket);
  useEffect(() => {
    return () => {
      socket.close();
    };
  }, []);
  return (
    <>
      <h3>Loons Tower Defense</h3>
      <WebSocketContext.Provider value={{ socket: socket }}>
        <Map />
      </WebSocketContext.Provider>
    </>
  );
};

export default App;
