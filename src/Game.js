const Game = () => {
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