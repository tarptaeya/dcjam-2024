import { atom } from "recoil";

const screen = atom({ key: 'screen', default: 'welcome' });

const AppState = {
    screen,
};

export default AppState;