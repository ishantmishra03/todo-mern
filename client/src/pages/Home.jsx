import React from 'react'
import { useAppContext } from '../context/AppContext';

const Home = () => {
  const { userData } = useAppContext();
  return (
    <div className="pt-40 flex  justify-center items-center text-5xl  overflow-y-hidden">
      {userData ? `"Hello" + ${userData.name}` : "Hello User"}
    </div>
  )
}

export default Home
