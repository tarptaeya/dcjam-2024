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

const EnemyHealthBar = () => {
    const { isActive, enemyHealth } = useSelector((state) => state.currentCombat.value);

    if (!isActive)
        return <></>;

    return <div id="enemy-health-bar-container">
        <div className="health-bar-label">Enemy</div>
        <div id="enemy-health-bar" className="health-bar enemy">
            <span style={{ width: `${enemyHealth}%` }} />
        </div>
    </div>;
};

const TopPanel = () => {
    const currentCombat = useSelector((state) => state.currentCombat.value);

    return <div id="top-panel">
        {currentCombat.isActive ? <EnemyHealthBar /> : <Compass />}
        <HealthBar />
    </div>
};

export default TopPanel;
