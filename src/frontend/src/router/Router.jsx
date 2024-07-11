import {
  Routes,
  Route,
  BrowserRouter as Router,
  Navigate,
} from "react-router-dom";
import React from "react";

import Dashboard from "../Pages/Dashboard";
import Vehicles from "../Pages/Vehicles";
import Logs from "../Pages/Logs";
import Login from "../Pages/Login";
import { useSelector } from "react-redux";
import Layout from "../Layout";

export default function Routers() {
  const { token } = useSelector((state) => state.auth);
  const ValidateRoute = ({ children }) => {
    if (!token) {
      return <Navigate to={"/login"} replace />;
    }
    return children;
  };

  return (
    <div>
      <Router>
        <Routes>
          <Route
            path="/login"
            element={token ? <Navigate to={"/dashboard"} /> : <Login />}
          />
          <Route
            path="/"
            element={
              <ValidateRoute>
                <Layout />
              </ValidateRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route
              path="/dashboard"
              element={
                <ValidateRoute>
                  <Dashboard />
                </ValidateRoute>
              }
            />
            <Route
              path="/vehicles"
              element={
                <ValidateRoute>
                  <Vehicles />
                </ValidateRoute>
              }
            />
            <Route
              path="/logs"
              element={
                <ValidateRoute>
                  <Logs />
                </ValidateRoute>
              }
            />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}
