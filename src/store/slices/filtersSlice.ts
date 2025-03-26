import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface FiltersState {
  selectedTransformerIds: number[];
  searchQuery: string;
  regionFilter: string;
  healthFilter: string;
}

const initialState: FiltersState = {
  selectedTransformerIds: [],
  searchQuery: "",
  regionFilter: "all",
  healthFilter: "all",
};

export const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setSelectedTransformerIds: (state, action: PayloadAction<number[]>) => {
      state.selectedTransformerIds = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setRegionFilter: (state, action: PayloadAction<string>) => {
      state.regionFilter = action.payload;
    },
    setHealthFilter: (state, action: PayloadAction<string>) => {
      state.healthFilter = action.payload;
    },
    clearAllFilters: () => initialState,
  },
});

export const {
  setSelectedTransformerIds,
  setSearchQuery,
  setRegionFilter,
  setHealthFilter,
  clearAllFilters,
} = filtersSlice.actions;

export default filtersSlice.reducer;
