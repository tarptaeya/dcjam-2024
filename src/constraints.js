import { CELL_FLOOR, CELL_GEM } from "./constants";

export const canStepOn = (dungeon, location) => {
  const [i, j] = location;
  const cell = dungeon?.[i]?.[j];
  return cell === CELL_FLOOR || cell === CELL_GEM;
};
