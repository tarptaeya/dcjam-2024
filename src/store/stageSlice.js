import { createSlice } from "@reduxjs/toolkit";

const stageSlice = createSlice({
    name: 'stage',
    initialState: {
        value: {
            isLifted: true,
        },
    },
    reducers: {
        liftStage: (state) => {
            state.value.isLifted = true;
        }
    }
});

export const { liftStage } = stageSlice.actions;
export default stageSlice.reducer;