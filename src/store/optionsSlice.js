import { createSlice } from "@reduxjs/toolkit";

const optionsSlice = createSlice({
    name: "options",
    initialState: {
        value: {
            sfx: 80,
            fov: 100,
            movement: 'smooth',
        },
    },
    reducers: {
        setOptionsSFX: (state, action) => {
            state.value.sfx = action.payload;
        },
        setOptionsFOV: (state, action) => {
            state.value.fov = action.payload;
        },
        setOptionsMovement: (state, action) => {
            state.value.movement = action.payload;
        }
    },
});

export const { setOptionsSFX, setOptionsFOV, setOptionsMovement } = optionsSlice.actions;
export default optionsSlice.reducer;
