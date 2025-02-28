import React from "react";
import { Button } from "../../index.js";

const Header = () => {
  return (
    <>
      <div id="main-container" className="w-[95%] h-16 bg-slate-200">
        <nav className="w-full h-full flex items-center justify-between">
          <div id="left-nav">LOGO</div>
          <div id="right-nav">
            <Button />
          </div>
        </nav>
      </div>
    </>
  );
};

export default Header;
