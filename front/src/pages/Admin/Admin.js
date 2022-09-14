import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Admin_Navbar from "../../components/Admin/Admin_Navbar";

const Admin = () => {
  return (
    <div className="Admin">
      <Admin_Navbar />
      <Outlet />
    </div>
  );
};

export default Admin;
