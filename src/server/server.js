const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 7777 });
const { addLoon, updateLoon } = require("./controllers/loonController.js");
const state = {
  wave: 1,
  timestamp: "300", // timestamp for intervals on when loons should be spawned, waves start
  totalWaveAlive: 1,
  loonState: {},
};
// Wave Details
const waveCap = {
  restPeriod: 5, // period refers to the rest period between waves spawns
  1: 10,
  2: 20,
  3: 30,
  4: 40,
  5: 50,
};
const waveMax = 5;

wss.on("connection", function connection(ws) {
  console.log("A new client connected!");

  ws.on("message", function incoming(message) {
    const msg = JSON.parse(message);

    if (!msg.subscribe || !msg.publish) {
      ws.send(
        JSON.stringify({
          msg: "Invalid request. Submit publish and subscribe request",
        })
      );
    }
    if (msg.subscribe === "loonState") {
      // Refine logic so that if socket is closed then this stops too
      const spawnInterval = setInterval(() => {
        if (state.totalWaveAlive <= 0) {
          clearInterval(spawnInterval);
        }
        if (state.totalWaveAlive <= 10) {
          addLoon(state);
          updateLoon(state);
        } else {
          updateLoon(state);
        }
        ws.send(JSON.stringify(state));
        console.log(state);
      }, 5000);
    }
    if (msg.subscribe === "msg") {
      ws.send(
        JSON.stringify({
          msg: `Game is still in progress, there are currently ${state.totalWaveAlive} Loons alive`,
        })
      );
    }
    if (msg.publish) {
      if (msg.publish.killLoon) {
        const loonID = msg.publish.killLoon.loonID;
        for (const s in state.loonState) {
          if (s === loonID) {
            delete state.loonState[s];
            state.totalWaveAlive -= 1;
            console.log(s, "loonID");
            console.log(state, "state");
          }
        }
      }
    }
  });

  ws.on("close", function () {
    console.log("A client disconnected.");
  });
});
