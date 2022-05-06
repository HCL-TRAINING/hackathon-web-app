import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { RoleContext } from "./App";
import AdminDashboard from "./modules/admin-dashboard/adminDashboard";
import Homepage from "./modules/homepage/homepage";
import Login from "./modules/login/login";
import SignUp from "./modules/signup/signup";
import UserDashboard from "./modules/user-dashboard/userDashboard";

export default function LibraryRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />}></Route>
      <Route path="/home" element={<Homepage />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/signup" element={<SignUp />}></Route>
      <Route path="/admin-dashboard" element={<AdminDashboard/>}></Route>
      <Route path="/user-dashboard" element={<UserDashboard/>}></Route>
      <Route path="*" element={<h1>Page Not Found</h1>}></Route>
    </Routes>
  );
}
