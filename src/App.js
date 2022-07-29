import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Layout from "./components/Layout";
import HomePage from "./components/HomePage";
import Login from "./components/Login";
import Registration from "./components/Registration";
import NotFoundPage from "./components/NotFoundPage";
import DebatesPage from "./components/DebatesPage/DebatesPage";
import RequireAuth from "./hoc/RequireAuth";
import Profile from "./components/Profile";
import CreateDispute from "./components/CreateDispute";
import NewDisputeOptions from "./components/NewDisputeOptions";

// import { styles } from "./styles/App.module.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="debates-page/:id" element={<DebatesPage />} />
          <Route
            path="create-dispute"
            element={
              <RequireAuth>
                <CreateDispute />
              </RequireAuth>
            }
          />
          <Route path="new-dispute-options" element={<NewDisputeOptions />} />
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
