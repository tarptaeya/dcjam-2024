import React from "react";
import { useSelector } from "react-redux";


export const Compass = () => {
    const playerDirection = useSelector(state => state.playerDirection.value);

    return <div id="compass">{playerDirection}</div>;
};