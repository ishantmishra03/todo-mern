import React from "react";
import Sidebar from "../../components/Todos/Sidebar";
import { Outlet } from "react-router-dom";

const Todos = () => {
  return (
    <div className="flex min-h-screen">
      <div className="bg-slate-50/30 border-r border-slate-200">
        <Sidebar />
      </div>

      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default Todos;
