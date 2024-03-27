import { useRecoilState } from 'recoil';
import AppState from './AppState';
import { Canvas } from '@react-three/fiber';
import Game from './Game';


export const AboutScreen = () => {
    const [screen, setScreen] = useRecoilState(AppState.screen);

    const handleBackButton = () => {
        setScreen('welcome');
    };

    return (
        <div>
            <h2>About the game</h2>
            <button onClick={handleBackButton}>Back</button>
        </div>
    );
};

export const GameScreen = () => {
    return (
        <Canvas>
            <Game />
        </Canvas>
    );
}

export const WelcomeScreen = () => {
    const [screen, setScreen] = useRecoilState(AppState.screen);

    const navigateToGame = () => {
        setScreen('game');
    };

    const navigateToAbout = () => {
        setScreen('about');
    };

    return (<>
        <div>
            <div>
                <h1>Chintu The Explorer</h1>
            </div>
            <div>
                <button onClick={navigateToGame}>New Game</button>
                <button onClick={navigateToAbout}>Credits</button>
            </div>
        </div>
    </>);
};
