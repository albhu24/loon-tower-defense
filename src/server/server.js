// const WebSocket = require("ws");

// const wss = new WebSocket.Server({ port: 7777 });
// const topics = [];

// wss.on("connection", function connection(ws) {
//   console.log("A new client connected!");

//   ws.on("message", function incoming(message) {
//     console.log("received: %s", message);
//     // if message is subscribe:topicA

//     // elif subscribe:topicB

//     ws.send(`Server received: ${message}`);
//   });

//   ws.send("Welcome to Albert's Loon Server");
//   // ws.on("subscribe", (message) => {});
// });

// console.log("WebSocket server started on ws://localhost:8080");

const loonSpawner = (connection) => {
  // Loon state will include Wave number, loon ID, loon X and Y coordinates
  // Look something like this:
  const state = {
    wave: 1,
    timestamp: "300", // timestamp for intervals on when loons should be spawned, waves start
    totalWaveAlive: 0,
    loonState: {
      loonID: { position_x: 135, position_y: 123, level: 1, alive: true },
      loonID: { position_x: 135, position_y: 123, level: 1, alive: true },
      loonID: { position_x: 135, position_y: 123, level: 1, alive: true },
      loonID: { position_x: 135, position_y: 123, level: 1, alive: true },
      loonID: { position_x: 135, position_y: 123, level: 1, alive: true },
    },
  };
  // can set a max capacity of Loons each stage
  const waveCap = {
    restPeriod: 5, // period refers to the rest period between waves spawns
    1: 10,
    2: 20,
    3: 30,
    4: 40,
    5: 50,
  };
  const waveMax = 5;

  // only after all Loons alive status is false, do we proceed to wave 2
  // Loons spawn at
  // output needs to be stream of data
};

const state = {
  wave: 1,
  // timestamp: "300", // timestamp for intervals on when loons should be spawned, waves start
  totalWaveAlive: 0,
  loonState: {},
};

const addLoon = (state) => {
  state.totalWaveAlive += 1;
  return (state.loonState[genLoonID()] = genSpawnLocation());
};

const genLoonID = () => {
  const length = 10;
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

const genSpawnLocation = (x, y) => {
  const xBound = 300;
  const yBound = 300;
  const x_position = Math.random() * (300 - -300) + -300;
  const y_position = Math.random() * (300 - -300) + -300;
  const props = { x_position, y_position, alive: true };
  return props;
};

const genRandomMovement = (x, y) => {
  // for simplicity's sake -> loon can move in 8 directions -> like a compass N,S,E,W and NE,NW,SE,SW
  // generate random number between 1 and 8
  // more random would be finding a number between 1 and 0, then doing the different options..?
  const movement = [
    [0, 1],
    [-1, 0],
    [1, 0],
    [0, -1],
    [1, 1],
    [1, -1],
    [-1, -1],
    [-1, 1],
  ];
  const random = Math.floor(Math.random() * 7);
  return [movement[random][0] + x, movement[random][1] + y];
};
console.log(genRandomMovement(10, 10));
console.log(genRandomMovement(10, 10));
console.log(genRandomMovement(10, 10));

// for (let i = 0; i < 10; i++) {
//   addLoon(state);
// }

// Start the timer

// for (let i = 0; i < 1000; i++) {}
// const diff = process.hrtime(startTime);

// // Convert [seconds, nanoseconds] to total seconds
// const seconds = diff[0] + diff[1] / 1e9;

// console.log(`The operation took ${seconds} seconds.`);
