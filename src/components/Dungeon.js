import React, { useEffect, useMemo, useRef } from "react";
import { useSelector } from "react-redux";
import { Euler, Matrix4, Object3D, RepeatWrapping, TextureLoader } from "three";
import { centeredVectorForLocation } from "../location";
import { useFrame, useLoader } from "@react-three/fiber";
import { CELL_ENEMY, CELL_GEM, CELL_WALL } from "../constants";

const Walls = () => {
  const mesh = useRef();
  const dummy = useMemo(() => new Object3D(), []);
  const dungeon = useSelector((state) => state.dungeon.value);

  const colorMap = useLoader(TextureLoader, "./wall-1.png");
  colorMap.wrapS = RepeatWrapping;
  colorMap.wrapT = RepeatWrapping;
  colorMap.repeat.set(3, 3);

  const wallLocations = useMemo(() => {
    const m = dungeon?.length;
    const n = dungeon?.[0].length;
    const ans = [];
    for (let i = 0; i < m; ++i) {
      for (let j = 0; j < n; ++j) {
        if (dungeon[i][j] == CELL_WALL) {
          ans.push([i, j]);
        }
      }
    }
    return ans;
  }, [dungeon]);

  useEffect(() => {
    wallLocations.forEach((loc, index) => {
      const position = centeredVectorForLocation(loc);
      dummy.position.x = position.x;
      dummy.position.y = position.y;
      dummy.position.z = position.z;
      dummy.updateMatrix();
      mesh.current.setMatrixAt(index, dummy.matrix);
    });

    mesh.current.instanceMatrix.needsUpdate = true;
  }, [wallLocations]);

  return (
    <instancedMesh ref={mesh} args={[null, null, wallLocations.length]} frustumCulled={false}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial map={colorMap} />
    </instancedMesh>
  );
};

const Ceiling = () => {
  const SCALE = 1000;

  const colorMap = useLoader(TextureLoader, "./ceiling.png");
  colorMap.wrapS = RepeatWrapping;
  colorMap.wrapT = RepeatWrapping;
  colorMap.repeat.set(SCALE, SCALE);

  return (
    <mesh
      position={[0, 1, 0]}
      scale={[1000, 1000, 1000]}
      rotation={[Math.PI / 2, 0, 0]}
    >
      <planeGeometry />
      <meshStandardMaterial map={colorMap} />
    </mesh>
  );
};

const Floor = () => {
  const SCALE = 1000;

  const colorMap = useLoader(TextureLoader, "./floor-1.png");
  colorMap.wrapS = RepeatWrapping;
  colorMap.wrapT = RepeatWrapping;
  colorMap.repeat.set(SCALE, SCALE);

  return (
    <mesh
      position={[0, 0, 0]}
      scale={[SCALE, SCALE, SCALE]}
      rotation={[-Math.PI / 2, 0, 0]}
    >
      <planeGeometry />
      <meshStandardMaterial map={colorMap} />
    </mesh>
  );
};


const Enemies = () => {
  const mesh = useRef();
  const dummy = useMemo(() => new Object3D(), []);
  const dungeon = useSelector((state) => state.dungeon.value);

  const enemyLocations = useMemo(() => {
    const m = dungeon?.length;
    const n = dungeon?.[0].length;
    const ans = [];
    for (let i = 0; i < m; ++i) {
      for (let j = 0; j < n; ++j) {
        if (dungeon[i][j] == CELL_ENEMY) {
          ans.push([i, j]);
        }
      }
    }
    return ans;
  }, [dungeon]);

  useEffect(() => {
    enemyLocations.forEach((loc, index) => {
      const position = centeredVectorForLocation(loc);
      dummy.position.x = position.x;
      dummy.position.y = position.y;
      dummy.position.z = position.z;
      dummy.scale.set(0.2, 0.2, 0.2);
      dummy.updateMatrix();
      mesh.current.setMatrixAt(index, dummy.matrix);
    });

    mesh.current.instanceMatrix.needsUpdate = true;
  }, [enemyLocations]);

  return (
    <instancedMesh ref={mesh} args={[null, null, enemyLocations.length]} frustumCulled={false}>
      <capsuleGeometry args={[1, 1, 8, 16]} />
      <meshStandardMaterial color={"red"} />
    </instancedMesh>
  );
};


const Gems = () => {
  const mesh = useRef();
  const dummy = useMemo(() => new Object3D(), []);
  const dungeon = useSelector((state) => state.dungeon.value);

  const enemyLocations = useMemo(() => {
    const m = dungeon?.length;
    const n = dungeon?.[0].length;
    const ans = [];
    for (let i = 0; i < m; ++i) {
      for (let j = 0; j < n; ++j) {
        if (dungeon[i][j] == CELL_GEM) {
          ans.push([i, j]);
        }
      }
    }
    return ans;
  }, [dungeon]);

  useFrame(({ clock }) => {
    enemyLocations.forEach((loc, index) => {
      const position = centeredVectorForLocation(loc);
      dummy.position.x = position.x;
      dummy.position.y = position.y;
      dummy.position.z = position.z;
      dummy.scale.set(0.1, 0.1, 0.1);
      dummy.rotation.x = clock.getElapsedTime();
      dummy.rotation.y = clock.getElapsedTime();
      dummy.rotation.z = clock.getElapsedTime();
      dummy.updateMatrix();
      mesh.current.setMatrixAt(index, dummy.matrix);
    });

    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[null, null, enemyLocations.length]} frustumCulled={false}>
      <octahedronGeometry args={[1, 0]} />
      <meshStandardMaterial color={"crimson"} emissive={"red"} emissiveIntensity={2.0} />
    </instancedMesh>
  );
};


export const Dungeon = () => {
  return (
    <>
      <Walls />
      <Floor />
      <Ceiling />
      <Enemies />
      <Gems />
    </>
  );
};
