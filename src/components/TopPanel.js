import React, { useState } from "react";
import { Compass } from "./Compass";
import { useDispatch, useSelector } from "react-redux";
import { playClickSound } from "../sound";
import { toggleItemSelection, toggleShowInventory } from "../store/inventorySlice";

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

const Inventory = () => {
    const inventory = useSelector(state => state.inventory.value);
    const currentCombat = useSelector(state => state.currentCombat.value);
    const { isOpen } = inventory;

    const dispatch = useDispatch();

    const getModal = () => {
        const weapons = inventory.items.filter(it => it.isWeapon);

        const closeModal = () => {
            playClickSound();
            dispatch(toggleShowInventory());
        };

        return <div id="inventory-modal-container">
            <div id="inventory-modal">
                <h2>My bag</h2>
                <div id="inventory-modal-items-grid">
                    {weapons.map((it) => {
                        const onClickItem = () => {
                            playClickSound();
                            dispatch(toggleItemSelection(it.name));
                        };

                        return <div key={it.name}
                            className={`inventory-modal-item inventory-modal-weapon-item ${it.isActive ? 'inventory-modal-weapon-active' : ''}`} title={it.description}
                            onClick={onClickItem}>
                            {it.isActive && <span className="ribbon"></span>}
                            <div className="inventory-modal-item-title">{it.name}</div>
                            <div className="inventory-modal-weapon-info">
                                <div className="damage">Damage {it.damage}</div>
                            </div>
                        </div>
                    })}
                </div>

                <div id="inventory-modal-footer">
                    <button id="inventory-modal-close-button" className="btn" onClick={closeModal}>Ok</button>
                </div>
            </div>
        </div>;
    };

    const onBagButtonClick = () => {
        playClickSound();
        dispatch(toggleShowInventory());
    };

    return <>
        <button id="inventory-button" className="btn" onClick={onBagButtonClick} disabled={currentCombat.isActive}>Bag</button>
        {isOpen && getModal()}
    </>;
};

const TopPanel = () => {
    const currentCombat = useSelector((state) => state.currentCombat.value);

    return <div id="top-panel">
        {currentCombat.isActive ? <EnemyHealthBar /> : <Compass />}
        <div>
            <HealthBar />
            <Inventory />
        </div>
    </div>
};

export default TopPanel;
