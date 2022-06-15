import React from "react";
import { Routes, Route } from "react-router-dom";

import Layout from "./components/Layout.jsx";
import HomePage from "./components/HomePage.jsx";
import Login from "./components/Login.jsx";
import Registration from "./components/Registration.jsx";
import NotFoundPage from "./components/NotFoundPage.jsx";
import DebatesPage from "./components/DebatesPage/DebatesPage.jsx";

import "./styles/App.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="debates-page" element={<DebatesPage />} />
          <Route path="login" element={<Login />} />
          <Route path="registration" element={<Registration />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
