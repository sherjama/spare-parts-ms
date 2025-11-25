import React from "react";
import { NavLink } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";

const Footer = () => {
  return (
    <footer className="bg-black text-white flex flex-col items-center py-12 px-4 font-[Noto_Sans_JP]">
      {/* Logo */}
      <div className="flex">
        <img
          src="../../../public/Logo.png"
          alt="logo"
          className="size-80 rounded-md "
        />
      </div>
      {/* Navigation Links */}
      <nav className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-lg mb-8 mt-12 select-none">
        <NavLink
          to="/pricing"
          className="Link_Animation font-nexar3 no-underline"
        >
          pricing
        </NavLink>
        <NavLink
          to="/aboutUs"
          className="Link_Animation font-nexar3 no-underline"
        >
          about Us
        </NavLink>
        <NavLink
          to="/contactUs"
          className="Link_Animation font-nexar3 no-underline"
        >
          contact Us
        </NavLink>
        <NavLink
          to="/feedback"
          className="Link_Animation font-nexar3 no-underline"
        >
          feedback
        </NavLink>
      </nav>

      {/* Social Media Icons */}
      <div className="flex items-center gap-10 mb-8">
        <NavLink
          href="#"
          aria-label="Facebook"
          className="w-9 h-9 rounded-full bg-white text-black flex items-center justify-center hover:bg-gray-300"
        >
          <i className="fab fa-facebook-f"></i>
        </NavLink>
        <NavLink
          href="#"
          aria-label="Instagram"
          className="w-9 h-9 rounded-full bg-white text-black flex items-center justify-center hover:bg-gray-300"
        >
          <i className="fab fa-instagram"></i>
        </NavLink>
        <NavLink
          href="#"
          aria-label="Twitter"
          className="w-9 h-9 rounded-full bg-white text-black flex items-center justify-center hover:bg-gray-300"
        >
          <i className="fab fa-twitter"></i>
        </NavLink>
        <NavLink
          href="#"
          aria-label="Email"
          className="w-9 h-9 rounded-full bg-white text-black flex items-center justify-center hover:bg-gray-300"
        >
          <i className="fas fa-envelope"></i>
        </NavLink>
        <NavLink
          href="#"
          aria-label="YouTube"
          className="w-9 h-9 rounded-full bg-white text-black flex items-center justify-center hover:bg-gray-300"
        >
          <i className="fab fa-youtube"></i>
        </NavLink>
        <button className="w-20 h-9 rounded-full border border-white text-white text-xs font-semibold hover:bg-white hover:text-black transition-colors duration-200">
          English
        </button>
      </div>

      {/* Footer Text */}
      <p className="text-xs font-nexar3 select-none">
        Copyright © NEXARS, Inc.
      </p>
    </footer>
  );
};

export default Footer;
