import { createSlice } from "@reduxjs/toolkit";
import { getLogs } from "../asyncThunks";

const initialState = {
  logs: [],
  log: null,
  loading: false,
  error: null,
};

const logSlice = createSlice({
  name: "log",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getLogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getLogs.fulfilled, (state, action) => {
        state.logs = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(getLogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default logSlice.reducer;
