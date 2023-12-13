import React from "react";
import styled from "styled-components";
import Loon from "./Loon.js";
import Turret from "./Turret.js";
import TurretClone from "./TurretClone.js";
import { useState, useEffect, useRef } from "react";
import { batch } from "react-redux";

/**
 * Map To-Do
 * - Thinking about boundaries of the map
 *
 */

const Board = styled.div`
  border: solid 1px black;
  width: 300px;
  height: 150px;
  position: relative;
`;
const socket = new WebSocket("wss://pronto-challenge.ngrok.app/test123/ws");
const Map = () => {
  const [loonProperty, setLoonProperty] = useState([]);
  const [dropPosition, setDropPosition] = useState([]);
  const turretID = useRef(0);

  useEffect(() => {
    const batchData = [];

    const interval = setInterval(() => {
      const pop = batchData.shift();
      setLoonProperty([pop]);
    }, 300);

    socket.onopen = (event) => {
      socket.send(JSON.stringify({ subscribe: "loonState" }), (e) => {
        console.log(e);
      });

      socket.send(JSON.stringify({ subscribe: "msg" }), (e) => {
        console.log(e, "testing");
      });
      // socket.send(JSON.stringify({ publish: { msg: "test ggggg" } }), (e) => {
      //   console.log(e);
      // });
    };
    socket.onmessage = function (event) {
      // need some efficient way to process data fast (in a stream?)
      const msg = JSON.parse(event.data);
      console.log(msg);
      if (msg.loonState) {
        batchData.push(msg.loonState);
      }
    };
    return () => {
      clearInterval(interval);
      socket.close(() => console.log("connection is closed"));
    };
  }, []);

  const populateLoons = (v) => {
    const arr = [];
    for (const loon in v) {
      arr.push(
        <Loon id={loon} x_pos={v[loon].position_x} y_pos={v[loon].position_y} />
      );
    }
    return arr;
  };

  const handleDropTurret = (e) => {
    e.preventDefault();
    const dropZoneRect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - dropZoneRect.left;
    const y = e.clientY - dropZoneRect.top;
    const arr = [...dropPosition, [x, y, false, turretID.current, "none"]];
    turretID.current += 1;
    setDropPosition(arr);
  };
  const handleDragOver = (e) => {
    e.preventDefault();
  };
  const handleKillLoon = (e) => {
    // Get the current state of Loon and kil the first loon
    console.log(loonProperty);
    let i = 0;
    for (const loon in loonProperty[0]) {
      console.log(loon);
      console.log(socket.readyState);
      // socket.onopen = (event) => {
      //   console.log(loon);
      //   console.log("TESTING KILL");
      socket.send(JSON.stringify({ publish: { popLoon: loon } }), (e) => {
        console.log(e);
      });
      // };
      i += 1;
      if (i == 1) {
        break;
      }
    }
  };
  return (
    <>
      <div>
        <Board onDrop={handleDropTurret} onDragOver={handleDragOver}>
          {populateLoons(loonProperty[0])}
          {dropPosition.map((v, i) => {
            // Would need to add some turret logic so that you can pick it back up, doesn't replicate when tryin to pick back up
            // We prob need some "focus" on which turret is being selected so that you can calculate Loon distance
            const style = {
              position: "absolute",
              left: String(v[0]) + "px",
              top: String(v[1]) + "px", // fine - tuning on drag drop placement, it doesn't lock in on exact spot?
              border: v[4],
            };
            const arr = [];
            arr.push(
              <Turret
                style={style}
                dropPosition={dropPosition}
                setDropPosition={setDropPosition}
                id={i}
              />
            );

            return arr;
          })}
        </Board>
      </div>
      <div>
        Turrets: <TurretClone />
      </div>
      <div>
        <button onClick={handleKillLoon}>KILL</button>
      </div>
    </>
  );
};

export default Map;
