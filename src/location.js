import { Vector3 } from "three";
import { locationDeltaForDirection } from "./direction";

export const centeredVectorForLocation = location => {
    const [i, j] = location;
    return new Vector3(j + 0.5, 0.5, i + 0.5);
};

export const nextLocation = (location, direction) => {
    const [i, j] = location;
    const [di, dj] = locationDeltaForDirection(direction);
    return [i + di, j + dj];
}; 