import React, { useEffect, useRef } from "react";
import { Dungeon } from "./components/Dungeon";
import { useFrame, useThree } from "@react-three/fiber";
import { useDispatch, useSelector } from "react-redux";
import { centeredVectorForLocation, nextLocation } from "./location";
import { vectorForDirection } from "./direction";
import { Color, Vector3 } from "three";
import { getCurrentCell, getLookAtCell, getLookAtLocation } from "./dungeon";
import { updateInformation } from "./store/informationSlice";
import { processEnemyAttack } from "./store/playerHealthSlice";
import { alternateTurn, resetCombat } from "./store/currentCombatSlice";
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
  CELL_TELEPORT,
  CELL_VISION_POTION,
  CELL_WALL,
  LIFTED_DUNGEON_MAP,
} from "./constants";
import { setDungeon, updateCell } from "./store/dungeonSlice";
import { updateScreen } from "./store/screenSlice";
import { setLiftedBackgroundTrackGain } from "./sound";
import { liftStage, setStageVisible } from "./store/stageSlice";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { decrementPlayerSanity } from "./store/playerSanitySlice";

const Game = () => {
  const { camera, scene } = useThree();
  const playerLocation = useSelector((state) => state.playerLocation.value);
  const playerDirection = useSelector((state) => state.playerDirection.value);
  const dungeon = useSelector((state) => state.dungeon.value);
  const currentCombat = useSelector((state) => state.currentCombat.value);
  const playerHealth = useSelector((state) => state.playerHealth.value);
  const playerSanity = useSelector((state) => state.playerSanity.value);
  const stage = useSelector((state) => state.stage.value);
  const options = useSelector((state) => state.options.value);
  const { isLifted } = stage;

  const dispatch = useDispatch();

  const spotLightRef = useRef();

  useEffect(() => {
    camera.fov = options.fov;
    camera.updateProjectionMatrix();

    const position = centeredVectorForLocation(playerLocation);
    camera.position.x = position.x;
    camera.position.y = position.y;
    camera.position.z = position.z;

    const front = centeredVectorForLocation(
      nextLocation(playerLocation, playerDirection),
    );
    camera.lookAt(front);
  }, [options]);

  useEffect(() => {
    const lookAtCell = getLookAtCell();
    switch (lookAtCell) {
      case CELL_ENEMY:
        dispatch(updateInformation({ message: "Mutant bat", isEnemy: true }));
        return;
      case CELL_ANCIENT_SWORD:
        dispatch(updateInformation({ message: "Ancient sword", isLoot: true }));
        return;
      case CELL_HEALTH_POTION:
        dispatch(updateInformation({ message: "Health potion", isLoot: true }));
        return;
      case CELL_SANITY_POTION:
        dispatch(updateInformation({ message: "Sanity potion", isLoot: true }));
        return;
      case CELL_VISION_POTION:
        dispatch(updateInformation({ message: "Vision potion", isLoot: true }));
        return;
      case CELL_ENEMY_BABY:
        dispatch(updateInformation({ message: "Baby bat", isEnemy: true }));
        return;
      case CELL_ENEMY_KNIGHT:
        dispatch(updateInformation({ message: "Knight bat", isEnemy: true }));
        return;
      case CELL_ENEMY_GUARD:
        dispatch(updateInformation({ message: "Guard bat", isEnemy: true }));
        return;
      case CELL_HAMMER:
        dispatch(updateInformation({ message: "Hammer", isLoot: true }));
        return;
      case CELL_SPEAR:
        dispatch(updateInformation({ message: "Spear", isLoot: true }));
        return;
      default:
        dispatch(updateInformation({ message: null }));
        return;
    }
  }, [dungeon, playerLocation, playerDirection]);

  useEffect(() => {
    const { playerTurn, enemyHealth, isActive, enemyAttackOptions } =
      currentCombat;
    if (!isActive) return;

    if (enemyHealth === 0) {
      const lookAtLocation = getLookAtLocation();
      dispatch(resetCombat());
      dispatch(updateCell({ location: lookAtLocation, cellType: CELL_FLOOR }));
      return;
    }

    if (playerHealth === 0) {
      dispatch(updateScreen("gameover"));
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

  useEffect(() => {
    let interval = undefined;
    if (isLifted) {
      scene.background = new Color(0, 0, 0);
      interval = setInterval(() => {
        dispatch(decrementPlayerSanity(1));
      }, 2000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isLifted]);

  useEffect(() => {
    if (!isLifted) return;

    const lookAtCell = getLookAtCell();
    if (lookAtCell == CELL_WALL) {
      setLiftedBackgroundTrackGain(1.0);
    } else {
      setLiftedBackgroundTrackGain(0.2);
    }
  }, [isLifted, dungeon, playerLocation, playerDirection]);

  useEffect(() => {
    const cellType = getCurrentCell();
    if (isLifted) {
      if (cellType === CELL_TELEPORT) {
        dispatch(updateScreen("gamewin"));
      }
    } else {
      if (cellType === CELL_TELEPORT) {
        dispatch(liftStage());
        dispatch(setStageVisible(false));
        dispatch(setDungeon(LIFTED_DUNGEON_MAP));
      }
    }
  }, [playerLocation, isLifted]);

  useEffect(() => {
    if (playerSanity === 0) {
      dispatch(updateScreen("gameover"));
    }
  }, [playerSanity]);

  useFrame(({ clock }) => {
    const position = centeredVectorForLocation(playerLocation);
    camera.position.lerp(position, options.movement === 'smooth' ? 0.3 : 1);

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

      <EffectComposer>
        <Bloom luminanceThreshold={0} luminanceSmoothing={0.9} height={300} />
      </EffectComposer>
    </>
  );
};

export default Game;
