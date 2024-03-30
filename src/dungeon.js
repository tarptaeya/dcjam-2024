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
};

export const getLocationsForCellType = (dungeon, cellType) => {
  const m = dungeon?.length;
  const n = dungeon?.[0].length;
  const ans = [];
  for (let i = 0; i < m; ++i) {
    for (let j = 0; j < n; ++j) {
      if (dungeon[i][j] == cellType) {
        ans.push([i, j]);
      }
    }
  }
  return ans;
};
