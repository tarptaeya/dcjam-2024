import { useFrame } from "@react-three/fiber";


const Game = () => {
    useFrame(({ clock }) => {

    });

    return (
        <>
            <mesh>
                <boxGeometry args={[1, 1, 1,]} />
                <meshStandardMaterial />
            </mesh>
        </>
    );
};


export default Game;