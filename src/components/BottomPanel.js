import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  alternateTurn,
  processPlayerAttack,
  startCombat,
} from "../store/currentCombatSlice";
import { updateCell } from "../store/dungeonSlice";
import { getLookAtCell, getLookAtLocation } from "../dungeon";
import {
  CELL_ANCIENT_SWORD,
  CELL_ENEMY,
  CELL_ENEMY_BABY,
  CELL_ENEMY_GUARD,
  CELL_ENEMY_KNIGHT,
  CELL_FLOOR,
  CELL_HAMMER,
  CELL_HEALTH_POTION,
  CELL_SANITY_POTION,
  CELL_SPEAR,
  CELL_VISION_POTION,
} from "../constants";
import { addItem, toggleShowInventory } from "../store/inventorySlice";
import { playClickSound } from "../sound";

const StartBattleButton = () => {
  const dispatch = useDispatch();
  const inventory = useSelector((state) => state.inventory.value);
  const activeWeapons = inventory.items.filter(
    (it) => it.isWeapon && it.isActive,
  );

  const onClick = () => {
    playClickSound();

    if (activeWeapons.length === 0) {
      dispatch(toggleShowInventory());
      return;
    }

    const lookAtCell = getLookAtCell();
    switch (lookAtCell) {
      case CELL_ENEMY:
        dispatch(
          startCombat({
            isActive: true,
            enemyHealth: 100,
            enemyAttackOptions: [{ name: "bite", damage: 10 }],
          }),
        );
        break;
      case CELL_ENEMY_BABY:
        dispatch(
          startCombat({
            isActive: true,
            enemyHealth: 20,
            enemyAttackOptions: [{ name: "bite", damage: 2 }],
          }),
        );
        break;
      case CELL_ENEMY_KNIGHT:
        dispatch(
          startCombat({
            isActive: true,
            enemyHealth: 45,
            enemyAttackOptions: [{ name: "bite", damage: 9 }],
          }),
        );
        break;
      case CELL_ENEMY_GUARD:
        dispatch(
          startCombat({
            isActive: true,
            enemyHealth: 70,
            enemyAttackOptions: [{ name: "bite", damage: 15 }],
          }),
        );
        break;
    }
  };

  return (
    <button onClick={onClick} id="start-battle-button" className="btn">
      Battle
    </button>
  );
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
        dispatch(
          addItem({
            name: "Ancient rusty sword",
            description:
              "Ancient sword made up of iron. Does 20 damage to enemy",
            isWeapon: true,
            damage: 20,
            isActive: false,
          }),
        );
        return;
      case CELL_HEALTH_POTION:
        dispatch(
          addItem({
            name: "Super health potion",
            description: "Health potion, refills health",
            health: 100,
            isPotion: true,
          }),
        );
        return;
      case CELL_SANITY_POTION:
        dispatch(
          addItem({
            name: "Sanity potion",
            description: "Sanity potion, +20 sanity",
            sanity: 20,
            isPotion: true,
          }),
        );
        return;
      case CELL_VISION_POTION:
        dispatch(
          addItem({
            name: "Super vision potion",
            description: "Vision potion, gives 30s of vision",
            vision: 30,
            isPotion: true,
          }),
        );
        return;
      case CELL_HAMMER:
        dispatch(
          addItem({
            name: "Ancient hammer",
            description: "Ancient hammer. Does 10 damage to enemy",
            isWeapon: true,
            damage: 10,
            isActive: false,
          }),
        );
        return;
      case CELL_SPEAR:
        dispatch(
          addItem({
            name: "Ancient Spear",
            description: "Ancient spear. Does 15 damage to enemy",
            isWeapon: true,
            damage: 15,
            isActive: false,
          }),
        );
        return;
      default:
        return;
    }
  };

  return (
    <button onClick={onClick} id="pick-button" className="btn">
      Pick
    </button>
  );
};

const CombatPanel = () => {
  const currentCombat = useSelector((state) => state.currentCombat.value);
  const playerHealth = useSelector((state) => state.playerHealth.value);
  const inventory = useSelector((state) => state.inventory.value);
  const { enemyHealth, playerTurn } = currentCombat;

  const dispatch = useDispatch();

  const playerAttackOptions = inventory.items.filter(
    (it) => it.isWeapon && it.isActive,
  );

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
        <button
          className="use-attack btn"
          onClick={handleAttack}
          disabled={!playerTurn}
        >
          Use
        </button>
      </div>
    );
  });

  return <div className="attack-card-container">{optionsCard}</div>;
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
