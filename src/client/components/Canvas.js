import React, { useRef, useEffect, useState, useContext } from "react";
import { WebSocketContext } from "../Context.js";
import "../css/App.css";

const Canvas = ({ loons, setLoons }) => {
  const { socket } = useContext(WebSocketContext);
  const canvasRef = useRef(null);
  const [turrets, setTurrets] = useState([]);
  const [draggingTurret, setDraggingTurret] = useState(null);
  const distance = (x1, y1, x2, y2) => {
    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
  };
  const popNearestLoon = () => {
    turrets.forEach((turret) => {
      let nearestLoonId = null;
      let nearestDistance = 30;

      for (const loonId in loons) {
        const loon = loons[loonId];
        const dist = distance(
          turret.x,
          turret.y,
          loon.x_position,
          loon.y_position
        );
        if (dist < nearestDistance) {
          nearestLoonId = loonId;
          nearestDistance = dist;
        }
      }

      if (nearestLoonId) {
        socket.send(
          JSON.stringify({ publish: { killLoon: { loonID: nearestLoonId } } })
        );
        const updatedLoons = { ...loons };
        delete updatedLoons[nearestLoonId];
        // Send a message here to server to delete Loon
        setLoons(updatedLoons);
      }
    });
  };

  const drawLoon = (ctx) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = "red";
    for (const l in loons) {
      ctx.fillRect(loons[l].x_position, loons[l].y_position, 10, 10);
    }
  };

  const drawTurrets = (ctx) => {
    turrets.forEach((turret) => {
      ctx.fillStyle = turret.isSelected ? "green" : "blue";
      ctx.fillRect(turret.x, turret.y, 10, 10);
    });
  };

  const handleMouseDown = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    turrets.forEach((turret, index) => {
      if (
        mouseX >= turret.x &&
        mouseX <= turret.x + 10 &&
        mouseY >= turret.y &&
        mouseY <= turret.y + 10
      ) {
        setDraggingTurret(index);
        setTurrets(
          turrets.map((t, idx) => ({ ...t, isSelected: idx === index }))
        );
      }
    });
  };

  const handleMouseMove = (e) => {
    if (draggingTurret != null) {
      const rect = canvasRef.current.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      setTurrets(
        turrets.map((turret, index) => {
          if (index === draggingTurret) {
            return { ...turret, x: mouseX - 5, y: mouseY - 5 };
          } else {
            return turret;
          }
        })
      );
    }
  };

  const handleMouseUp = () => {
    if (draggingTurret != null) {
      setDraggingTurret(null);
      setTurrets(turrets.map((t) => ({ ...t, isSelected: false })));
    }
  };

  const addNewTurret = () => {
    setTurrets([...turrets, { x: 30, y: 30, isSelected: false, level: 1 }]);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    const render = () => {
      drawLoon(context);
      drawTurrets(context);
      popNearestLoon();
      requestAnimationFrame(render);
    };

    render();

    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [turrets, loons]);

  return (
    <div>
      <button onClick={addNewTurret}>Add Turret</button>
      <canvas width={300} height={300} ref={canvasRef} className="gameCanvas" />
    </div>
  );
};

export default Canvas;
