import React from "react";
import { useState, useEffect, useRef, useContext } from "react";
import { WebSocketContext } from "../Context.js";
import Canvas from "./Canvas.js";

const Map = () => {
  const { socket } = useContext(WebSocketContext);
  const [loonProperty, setLoonProperty] = useState([]);
  const [turretProperty, setTurretProperty] = useState([]);

  socket.onopen = (event) => {
    socket.send(JSON.stringify({ subscribe: "loonState" }), (e) => {
      console.log(e);
    });
  };

  socket.onmessage = function (event) {
    const msg = JSON.parse(event.data);
    if (msg.loonState) {
      setLoonProperty(msg.loonState);
      console.log(msg.loonState);
    }
  };

  return (
    <>
      <div>
        <Canvas
          loons={loonProperty}
          setLoons={setLoonProperty}
          turret={turretProperty}
        />
      </div>
    </>
  );
};

export default Map;
