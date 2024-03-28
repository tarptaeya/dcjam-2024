import { CELL_FLOOR } from "./grid";

export const canStepOn = (dungeon, location) => {
  const [i, j] = location;
  const cell = dungeon?.[i]?.[j];
  return cell === CELL_FLOOR;
};
