import React from "react";
import { useAppContext } from "../context/AppContext";
import Todo3D from "../components/3D/Todo3D";
import Footer from "../components/Footer/Footer";

const Home = () => {
  const { setShowAuth } = useAppContext();
  return (
    <>
      <main className="bg-white w-full min-h-screen flex justify-center items-center">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10 max-w-7xl w-full px-6 md:px-8 lg:px-16 py-12">
          {/* Left Content */}
          <div className="lg:w-1/2 text-center lg:text-left">
            <h1 className="text-4xl sm:text-6xl font-bold text-slate-800  leading-tight mb-6">
              Organize Your <span className="text-orange-500">Tasks</span>
              <br />
              with Style & Focus
            </h1>
            <p className="text-slate-600  text-lg mb-8">
              A sleek, minimalist Todo App to help you prioritize what really
              matters. Stay productive, track your progress, and never miss a
              deadline.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button
                onClick={() => setShowAuth(true)}
                className="bg-orange-500 text-white px-6 py-3 rounded-lg text-lg font-semibold shadow hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400 transition cursor-pointer"
              >
                Get Started
              </button>
              <button className="border-2 border-orange-500 text-orange-500 px-6 py-3 rounded-lg text-lg hover:bg-orange-500 hover:text-white transition duration-200 cursor-pointer">
                Learn More
              </button>
            </div>
          </div>

          {/* Right Image */}
          <div className="lg:w-1/2">
            {/* 3D Component  */}
            <Todo3D className="w-full max-w-md mx-auto" />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Home;
