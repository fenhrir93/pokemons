import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const paginationSlice = createSlice({
  name: "pagination",
  initialState: {
    page: 0,
    offset: 0,
    limit: 20,
  },
  reducers: {
    setOffset: (state) => {
      const offset = state.page * 20;
      state.offset = offset;
      state.page = ++state.page;
    },

    setLimit: (state, action: PayloadAction<number>) => {
      state.limit = action.payload;
    },
  },
});
export const { setLimit, setOffset } = paginationSlice.actions;
export default paginationSlice.reducer;
