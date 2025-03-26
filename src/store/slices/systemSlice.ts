import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { TailwindThemeType, ISystemSliceInitialState } from "../../Types";
import { systemSliceInitialState } from "../initialStates";

export const systemSlice = createSlice({
  name: "system",
  initialState: systemSliceInitialState,
  reducers: {
    themeSwitch: (
      state: ISystemSliceInitialState,
      action: PayloadAction<TailwindThemeType>
    ) => {
      state.mode = action.payload;
    },
    resetSystem: () => systemSliceInitialState,
  },
});

export const { themeSwitch, resetSystem } = systemSlice.actions;
