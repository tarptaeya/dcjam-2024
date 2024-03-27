import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { useSelector } from "react-redux";
import { Matrix4, Object3D, RepeatWrapping, TextureLoader } from "three";
import { CELL_WALL } from "../grid";
import { centeredVectorForLocation } from "../location";
import { useLoader } from "@react-three/fiber";

const Walls = () => {
    const mesh = useRef();
    const dummy = useMemo(() => new Object3D(), []);
    const dungeon = useSelector((state) => state.dungeon.value);

    const colorMap = useLoader(TextureLoader, './wall-1.png');
    colorMap.wrapS = RepeatWrapping;
    colorMap.wrapT = RepeatWrapping;
    colorMap.repeat.set(3, 3);

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
            <meshStandardMaterial map={colorMap} />
        </instancedMesh>
    );
};


const Ceiling = () => {
    const SCALE = 1000;

    const colorMap = useLoader(TextureLoader, './ceiling.png');
    colorMap.wrapS = RepeatWrapping;
    colorMap.wrapT = RepeatWrapping;
    colorMap.repeat.set(SCALE, SCALE);

    return <mesh position={[0, 1, 0]} scale={[1000, 1000, 1000]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry />
        <meshStandardMaterial map={colorMap} />
    </mesh>
}


const Floor = () => {
    const SCALE = 1000;

    const colorMap = useLoader(TextureLoader, './floor-1.png');
    colorMap.wrapS = RepeatWrapping;
    colorMap.wrapT = RepeatWrapping;
    colorMap.repeat.set(SCALE, SCALE);

    return <mesh position={[0, 0, 0]} scale={[SCALE, SCALE, SCALE]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry />
        <meshStandardMaterial map={colorMap} />
    </mesh>
};


export const Dungeon = () => {
    return (
        <>
            <Walls />
            <Floor />
            <Ceiling />
        </>
    );
};
