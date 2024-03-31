import React, { useState } from "react";
import { Compass } from "./Compass";
import { useDispatch, useSelector } from "react-redux";
import { playClickSound } from "../sound";
import {
  removeItem,
  toggleItemSelection,
  toggleShowInventory,
} from "../store/inventorySlice";
import { incrementPlayerHealth } from "../store/playerHealthSlice";
import { incrementPlayerSanity } from "../store/playerSanitySlice";
import { setStageVisible } from "../store/stageSlice";

const HealthBar = () => {
  const playerHealth = useSelector((state) => state.playerHealth.value);
  const playerSanity = useSelector((state) => state.playerSanity.value);
  const stage = useSelector((state) => state.stage.value);
  const { isLifted } = stage;
  return (
    <div id="player-health-bar-container">
      {!isLifted && (
        <>
          <div className="health-bar-label">Health</div>
          <div id="player-health-bar" className="health-bar">
            <span style={{ width: `${playerHealth}%` }} />
          </div>
        </>
      )}
      {isLifted && (
        <>
          <div className="health-bar-label">Sanity</div>
          <div id="player-sanity-bar" className="health-bar">
            <span style={{ width: `${playerSanity}%` }} />
          </div>
        </>
      )}
    </div>
  );
};

const EnemyHealthBar = () => {
  const { isActive, enemyHealth, enemyMaxHealth } = useSelector(
    (state) => state.currentCombat.value,
  );

  if (!isActive) return <></>;

  return (
    <div id="enemy-health-bar-container">
      <div className="health-bar-label">Enemy</div>
      <div id="enemy-health-bar" className="health-bar enemy">
        <span style={{ width: `${(enemyHealth * 100) / enemyMaxHealth}%` }} />
      </div>
    </div>
  );
};

const Inventory = () => {
  const inventory = useSelector((state) => state.inventory.value);
  const currentCombat = useSelector((state) => state.currentCombat.value);
  const stage = useSelector((state) => state.stage.value);

  const { isLifted, isVisible } = stage;
  const { isOpen } = inventory;

  const [currentTab, setCurrentTab] = useState("weapons");

  const dispatch = useDispatch();

  const getModal = () => {
    const weapons = inventory.items.filter((it) => it.isWeapon);
    const potions = inventory.items.filter((it) => it.isPotion);
    const activeCount = weapons.filter(it => it.isActive).length;

    const closeModal = () => {
      playClickSound();
      dispatch(toggleShowInventory());
    };

    return (
      <div id="inventory-modal-container">
        <div id="inventory-modal">
          <div id="inventory-tab-bar">
            <div
              onClick={() => {
                playClickSound();
                setCurrentTab("weapons");
              }}
              className={currentTab === "weapons" ? "active" : ""}
            >
              Weapons
            </div>
            <div
              onClick={() => {
                playClickSound();
                setCurrentTab("potions");
              }}
              className={currentTab === "potions" ? "active" : ""}
            >
              Potions
            </div>
          </div>
          <div id="inventory-modal-items-grid">
            {currentTab === "weapons" &&
              weapons.map((it) => {
                const onClickItem = () => {
                  if (activeCount === 3 && !it.isActive) {
                    return;
                  }
                  playClickSound();
                  dispatch(toggleItemSelection(it.name));
                };

                return (
                  <div
                    key={it.name}
                    className={`inventory-modal-item inventory-modal-weapon-item ${it.isActive ? "inventory-modal-weapon-active" : ""}`}
                    title={it.description}
                    onClick={onClickItem}
                  >
                    {it.isActive && <span className="ribbon"></span>}
                    <div className="inventory-modal-item-title">{it.name}</div>
                    <div className="inventory-modal-weapon-info">
                      <div className="damage">Damage {it.damage}</div>
                    </div>
                  </div>
                );
              })}

            {currentTab === "potions" &&
              potions.map((it) => {
                const onUsePotion = () => {
                  playClickSound();
                  dispatch(removeItem(it.name));
                  if (!!it.health) {
                    dispatch(incrementPlayerHealth(it.health));
                  } else if (!!it.sanity) {
                    dispatch(incrementPlayerSanity(it.sanity));
                  } else if (!!it.vision) {
                    dispatch(setStageVisible(true));
                    setTimeout(() => {
                      dispatch(setStageVisible(false));
                    }, it.vision * 1000);
                    dispatch(toggleShowInventory());
                  }
                };

                return (
                  <div
                    key={it.name}
                    className={
                      "inventory-modal-item inventory-modal-potion-item"
                    }
                    title={it.description}
                  >
                    <div className="inventory-modal-item-title">{it.name}</div>
                    <div className="inventory-modal-weapon-info">
                      {!!it.health && (
                        <div className="damage">Health +{it.health}</div>
                      )}
                      {!!it.sanity && (
                        <div className="damage">Sanity +{it.sanity}</div>
                      )}
                      {!!it.vision && (
                        <div className="damage">Vision for {it.vision}s</div>
                      )}
                    </div>
                    <div>
                      <button
                        className="inventory-modal-use-potion btn"
                        onClick={onUsePotion}
                        disabled={
                          !!it.vision
                            ? !isLifted || (isLifted && isVisible)
                            : false
                        }
                      >
                        Use
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>

          <div class="spacer" />

          <div id="inventory-modal-footer">
            {currentTab === 'weapons' ? <div>{activeCount}/3 selected</div> : <div></div>}
            <button
              id="inventory-modal-close-button"
              className="btn"
              onClick={closeModal}
            >
              Ok
            </button>
          </div>
        </div>
      </div>
    );
  };

  const onBagButtonClick = () => {
    playClickSound();
    dispatch(toggleShowInventory());
  };

  return (
    <>
      <button
        id="inventory-button"
        className={isLifted ? "lifted btn" : "btn"}
        onClick={onBagButtonClick}
        disabled={currentCombat.isActive}
      >
        Bag
      </button>
      {isOpen && getModal()}
    </>
  );
};

const TopPanel = () => {
  const currentCombat = useSelector((state) => state.currentCombat.value);

  return (
    <div id="top-panel">
      {currentCombat.isActive ? <EnemyHealthBar /> : <Compass />}
      <div>
        <HealthBar />
        <Inventory />
      </div>
    </div>
  );
};

export default TopPanel;
