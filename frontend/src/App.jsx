import React from "react";
import { Outlet } from "react-router-dom";
import { Header, Footer } from "./index.js";

const App = () => {
  return (
    <div
      id="container"
      className="w-full min-h-screen  flex justify-between flex-col bg-black bg-[url('../public/assets/Posters/HeroBg.jpeg')] bg-cover bg-center overflow-hidden"
    >
      <Header />

      <main className="w-[100vw] max-h-min flex items-center justify-center ">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default App;
