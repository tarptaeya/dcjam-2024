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

    return <button onClick={onClick}>Battle</button>;
};

const CombatPanel = () => {
    const currentCombat = useSelector((state) => state.currentCombat.value);
    const playerHealth = useSelector((state) => state.playerHealth.value);
    const { enemyHealth, playerAttackOptions, playerTurn } = currentCombat;

    const dispatch = useDispatch();

    const optionsCard = playerAttackOptions.map((attack) => {
        return (
            <div key={attack.name}>
                <div>{attack.name}</div>
                <div>{attack.damage}</div>
                <div>
                    <button
                        onClick={() => {
                            dispatch(processPlayerAttack(attack));
                            dispatch(alternateTurn());
                        }}
                        disabled={!playerTurn}
                    >
                        Select
                    </button>
                </div>
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
                    <div className="grow">{message}</div>
                    <div>{isEnemy && <StartBattleButton />}</div>
                </>
            );
        }
    };

    return <div id="bottom-panel" className="container fluid row">{getView()}</div>;
};

export default BottomPanel;