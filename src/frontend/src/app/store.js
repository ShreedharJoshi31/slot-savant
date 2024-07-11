import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authSlice.js";
import carReducer from "./reducers/carSlice.js";
import logReducer from "./reducers/logSlice.js";
import dashboardReducer from "./reducers/dashboardSlice.js";

const store = configureStore({
  reducer: {
    auth: authReducer,
    car: carReducer,
    log: logReducer,
    dashboard: dashboardReducer,
  },
});

export default store;
