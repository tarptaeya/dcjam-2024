import React, { useEffect } from "react";
import { Dungeon } from "./components/Dungeon";
import { useThree } from "@react-three/fiber";
import { useSelector } from "react-redux";
import { centeredVectorForLocation, nextLocation } from "./location";

const Game = () => {
  const { camera } = useThree();
  const playerLocation = useSelector((state) => state.playerLocation.value);
  const playerDirection = useSelector((state) => state.playerDirection.value);

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
  }, [camera, playerLocation, playerDirection]);

  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[0, 0, 5]} />
      <Dungeon />
    </>
  );
};

export default Game;
