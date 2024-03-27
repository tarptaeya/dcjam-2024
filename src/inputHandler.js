import { useRecoilState, useRecoilValue } from "recoil";
import AppState from "./AppState";


const useGameKeypressHandler = () => {
    const [playerLocation, setPlayerLocation] = useRecoilState(AppState.playerLocation);

    return e => {
        if (e.code === 'KeyW') {
            setPlayerLocation([playerLocation[0] - 1, playerLocation[1]]);
        }
    };
};


export const useKeypressHandler = () => {
    const [screen, setScreen] = useRecoilState(AppState.screen);

    const gameKeypressHanadler = useGameKeypressHandler();

    return e => {
        if (screen === 'game') {
            gameKeypressHanadler(e);
        }
    };
};