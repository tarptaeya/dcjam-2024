import { nextLocation } from "./location";
import store from "./store/store";


export const getLookAtLocation = () => {
  const state = store.getState();
  const playerLocation = state.playerLocation.value;
  const playerDirection = state.playerDirection.value;

  const lookAtLocation = nextLocation(playerLocation, playerDirection);
  return lookAtLocation;
};


export const getLookAtCell = () => {
  const state = store.getState();
  const dungeon = state.dungeon.value;
  const lookAtLocation = getLookAtLocation();
  const lookAtCell = dungeon?.[lookAtLocation[0]]?.[lookAtLocation[1]];
  return lookAtCell;
}