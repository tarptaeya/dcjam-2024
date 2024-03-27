import React from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useSelector } from "react-redux";
import { Vector3 } from "three";

const Game = () => {
  const { camera } = useThree();
  const playerLocation = useSelector(state => state.playerLocation.value);

  useFrame(({ clock }) => {
    const playerPosition = new Vector3(0, 0, 5 + playerLocation[0]);
    camera.position.lerp(playerPosition, 0.15);
  });

  return (
    <>
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial />
      </mesh>
    </>
  );
};

export default Game;
