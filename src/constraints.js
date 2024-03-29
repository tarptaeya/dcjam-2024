import { CELL_FLOOR } from "./constants";

export const canStepOn = (dungeon, location) => {
  const [i, j] = location;
  const cell = dungeon?.[i]?.[j];
  return cell === CELL_FLOOR;
};
