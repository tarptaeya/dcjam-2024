import { canStepOn } from "./constraints";
import { leftDirection, reverseDirection, rightDirection } from "./direction";
import { nextLocation } from "./location";
import { updatePlayerDirection } from "./store/playerDirectionSlice";
import { updatePlayerLocation } from "./store/playerLocationSlice";
import store from "./store/store";

const gameKeydownHandler = e => {
    const state = store.getState();
    const playerLocation = state.playerLocation.value;
    const playerDirection = state.playerDirection.value;
    const dungeon = state.dungeon.value;

    if (e.code == 'KeyW' || e.code == 'ArrowUp') {
        const playerNextLocation = nextLocation(playerLocation, playerDirection);
        if (!canStepOn(dungeon, playerNextLocation)) {
            return;
        }
        store.dispatch(updatePlayerLocation(playerNextLocation));
    } else if (e.code == 'KeyS' || e.code == 'ArrowDown') {
        const playerNextLocation = nextLocation(playerLocation, reverseDirection(playerDirection));
        if (!canStepOn(dungeon, playerNextLocation)) {
            return;
        }
        store.dispatch(updatePlayerLocation(playerNextLocation));
    } else if (e.code == 'KeyA') {
        const playerNextLocation = nextLocation(playerLocation, leftDirection(playerDirection));
        if (!canStepOn(dungeon, playerNextLocation)) {
            return;
        }
        store.dispatch(updatePlayerLocation(playerNextLocation));
    } else if (e.code == 'KeyD') {
        const playerNextLocation = nextLocation(playerLocation, rightDirection(playerDirection));
        if (!canStepOn(dungeon, playerNextLocation)) {
            return;
        }
        store.dispatch(updatePlayerLocation(playerNextLocation));
    } else if (e.code == 'KeyQ' || e.code == 'ArrowLeft') {
        const playerNextDirection = leftDirection(playerDirection);
        store.dispatch(updatePlayerDirection(playerNextDirection));
    } else if (e.code == 'KeyE' || e.code == 'ArrowRight') {
        const playerNextDirection = rightDirection(playerDirection);
        store.dispatch(updatePlayerDirection(playerNextDirection));
    }
};


export const keydownHandler = e => {
    const state = store.getState();
    const screen = state.screen.value;

    if (screen == 'game') {
        gameKeydownHandler(e);
        return;
    }
};