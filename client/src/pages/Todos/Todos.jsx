import React from 'react';
import Sidebar from '../../components/Todos/Sidebar';
import { Outlet } from "react-router-dom";

const Todos = () => {
  return (
    <div>
      <div className="flex">
        <Sidebar />
        <Outlet />
      </div>
    </div>
  )
}

export default Todos
