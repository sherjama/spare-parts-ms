import React from "react";
import { Outlet } from "react-router-dom";
import { Header, Footer } from "./index.js";

const App = () => {
  return (
    <>
      <header>
        <Header />
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default App;
