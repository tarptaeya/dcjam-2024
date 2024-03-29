import React, { useEffect, useRef } from "react";
import { Dungeon } from "./components/Dungeon";
import { useFrame, useThree } from "@react-three/fiber";
import { useDispatch, useSelector } from "react-redux";
import { centeredVectorForLocation, nextLocation } from "./location";
import { vectorForDirection } from "./direction";
import { Vector3 } from "three";
import { getLookAtCell, getLookAtLocation } from "./dungeon";
import { updateInformation } from "./store/informationSlice";
import { processEnemyAttack } from "./store/playerHealthSlice";
import { alternateTurn, resetCombat } from "./store/currentCombatSlice";
import { CELL_ENEMY } from "./constants";
import { killEnemy } from "./store/dungeonSlice";

const Game = () => {
  const { camera } = useThree();
  const playerLocation = useSelector((state) => state.playerLocation.value);
  const playerDirection = useSelector((state) => state.playerDirection.value);
  const dungeon = useSelector((state) => state.dungeon.value);
  const currentCombat = useSelector((state) => state.currentCombat.value);
  const playerHealth = useSelector((state) => state.playerHealth.value);

  const dispatch = useDispatch();

  const spotLightRef = useRef();

  useEffect(() => {
    camera.fov = 100;
    camera.updateProjectionMatrix();

    const position = centeredVectorForLocation(playerLocation);
    camera.position.x = position.x;
    camera.position.y = position.y;
    camera.position.z = position.z;

    const front = centeredVectorForLocation(
      nextLocation(playerLocation, playerDirection),
    );
    camera.lookAt(front);
  }, []);

  useEffect(() => {
    const lookAtCell = getLookAtCell();
    if (lookAtCell === CELL_ENEMY) {
      dispatch(updateInformation({ message: "Mutant bat", isEnemy: true }));
    } else {
      dispatch(updateInformation({ message: null, isEnemy: false }));
    }
  }, [dungeon, playerLocation, playerDirection]);

  useEffect(() => {
    const { playerTurn, enemyHealth, isActive, enemyAttackOptions } = currentCombat;
    if (!isActive) return;

    if (enemyHealth == 0) {
      const lookAtLocation = getLookAtLocation();
      dispatch(resetCombat());
      dispatch(killEnemy(lookAtLocation));
      return;
    }

    if (!playerTurn && enemyHealth > 0) {
      const attack = enemyAttackOptions[0];

      setTimeout(() => {
        dispatch(processEnemyAttack(attack));
        dispatch(alternateTurn());
      }, 1000);
    }
  }, [currentCombat]);

  useFrame(({ clock }) => {
    const position = centeredVectorForLocation(playerLocation);
    camera.position.lerp(position, 0.3);

    const deltaPosition = vectorForDirection(playerDirection);
    const front = new Vector3(
      camera.position.x + deltaPosition.x,
      camera.position.y + deltaPosition.y,
      camera.position.z + deltaPosition.z,
    );
    camera.lookAt(front);

    spotLightRef.current.position.x = camera.position.x;
    spotLightRef.current.position.y = camera.position.y;
    spotLightRef.current.position.z = camera.position.z;
  });

  return (
    <>
      <ambientLight intensity={0.1} />
      <pointLight ref={spotLightRef} castShadow={true} />
      <Dungeon />
    </>
  );
};

export default Game;
