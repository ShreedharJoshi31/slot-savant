// carSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { createCar, getCars } from "../asyncThunks";

const initialState = {
  cars: [],
  loading: false,
  error: null,
};

const carSlice = createSlice({
  name: "car",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createCar.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCar.fulfilled, (state, action) => {
        state.cars.data.push(action.payload);
        state.loading = false;
        state.error = null;
      })
      .addCase(createCar.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getCars.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCars.fulfilled, (state, action) => {
        state.cars = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(getCars.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default carSlice.reducer;
