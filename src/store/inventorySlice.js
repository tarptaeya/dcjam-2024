import { createSlice } from "@reduxjs/toolkit";

const inventorySlice = createSlice({
    name: 'inventory',
    initialState: {
        value: [],
    },
    reducers: {
        addItem: (state, action) => {
            state.value.push(action.payload);
        },
    },
});

export const { addItem } = inventorySlice.actions;
export default inventorySlice.reducer;