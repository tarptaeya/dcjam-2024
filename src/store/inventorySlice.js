import { createSlice } from "@reduxjs/toolkit";

const WEAPONS = [
  {
    name: "punch",
    description: "Punch the enemy real hard.",
    isWeapon: true,
    damage: 5,
    isActive: true,
  },
];

const POTIONS = [
  {
    name: "Health potion - A",
    description: "",
    health: 10,
    isPotion: true,
  },
  {
    name: "Health potion - B",
    description: "",
    health: 25,
    isPotion: true,
  },
  {
    name: "Health potion - C",
    description: "",
    health: 50,
    isPotion: true,
  },
  {
    name: "Vision potion",
    description: "",
    vision: 15,
    isPotion: true,
  },
];

const inventorySlice = createSlice({
  name: "inventory",
  initialState: {
    value: {
      isOpen: false,
      items: [...WEAPONS, ...POTIONS],
    },
  },
  reducers: {
    addItem: (state, action) => {
      state.value.items.push(action.payload);
    },
    toggleShowInventory: (state) => {
      state.value.isOpen = !state.value.isOpen;
    },
    toggleItemSelection: (state, action) => {
      const item = state.value.items.find((it) => it.name === action.payload);
      item.isActive = !item.isActive;
    },
    removeItem: (state, action) => {
      const item = state.value.items.find((it) => it.name === action.payload);
      state.value.items = state.value.items.filter(
        (it) => it.name !== item.name,
      );
    },
  },
});

export const { addItem, toggleShowInventory, toggleItemSelection, removeItem } =
  inventorySlice.actions;
export default inventorySlice.reducer;
