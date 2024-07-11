import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const login = createAsyncThunk("auth/login", async (credentials) => {
  const response = await axios.post(
    "http://localhost:4000/api/v1/users/login",
    credentials
  );
  return response.data;
});

export const getCars = createAsyncThunk("car/getCars", async (token) => {
  const response = await axios.get("http://localhost:4000/api/v1/cars", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
});

export const createCar = createAsyncThunk(
  "car/createCar",
  async ({ carNumberPlate, ownerName, ownerDesignation, token }) => {
    const response = await axios.post(
      `http://localhost:4000/api/v1/cars/`,
      { carNumberPlate, ownerName, ownerDesignation },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  }
);

export const getLogs = createAsyncThunk("log/getLogs", async (token) => {
  const response = await axios.get("http://localhost:4000/api/v1/logs", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
});

export const getDashboardData = createAsyncThunk(
  "dashboard/getDashboardData",
  async (token) => {
    const response = await axios.get("http://localhost:4000/api/v1/dashboard", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }
);
