import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Auth from "./components/Auth/Auth";
import Navbar from "./components/Navbar/Navbar";
import { useAppContext } from "./context/AppContext";

const App = () => {
  const { showAuth } = useAppContext();
  return (
    <div>
      <Navbar />
      {showAuth && <Auth />}
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
};

export default App;
