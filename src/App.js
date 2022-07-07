import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Layout from "./components/Layout.jsx";
import HomePage from "./components/HomePage.jsx";
import Login from "./components/Login.jsx";
import Registration from "./components/Registration.jsx";
import NotFoundPage from "./components/NotFoundPage.jsx";
import DebatesPage from "./components/DebatesPage/DebatesPage.jsx";
import RequireAuth from "./hoc/RequireAuth.jsx";
import Profile from "./components/Profile.jsx";

import "./styles/App.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />

          <Route
            path="debates-page"
            element={
              <RequireAuth>
                <DebatesPage />
              </RequireAuth>
            }
          />
          <Route
            path="debates"
            element={<Navigate to="/debates-page" replace />}
          />
          <Route
            path="profile"
            element={
              <RequireAuth>
                <Profile />
              </RequireAuth>
            }
          />
          <Route path="login" element={<Login />} />
          <Route path="registration" element={<Registration />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
