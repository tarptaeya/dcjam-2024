import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { useSelector } from "react-redux";
import { Matrix4, Object3D } from "three";
import { CELL_WALL } from "../grid";
import { centeredVectorForLocation } from "../location";

const Walls = () => {
  const mesh = useRef();
  const dummy = useMemo(() => new Object3D(), []);
  const dungeon = useSelector((state) => state.dungeon.value);

  const getWallLocations = useCallback(() => {
    const m = dungeon.length;
    const n = dungeon[0].length;
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

  const wallLocations = getWallLocations();

  useEffect(() => {
    wallLocations.forEach((loc, index) => {
      const position = centeredVectorForLocation(loc);
      dummy.position.x = position.x;
      dummy.position.y = position.y;
      dummy.position.z = position.z;
      dummy.updateMatrix();
      mesh.current.setMatrixAt(index, dummy.matrix);
    });
  }, [wallLocations]);

  return (
    <instancedMesh ref={mesh} args={[null, null, wallLocations.length]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial />
    </instancedMesh>
  );
};

export const Dungeon = () => {
  return (
    <>
      <Walls />
    </>
  );
};
