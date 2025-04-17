import React from "react";
import { Outlet } from "react-router-dom";
import { Header, Footer } from "./index.js";

const App = () => {
  return (
    <div
      id="container"
      className="w-[98%] min-h-screen bg-[#f6f6f6] flex items-center justify-between flex-col"
    >
      <Header />

      <div className="w-[95%] h-16 bg-[#f6f6f6]"></div>

      <main className="w-[100vw] max-h-min flex items-center justify-center">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default App;
