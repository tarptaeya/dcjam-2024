import { Vector3 } from "three";

export const NORTH = 'north';
export const SOUTH = 'south';
export const EAST = 'east';
export const WEST = 'west';

export const reverseDirection = direction => {
    switch (direction) {
        case NORTH: return SOUTH;
        case SOUTH: return NORTH;
        case EAST: return WEST;
        case WEST: return EAST;
        default: return direction;
    }
};

export const leftDirection = direction => {
    switch (direction) {
        case NORTH: return WEST;
        case WEST: return SOUTH;
        case SOUTH: return EAST;
        case EAST: return NORTH;
        default: return direction;
    }
};

export const rightDirection = direction => {
    switch (direction) {
        case NORTH: return EAST;
        case EAST: return SOUTH;
        case SOUTH: return WEST;
        case WEST: return NORTH;
        default: return direction;
    }
};

export const vectorForDirection = direction => {
    switch (direction) {
        case NORTH: return new Vector3(0, 0, -1);
        case EAST: return new Vector3(1, 0, 0);
        case SOUTH: return new Vector3(0, 0, 1);
        case WEST: return new Vector3(-1, 0, 0);
    }
};

export const locationDeltaForDirection = direction => {
    switch (direction) {
        case NORTH: return [-1, 0];
        case EAST: return [0, 1];
        case SOUTH: return [1, 0];
        case WEST: return [0, -1];
    }
};