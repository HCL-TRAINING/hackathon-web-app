import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./modules/dashboard/dashboard";
import Homepage from "./modules/homepage/homepage";
import Login from "./modules/login/login";
import SignUp from "./modules/signup/signup";

export default function TestRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />}></Route>
      <Route path="/home" element={<Homepage />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/signup" element={<SignUp />}></Route>
      <Route path="/dashboard" element={<Dashboard/>}></Route>
      <Route path="*" element={<h1>Page Not Found</h1>}></Route>
    </Routes>
  );
}
