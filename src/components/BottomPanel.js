import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    alternateTurn,
    processPlayerAttack,
    startCombat,
} from "../store/currentCombatSlice";

const StartBattleButton = () => {
    const dispatch = useDispatch();

    const onClick = () => {
        dispatch(
            startCombat({
                isActive: true,
                enemyHealth: 100,
                playerAttackOptions: [{ name: "punch", damage: 20 }],
                enemyAttackOptions: [{ name: "bite", damage: 10 }],
            }),
        );
    };

    return <button onClick={onClick} id="start-battle-button" className="btn">Battle</button>;
};

const CombatPanel = () => {
    const currentCombat = useSelector((state) => state.currentCombat.value);
    const playerHealth = useSelector((state) => state.playerHealth.value);
    const { enemyHealth, playerAttackOptions, playerTurn } = currentCombat;

    const dispatch = useDispatch();

    const optionsCard = playerAttackOptions.map((attack) => {
        const handleAttack = () => {
            dispatch(processPlayerAttack(attack));
            dispatch(alternateTurn());
        };

        return (
            <div key={attack.name} className="attack-card btn" onClick={handleAttack}>
                <div className="attack-card-label">{attack.name}</div>
                <div className="attack-card-sublabel">Damage: {attack.damage}</div>
            </div>
        );
    });

    return <div>{optionsCard}</div>;
};

const BottomPanel = () => {
    const information = useSelector((state) => state.information.value);
    const currentCombat = useSelector((state) => state.currentCombat.value);

    const { message, isEnemy } = information;

    const getView = () => {
        if (currentCombat.isActive) {
            return <CombatPanel />;
        } else {
            return (
                <>
                    <div id="bottom-panel-message">{message}</div>
                    <div id="bottom-panel-action">
                        {isEnemy && <StartBattleButton />}
                    </div>
                </>
            );
        }
    };

    return <div id="bottom-panel">{getView()}</div>;
};

export default BottomPanel;