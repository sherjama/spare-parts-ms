import React from "react";
import { Outlet } from "react-router-dom";
import { Header, Footer } from "./index.js";

const App = () => {
  return (
    <div
      id="container"
      className="w-full min-h-screen bg-[url('../public/assets/Posters/hero.jpeg')] flex items-center justify-between flex-col bg-cover bg-center bg-no-repeat"
    >
      <Header />

      <div className="w-[95%] h-16 bg-transparent"></div>

      <main className="w-[100vw] max-h-min flex items-center justify-center">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default App;
