import React from "react";
import styled from "styled-components";

// This component represents a Turret
// Requirements
// 1) Turret should be able pop nearest `Loon at 1 HZ
// 2) Drag and drop turrets
// 3)
// 4)

const Utility = styled.div`
  background-color: blue;
  width: 15px;
  height: 15px;
`;

const handleDragStart = (e) => {
  e.dataTransfer.effectAllowed = "move";
};

const TurretClone = ({ style }) => {
  return <Utility style={style} draggable onDragStart={handleDragStart} />;
};

export default TurretClone;
