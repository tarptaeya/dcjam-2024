import React from "react";
import { useSelector } from "react-redux";

export const Compass = () => {
  const playerDirection = useSelector((state) => state.playerDirection.value);
  const currentCombat = useSelector((state) => state.currentCombat.value);

  if (currentCombat.isActive) {
    return <></>;
  }

  return <div id="compass">{playerDirection}</div>;
};
