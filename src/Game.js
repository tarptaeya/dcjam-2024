import React, { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useSelector } from "react-redux";
import { Vector3 } from "three";
import { centeredVectorForLocation, nextLocation } from "./location";
import { NORTH, vectorForDirection } from "./direction";

const Game = () => {
  const { camera } = useThree();
  const playerLocation = useSelector(state => state.playerLocation.value);

  const ref = useRef();

  useEffect(() => {
    ref.current.position.x = 0.5;
    ref.current.position.y = 0.5;
    ref.current.position.z = 0.5;
  }, [])

  useFrame(({ clock }) => {
    const playerPosition = centeredVectorForLocation(playerLocation);
    camera.position.lerp(playerPosition, 0.15);

    camera.lookAt = centeredVectorForLocation(nextLocation(playerLocation, NORTH));
    camera.fov = 100;
    camera.updateMatrix();
    camera.updateWorldMatrix();
    camera.updateProjectionMatrix();
  });

  return (
    <>
      <mesh ref={ref}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial />
      </mesh>
    </>
  );
};

export default Game;
