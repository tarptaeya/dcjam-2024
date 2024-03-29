import React from "react";
import { Compass } from "./Compass";
import { useSelector } from "react-redux";

const HealthBar = () => {
    const playerHealth = useSelector((state) => state.playerHealth.value);
    return <div>
        <progress max={100} value={playerHealth} />
    </div>;
};

const TopPanel = () => {
    return <div id="top-panel">
        <Compass />
        <HealthBar />
    </div>
};

export default TopPanel;
