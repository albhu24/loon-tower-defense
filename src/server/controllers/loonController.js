const addLoon = (state) => {
  state.totalWaveAlive += 1;
  return (state.loonState[genLoonID()] = genSpawnProps());
};

const updateLoon = (state) => {
  for (const loon in state.loonState) {
    if (state.loonState[loon].x_position >= 300) {
      delete state.loonState[loon];
      state.totalWaveAlive -= 1;
    } else {
      state.loonState[loon].x_position += 5;
    }
  }
  return state;
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

const genSpawnProps = (x, y) => {
  const xBound = 0;
  const yBound = 300;
  const y_position = Math.floor(Math.random() * yBound);
  const props = { x_position: xBound, y_position, alive: true, level: 1 };
  return props;
};

module.exports = { updateLoon, addLoon };

// const loonSpawner = () => {
//   // initialState
//   const state = {
//     wave: 1,
//     timestamp: "300", // timestamp for intervals on when loons should be spawned, waves start
//     totalWaveAlive: 1,
//     loonState: {},
//   };
//   // Wave Details
//   const waveCap = {
//     restPeriod: 5, // period refers to the rest period between waves spawns
//     1: 10,
//     2: 20,
//     3: 30,
//     4: 40,
//     5: 50,
//   };
//   const waveMax = 5;

//   return (spawnInterval = setInterval(() => {
//     // || socket.readyState === 0
//     if (state.totalWaveAlive <= 0) {
//       clearInterval(spawnInterval);
//     }
//     if (state.totalWaveAlive <= 10) {
//       addLoon(state);
//       updateLoon(state);
//     } else {
//       updateLoon(state);
//     }
//     // return state;
//   }, 2000));

//   return () => clearInterval(spawnInterval);
// };

// const x = loonSpawner();
// console.log(x());
