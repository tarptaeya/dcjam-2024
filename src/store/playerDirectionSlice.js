import { createSlice } from "@reduxjs/toolkit";
import { NORTH } from '../direction';

const playerDirectionSlice = createSlice({
    name: 'playerDirection',
    initialState: {
        value: NORTH,
    },
    reducers: {
        updatePlayerDirection: (state, action) => {
            state.value = action.payload;
        }
    }
});

export const { updatePlayerDirection } = playerDirectionSlice.actions;
export default playerDirectionSlice.reducer;