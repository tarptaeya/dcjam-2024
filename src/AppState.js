import { atom } from "recoil";

const screen = atom({
    key: 'screen',
    default: 'welcome'
});

const playerLocation = atom({
    key: 'playerLocation',
    default: [0, 0]
});

const playerDirection = atom({
    key: 'playerDirection',
    default: 'north',
});

const AppState = {
    screen,
    playerLocation,
    playerDirection,
};

export default AppState;