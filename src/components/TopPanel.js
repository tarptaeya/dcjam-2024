import React from "react";
import { Compass } from "./Compass";
import { useSelector } from "react-redux";

const HealthBar = () => {
    const playerHealth = useSelector((state) => state.playerHealth.value);
    return <div id="player-health-bar-container">
        <div className="health-bar-label">Health</div>
        <div id="player-health-bar" className="health-bar">
            <span style={{ width: `${playerHealth}%` }} />
        </div>
    </div>;
};

const TopPanel = () => {
    return <div id="top-panel">
        <Compass />
        <HealthBar />
    </div>
};

export default TopPanel;
