import React from "react";
import styled from "styled-components";

// This component represents a Loon
// Requirements
// 1) Moves in arbitrary direction
// 2) Loons spawn at an arbitrary location?
// 1) If Loon reaches end of the map / boundary, it dissapears
// 1) Should be able to see location and traj

const Enemy = styled.div`
  background-color: red;
  width: 15px;
  height: 15px;
  position: absolute;
`;

const x = 50;
const y = 50;

const Loon = ({ id, x_pos, y_pos }) => {
  //{ id, x_pos, y_pos }
  const style = {
    position: "absolute",
    id: id,
    left: String(x + x_pos) + "px",
    top: String(y + y_pos) + "px",
  };
  return (
    <>
      <Enemy style={style} />
    </>
  );
};

export default Loon;
