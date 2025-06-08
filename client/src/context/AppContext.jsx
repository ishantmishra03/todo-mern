import { createContext, useContext, useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

//Axios Defaults Settings
axios.defaults.withCredentials = true; //For Cookie
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL; //Set Backend URL defualt for all axios requests

const AppContext = createContext();

//Provider to provide value to all componentsF
export const AppProvider = ({ children }) => {
  const navigate = useNavigate();
  //Login State
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  //State to chekc if to show login/signup from or not
  const [showAuth, setShowAuth] = useState(false);
  //User Data from backend
  const [userData, setUserData] = useState(null);


  const value = {
    navigate,
    axios,
    isLoggedIn, setIsLoggedIn,
    showAuth, setShowAuth,
    userData, setUserData,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

//Hook to get all values directly
export const useAppContext = () => {
  return useContext(AppContext);
};
