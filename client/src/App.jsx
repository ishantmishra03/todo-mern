import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./pages/Todos/Layout";
import AddTodo from "./pages/Todos/AddTodo";
import Todos from "./pages/Todos/Todos";
import Todo from "./pages/Todos/Todo";
import EditTodo from "./pages/Todos/EditTodo";
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
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Todos />}/>
          <Route path="add-todo" element={<AddTodo />} />
          <Route path=":id" element={<Todo />} />
          <Route path="edit/:id" element={<EditTodo />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
