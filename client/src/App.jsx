import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Todos from "./pages/Todos/Todos";
import AddTodo from "./pages/Todos/AddTodo";
import Auth from "./components/Auth/Auth";
import Navbar from "./components/Navbar/Navbar";
import { useAppContext } from "./context/AppContext";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

const App = () => {
  const { showAuth, isLoggedIn } = useAppContext();
  return (
    <div>
      <Navbar />
      {!isLoggedIn  && showAuth && <Auth />}
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Protected Route  */}
        <Route
          path="/todos"
          element={
            <ProtectedRoute>
              <Todos />
            </ProtectedRoute>
          }
        >
          <Route path="add-todo" element={<AddTodo />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
