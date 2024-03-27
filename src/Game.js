import React, { useEffect, useRef } from "react";
import { Dungeon } from "./components/Dungeon";
import { useFrame, useThree } from "@react-three/fiber";
import { useSelector } from "react-redux";
import { centeredVectorForLocation, nextLocation } from "./location";
import { vectorForDirection } from "./direction";
import { Vector3 } from "three";

const Game = () => {
  const { camera } = useThree();
  const playerLocation = useSelector((state) => state.playerLocation.value);
  const playerDirection = useSelector((state) => state.playerDirection.value);

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

  useFrame(({ clock }) => {
    const position = centeredVectorForLocation(playerLocation);
    camera.position.lerp(position, 0.3);

    const deltaPosition = vectorForDirection(playerDirection);
    const front = new Vector3(camera.position.x + deltaPosition.x, camera.position.y + deltaPosition.y, camera.position.z + deltaPosition.z);
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
