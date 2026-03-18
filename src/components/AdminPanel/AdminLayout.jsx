import React from "react";
import { Outlet } from "react-router-dom";
import AdminHeader from "./AdminHeader";
import "./adminLayout.css";

export default function AdminLayout() {
  return (
    <div className="admin-layout">
      <AdminHeader />
      <div className="admin-content">
        <Outlet /> {/* all admin pages render here */}
      </div>
    </div>
  );
}
