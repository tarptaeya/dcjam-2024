import React, { useEffect, useMemo, useRef } from "react";
import { useSelector } from "react-redux";
import { Object3D, RepeatWrapping, TextureLoader } from "three";
import { centeredVectorForLocation } from "../location";
import { useFrame, useLoader } from "@react-three/fiber";
import { CELL_ANCIENT_SWORD, CELL_ENEMY, CELL_ENEMY_BABY, CELL_ENEMY_GUARD, CELL_ENEMY_KNIGHT, CELL_GEM, CELL_HAMMER, CELL_HEALTH_POTION, CELL_SANITY_POTION, CELL_SPEAR, CELL_TELEPORT, CELL_VISION_POTION, CELL_WALL } from "../constants";
import { getLocationsForCellType } from "../dungeon";

const Walls = () => {
  const mesh = useRef();
  const dummy = useMemo(() => new Object3D(), []);
  const dungeon = useSelector((state) => state.dungeon.value);

  const colorMap = useLoader(TextureLoader, "./wall-1.png");
  colorMap.wrapS = RepeatWrapping;
  colorMap.wrapT = RepeatWrapping;
  colorMap.repeat.set(3, 3);

  const wallLocations = useMemo(() => {
    return getLocationsForCellType(dungeon, CELL_WALL);
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
    <instancedMesh
      ref={mesh}
      args={[null, null, wallLocations.length]}
      frustumCulled={false}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshLambertMaterial map={colorMap} />
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

const createBillboardComponent = (type, texture) => {
  return () => {
    const mesh = useRef();
    const dummy = useMemo(() => new Object3D(), []);
    const dungeon = useSelector((state) => state.dungeon.value);
    const playerLocation = useSelector((state) => state.playerLocation.value);

    const colorMap = useLoader(TextureLoader, texture);

    const enemyLocations = useMemo(() => {
      const m = dungeon?.length;
      const n = dungeon?.[0].length;
      const ans = [];
      for (let i = 0; i < m; ++i) {
        for (let j = 0; j < n; ++j) {
          if (dungeon[i][j] == type) {
            ans.push([i, j]);
          }
        }
      }
      return ans;
    }, [dungeon]);

    useEffect(() => {
      const playerPosition = centeredVectorForLocation(playerLocation);

      enemyLocations.forEach((loc, index) => {
        const position = centeredVectorForLocation(loc);
        dummy.position.x = position.x;
        dummy.position.y = position.y;
        dummy.position.z = position.z;
        dummy.lookAt(playerPosition);
        dummy.updateMatrix();
        mesh.current.setMatrixAt(index, dummy.matrix);
      });

      mesh.current.instanceMatrix.needsUpdate = true;
    }, [enemyLocations, playerLocation]);

    return (
      <instancedMesh
        ref={mesh}
        args={[null, null, enemyLocations.length]}
        frustumCulled={false}
      >
        <planeGeometry />
        <meshStandardMaterial map={colorMap} transparent={true} alphaTest={.2} />
      </instancedMesh>
    );
  }
};


const BabyEnemies = createBillboardComponent(CELL_ENEMY_BABY, './bat-1.png');
const KnightEnemies = createBillboardComponent(CELL_ENEMY_KNIGHT, './bat-3.png');
const GuardEnemies = createBillboardComponent(CELL_ENEMY_GUARD, './bat-4.png');

const HammerBillboard = createBillboardComponent(CELL_HAMMER, './hammer.png');
const SwordBillboard = createBillboardComponent(CELL_ANCIENT_SWORD, './sword.png');
const SpearBillboard = createBillboardComponent(CELL_SPEAR, './spear.png');

const VisionPotion = createBillboardComponent(CELL_VISION_POTION, './vision-potion.png');
const HealthPotion = createBillboardComponent(CELL_HEALTH_POTION, './health-potion.png');
const SanityPotion = createBillboardComponent(CELL_SANITY_POTION, './sanity-potion.png');

const Gems = () => {
  const mesh = useRef();
  const dummy = useMemo(() => new Object3D(), []);
  const dungeon = useSelector((state) => state.dungeon.value);

  const gemsLocations = useMemo(() => {
    return getLocationsForCellType(dungeon, CELL_GEM);
  }, [dungeon]);

  useFrame(({ clock }) => {
    gemsLocations.forEach((loc, index) => {
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
    <instancedMesh
      ref={mesh}
      args={[null, null, gemsLocations.length]}
      frustumCulled={false}
    >
      <octahedronGeometry args={[1, 0]} />
      <meshStandardMaterial
        color={"crimson"}
        emissive={"red"}
        emissiveIntensity={2.0}
      />
    </instancedMesh>
  );
};

const Teleporter = () => {
  const mesh = useRef();
  const dummy = useMemo(() => new Object3D(), []);
  const dungeon = useSelector((state) => state.dungeon.value);
  const stage = useSelector((state) => state.stage.value);
  const { isLifted } = stage;

  const locations = useMemo(() => {
    return getLocationsForCellType(dungeon, CELL_TELEPORT);
  }, [dungeon]);

  useFrame(({ clock }) => {
    locations.forEach((loc, index) => {
      const position = centeredVectorForLocation(loc);
      dummy.position.x = position.x;
      dummy.position.y = position.y;
      dummy.position.z = position.z;
      dummy.scale.set(0.01, 0.01, 0.01);
      dummy.rotation.x = clock.getElapsedTime();
      dummy.rotation.y = clock.getElapsedTime();
      dummy.rotation.z = clock.getElapsedTime();
      dummy.updateMatrix();
      mesh.current.setMatrixAt(index, dummy.matrix);
    });

    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh
      ref={mesh}
      args={[null, null, locations.length]}
      frustumCulled={false}
    >
      <torusKnotGeometry args={[10, 3, 100, 16]} />
      {!isLifted && <meshStandardMaterial
        color={"crimson"}
        emissive={"red"}
        emissiveIntensity={2.0}
      />}
      {isLifted && <meshStandardMaterial
        color={"blueviolet"}
        emissive={"blueviolet"}
        emissiveIntensity={2.0}
        depthTest={false}
      />}
    </instancedMesh>
  );
};


export const Dungeon = () => {
  const stage = useSelector((state) => state.stage.value);
  const { isLifted, isVisible } = stage;

  return (
    <>
      {isVisible && <>
        <Walls />
        <Floor />
        <Ceiling />
      </>}
      <BabyEnemies />
      <KnightEnemies />
      <GuardEnemies />
      <Gems />

      <HammerBillboard />
      <SpearBillboard />
      <SwordBillboard />

      <SanityPotion />
      <VisionPotion />
      <HealthPotion />

      <Teleporter />
    </>
  );
};
