import React from "react";
import { Outlet } from "react-router-dom";
import { Header, Footer } from "./index.js";

const App = () => {
  return (
    <div
      id="main-container"
      className="w-screen h-screen bg-gray-300 flex items-center justify-center"
    >
      <div
        id="container"
        className="w-[98%] h-[98%] bg-slate-50 rounded-3xl flex items-center justify-between flex-col"
      >
        <Header />

        <main className="w-[100vw]  flex items-center justify-center">
          <Outlet />
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default App;
