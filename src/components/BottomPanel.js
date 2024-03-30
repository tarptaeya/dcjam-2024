import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    alternateTurn,
    processPlayerAttack,
    startCombat,
} from "../store/currentCombatSlice";
import { updateCell } from "../store/dungeonSlice";
import { getLookAtCell, getLookAtLocation } from "../dungeon";
import { CELL_ANCIENT_SWORD, CELL_FLOOR } from "../constants";
import { addItem } from "../store/inventorySlice";
import { playClickSound } from "../sound";

const StartBattleButton = () => {
    const dispatch = useDispatch();

    const onClick = () => {
        playClickSound();

        dispatch(
            startCombat({
                isActive: true,
                enemyHealth: 100,
                enemyAttackOptions: [{ name: "bite", damage: 10 }],
            }),
        );
    };

    return <button onClick={onClick} id="start-battle-button" className="btn">Battle</button>;
};

const PickButton = () => {
    const dispatch = useDispatch();

    const onClick = () => {
        playClickSound();

        const lookAtLocation = getLookAtLocation();
        const lookAtCell = getLookAtCell();
        dispatch(updateCell({ location: lookAtLocation, cellType: CELL_FLOOR }));

        switch (lookAtCell) {
            case CELL_ANCIENT_SWORD:
                dispatch(addItem({
                    name: 'Ancient rusty sword',
                    description: 'Ancient sword made up of iron. Does 20 damage to enemy',
                    isWeapon: true,
                    damage: 20,
                    isActive: false,
                }));
                return;
            default:
                return;
        }
    };

    return <button onClick={onClick} id="pick-button" className="btn">Pick</button>;
};

const CombatPanel = () => {
    const currentCombat = useSelector((state) => state.currentCombat.value);
    const playerHealth = useSelector((state) => state.playerHealth.value);
    const inventory = useSelector(state => state.inventory.value);
    const { enemyHealth, playerTurn } = currentCombat;

    const dispatch = useDispatch();

    const playerAttackOptions = inventory.items.filter(it => it.isWeapon && it.isActive);
    console.log(playerAttackOptions);

    const optionsCard = playerAttackOptions.map((attack) => {
        const handleAttack = () => {
            playClickSound();

            dispatch(processPlayerAttack(attack));
            dispatch(alternateTurn());
        };

        return (
            <div key={attack.name} className="attack-card">
                <div className="attack-card-label">{attack.name}</div>
                <div className="attack-card-sublabel">Damage: {attack.damage}</div>
                <button className="use-attack btn" onClick={handleAttack} disabled={!playerTurn}>Use</button>
            </div>
        );
    });

    return <div>{optionsCard}</div>;
};

const BottomPanel = () => {
    const information = useSelector((state) => state.information.value);
    const currentCombat = useSelector((state) => state.currentCombat.value);

    const { message, isEnemy, isLoot } = information;

    const getView = () => {
        if (currentCombat.isActive) {
            return <CombatPanel />;
        } else {
            return (
                <>
                    <div id="bottom-panel-message">{message}</div>
                    <div id="bottom-panel-action">
                        {isEnemy && <StartBattleButton />}
                        {isLoot && <PickButton />}
                    </div>
                </>
            );
        }
    };

    return <div id="bottom-panel">{getView()}</div>;
};

export default BottomPanel;