import React from "react";
import styled from "styled-components";

// This component represents a Turret
// Requirements
// 1) Turret should be able pop nearest `Loon at 1 HZ
// 2) Drag and drop turrets
// 3) As a base rule- maybe we should only be able to use one turret at a time?
// 4) Meaning each turret needs to be clickable , and know that it is being selected?

const Utility = styled.button`
  background-color: blue;
  width: 15px;
  height: 15px;
`;

const handleDragStart = (e) => {
  e.dataTransfer.effectAllowed = "move";
};

const Turret = ({ style, dropPosition, id, setDropPosition }) => {
  const handleClick = (e) => {
    // Need to refactor here but this logic makes it so that only 1 turret can be selected at a time!
    const copyDrop = [...dropPosition];
    for (const turret of copyDrop) {
      turret[2] = false;
      turret[4] = "none";
    }
    for (const turret of copyDrop) {
      if (Number(e.currentTarget.getAttribute("id")) === turret[3]) {
        turret[2] = !turret[2];
        turret[4] = "1.5px solid yellow";
      }
    }
    setDropPosition(copyDrop);
  };

  return <Utility style={style} onClick={handleClick} id={id} />;
};

export default Turret;
